import JSON5 from 'json5';
import YAML from 'js-yaml';
import {__installationService} from "&/application/installationService.js";
import type {TParsedPkglistJson} from "&/presentation/TParsedPkglistJson.js";
import {readFileOrStdin} from "&/presentation/utils/readFileOrStdin.js";

export const __yargsExecCommandHandler = (
    service: ReturnType<typeof __installationService>,
) => async (
    args: { file: string, dry: boolean },
): Promise<void> => {
    const {file, dry} = args;

    const fileContent = await readFileOrStdin(file);

    let parsed: TParsedPkglistJson|undefined = undefined;
    try {
        if (file.endsWith('.pkglist.json') || file.endsWith('.pkglist.json5')) {
            parsed = JSON5.parse(fileContent) as unknown as TParsedPkglistJson;
        }
        else if (file.endsWith('.pkglist.yaml')) {
            parsed = YAML.load(fileContent) as unknown as TParsedPkglistJson;
        }
    }
    catch (err) {
        console.error(JSON.stringify(err, null, 2));
        throw new Error('Error parsing pkglist');
    }

    if (parsed === undefined) {
        throw new Error('Bad file extension. Must be one of ".pkglist.json", ".pkglist.json5", or ".pkglist.yaml"');
    }

    await service({
        config: {
            dryRun: dry,
        },
        entries: parsed.entries,
    });
};
