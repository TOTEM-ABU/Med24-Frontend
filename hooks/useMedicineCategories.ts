import { getAllMedicineCategories } from "@/api/categories/categories.api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllMedicineCategories = () => {
        return useQuery({
                queryKey: ['categories'],
                queryFn: getAllMedicineCategories
        })
}