import path from 'path';
import fs from 'fs';

function resolveSectionSettings(settings) {
    return settings.map(setting => {
        const filePath = path.resolve('src', 'settings', `${setting}.json`);
        return JSON.parse(fs.readFileSync(filePath));
    });
}

export default function (source) {
    const section = JSON.parse(source);

    return `{% schema %}\n${JSON.stringify({
        name: section.name,
        class: section.class,
        tag: section.tag,
        disabled_on: section.disabled_on,
        settings: resolveSectionSettings(section.settings),
        blocks: section.blocks
    }, null, "\t")}\n{% endschema %}`;
}