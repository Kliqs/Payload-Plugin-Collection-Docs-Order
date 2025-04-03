import { CollectionConfig } from 'payload'; // For payload v3
import { DocsOrderPluginOptions } from './types.js';
import { generateOrderNumber } from './hooks/generateOrderNumber';

const extendCollectionConfig = (collection: CollectionConfig) => {

  const defaultSortCollection = getDefaultSortCollection(collection);

  return {
    ...collection,
    admin: {
      ...(collection.admin ?? {}),

      components: {
        ...(collection.admin?.components ?? {}),
        beforeListTable: [
          ...(collection.admin?.components?.beforeListTable ?? []),
          {
            //@ts-ignore
            path: '@extravirgin/payload-plugin-collection-docs-order/client#CollectionDocsOrder',
            clientProps: {
              displayField: collection.admin?.useAsTitle,
              defaultSort: defaultSortCollection, //asc / desc
            },
          },
        ],
      },
    },
    fields: [
      ...collection.fields,
      {
        admin: {
          hidden: true,
        },
        index: true,
        name: 'order_number',
        type: 'number',
        label: {
          en: 'Order Number',
          de: 'Reihenfolge Nummer',
        }
      },
    ],
    hooks: {
      ...(collection.hooks ?? {}),
      beforeValidate: [
        ...(collection.hooks?.beforeValidate ?? []),
        generateOrderNumber, // Automatically set order_number before validation
      ],
      // beforeRead: [
      //   ...(collection.hooks?.beforeRead ?? []),
      //   async ({ doc }) => {
      //     if (!doc.order_number) {
      //       doc.order_number = doc.id; // Assign ID if order_number is null
      //     }
      //     return doc;
      //   },
      // ],
    },
  } as CollectionConfig;
};

export const extendCollectionsConfig = (
  incomingCollections: CollectionConfig[],
  { collections }: DocsOrderPluginOptions,
) => {

  return incomingCollections.map((collectionConfig) => {
    // Check if the current collectionConfig.slug is found in the collections array
    const foundInConfig = collections.includes(collectionConfig.slug);

    if (!foundInConfig) {
      // If not found, return the collection as is
      return collectionConfig;
    }

    // If found, extend the collectionConfig
    return extendCollectionConfig(collectionConfig); // Ensure you use the correct function name
  });
};


/**
 * Determines the default sort direction based on collection configuration
 * @param collection - The collection configuration object
 * @returns "asc" or "desc" based on the defaultSort value
 */
function getDefaultSortCollection(collection: CollectionConfig): "asc" | "desc" {
  
  const DEFAULT_SORT = "asc";

  if (!collection?.defaultSort) {
    return DEFAULT_SORT;
  }

  // Normalize sort value to string and remove all whitespace
  const getSortValue = (input: unknown): string => {
    if (typeof input === "string") {
      return input.replace(/\s+/g, "");
    }
    if (Array.isArray(input) && input.length > 0) {
      return String(input[0]).replace(/\s+/g, "");
    }
    return "";
  };

  const sortValue = getSortValue(collection.defaultSort);

  // Map sort values to directions
  const sortMap: Record<string, "asc" | "desc"> = {
    "order_number": "asc",
    "-order_number": "desc",
  };

  return sortMap[sortValue] || DEFAULT_SORT;
}