
import { FAKE_ERROR_RATE } from "./consts.js";

/**
 * Simulates an app that throws errors from time to time.
 * To simplify, app constructor receives services created with a new clause. In a real app, 
 * those parameters should be provided with a DI framework
 */
export class App {
    constructor(
        logger,
        emailAlertService
    ) {
        this.logger = logger;
        this.emailAlertService = emailAlertService;
    }

    start() {
        //It simulates a real app in an infinity loop, and sometimes it call to logError() 
        //to pretend an error was generated
        setInterval(() => {
            const RANDOM = Math.random();
            const IS_ERROR = RANDOM > FAKE_ERROR_RATE;
            const FAKE_ERROR_MESSAGE = `An error has ocurred. Code ${500 + Number(RANDOM.toFixed(2))}`;
            if (IS_ERROR) this.logError(FAKE_ERROR_MESSAGE)
        }, 1000)
    }


    logError(message) {
        this.logger.log(message);
        this.emailAlertService.handle();
    }

}

