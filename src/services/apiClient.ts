import { Constants } from "@/utils/constants";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * An API client for making HTTP requests.
 *
 * This class provides a convenient wrapper around the Axios library for making
 * API requests. It offers a set of static methods to perform various HTTP
 * operations such as GET, POST, PUT, and DELETE. Each method requires an
 * `AxiosInstance` as the first parameter, allowing for multiple instances
 * with different configurations or to enable parallel network requests.
 *
 * The `createInstance()` method can be used to generate a new Axios instance
 * with a predefined base URL and headers. The `setAuthToken()` method allows
 * setting an authorization token for a specific instance.
 *
 * @example
 *
 * // Create instances of the ApiClient
 * const apiClient1 = ApiClient.createInstance();
 * const apiClient2 = ApiClient.createInstance();
 *
 * // Get a list of users using apiClient1
 * const users = await ApiClient.get<User[]>(apiClient1, '/users');
 *
 * // Simultaneously create a new product using apiClient2
 * const newProduct = await ApiClient.post<Product>(apiClient2, '/products', { name: 'New Product' });
 *
 * // Update an existing user using apiClient1
 * await ApiClient.put<User>(apiClient1, `/users/${user.id}`, { name: 'Jane Doe' });
 *
 * // Delete a product using apiClient2
 * await ApiClient.delete(apiClient2, `/products/${product.id}`);
 *
 * // Set authorization token for apiClient1
 * ApiClient.setAuthToken(apiClient1, "your_auth_token");
 */
class ApiClient {
  /**
   * Creates a new Axios instance with a predefined configuration.
   *
   * @returns A new Axios instance.
   */
  static createInstance(): AxiosInstance {
    return axios.create({
      baseURL: Constants.api.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Sets the authorization token for a given Axios instance.
   *
   * @param axiosInstance The Axios instance to configure.
   * @param token The authorization token.
   */
  static setAuthToken(axiosInstance: AxiosInstance, token: string): void {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Makes a GET request to the specified URL.
   *
   * @param axiosInstance The Axios instance to use for the request.
   * @param url The URL to request.
   * @param config Optional Axios request configuration.
   * @returns A promise that resolves to the response data.
   */
  static async get<T>(axiosInstance: AxiosInstance, url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.get(url, config);
    return response.data;
  }

  /**
   * Makes a POST request to the specified URL.
   *
   * @param axiosInstance The Axios instance to use for the request.
   * @param url The URL to request.
   * @param data Optional data to send in the request body.
   * @param config Optional Axios request configuration.
   * @returns A promise that resolves to the response data.
   */
  static async post<T>(axiosInstance: AxiosInstance, url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data, config);
    return response.data;
  }

  /**
   * Makes a PUT request to the specified URL.
   *
   * @param axiosInstance The Axios instance to use for the request.
   * @param url The URL to request.
   * @param data Optional data to send in the request body.
   * @param config Optional Axios request configuration.
   * @returns A promise that resolves to the response data.
   */
  static async put<T>(axiosInstance: AxiosInstance, url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.put(url, data, config);
    return response.data;
  }

  /**
   * Makes a DELETE request to the specified URL.
   *
   * @param axiosInstance The Axios instance to use for the request.
   * @param url The URL to request.
   * @param config Optional Axios request configuration.
   * @returns A promise that resolves to the response data.
   */
  static async delete<T>(axiosInstance: AxiosInstance, url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
    return response.data;
  }
}

export default ApiClient;
