const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#000',
                            '@table-bg': `#27272A`,
                            '@table-header-bg': '#27272A',
                            '@table-header-color': '#A1A1AA',
                            '@table-border-color': '#414144',
                            '@table-row-hover-bg': '#353538',
                            '@text-color': '#fff',
                            '@input-color': '#A1A1AA',
                            '@input-bg': '#27272A',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};