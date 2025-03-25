
import { ItemType } from '@/src/types/item';
import React from 'react'
import { Select } from './select';
import { User } from 'lucide-react-native';
import { Loading } from '@/src/shared/ui/loading';
import ErrorMessage from '@/src/shared/ui/error-message';
import { useClients } from './use-clients';


type ClientSelectorProps = {
    client: ItemType<number> | null
    onSelectClient: (value: ItemType<number>) => void
}

export const ClientSelector = ({ client, onSelectClient }: ClientSelectorProps) => {
    const { query: { data: clients = [], isLoading, error } } = useClients();

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        // @ts-ignore
        return <ErrorMessage message={error.message} />
    }


    const selectClient = (val: number) => {
        const client = clients.find(c => c.value === val)
        if (!client) return
        onSelectClient(client);
    }

    return (
        <Select
            label={client?.label ?? "Selecionar Client"}
            Icon={User}
            items={clients}
            onSelect={selectClient}
        />
    )
}
