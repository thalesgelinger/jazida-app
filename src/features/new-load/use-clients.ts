import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'
import { useNetwork } from '@/src/shared/hooks/useNetwork'
import { db } from '@/src/shared/services/db'
import * as schema from "../../shared/services/db/schema"


type Client = {
    id: number,
    name: string,
}

export const useClients = () => {

    const isConnected = useNetwork()

    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ["clients", isConnected],
        queryFn: async () => {
            const clients = await db.select().from(schema.clients)

            if (isConnected) {
                const { data: response } = await api.get<{ data: Array<Client> }>("/clients")
                response.data.forEach(async (client) => {
                    if (clients.some(m => client.id === m.id)) return;
                    await db.insert(schema.clients).values(client)
                })
                return formatClients(response.data)
            }
            return formatClients(clients)
        }
    })

    const formatClients = (data: Array<Client>) => {
        const materials: Array<ItemType<number>> = data.map((material) => ({
            value: material.id,
            label: material.name
        }))
        return materials
    }

    const { mutateAsync: createClient } = useMutation({
        mutationKey: ["create-client"],
        mutationFn: async (name: string) => {
            await api.post("/clients", {
                client: { name }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["clients", true])
        }
    })

    const { mutateAsync: deleteClient } = useMutation({
        mutationKey: ["delete-client"],
        mutationFn: async (clientId: number) => {
            await api.delete(`/clients/${clientId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["clients", true])
        }
    })

    return { query, createClient, deleteClient }
}
