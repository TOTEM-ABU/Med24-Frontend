import api from "@/lib/api";

export async function getAllRegions() {
  const res = await api.get(`/region`);
  return res.data;
}
