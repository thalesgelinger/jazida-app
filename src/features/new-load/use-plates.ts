
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'
import { db } from '@/src/shared/services/db'
import * as schema from "../../shared/services/db/schema"
import { useNetwork } from '@/src/shared/hooks/useNetwork'

type Plate = {
    id: number,
    name: string,
    client_id: number
}

export const usePlates = () => {

    const isConnected = useNetwork()

    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ["plates", isConnected],
        queryFn: async () => {
            const plates = await db.select().from(schema.plates)

            if (isConnected) {
                const { data: response } = await api.get<{ data: Array<Plate> }>("/plates")
                response.data.forEach(async (plate) => {
                    if (plates.some(m => plate.id === m.id)) return;
                    await db.insert(schema.plates).values(plate)
                })
                return formatPlates(response.data)
            }

            return formatPlates(plates)
        }
    })

    const formatPlates = (data: Array<Plate>) => {
        const plates: Array<ItemType<{ id: number, clientId: number }>> = data.map((plate) => ({
            value: { id: plate.id, clientId: plate.client_id },
            label: plate.name
        }))
        return plates
    }

    const { mutateAsync: createPlate } = useMutation({
        mutationKey: ["create-plates"],
        mutationFn: async ({ plate, clientId }: { clientId: number, plate: string }) => {
            await api.post("/plates", {
                plate: {
                    name: plate,
                    client_id: clientId
                }
            })
        },
        onSuccess: (data) => {
            // improve this since we dont need to refetch
            // const currentPlates = queryClient.getQueryData<Array<ItemType<{ id: number, clientId: number }>>>(["plates"]) || []

            // const newPlate: ItemType<{ id: number, clientId: number }> = {
            //     value: { id: data.id, clientId: data.client_id },
            //     label: data.name
            // }

            // queryClient.setQueryData(["plates"], [...currentPlates, newPlate])
            queryClient.invalidateQueries(["plates", true])
        }
    })


    const { mutateAsync: deletePlate } = useMutation({
        mutationKey: ["delete-plates"],
        mutationFn: async (plateId: number) => {
            console.log({ plateId })
            await api.delete(`/plates/${plateId}`)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["plates", true])
        }
    })

    return { query, createPlate, deletePlate }
}
