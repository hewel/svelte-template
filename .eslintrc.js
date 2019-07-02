module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
    plugins: ['prettier', 'html', 'svelte3'],
    overrides: [
        {
            files: '*.svelte',
            processor: 'svelte3/svelte3',
        },
    ],
    rules: {
        semi: 'off',
        'linebreak-style': ['error', 'unix'],
    },
}
