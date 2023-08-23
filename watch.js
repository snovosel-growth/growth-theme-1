import fs from 'fs';
import { exec, spawn } from 'child_process';
import chokidar from 'chokidar';
import process from 'process';
import { fileURLToPath } from 'url';
import path from 'path';

const srcDir = './src';
const buildDir = './build';
const scriptPath = './start.sh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executeCommands = () => {
    console.log('Change detected. Rebuilding and starting Shopify theme dev...');

    const startCommand = spawn('bash', [path.join(__dirname, 'start.sh')], { stdio: 'inherit' });

    startCommand.on('close', (code) => {
        console.log('code', code);
    });
};

// Watch for changes in the src directory
// chokidar.watch(srcDir).on('change', executeCommands);

executeCommands();

console.log('Starting up...');
