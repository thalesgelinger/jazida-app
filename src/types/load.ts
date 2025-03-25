export type LoadType = {
    client: string
    plate: string
    quantity: number
    paymentMethod: "installment" | "cash",
    material: string
    signatureUrl: string
    date: Date
}
