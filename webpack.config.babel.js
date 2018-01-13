import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtraTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';


// PATHS
const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
}

//environment setting
const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'production'


//Plugin to set NODE_ENV in 'production'
const productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})


const CSS_OPTIONS = {
    development: ['style-loader', 'css-loader?sourceMap', 'sass-loader'],
    production: ExtraTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
        publicPath: '/dist'
    })
}



const rules = [
    {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    },
    {
        test: /\.(scss|sass)$/, use: isProduction ? CSS_OPTIONS.production : CSS_OPTIONS.development
    },
    {
        test: /\.(jpe?g|svg|png|gif)$/,
        use: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader'
        ]
    },
    {
        test: /\.(html)$/,
        use: {
            loader: 'html-loader',
            options: {
                attrs: ['img:src', 'link:href']
            }
        }
    }
]

const base = {
    entry: PATHS.src,
    output: {
        path: PATHS.build,
        filename: 'index_bundle.js'
    },
    module: {
        rules: rules
    },
    devServer: {
        contentBase: PATHS.build,
        compress: true,
        port: 9000,
        stats: 'errors-only',
        open: true,
        openPage: '',
        historyApiFallback: true,
        hot: true
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    }
}

const developmentConfig = {
    devtool: 'cheap-module-inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtraTextPlugin({
            filename: 'styles.css',
            allChunks: true,
            disable: !isProduction
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}

const productionConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtraTextPlugin({
            filename: 'styles.css',
            allChunks: true,
            disable: !isProduction
        }),
        productionPlugin

    ]
}

export default Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)

