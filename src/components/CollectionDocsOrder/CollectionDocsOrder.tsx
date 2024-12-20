'use client'
import {DragHandleIcon, toast, useTranslation } from '@payloadcms/ui'

import { DraggableSortable } from '@payloadcms/ui/elements/DraggableSortable'
import { DraggableSortableItem } from '@payloadcms/ui/elements/DraggableSortable/DraggableSortableItem'
import { Radio } from '@payloadcms/ui/fields/RadioGroup/Radio'
import type { PaginatedDocs } from 'payload'
import React, { useCallback, useEffect, useState } from 'react'
import { Dialog } from '../Dialog'
import './OrderDialog.css' // Import the new CSS file
import { ToastContainer } from '@payloadcms/ui/providers/ToastContainer'

interface Doc extends Record<string, unknown> {
  id: number | string
  order_number: number
  edited_to?: number
  edited_from?: number
}

const DragDrop = () => {
  const { t } = useTranslation() // Use the correct namespace
  type translateType = Parameters<typeof t>[0] // for type checking

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const url = window.location.href

  let result = url.match(/\/collections\/([^?]+)/)

  const slug = result?.[1]

  const baseUrl = new URL(url).origin

  const limit = 20

  const [data, setData] = useState<{
    docs: Doc[]
    hasNextPage: boolean
    isLoading: boolean
    loadedPages: number
    totalDocs: number
  }>({
    docs: [],
    hasNextPage: false,
    isLoading: true,
    loadedPages: 0,
    totalDocs: 0,
  })

  const hasSave = data.docs.some(
    doc => typeof doc.edited_to === 'number' && doc.edited_to !== doc.order_number,
  )

  const sort = `sort=${sortOrder === 'desc' ? '-' : ''}order_number`

  const initData = () => {
    return fetch(`/api/${slug}?${sort}&limit=${limit}`)
      .then(res => res.json())
      .then(({ docs, hasNextPage, totalDocs }: PaginatedDocs<Doc>) =>
        setData({
          hasNextPage,
          isLoading: false,
          docs,
          loadedPages: 1,
          totalDocs,
        }),
      )
  }

  useEffect(() => {
    if (slug) initData()
  }, [sortOrder])


  const moveRow = (moveFromIndex: number, moveToIndex: number) => {
    setData(prev => {
      const prevDocs = [...prev.docs]
      const newDocs = [...prev.docs]
      const [movedItem] = newDocs.splice(moveFromIndex, 1)
      newDocs.splice(moveToIndex, 0, movedItem)
      return {
        ...prev,
        docs: newDocs.map((doc, index) => {
          if (prevDocs[index].id !== doc.id) {
            return {
              ...doc,
              edited_to: prevDocs[index].edited_to ?? prevDocs[index].order_number,
            }
          }
          return doc
        }),
      }
    })
  }

  const save = async () => {
    const modifiedDocsData = data.docs
      .filter(doc => typeof doc.edited_to === 'number' && doc.edited_to !== doc.order_number)
      .map(doc => ({
        id: doc.id,
        order_number: doc.edited_to, // Update order_number by edited_to
      }))

    try {

      //call the api to update the order_number
      const updateRequests = modifiedDocsData.map(async doc => {

        const req = await fetch(`/api/${slug}/${doc.id}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_number: doc.order_number,
          }),
        })


        const resp = await req.json()
        return resp
      })

      // Await all update requests
      const results = await Promise.all(updateRequests)

      // Handle success actions here
      setData((prev) => ({ ...prev, isLoading: true }))
      await initData()
      toast.success('success', { position: 'bottom-center' })
    } catch (err) {
      console.log('Error updating documents:', err)
      toast.error('error', { position: 'bottom-center' })
    }
  }

  const loadMore = () => {
    setData(prev => ({ ...prev, isLoading: true }))
    return fetch(`/api/${slug}?${sort}&limit=${limit}&page=${data.loadedPages + 1}`)
      .then(res => res.json())
      .then(({ docs, hasNextPage }: PaginatedDocs<Doc>) =>
        setData(prev => ({
          hasNextPage,
          isLoading: false,
          docs: [...prev.docs, ...docs],
          loadedPages: prev.loadedPages + 1,
          totalDocs: prev.totalDocs,
        })),
      )
  }

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order)
    setData(prev => ({ ...prev, isLoading: true }))
  }

  return (
    <div className="collection-docs-order-content">
      <div className="radio">
        <Radio
          id="asc"
          isSelected={sortOrder === 'asc'}
          onChange={() => handleSortOrderChange('asc')}
          option={{
            label: 'Asc', // Use the correct namespace
            value: 'asc',
          }}
          path="asc"
        />
        <Radio
          id="desc"
          isSelected={sortOrder === 'desc'}
          onChange={() => handleSortOrderChange('desc')}
          option={{
            label: 'Desc', // Use the correct namespace
            value: 'desc',
          }}
          path="desc"
        />
      </div>
      <DraggableSortable
        ids={data.docs.map(doc => String(doc.id))}
        onDragEnd={({ moveFromIndex, moveToIndex }) => moveRow(moveFromIndex, moveToIndex)}
        className="order-list"
      >
        {data.docs.map((doc, index) => (
          <DraggableSortableItem disabled={false} id={String(doc.id)} key={doc.id}>
            {props => {
              return (
                <div
                  style={{ transform: props.transform }} // `transform` comes from `props`
                  ref={props.setNodeRef}
                  className="order-item"
                >
                  <div
                    {...props.attributes}
                    {...props.listeners}
                    role="button"
                    className="order-drag"
                  >
                    <DragHandleIcon />
                  </div>
                  <a href={`${url}/admin/collections/${slug}/${doc.id}`} target="_blank">
                    {doc.order_number}
                    {doc.edited_to && doc.edited_to !== doc.order_number && ` - ${doc.edited_to}`}
                    {' - '}
                    {doc.title as string}
                  </a>
                </div>
              )
            }}
          </DraggableSortableItem>
        ))}
      </DraggableSortable>
      <div className="order-buttons">
        {data.isLoading ? 'Loading...' : `Loaded ${data.docs.length}/${data.totalDocs}`}
        {hasSave && <button onClick={() => save()}>{'Save'}</button>}
        {data.hasNextPage && <button onClick={loadMore}>{'Load More'}</button>}
      </div>
    </div>
  )
}

export const CollectionDocsOrder = () => {
  const { t } = useTranslation() // Use the correct namespace
  type translateType = Parameters<typeof t>[0] // for type checking

  return (
    <div>
      <Dialog trigger={<button style={{ margin: 0, cursor: 'pointer' }}> 
        {/* {t('collectionsDocsOrder:orderDocs' as translateType)} */}
        {'Order Docs'}
        </button>}>
        <DragDrop />
        <ToastContainer />
      </Dialog>
    </div>
  )
}
