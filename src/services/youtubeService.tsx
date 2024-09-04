import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../types/ErrorResponse";
import { YoutubeApiResponse } from "../types/YoutubeApiResponse";

export const fetchMp3Link = async (youtubeID: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_RAPID_API_KEY;

  if (!apiKey) {
    throw {
      message: "API key is missing. Please contact support.",
    } as ErrorResponse;
  }

  const options = {
    method: "GET",
    url: "/api/youtube-mp3/dl",
    params: {
      id: youtubeID,
    },
  };

  try {
    const response = await axios.request<YoutubeApiResponse>(options);
    if (response.data && response.data.link) {
      return response.data.link;
    } else {
      throw {
        message: response.data.message || "Failed to retrieve the MP3 link.",
      } as ErrorResponse;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<YoutubeApiResponse>;
      if (axiosError.response) {
        throw {
          message:
            axiosError.response.data.message ||
            "An error occurred with the request.",
          code: axiosError.response.status.toString(),
        } as ErrorResponse;
      } else if (axiosError.request) {
        throw {
          message:
            "Network error occurred. Please check your internet connection and try again.",
        } as ErrorResponse;
      } else {
        throw {
          message: axiosError.message || "An unknown error occurred.",
        } as ErrorResponse;
      }
    } else {
      throw {
        message: "An unexpected error occurred.",
      } as ErrorResponse;
    }
  }
};
