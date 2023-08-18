import path from 'path';
import fs from 'fs';

export function resolveSectionSettings(settings) {
    return settings.map(setting => {
        const filePath = path.resolve('src', 'settings', `${setting}.json`);
        return JSON.parse(fs.readFileSync(filePath));
    });
}