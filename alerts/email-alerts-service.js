import { WindowObject } from "./window-object.js";
import { WINDOW_DURATION_MS } from "../consts.js";

export class EmailAlertsService {

    constructor() {
        this.windowObject = new WindowObject();

        this.windowObject.onNotify.on('notify', this.handleNotification.bind(this));
        this.allowedToSend = true;
    }

    handle() {
        this.windowObject.pushNewError();
        console.log("window: ", this.windowObject.errors)
    }

    handleNotification() {
        console.log('\x1b[36m%s\x1b[0m',`Alert of possible notification.`)

        if (!this.allowedToSend) {
            return;
        }

        this.allowedToSend = false;
        this.notify();

        setTimeout(() => {
            this.allowedToSend = true;
        }, WINDOW_DURATION_MS)
    }

    /**
     * Simulates email notification.
     */
    notify() {
        console.log('\x1b[36m%s\x1b[0m', `Error Alert - Notification by Email sent.`)
    }
}