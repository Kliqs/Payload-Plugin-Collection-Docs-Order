import { CollectionSlug, PayloadRequest } from "payload"

export const handleApiUpdateOrderNumber = async (req: PayloadRequest) => {
    if (!req.user) {
        return Response.json(
            { error: 'Access denied. You do not have permission to perform this action.' },
            { status: 403 },
        )
    }

    if (
        !['superAdmin', 'admin', 'user'].some((role) => {
            return req.user?.roles?.some((individualRole: string) => {
                return individualRole === role
            })
        })
    ) {
        return Response.json(
            { error: 'Access denied. You do not have permission to perform this action.' },
            { status: 403 },
        )
    }

    const collectionSlug = req.routeParams?.slug ? req.routeParams.slug.toString() : null
    const data = await (req.json ? req.json() : undefined)

    if (!collectionSlug || !Array.isArray(data) || data.length === 0) {
        return Response.json(
            { error: 'Invalid request. Please check your input data and try again.' },
            { status: 400 },
        )
    }

    if (!(req.payload.collections && collectionSlug in req.payload.collections)) {
        return Response.json(
            { error: 'Invalid request. Please check your input data and try again.' },
            { status: 400 },
        )
    }

    const collectionConfig = req.payload.collections[collectionSlug as CollectionSlug]

    const table = collectionSlug.toString().replace('-', '_')
    const filterData = data.filter(({ id, order_number }) => id && order_number)

    // Build SQL query dynamically
    let query = `
    BEGIN;
    
    UPDATE "${table}"
    SET order_number = CASE 
      ${filterData.map(({ id, order_number }) => `WHEN id = ${Number(id)} THEN ${order_number}`).join('\n')}
    END
    WHERE id IN (${filterData.map(({ id }) => Number(id)).join(',')})
    RETURNING *;
    `

    if (collectionConfig?.config?.versions) {
        query += `
      UPDATE "_${table}_v"
      SET version_order_number = CASE 
        ${filterData.map(({ id, order_number }) => `WHEN parent_id = ${Number(id)} THEN ${order_number}`).join('\n')}
      END
      WHERE parent_id IN (${filterData.map(({ id }) => Number(id)).join(',')})
      RETURNING *;
      `
    }
    query += `
    COMMIT;
    `

    try {
        //@ts-ignore
        const result = await req.payload.db.pool.query(query)
        const rowCount = result?.rowCount
            ? result.rowCount
            : Array.isArray(result) && result.length > 1
                ? result[1].rowCount
                : 0

        return Response.json({
            message: `Successfully updated ${rowCount} rows in ${collectionSlug}`,
        })
    } catch (error) {
        return Response.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 400 },
        )
    }
}