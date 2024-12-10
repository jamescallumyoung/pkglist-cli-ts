import chalk from "chalk";
import {groupBy} from "lodash-es";
import {getNextEntryType} from "&/application/utils/getNextEntryType.js";
import type {TEntryTypePort} from "./ports/TEntryTypePort.js";
import type {TPkglistEntry} from "../types.js";

export const __installationService =
    (entryTypePort: TEntryTypePort) =>
    async (f: { config: { dryRun: boolean }, entries: TPkglistEntry[] }) => {

        // Group the entries together by their EntryType. Each group is processed together.
        // The underlying handlers (AptHandler, SnapHandler, etc.) determine how to process the groups.
        // (Some handlers can install all of a group's packages at once, whilst others must invoke their install command once per package.)
        const entriesGroupedByEntryType = groupBy(f.entries, 'type');

        // EntryTypes must be processed in a certain order as some depend on others (such as apt depending on apt-repo)
        let currentEntryType = getNextEntryType(undefined);

        while (currentEntryType !== undefined) {
            if (entriesGroupedByEntryType[currentEntryType] !== undefined) {
                console.debug(chalk.yellow(`[installationService] handling: "${currentEntryType}"`));

                const entries = entriesGroupedByEntryType[currentEntryType];
                const packages = entries.map(entry => entry.package);

                await entryTypePort.installPackagesWithEntryType({
                    config: {
                        dryRun: f.config.dryRun,
                    },
                    type: currentEntryType,
                    packages,
                });
            }

            currentEntryType = getNextEntryType(currentEntryType);
        }
    }
