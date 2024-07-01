/**
 * Given a multiline string, return every line that starts with the given prefix.
 */
export const getMatchingLines = (str: string, prefix: string): string[] => {
    return str.split('\n')
        .filter(line => line.startsWith(`${prefix} `))
        .map(line => line.substring(prefix.length+1));
};
