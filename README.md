- app.js contains a fake app that sometimes it calls the method logError to simulate an error thrown.

Solution #1. This was implemented.

- In this solution it contemplates all the scenarios, since we save the time where the first
    error window appeared. So we can compare the time from the error 1 and error 10.
- Logger, just simulates to be a logger.
- WindowObject receives errors, set timestamp and check: 
    if has 10 errors, in a minute window, it fires `notify` event.
- EmailAlertsService, receives the notifications and see if it has to notify or not.
    - When it notifies via email, set a flag to not send email during 1 minute.
    - All requests to notify during that minutes will be ignored (checks the `allowedToSend` flag)

Solution #2. It misses some cases

- Maybe another easy solution but it doesn't contemplates all the scenarios is to have a Time-Fixed window.
    That is, set a 1 minute time window and see if during that window a count reaches to 10, when we finishes
    we start another window.
    For example: 
    From 12:00:00 to 12:01:00, it will be window #1, and the next window #2 will be: from 12:01:00 to 12:02:00.
    The problem with this solution is we might miss some valid cases. 
    For example:
        If we get 5 errors in the last seconds of this window: 12:00:50 to 12:01:00, 
        and we also get another 5 errors in the first seconds of the second window: 12:01:00 to 12:01:15.
        We should fire a notification by email since we got 10 errors in less than 30 seconds, but with this solution it won't fire.
