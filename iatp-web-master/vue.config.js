module.exports = {
    devServer: {
        port: 8071,
        proxy: {
            '/api': {
                target: 'http://192.168.1.130:8080',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}