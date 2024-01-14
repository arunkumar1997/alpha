import axios from "axios";
import { LoginErrorResponse, LoginResponse } from "@/types";
const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export default async function signup({
  username,
  password,
  flat_number,
}: {
  username: string;
  password: string;
  flat_number: string;
}): Promise<any> {
  try {
    const { data } = await axios.post(`${baseURL}/v1/create_user`, {
      username,
      password,
      flat_number,
    });
    if (data?.message) {
      return {
        statusCode: 200,
        message: data.message,
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
