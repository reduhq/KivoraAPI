import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
// import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
    { ignores: ['dist/'] },
    { files: ['src/**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    // {
    //     plugins: ['prettier'],
    //     extends: ['plugin:prettier/recommended', 'prettier'],
    //     rules: {
    //         'prettier/prettier': ['error']
    //     }
    // },
    // eslintConfigPrettier
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-empty-object-type': 'off'
        }
    },
    eslintPluginPrettierRecommended
]
