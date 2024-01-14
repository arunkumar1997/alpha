import axios from "axios";
import { LoginErrorResponse, LoginResponse } from "@/types";
const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export default async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<LoginResponse | LoginErrorResponse> {
  try {
    const { data } = await axios.post(`${baseURL}/v1/login`, {
      username,
      password,
    });
    if (data?.access_token) {
      return {
        statusCode: 200,
        access_token: data.access_token,
      };
    } else {
      return {
        statusCode: 500,
        detail: "Something went wrong. Please try again",
      };
    }
  } catch (error: any) {
    const err =
      error?.response.data.detail || "Something went wrong. Please try again";
    const errCode = error.response.status || 500;

    return {
      statusCode: errCode,
      detail: err,
    };
  }
}
