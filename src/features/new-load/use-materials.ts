
import { useQuery } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'

export const useMaterials = () => {
    const query = useQuery({
        queryKey: ["materials"],
        queryFn: async () => {
            const response = await api.get<{ data: Array<{ id: number, name: string }> }>("/materials")
            const materials: Array<ItemType<number>> = response.data.data.map((material) => ({
                value: material.id,
                label: material.name
            }))
            return materials
        }
    })

    return query
}
