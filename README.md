# Payload Plugin: Drag-to-Order Collections

A Payload CMS plugin that allows you to drag and reorder your collections directly in the Payload admin panel.

This plugin adds an easy-to-use feature for managing the order of collections. When you drag and drop items within the collection, it automatically updates an `Order Number` field for each collection, ensuring that the order is consistently reflected across the admin panel.

To use this plugin, you’ll need:

* Basic knowledge of Payload CMS concepts.
* Some JavaScript/TypeScript experience.

## Background

This plugin integrates seamlessly with Payload CMS, providing a drag-and-drop interface to reorder collections. For more details on integrating plugins with Payload, check out the [plugin overview page](https://payloadcms.com/docs/plugins/overview).

### How to install the plugin

To install the drag-to-order plugin, simply add it to the `plugins` array in your `payload.config.ts`.

```ts
import { docsOrder } from 'vs-payload-plugin-collection-docs-order';

export const config = buildConfig({
  plugins: [
    docsOrder({
      collections: ['collection-slug1', 'collection-slug2'],
      enabled: true,
    }),
  ]
});
