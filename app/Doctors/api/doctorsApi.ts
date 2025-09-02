import axios from "axios";
import { ApiResponse, Doctor } from "../types";

const API_URL = "http://45.76.94.219:3132/api/doctors";

const getHeaders = (token?: string) => ({
  Authorization: token ? `Bearer ${token}` : "",
  "Content-Type": "application/json",
});

// Barcha doctors
export const getDoctors = async (
  params?: {
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "experience_years" | "rating";
    sort?: "asc" | "desc";
    clinicsId?: string;
    specialtiesId?: string;
  },
  token?: string
): Promise<ApiResponse<Doctor>> => {
  const response = await axios.get<ApiResponse<Doctor>>(API_URL, {
    params,
    headers: getHeaders(token),
  });
  return response.data;
};

// Bitta doctor
export const getDoctorById = async (
  id: string,
  token?: string
): Promise<Doctor> => {
  const response = await axios.get<Doctor>(`${API_URL}/${id}`, {
    headers: getHeaders(token),
  });
  return response.data;
};
