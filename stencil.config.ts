import { Config } from '@stencil/core';
import { sass } from "@stencil/sass";

export const config: Config = {
    outputTargets: [{ type: 'www' }],
    globalScript: 'src/main.ts',
    globalStyle: 'src/styles.scss',
    plugins: [ sass()] ,
    devServer: {
        openBrowser: false
    }
};