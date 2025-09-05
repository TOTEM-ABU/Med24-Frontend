import api from "@/lib/api";

export async function getAllServices() {
  const res = await api.get(`/services`);
  return res.data;
}
