import { App } from "./app.js";
import { EmailAlertsService } from "./alerts/index.js";
import { Logger } from "./logger.js"

async function Main() {
    const app = new App(
        new Logger(),
        new EmailAlertsService(),

    );
    await app.start();
}

Main();