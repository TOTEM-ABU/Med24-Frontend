import api from "@/lib/api";

export async function getAllServices() {
  const res = await api.get(`/services`);
  return res.data;
}

export async function getServiceById(id: string) {
  const res = await api.get(`/services/${id}`);
  return res.data;
}

export async function getClinicsByIds(ids: string[]) {
  const res = await api.post(`/clinics`, { ids }); // Massivni POST so‘rovi orqali yuboramiz
  return res.data;
}
