import { connection } from "@/config";

export class ProductServices {
    async getAllProduct({ limit, skip, search }: { limit: number; skip: number, search: string }) {
        const { data } = await connection.get(`/products/search?q=${search}`, {
            params: {
                limit,
                skip,
            }
        })
        return data;
    }
}