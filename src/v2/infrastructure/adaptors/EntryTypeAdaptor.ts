import type {TEntryType} from "&/application/TEntryType.js";
import type {TInstallPackagesWithEntryTypeCommand} from "&/application/commands/TInstallPackagesWithEntryTypeCommand.js";
import type {TEntryTypePort} from "&/application/ports/TEntryTypePort.js";
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
                EchoHandler.handleInstallCommand(command);
                break;
            default:
                throw new Error(`Internal Error: Handler not found for type: ${command.type}`);
        }
    }
}
