
export default {
    build: {
        minify: false,
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            }
        }
    }
}
