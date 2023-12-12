
export default {
    build: {
        minify: true,
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        rollupOptions: {
            input: {
                index: 'index.html',
                post: 'post.html',
                archive: 'archive.html',
                workers: 'workers.html'
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            }
        }
    }
}
