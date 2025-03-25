import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/src/shared/services/api'
import { CamelToSnake, SnakeToCamel } from '@/src/types/obj-format'
import { camelToSnake, snakeToCamel } from '@/src/shared/utils/obj-format'
import { LoadType } from '@/src/types/load'

export type LoadRequest = {
    clientId: number
    plateId: number
    materialId: number
    quantity: number
    signaturePath: string
    insertedAt: Date
    paymentMethod: LoadType["paymentMethod"]
}

type NewLoadRequest = CamelToSnake<LoadRequest>

type LoadResponse = {
    id: string
    client: string
    quantity: number
    signature_path: string
    inserted_at: string
    plate: string
    material: string
    payment_method: LoadType["paymentMethod"]
}

export const useLoads = () => {
    const query = useQuery({
        queryKey: ["loads"],
        queryFn: async () => {
            const response = await api.get<{ data: Array<LoadResponse> }>("/loads")
            const loads = response.data.data.map((load) => ({ ...snakeToCamel(load), insertedAt: new Date(load.inserted_at) })) as Array<SnakeToCamel<LoadResponse> & { insertedAt: Date }>
            return loads
        }
    })

    const { mutateAsync: saveLoad } = useMutation({
        mutationKey: ["loads"],
        mutationFn: async (load: LoadRequest) => {
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
            await api.post<{ data: LoadResponse }, { load: NewLoadRequest }>("/loads", {
                load: {
                    ...camelToSnake(load),
                    signature_path: uploadResponse.path
                },
            })
        },
        onError: (e) => {
            console.log(e)
        }
    })

    return { saveLoad, query }
}

