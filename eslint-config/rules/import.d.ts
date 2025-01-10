export declare namespace env {
    let es6: boolean;
}
declare let _extends: string[];
export { _extends as extends };
export declare let plugins: string[];
export declare let settings: {
    'import/parsers': {
        '@typescript-eslint/parser': string[];
    };
};
export declare let rules: {
    /**
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
     */
    'import/no-unresolved': (string | {
        commonjs: boolean;
        caseSensitive: boolean;
    })[];
    'import/no-default-export': string;
    'import/prefer-default-export': string;
    'import/extensions': (string | {
        ts: string;
        tsx: string;
        js: string;
        jsx: string;
    })[];
    'import/no-extraneous-dependencies': string;
    /**
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md#when-not-to-use-it
     */
    'import/named': string;
    'import/no-relative-packages': string;
    'import/no-import-module-exports': string;
    'import/no-cycle': string;
};
