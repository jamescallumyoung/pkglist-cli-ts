import JSON5 from 'json5';
import YAML from 'js-yaml';
import {__installationService} from "&/application/installationService.js";
import type {TParsedPkglistJson} from "./TParsedPkglistJson.js";
import {readFileOrStdin} from "./utils/readFileOrStdin.js";
import {decideParsingFormat} from "./utils/decideParsingFormat.js";

export const __yargsExecCommandHandler = (
    service: ReturnType<typeof __installationService>,
) => async (
    args: { file: string, dry: boolean, format: string|undefined },
): Promise<void> => {
    const {file, dry, format } = args;

    if (file === "-" && !format) {
        throw new Error('Invalid arguments. "--format" must be provided when reading from stdin.');
    }

    if (format !== undefined && format !== 'YAML' && format !== 'JSON' && format !== 'JSON5') {
        throw new Error('Invalid arguments. "--format" must be one of "YAML", "JSON", or "JSON5".');
    }

    if (file !== "-" && (!file.endsWith(".pkglist.yaml") && !file.endsWith(".pkglist.json") && !file.endsWith(".pkglist.json5"))) {
        throw new Error('Invalid arguments. Filename must end with ".pkglist.{yaml|json|json5}".');
    }

    const fileContent = await readFileOrStdin(file);
    const parsingFormat = decideParsingFormat(file, format);

    let parsed: TParsedPkglistJson|undefined = undefined;
    switch (parsingFormat) {
        case 'YAML':
            parsed = YAML.load(fileContent) as unknown as TParsedPkglistJson;
            break;
        case 'JSON5':
            parsed = JSON5.parse(fileContent) as unknown as TParsedPkglistJson;
            break;
        default:
            throw new Error('Unable to determine file format.');
    }

    await service({
        config: {
            dryRun: dry,
        },
        entries: parsed.entries,
    });
};
