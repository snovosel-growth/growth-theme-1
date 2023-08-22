import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, './build');

const childProcess = spawn('shopify', ['theme', 'dev'], {
    cwd: targetDir
});

childProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
});

childProcess.stderr.on('data', (data) => {
    console.error(`STDERR: ${data}`);
});

childProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
});
