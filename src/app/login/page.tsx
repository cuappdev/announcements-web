import { SearchParamsProp } from "@/models/searchParamsProps";
import ApiClient from "@/services/apiClient";
import { redirect } from "next/navigation";
import Login from "@/components/login/login";

export default async function LoginPage({ searchParams }: SearchParamsProp) {
  const authCode = searchParams.code;
  const apiClient = ApiClient.createInstance();

  if (!authCode) {
    const loginUrl = await ApiClient.get<string>(apiClient, "/auth/url");
    redirect(loginUrl);
  }

  const idToken = await ApiClient.post<string>(apiClient, "/auth/token", {}, { params: { code: authCode } });
  return <Login idToken={idToken} />;
}
