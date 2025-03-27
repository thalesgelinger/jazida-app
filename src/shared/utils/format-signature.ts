import { api } from "../services/api"

export const formatSignatureUrl = (signatureUrl: string) => {
    return signatureUrl.startsWith("file:") ? signatureUrl : `${api.defaults.baseURL}${signatureUrl}`
}
