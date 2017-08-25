module.exports = function(config) {
    config.set({
        files: [
            // Each file acts as entry point for the webpack configuration
            { pattern: 'test/*.test.js', watched: false },
            { pattern: 'test/**/*.test.js', watched: false }
        ],

        preprocessors: {
            // Add webpack as preprocessor
            'test/*.test.js': ['webpack'],
            'test/**/*.test.js': ['webpack']
        },

        webpack: {
            // Karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies
        },

        webpackMiddleware: {
            stats: 'errors-only'
        },

        // Which frameworks to use for testing
        frameworks: ['jasmine'],

        // Reporting strategy
        reporters: ['progress'],

        // Which browser to use for running tests
        browsers: ['Chrome']
    });
};