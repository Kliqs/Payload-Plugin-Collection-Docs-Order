export let plugins: string[];
export let overrides: {
    files: string[];
    rules: {
        'no-undef': string;
        camelcase: string;
        '@typescript-eslint/adjacent-overload-signatures': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
         */
        '@typescript-eslint/array-type': (string | {
            default: string;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
         */
        '@typescript-eslint/await-thenable': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
         */
        '@typescript-eslint/consistent-type-assertions': (string | {
            assertionStyle: string;
            objectLiteralTypeAssertions: string;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
         */
        '@typescript-eslint/consistent-type-definitions': string[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md
         */
        '@typescript-eslint/consistent-type-imports': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
         */
        '@typescript-eslint/explicit-function-return-type': (string | {
            allowExpressions: boolean;
            allowTypedFunctionExpressions: boolean;
            allowHigherOrderFunctions: boolean;
            allowConciseArrowFunctionExpressionsStartingWithVoid: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
         */
        '@typescript-eslint/explicit-member-accessibility': (string | {
            accessibility: string;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
         */
        '@typescript-eslint/member-delimiter-style': (string | {
            multiline: {
                delimiter: string;
                requireLast: boolean;
            };
            singleline: {
                delimiter: string;
                requireLast: boolean;
            };
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
         */
        '@typescript-eslint/method-signature-style': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
         */
        '@typescript-eslint/naming-convention': (string | {
            selector: string;
            format: string[];
            leadingUnderscore: string;
            trailingUnderscore: string;
            prefix?: undefined;
            types?: undefined;
            custom?: undefined;
        } | {
            selector: string;
            format: string[];
            prefix: string[];
            leadingUnderscore?: undefined;
            trailingUnderscore?: undefined;
            types?: undefined;
            custom?: undefined;
        } | {
            selector: string;
            types: string[];
            format: string[];
            prefix: string[];
            leadingUnderscore?: undefined;
            trailingUnderscore?: undefined;
            custom?: undefined;
        } | {
            selector: string;
            format: string[];
            custom: {
                regex: string;
                match: boolean;
            };
            leadingUnderscore?: undefined;
            trailingUnderscore?: undefined;
            prefix?: undefined;
            types?: undefined;
        } | {
            selector: string[];
            format: string[];
            leadingUnderscore: string;
            trailingUnderscore: string;
            prefix?: undefined;
            types?: undefined;
            custom?: undefined;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-base-to-string.md
         */
        '@typescript-eslint/no-base-to-string': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
         */
        '@typescript-eslint/no-confusing-non-null-assertion': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
         */
        '@typescript-eslint/no-dynamic-delete': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
         */
        '@typescript-eslint/no-empty-interface': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
         */
        '@typescript-eslint/no-explicit-any': (string | {
            ignoreRestArgs: boolean;
            fixToUnknown: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
         */
        '@typescript-eslint/no-extra-non-null-assertion': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
         */
        '@typescript-eslint/no-extraneous-class': (string | {
            allowConstructorOnly: boolean;
            allowEmpty: boolean;
            allowStaticOnly: boolean;
            allowWithDecorator: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
         */
        '@typescript-eslint/no-floating-promises': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-for-in-array.md
         */
        '@typescript-eslint/no-for-in-array': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implicit-any-catch.md
         */
        '@typescript-eslint/no-implicit-any-catch': (string | {
            allowExplicitAny: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
         */
        '@typescript-eslint/no-implied-eval': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md
         */
        '@typescript-eslint/no-inferrable-types': (string | {
            ignoreParameters: boolean;
            ignoreProperties: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
         */
        '@typescript-eslint/no-invalid-void-type': (string | {
            allowInGenericTypeArguments: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-new.md
         */
        '@typescript-eslint/no-misused-new': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
         */
        '@typescript-eslint/no-misused-promises': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
         */
        '@typescript-eslint/no-namespace': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
         */
        '@typescript-eslint/no-non-null-asserted-optional-chain': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
         */
        '@typescript-eslint/no-non-null-assertion': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
         */
        '@typescript-eslint/no-parameter-properties': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
         */
        '@typescript-eslint/no-require-imports': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md
         */
        '@typescript-eslint/no-this-alias': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
         */
        '@typescript-eslint/no-throw-literal': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
         */
        '@typescript-eslint/no-type-alias': (string | {
            allowAliases: string;
            allowCallbacks: string;
            allowConditionalTypes: string;
            allowConstructors: string;
            allowLiterals: string;
            allowMappedTypes: string;
            allowTupleTypes: string;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
         */
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
         */
        '@typescript-eslint/no-unnecessary-condition': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
         */
        '@typescript-eslint/no-unnecessary-qualifier': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
         */
        '@typescript-eslint/no-unnecessary-type-arguments': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
         */
        '@typescript-eslint/no-unnecessary-type-assertion': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
         */
        '@typescript-eslint/no-unsafe-assignment': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
         */
        '@typescript-eslint/no-unsafe-call': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
         */
        '@typescript-eslint/no-unsafe-member-access': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md
         */
        '@typescript-eslint/no-unsafe-return': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
         */
        '@typescript-eslint/no-var-requires': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-as-const.md
         */
        '@typescript-eslint/prefer-as-const': string;
        /**
         * We don't care about enums having implicit values.
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-enum-initializers.md
         */
        '@typescript-eslint/prefer-enum-initializers': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
         */
        '@typescript-eslint/prefer-for-of': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-includes.md
         */
        '@typescript-eslint/prefer-includes': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.md
         */
        '@typescript-eslint/prefer-literal-enum-member': string;
        /**
         * using ES2015 syntax so this rule can be safetly turned off
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
         */
        '@typescript-eslint/prefer-namespace-keyword': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
         */
        '@typescript-eslint/prefer-nullish-coalescing': string;
        /**
         * only set to warn because there are some cases this behavior doesnt work because
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
         */
        '@typescript-eslint/prefer-optional-chain': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
         */
        '@typescript-eslint/prefer-readonly': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
         */
        '@typescript-eslint/prefer-readonly-parameter-types': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
         */
        '@typescript-eslint/prefer-reduce-type-parameter': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
         */
        '@typescript-eslint/prefer-regexp-exec': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
         */
        '@typescript-eslint/prefer-string-starts-ends-with': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
         */
        '@typescript-eslint/prefer-ts-expect-error': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
         */
        '@typescript-eslint/promise-function-async': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
         */
        '@typescript-eslint/require-array-sort-compare': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
         */
        '@typescript-eslint/restrict-plus-operands': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
         */
        '@typescript-eslint/restrict-template-expressions': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
         */
        '@typescript-eslint/strict-boolean-expressions': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
         */
        '@typescript-eslint/switch-exhaustiveness-check': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md
         */
        '@typescript-eslint/triple-slash-reference': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
         */
        '@typescript-eslint/type-annotation-spacing': (string | {
            before: boolean;
            after: boolean;
            overrides: {
                arrow: {
                    before: boolean;
                    after: boolean;
                };
            };
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
         */
        '@typescript-eslint/typedef': (string | {
            arrayDestructuring: boolean;
            arrowParameter: boolean;
            memberVariableDeclaration: boolean;
            objectDestructuring: boolean;
            parameter: boolean;
            propertyDeclaration: boolean;
            variableDeclaration: boolean;
            variableDeclarationIgnoreFunction: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
         */
        '@typescript-eslint/unbound-method': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
         */
        '@typescript-eslint/unified-signatures': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
         */
        'brace-style': string;
        '@typescript-eslint/brace-style': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
         */
        'comma-spacing': string;
        '@typescript-eslint/comma-spacing': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
         */
        'default-param-last': string;
        '@typescript-eslint/default-param-last': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
         */
        'dot-notation': string;
        '@typescript-eslint/dot-notation': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
         */
        'func-call-spacing': string;
        '@typescript-eslint/func-call-spacing': string;
        /**
         * use prettier instead
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
         */
        indent: string;
        '@typescript-eslint/indent': string;
        /**
         * Allow a mix between the two
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md
         */
        '@typescript-eslint/init-declarations': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
         */
        'keyword-spacing': string;
        '@typescript-eslint/keyword-spacing': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
         */
        'lines-between-class-members': string;
        '@typescript-eslint/lines-between-class-members': (string | {
            exceptAfterSingleLine: boolean;
            exceptAfterOverload: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
         */
        'no-array-constructor': string;
        '@typescript-eslint/no-array-constructor': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
         */
        'no-dupe-class-members': string;
        '@typescript-eslint/no-dupe-class-members': string;
        /**
         * Use prettier
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
         */
        'no-extra-parens': string;
        '@typescript-eslint/no-extra-parens': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
         */
        'no-extra-semi': string;
        '@typescript-eslint/no-extra-semi': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
         */
        'no-invalid-this': string;
        '@typescript-eslint/no-invalid-this': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
         */
        'no-loss-of-precision': string;
        '@typescript-eslint/no-loss-of-precision': string;
        /**
         * https://eslint.org/docs/rules/no-magic-numbers
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
         */
        'no-magic-numbers': string;
        '@typescript-eslint/no-magic-numbers': (string | {
            ignoreArrayIndexes: boolean;
            ignoreDefaultValues: boolean;
            enforceConst: boolean;
            ignoreEnums: boolean;
            ignoreNumericLiteralTypes: boolean;
            ignoreReadonlyClassProperties: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
         */
        'no-redeclare': string;
        '@typescript-eslint/no-redeclare': (string | {
            builtinGlobals: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
         */
        'no-shadow': string;
        '@typescript-eslint/no-shadow': (string | {
            ignoreTypeValueShadow: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
         */
        'no-unused-expressions': string;
        '@typescript-eslint/no-unused-expressions': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
         */
        'no-unused-vars': string;
        '@typescript-eslint/no-unused-vars': (string | {
            ignoreRestSiblings: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
         */
        'no-use-before-define': string;
        '@typescript-eslint/no-use-before-define': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
         */
        'no-useless-constructor': string;
        '@typescript-eslint/no-useless-constructor': string;
        /**
         * https://eslint.org/docs/rules/quotes
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
         */
        quotes: string;
        '@typescript-eslint/quotes': (string | {
            avoidEscape: boolean;
            allowTemplateLiterals: boolean;
        })[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
         */
        '@typescript-eslint/require-await': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
         */
        '@typescript-eslint/return-await': string;
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
         */
        semi: string;
        '@typescript-eslint/semi': string[];
        /**
         * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
         */
        'space-before-function-paren': string;
        '@typescript-eslint/space-before-function-paren': (string | {
            anonymous: string;
            named: string;
            asyncArrow: string;
        })[];
    };
}[];
