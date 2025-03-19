import { useQuery } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'

export const useClients = () => {
    const query = useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            const response = await api.get<{ data: Array<{ id: number, name: string }> }>("/clients")
            const clients: Array<ItemType<number>> = response.data.data.map((client) => ({
                value: client.id,
                label: client.name
            }))
            return clients
        }
    })

    return query
}
