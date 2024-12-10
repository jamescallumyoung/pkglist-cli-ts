#!/usr/bin/env node

import type {TEntryTypePort} from "&/application/ports/TEntryTypePort.js";
import {EntryTypeAdaptor} from "&/infrastructure/adaptors/EntryTypeAdaptor.js";
import {installationService} from "&/application/installationService.js";

const port: TEntryTypePort = new EntryTypeAdaptor([ 'echo', 'apt', 'apt-repo', 'snap', 'snap-classic', 'flatpak' ]);

const service = installationService(port);

await service({
    config: {
        dryRun: false,
    },
    entries: [
        {
            type: 'apt',
            package: 'ugrep',
        },
        {
            type: 'apt',
            package: 'bat',
        },
        {
            type: 'echo',
            package: 'bar',
        },
        {
            type: 'echo',
            package: 'foo',
        },
        {
            type: 'apt-repo',
            package: 'apt-repo-a',
        },
        {
            type: 'apt-repo',
            package: 'apt-repo-b',
        },
        {
            type: 'snap',
            package: 'crackle',
        },
        {
            type: 'snap',
            package: 'pop',
        },
        {
            type: 'snap-classic',
            package: 'crackle-classic',
        },
        {
            type: 'snap-classic',
            package: 'pop-classic',
        },
        {
            type: 'flatpak',
            package: 'https://flathub.org/repo/appstream/fi.skyjake.Lagrange.flatpakref',
        },
        {
            type: 'flatpak',
            package: 'https://flathub.org/repo/appstream/io.github.janbar.noson.flatpakref',
        },
    ],
});
