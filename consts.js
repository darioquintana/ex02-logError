/**
 * Window duration in exercise asked to be 1 minute.
 */
export const WINDOW_DURATION_MS = 1000 * 60 * 1; //ms

/**
 * Error threshold. Exercise asked to be 10 errors.
 */
export const ERROR_THRESHOLD = 10;

/**
 * From 0 to 1.
 * Increasing this rate will generate less errors over time. For example 0.8
 * This was not defined in the exercise.
 */
export const FAKE_ERROR_RATE = 0.2