const {defineConfig} = require('@vue/cli-service');
// 包大小详情
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = defineConfig({
    publicPath: "./",
    // 生成文件的目录名称（要和baseUrl的生产环境路径一致）
    outputDir: process.env.NODE_ENV === 'production' ? "dist" : process.env.NODE_ENV,
    //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    // assetsDir: "assets",
    // lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: false,
    /**
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
     * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
     * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
     * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
     * */
    productionSourceMap: false,

    transpileDependencies: false,

    configureWebpack: config => {
        // 关于打包后资源各部分占比的配置相关
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new BundleAnalyzerPlugin()
            );
        }
        // 去除console.log打印以及注释

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production';
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据进行压缩
                    deleteOriginalAssets: false //是否删除原文件
                })]
            };
        }
    },

});
