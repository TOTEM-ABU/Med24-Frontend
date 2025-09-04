import api from "@/lib/api";

export async function getAllProducts () {
        const res = await api.get(`/medications`)
        return res.data
}