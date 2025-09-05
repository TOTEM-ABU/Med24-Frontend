import api from "@/lib/api";

export async function getAllDoctors() {
  const res = await api.get(`/doctors`);
  return res.data;
}
