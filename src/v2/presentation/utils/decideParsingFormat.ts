export const decideParsingFormat = (file: string, readFormat: string | undefined) => {
    if (readFormat?.toUpperCase() === 'YAML') {
        return "YAML";
    } else if (readFormat?.toUpperCase() === 'JSON') {
        return "JSON5";
    } else if (readFormat?.toUpperCase() === 'JSON5') {
        return "JSON5";
    } else if (!readFormat && file.endsWith('.pkglist.yaml')) {
        return "YAML";
    } else if (!readFormat && file.endsWith('.pkglist.json')) {
        return "JSON5";
    } else if (!readFormat && file.endsWith('.pkglist.json5')) {
        return "JSON5";
    } else {
        return "UNKNOWN";
    }
}
