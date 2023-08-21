import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allSections = fs.readdirSync('./src/sections').map(fileName => path.resolve(__dirname, 'src', 'sections', fileName));

export default {
    entry: [...allSections],
    output: {
        path: path.resolve(__dirname, 'build'),
    },

    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },

    module: {
        rules: [
            {
                test: /\.json$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name].liquid'
                },
                use: [
                    path.resolve(__dirname, 'webpack', 'section-loader.js')
                ]
            },
        ],
    }
}