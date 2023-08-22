import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import WebpackShellPluginNext from 'webpack-shell-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allSections = fs.readdirSync(path.resolve('src', 'sections')).map(sectionName => {
    const sectionDir = path.resolve(__dirname, 'src', 'sections', sectionName);
    const sectionFiles = fs.readdirSync(sectionDir).filter(file => !file.includes('.liquid'));

    return sectionFiles.map(file => `${sectionDir}/${file}`);
}).flat();

export default {
    entry: [...allSections],
    output: {
        path: path.resolve(__dirname, 'build'),
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/theme.css'
                },
                use: [
                    path.resolve(__dirname, 'webpack', 'section-style-cleanup.js'),
                    path.resolve(__dirname, 'webpack', 'section-style-loader.js'),
                    path.resolve(__dirname, 'webpack', 'tailwindcss-loader.js'),
                    'postcss-loader'
                ]
            },
            {
                test: /\.json$/,
                type: 'asset/resource',
                generator: {
                    filename: ({ filename }) => {
                        const sectionName = path.basename(path.dirname(filename));

                        return `sections/${sectionName}.liquid`;
                    }
                },
                use: [
                    path.resolve(__dirname, 'webpack', 'section-schema-loader.js')
                ]
            }
        ],
    },

    plugins: [
        new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: [
                    () => fs.unlinkSync(path.resolve(__dirname, 'build', 'main.js'))
                ],
                blocking: false,
            }
        })
    ]
}