
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'

export const useMaterials = () => {

    const queryClient = useQueryClient()
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

    const { mutateAsync: createMaterial } = useMutation({
        mutationKey: ["create-material"],
        mutationFn: async (name: string) => {
            await api.post("/materials", {
                material: { name }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["materials"])
        }
    })

    const { mutateAsync: deleteMaterial } = useMutation({
        mutationKey: ["create-material"],
        mutationFn: async (materialId: number) => {
            await api.delete(`/materials/${materialId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["materials"])
        }
    })

    return { query, createMaterial, deleteMaterial }
}
