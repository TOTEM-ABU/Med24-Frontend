import { getAllMedicationsPrices, getMedicationPriceById } from "@/api/medicine/medicine.api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllMedicationPrices = () => {
        return useQuery({
                queryKey: ['prices'],
                queryFn: getAllMedicationsPrices
        })
}

export const useGetMedicationPriceById = (id: string) => {
        return useQuery({
                queryKey: ['price', id],
                queryFn: () => getMedicationPriceById(id),
                enabled: !!id
        })
}