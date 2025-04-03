import type { Plugin } from 'payload';
import { deepMerge } from 'payload';
import { extendCollectionsConfig } from './extendCollectionsConfig'
import type { DocsOrderPluginOptions } from './types'
import { translations } from './translation';
import { handleApiUpdateOrderNumber } from './hooks/handleApiUpdateOrderNumber';

type DocsOrderPluginOption = (pluginOptions: DocsOrderPluginOptions) => Plugin

export const docsOrder =
    (pluginOptions: DocsOrderPluginOptions): Plugin =>
        (config) => {
            if (pluginOptions.enabled === false) {
                return config;
            }
            if (config.collections) {
                config.collections = extendCollectionsConfig(config.collections, pluginOptions);
            }

            if (config.endpoints) {
                config.endpoints = [...config.endpoints,
                {
                    path: '/collection-docs-order/update-order-number/:slug',
                    method: 'post',
                    handler: handleApiUpdateOrderNumber
                },
                ]
            }


            config.i18n = {
                ...config.i18n,
            };

            return config;
        }
