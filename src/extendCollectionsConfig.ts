import { CollectionConfig } from 'payload'; // For payload v3
import { DocsOrderPluginOptions } from './types.js';
import { generateOrderNumber } from './hooks/generateOrderNumber';

const extendCollectionConfig = (collection: CollectionConfig) => {

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
            path: 'vs-payload-plugin-collection-docs-order/client#CollectionDocsOrder',
            clientProps: {
              displayField: 'title',
            },
          }, 
        ],
      },
    },
    fields: [
      ...collection.fields,
      {
        admin: {
          hidden: false,
          position: 'sidebar',
        },
        index: true,
        name: 'order_number',
        type: 'number',
        label:{
          en: 'Order Number',
          de: 'Reihenfolge Nummer',
        }
      },
    ],
    hooks: {
      ...(collection.hooks ?? {}),
      beforeValidate: [...(collection.hooks?.beforeValidate ?? []), 
      generateOrderNumber // automatically increment the order_number field
    ],
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
