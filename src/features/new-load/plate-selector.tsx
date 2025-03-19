
import { ItemType } from '@/src/types/item';
import React from 'react'
import { Select } from './select';
import { Car } from 'lucide-react-native';
import { Loading } from '@/src/shared/ui/loading';
import ErrorMessage from '@/src/shared/ui/error-message';
import { usePlates } from './use-plates';


type PlateSelectorProps = {
    client: ItemType<number> | null
    plate: ItemType<{ id: number, clientId: number }> | null
    onSelectPlate: (value: ItemType<{ id: number, clientId: number }>) => void
}

export const PlateSelector = ({ client, plate, onSelectPlate }: PlateSelectorProps) => {
    const { data: plates = [], isLoading, error } = usePlates();

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        // @ts-ignore
        return <ErrorMessage message={error.message} />
    }


    const selectPlate = (val: { id: number, clientId: number }) => {
        const plate = plates.find(c => c.value === val)
        if (!plate) return
        onSelectPlate(plate);
    }

    return (
        <Select
            label={plate?.label ?? "Selecionar Plate"}
            Icon={Car}
            items={plates.filter(plate => plate.value.clientId === client?.value)}
            onSelect={selectPlate}
        />
    )
}
