import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/src/shared/services/api'
import { CamelToSnake, SnakeToCamel } from '@/src/types/obj-format'
import { camelToSnake, snakeToCamel } from '@/src/shared/utils/obj-format'
import { LoadType } from '@/src/types/load'
import { db } from '@/src/shared/services/db'
import * as schema from "../../shared/services/db/schema"
import { useClients } from './use-clients'
import { usePlates } from './use-plates'
import { useMaterials } from './use-materials'
import { useNetwork } from '@/src/shared/hooks/useNetwork'

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

    const { query: { data: clients = [] } } = useClients()
    const { query: { data: plates = [] } } = usePlates()
    const { query: { data: materials = [] } } = useMaterials()

    const isConnected = useNetwork()

    const query = useQuery({
        queryKey: ["loads", isConnected],
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

            const payload = {
                ...camelToSnake(load),
                signature_path: uploadResponse.path,
                inserted_at: load.insertedAt
            }

            await api.post<{ data: LoadResponse }, { load: NewLoadRequest }>("/loads", {
                load: payload,
            })
        },
        onError: (e) => {
            console.log(e)
        }
    })

    const saveLoadOffline = async (load: LoadRequest) => {

        const client = clients.find(c => c.value === load.clientId)
        if (!client) return

        const plate = plates.find(c => c.value.id === load.plateId)
        if (!plate) return

        const material = materials.find(c => c.value === load.materialId)
        if (!material) return

        await db.insert(schema.loads).values({
            client: { name: client.label, id: load.clientId },
            plate: { name: plate.label, id: load.plateId },
            material: { name: material.label, id: load.materialId },
            paymentMethod: load.paymentMethod,
            insertedAt: load.insertedAt,
            signaturePath: load.signaturePath,
            quantity: load.quantity,
        })

    }

    return { saveLoad, saveLoadOffline, query }
}

