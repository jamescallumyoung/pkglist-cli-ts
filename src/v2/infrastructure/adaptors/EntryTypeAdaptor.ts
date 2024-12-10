import type {TEntryType} from "&/application/TEntryType.js";
import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import type {TEntryTypePort} from "&/application/ports/TEntryTypePort.js";
import {AptHandler} from "&/infrastructure/handlers/AptHandler.js";
import {EchoHandler} from "../handlers/EchoHandler.js";

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
            case "echo2": // TODO remove
            case "echo3":
                EchoHandler.handleInstallCommand(command);
                break;
            case 'apt':
                await AptHandler.installAptPackages(command);
                break;
            case 'apt-repo':
                await AptHandler.installAptRepository(command);
                break;
            default:
                throw new Error(`Internal Error: Handler not found for type: ${command.type}`);
        }
    }
}
