const purgecss = require('@fullhuman/postcss-purgecss')({

    content: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
        './public/index.html',
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    whitelistPatterns: [/h-[0-9]+/g]
})

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production'
            ? [purgecss]
            : []
    ]
}