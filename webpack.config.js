import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

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
        path: path.resolve(__dirname, 'build', 'sections'),
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                type: 'asset/resource',
                generator: {
                    filename: 'theme.css'
                },
                use: [
                    path.resolve(__dirname, 'webpack', 'section-style-loader.js')
                ]
            },
            {
                test: /\.json$/,
                type: 'asset/resource',
                generator: {
                    filename: ({ filename }) => {
                        const sectionName = path.basename(path.dirname(filename));

                        return `sections/${sectionName}.liquid`
                    }
                },
                use: [
                    path.resolve(__dirname, 'webpack', 'section-schema-loader.js')
                ]
            }
        ],
    }
}