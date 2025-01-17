import type { Plugin } from 'payload';
import { deepMerge } from 'payload';
import { extendCollectionsConfig } from './extendCollectionsConfig'
import type { DocsOrderPluginOptions } from './types'
import { translations } from './translation';

type DocsOrderPluginOption = (pluginOptions: DocsOrderPluginOptions) => Plugin

export const docsOrder =
    (pluginOptions: DocsOrderPluginOptions): Plugin =>
        (config) => {
            // console.log("hai test config",config);
            if (pluginOptions.enabled === false) {
                return config;
            }
            if (config.collections) {
                config.collections = extendCollectionsConfig(config.collections, pluginOptions);
            }


            config.i18n = {
                ...config.i18n,
            };

            return config;
        }
