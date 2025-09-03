import api from "@/lib/api"
import { Promotion, PromotionResponse } from "@/types/promotions/Promotion.type"

export async function getAllPromotions (): Promise<PromotionResponse> {
        const res = await api.get<PromotionResponse>(`/promotions`)
        return res.data
}