/* eslint-disable import/no-commonjs */
/* eslint-env node */

const path = require('path')

module.exports = {
    title: 'Progressive Web Scaffold',
    components: '../app/components/**/*.jsx',
    serverHost: '0.0.0.0',
    serverPort: 4000,
    skipComponentsWithoutExample: true,
    updateWebpackConfig(webpackConfig) {
        // Supply our own renderer for styleguide
        webpackConfig.resolve.alias['rsg-components/Layout/Renderer'] = path.join(__dirname, '../styleguide/renderer')

        // Loaders
        webpackConfig.module.loaders.push(
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                },
            },
            // Loader for styleguide & project styles
            {
                test: /\.scss$/,
                loader: 'style!css!sass',
                include: [
                    /node_modules\/progressive-web-sdk/,
                    /styleguide/
                ]
            },
            // Loader for plain CSS
            {
                test: /\.css$/,
                loader: 'style!css?modules&importLoaders=1',
                include: /styleguide/,
            },
            // Loader for SVGs
            {
                test: /\.svg$/,
                loader: 'text',
                include: [
                    /progressive-web-sdk/,
                    /app/
                ]
            }
        )

        return webpackConfig
    },
}