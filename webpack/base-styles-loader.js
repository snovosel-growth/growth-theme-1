export default function (source) {
    const fileName = this.resourcePath.split('/').pop();

    if (fileName === 'base.css') {
        return source;
    }
}