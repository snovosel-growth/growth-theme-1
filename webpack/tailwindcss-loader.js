import { exec } from 'child_process';
import util from 'util';

const asyncExec = util.promisify(exec);

export default function (source) {
    return buildTailwindCss(this.resourcePath, source);
}

async function buildTailwindCss(pathName, source) {
    let originalPathName = pathName;
    const basePath = originalPathName.split('/');

    basePath.pop();

    await asyncExec(`npx tailwindcss -i ${pathName} -o ${basePath.join('/')}/index.tw.css`);

    return source;
}