/**
 * Represents the different sorting options available for a list of announcements.
 */
export enum SortType {
  /**
   * Sort announcements by most recent first.
   */
  MOST_RECENT = "Most Recent",

  /**
   * Sort announcements by oldest first.
   */
  OLDEST = "Oldest",

  /**
   * Sort announcements by title in ascending alphabetical order (A-Z).
   */
  TITLE_A_Z = "Title A to Z",

  /**
   * Sort announcements by title in descending alphabetical order (Z-A).
   */
  TITLE_Z_A = "Title Z to A",
}
