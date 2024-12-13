import Login from "@/components/login/login";
import { SearchParamsProp } from "@/models/props/searchParamsProps";
import ApiClient from "@/services/apiClient";
import { redirect } from "next/navigation";

export default async function LoginPage(props: SearchParamsProp) {
  const searchParams = await props.searchParams;
  const authCode = searchParams.code;
  const apiClient = ApiClient.createInstance();

  if (!authCode) {
    const loginUrl = await ApiClient.get<string>(apiClient, "/auth/url");
    redirect(loginUrl);
  }

  const idToken = await ApiClient.post<string>(apiClient, "/auth/token", {}, { params: { code: authCode } });
  return <Login idToken={idToken} />;
}
