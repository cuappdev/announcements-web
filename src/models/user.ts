/**
 * Represents a user in the application.
 */
export interface User {
  /**
   * The ID of the user.
   */
  id: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's ID token.
   */
  idToken: string;

  /**
   * The URL of the user's profile image.
   */
  imageUrl: string;

  /**
   * A boolean value indicating whether the user is an administrator.
   */
  isAdmin: boolean;

  /**
   * The user's full name.
   */
  name: string;
}
