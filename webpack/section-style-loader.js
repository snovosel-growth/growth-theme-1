import fs from 'fs';
import path from 'path';

export default function () {
    const tailwindFilePath = path.join(this.context, 'index.tw.css');
    const tailwindFileSource = fs.readFileSync(tailwindFilePath);

    return tailwindFileSource;
}