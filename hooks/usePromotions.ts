import { getAllPromotions, getAllServices, getPromotionById } from "@/api/promotions/promotions.api";
import { Promotion, PromotionResponse } from "@/types/promotions/Promotion.type";
import { useQuery } from "@tanstack/react-query";

export function useGetAllPromotions () {
        return useQuery<PromotionResponse, Error, Promotion[]>({
                queryKey: ['promotions'],
                queryFn: getAllPromotions,
                select: (response) => response.data,
        })
}

export function useGetPromotionById (id: string) {
        return useQuery({
                queryKey: ['promotion'],
                queryFn: () => getPromotionById(id)
        })
}

export function useGetAllServices () {
        return useQuery({
                queryKey: ['services'],
                queryFn: getAllServices
        })
}