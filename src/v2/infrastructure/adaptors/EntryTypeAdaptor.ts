import type {TEntryType} from "&/application/TEntryType.js";
import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import type {TEntryTypePort} from "&/application/ports/TEntryTypePort.js";
import {AptHandler} from "../handlers/AptHandler.js";
import {EchoHandler} from "../handlers/EchoHandler.js";
import {FlatpakHandler} from "../handlers/FlatpakHandler.js";
import {SnapHandler} from "../handlers/SnapHandler.js";

export class EntryTypeAdaptor implements TEntryTypePort {
    constructor(
       public readonly supportedTypes: TEntryType[],
    ) {}

    async installPackagesWithEntryType(command: TInstallPackagesWithEntryTypeCommand): Promise<void> {
        if (!this.supportedTypes.includes(command.type)) {
            throw new Error(`Cannot process installation command for unsupported type: ${command.type}`);
        }

        switch (command.type) {
            case "echo":
                EchoHandler.handleInstallCommand(command);
                break;
            case 'apt':
                await AptHandler.installAptPackages(command);
                break;
            case 'apt-repo':
                await AptHandler.installAptRepository(command);
                break;
            case 'snap':
                await SnapHandler.installSnapPackages(command);
                break;
            case 'snap-classic':
                await SnapHandler.installSnapClassicPackages(command);
                break;
            case 'flatpak':
                await FlatpakHandler.installFlatpakPackages(command);
                break;
            default:
                throw new Error(`Internal Error: Handler not found for type: ${command.type}`);
        }
    }
}
