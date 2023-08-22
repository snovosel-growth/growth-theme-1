// this is a temporary scaffolding solution that we are using to construct
// the folder structure in the build dir to match the expected shopify structure

import fs from 'fs';
import fs_Extra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyAndMoveDir(dirName) {
    const destinationDir = path.join(__dirname, 'build', dirName);
    const sourceDir = path.join(__dirname, 'src', dirName);

    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }

    fs_Extra.copy(sourceDir, destinationDir, function (error) {
        if (error) {
            throw error;
        }
    });
}

copyAndMoveDir('assets');
copyAndMoveDir('config');
copyAndMoveDir('layout');
copyAndMoveDir('locales');
copyAndMoveDir('snippets');
copyAndMoveDir('templates');


