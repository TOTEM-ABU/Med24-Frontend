import api from "@/lib/api"

export const getAllMedicineCategories = async () => {
        const res = await api.get(`/medicationcategories`)
        return res.data
}