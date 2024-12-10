import type {TEntryType} from "&/application/TEntryType.js";
import type {TInstallPackagesWithTypeCommand} from "&/application/commands/TInstallPackagesWithTypeCommand.js";
import type {THandlerPort} from "&/application/ports/THandlerPort.js";
import {EchoHandler} from "../handlers/EchoHandler.js";

export class HandlerAdaptor implements THandlerPort {
    constructor(
       public readonly supportedTypes: TEntryType[],
    ) {}

    async installPackage(command: TInstallPackagesWithTypeCommand): Promise<void> {
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
