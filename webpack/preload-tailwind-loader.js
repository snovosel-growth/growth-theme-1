export default function (source) {
    const tailwindUtilities = '@tailwind utilities; \n';
    const updatedSource = tailwindUtilities + source;
    return updatedSource;
}