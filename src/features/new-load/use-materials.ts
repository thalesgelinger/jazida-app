
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'
import { useNetwork } from '@/src/shared/hooks/useNetwork'
import { db } from '@/src/shared/services/db'
import * as schema from "../../shared/services/db/schema"

type Material = {
    id: number,
    name: string,
}

export const useMaterials = () => {

    const isConnected = useNetwork()

    const queryClient = useQueryClient()

    const materialsKey = ["materials", isConnected]
    const query = useQuery({
        queryKey: materialsKey,
        queryFn: async () => {
            const materials = await db.select().from(schema.materials)

            if (isConnected) {
                const response = await api.get<{ data: Array<Material> }>("/materials")
                response.data.data.forEach(async (material) => {
                    if (materials.some(m => material.id === m.id)) return;
                    await db.insert(schema.materials).values(material)
                })
                return formatMaterials(response.data.data)
            }

            return formatMaterials(materials)
        }
    })

    const formatMaterials = (data: Array<Material>) => {
        const materials: Array<ItemType<number>> = data.map((material) => ({
            value: material.id,
            label: material.name
        }))
        return materials
    }


    const { mutateAsync: createMaterial } = useMutation({
        mutationKey: ["create-material"],
        mutationFn: async (name: string) => {
            await api.post("/materials", {
                material: { name }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["materials", true])
        }
    })

    const { mutateAsync: deleteMaterial } = useMutation({
        mutationKey: ["create-material"],
        mutationFn: async (materialId: number) => {
            await api.delete(`/materials/${materialId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["materials", true])
        }
    })

    return { query, createMaterial, deleteMaterial }
}
