import api from "@/lib/api";

export async function getAllClinicServices() {
  const res = await api.get(`/clinicservices`);
  return res.data;
}
