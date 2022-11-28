import { ERROR_THRESHOLD, WINDOW_DURATION_MS } from "../consts.js";
import { EventEmitter } from 'node:events';

export class WindowObject {

    onNotify = new EventEmitter();
    errors = [];

    pushNewError() {
        const error = new Date();

        this.errors.push(error);

        /**
         * we guaranteed here  that we only save 10 errors in the window. 
         */
        if (this.errors.length > ERROR_THRESHOLD) {
            this.errors.shift();
        }

        this.checkIfNotifies();
    }

    checkIfNotifies() {
        if (this.errors.length < ERROR_THRESHOLD) {
            return;
        }

        //we split into variables only for clarity
        const first = this.errors[0];
        const last = this.errors[ERROR_THRESHOLD - 1];
        const diff = last - first;

        console.log("diff: ", diff)

        if (diff <= WINDOW_DURATION_MS) {
            this.onNotify.emit('notify');
        }
    }
}
