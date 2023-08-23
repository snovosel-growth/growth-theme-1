import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.unlinkSync(path.resolve(__dirname, 'build', 'assets', 'theme.css'));

fs.readdirSync(path.resolve(__dirname, 'build', 'assets', 'css')).map(fileName => (
    path.resolve(__dirname, 'build', 'assets', 'css', fileName)
)).map(cssSourcePath => {
    const cssSource = fs.readFileSync(cssSourcePath);

    fs.appendFileSync(
        path.resolve(__dirname, 'build', 'assets', 'theme.css'),
        `\n\n${cssSource}`
    );
});

fs.rmSync(path.resolve(__dirname, 'build', 'assets', 'css'), { recursive: true, force: true });