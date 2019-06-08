const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

const pathToMainJs = path.join(__dirname, 'src', 'main.js')
// const pathToIndexHtml = path.join(__dirname, 'src', 'index.html')

module.exports = {
    entry: [pathToMainJs],
    resolve: {
        extensions: ['.mjs', '.js', '.svelte'],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        // publicPath: 'public/',
        filename: 'bundle.js',
        chunkFilename: '[name].[id].js',
    },
    module: {
        rules: [
            // {
            //     test: pathToIndexHtml,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //             },
            //         },
            //         {
            //             loader: 'extract-loader',
            //         },
            //         {
            //             loader: 'html-loader',
            //             options: {
            //                 minimize: true,
            //                 attrs: ['img:src', 'link:href'],
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['babel-plugin-emotion'],
                        },
                    },
                    'source-map-loader',
                ],
                enforce: 'pre',
            },
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            hotReload: true,
                        },
                    },
                    'source-map-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    /**
                     * MiniCssExtractPlugin doesn't support HMR.
                     * For developing, use 'style-loader' instead.
                     * */
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: 'style.css',
                    //     },
                    // },
                    // 'extract-loader',
                    {
                        loader: prod
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        options: {
                            hmr: !prod,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !prod,
                        },
                    },
                ],
            },
            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: ['source-map-loader'],
            //     enforce: 'pre',
            // },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[name]_[id].css',
        }),
    ],
    devtool: prod ? '' : 'cheap-module-eval-source-map',
}
