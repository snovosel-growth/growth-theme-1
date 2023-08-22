import fs from 'fs';
import path from 'path';

export default function (source) {
    const tailwindFilePath = path.join(this.context, 'index.tw.css');
    fs.unlinkSync(tailwindFilePath);
    return source;
}