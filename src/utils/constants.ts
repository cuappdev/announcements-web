/**
 * Text to display when there are no announcements to show.
 * This message is used in the UI to inform the user that the
 * announcements section is currently empty.
 */
export const NO_ANNOUNCEMENTS_MESSAGE = "There's nothing to show here.";

/**
 * Base URL for the application.
 * This is used to construct API endpoints and other URLs.
 * It defaults to "http://localhost:8000" for development purposes.
 * In production, this value is typically set via an environment variable.
 */
export const BASE_URL = process.env.BASE_URL || "http://localhost:8000";
