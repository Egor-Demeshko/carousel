
export default {
    build: {
        minify: false,
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        rollupOptions: {
            input: {
                index: 'index.html',
                post: 'post.html',
                archive: 'archive.html',
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            }
        }
    }
}
