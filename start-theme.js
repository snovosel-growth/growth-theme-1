import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, './build');

const childProcess = spawn('shopify', ['theme', 'dev'], {
    cwd: targetDir
});

childProcess.stdout.on('data', (data) => {
    // const linkRegex = /\[2\] (https:\/\/[^\n]+)/;
    // const linkMatch = dataString.match(linkRegex);

    // let link;

    // if ( linkMatch ) {
    //     let link = linkMatch[1];
    // }



    const dataString = data.toString();

    console.log('dataString', dataString);

    // 

    // if (match) {
    //     const link = match[1];
    //     open(link);
    // }
});

childProcess.stderr.on('data', (data) => {
    console.error(`STDERR: ${data}`);
});

childProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
});
