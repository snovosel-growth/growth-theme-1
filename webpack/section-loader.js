import path from 'path';
import fs from 'fs';

function resolveSectionSettings(settings) {
    return settings.map(setting => {
        const filePath = path.resolve('src', 'settings', `${setting}.json`);
        let blockData;

        if (typeof setting === 'string') {
            blockData = JSON.parse(fs.readFileSync(filePath));
        } else {
            blockData = setting;
        }

        return blockData;
    });
}

function resolveSectionBlocks(blocks) {
    return blocks.map(block => {
        try {
            const filePath = path.resolve('src', 'blocks', `${block}.json`);

            let blockData;

            if (typeof block === 'string') {
                blockData = JSON.parse(fs.readFileSync(filePath));
            } else {
                blockData = block;
            }

            if (blockData.settings) {
                blockData.settings = resolveSectionSettings(blockData.settings);
            }

            return blockData;
        } catch (error) {
            console.log('error resolveSectionBlocks', block);
        }
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
        blocks: resolveSectionBlocks(section.blocks)
    }, null, "\t")}\n{% endschema %}`;
}