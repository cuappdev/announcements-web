/**
 * Props for components that utilize search parameters.
 */
export interface SearchParamsProp {
  /**
   * An object containing search parameters.
   * The keys are the parameter names, and the values are the corresponding parameter values.
   * Values can be strings, arrays of strings, or undefined.
   */
  searchParams: { [key: string]: string | string[] | undefined };
}
