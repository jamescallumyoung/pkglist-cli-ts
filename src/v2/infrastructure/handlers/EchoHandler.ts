import type {TInstallPackagesWithTypeCommand} from "&/application/commands/TInstallPackagesWithTypeCommand.js";

export class EchoHandler {
    static handleInstallCommand(command: TInstallPackagesWithTypeCommand): void {
        for (const p of command.packages) {
            console.log(`[echo] ${p}`);
        }
    }
}
