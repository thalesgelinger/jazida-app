
import { useQuery } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'

export const usePlates = () => {
    const query = useQuery({
        queryKey: ["plates"],
        queryFn: async () => {
            const response = await api.get<{ data: Array<{ id: number, name: string, client_id: number }> }>("/plates")
            const plates: Array<ItemType<{ id: number, clientId: number }>> = response.data.data.map((plate) => ({
                value: { id: plate.id, clientId: plate.client_id },
                label: plate.name
            }))
            return plates
        }
    })

    return query
}
