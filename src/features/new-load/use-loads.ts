import { useMutation, useQuery } from '@tanstack/react-query'
import { ItemType } from '@/src/types/item'
import { api } from '@/src/shared/services/api'
import { CamelKeysToSnake, SnakeKeysToCamel } from '@/src/types/obj-convert'
import { camelToSnake, snakeToCamel } from '@/src/shared/utils/obj-format'

type LoadRequest = {
    clientId: number
    plateId: number
    materialId: number
    quantity: number
    signaturePath: string
    insertedAt: Date
}

type NewLoadRequest = CamelKeysToSnake<LoadRequest>

type LoadResponse = {
    id: string
    client: string
    quantity: number
    signature_path: string
    inserted_at: string
    plate: string
    material: string
}

export const useLoads = () => {
    const query = useQuery({
        queryKey: ["loads"],
        queryFn: async () => {
            const response = await api.get<{ data: Array<LoadResponse> }>("/loads")
            const loads = response.data.data.map((load) => snakeToCamel(load)) as Array<SnakeKeysToCamel<LoadResponse>>
            return loads
        }
    })

    const mutatition = useMutation({
        mutationKey: ["loads"],
        mutationFn: async (load: LoadRequest) => {
            await api.post<{ data: LoadResponse }, { load: NewLoadRequest }>("/loads", {
                load: camelToSnake(load),
            })
        },
        onError: (e) => {
            console.log(e)
        }
    })

    const saveLoad = async (load: LoadRequest) => {
        const formData = new FormData()
        // @ts-ignore
        formData.append("image", {
            uri: load.signaturePath,
            name: "signature.png",
            type: "image/png"
        })

        const { data: uploadResponse } = await api.post("/signature", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        await mutatition.mutateAsync({ ...load, signaturePath: uploadResponse.path })

    }

    return { saveLoad }
}

