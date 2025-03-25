
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'

export const usePlates = () => {

    const queryClient = useQueryClient()

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
            queryClient.invalidateQueries(["plates"])
        }
    })


    const { mutateAsync: deletePlate } = useMutation({
        mutationKey: ["delete-plates"],
        mutationFn: async (plateId: number) => {
            await api.delete(`/plates/${plateId}`)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["plates"])
        }
    })

    return { query, createPlate, deletePlate }
}
