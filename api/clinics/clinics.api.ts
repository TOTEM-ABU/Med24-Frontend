import api from "@/lib/api";

export async function getAllClinics () {
        const res = await api.get(`/clinics`)
        return res.data
}