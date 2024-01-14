import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getLeakageReports(token: string): Promise<any> {
  try {
    const { data } = await axios.get(`${baseURL}/v1/list_leakage_reports`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      return {
        statusCode: 200,
        data,
      };
    } else {
      return {
        statusCode: 500,
        detail: "Something went wrong. Please try again",
      };
    }
  } catch (error: any) {
    const err =
      error?.response?.data?.detail || "Something went wrong. Please try again";
    const errCode = error?.response?.status || 500;

    return {
      statusCode: errCode,
      detail: err,
    };
  }
}
export async function createLeakageReport({
  token,
  room_type,
  flat_number,
  description,
}: any): Promise<any> {
  try {
    const { data } = await axios.post(
      `${baseURL}/v1/create_leakage_report?room_type=${room_type}&flat_number=${flat_number}&description=&${description}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (data) {
      return {
        statusCode: 200,
        data,
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
