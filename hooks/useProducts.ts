import { getAllProducts } from "@/api/products/products.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllProducts () {
        return useQuery({
                queryKey: ['medicatons'],
                queryFn: getAllProducts
        })
}