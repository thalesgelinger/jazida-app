
import { ItemType } from '@/src/types/item'
import { LoadType } from '@/src/types/load'
import { Banknote } from 'lucide-react-native'
import React from 'react'
import { Select } from './select'

type PaymentMethod = LoadType["paymentMethod"]

type PaymentSelectorProps = {
    paymentMethod: ItemType<PaymentMethod> | null
    onSelectPaymentMethod: (value: ItemType<PaymentMethod>) => void
}

export const PaymentMethodSelector = ({ paymentMethod, onSelectPaymentMethod }: PaymentSelectorProps) => {

    const paymentMethods: Array<ItemType<PaymentMethod>> = [
        { label: "A vista", value: "cash" },
        { label: "A prazo", value: "installment" },
    ]


    const selectPaymentMethod = (val: PaymentMethod) => {
        const paymentMethod = paymentMethods.find(c => c.value === val)
        if (!paymentMethod) return
        onSelectPaymentMethod(paymentMethod)
    }

    return (
        <Select
            label={paymentMethod?.label ?? "Selecionar Método de Pagamento"}
            Icon={Banknote}
            items={paymentMethods}
            onSelect={selectPaymentMethod}
        />
    )

}
