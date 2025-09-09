import api from "@/lib/api"
import { Medication } from "@/types/medications/medication.types"

export const getAllMedicine = async () => {
        const res = await api.get(`/medications`)
        return res.data
}

export const getAllMedicationsPrices = async () => {
        const res = await api.get(`/medicationprices`)
        return res.data
}

export const getMedicationPriceById = async (id: string) => {
        const res = await api.get(`/medicationprices/${id}`)
        return res.data
}