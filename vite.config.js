
export default {
    build: {
        minify: false,
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        rollupOptions: {
            input: {
                post: 'post.html',
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            }
        }
    }
}
