import { ItemType } from '@/src/types/item';
import React from 'react'
import { Select } from './select';
import { Truck } from 'lucide-react-native';
import { Loading } from '@/src/shared/ui/loading';
import ErrorMessage from '@/src/shared/ui/error-message';
import { useMaterials } from './use-materials';


type MaterialSelectorProps = {
    material: ItemType<number> | null
    onSelectMaterial: (value: ItemType<number>) => void
}

export const MaterialSelector = ({ material, onSelectMaterial }: MaterialSelectorProps) => {
    const { data: materials = [], isLoading, error } = useMaterials();

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        // @ts-ignore
        return <ErrorMessage message={error.message} />
    }


    const selectMaterial = (val: number) => {
        const material = materials.find(c => c.value === val)
        if (!material) return
        onSelectMaterial(material);
    }

    return (
        <Select
            label={material?.label ?? "Selecionar Material"}
            Icon={Truck}
            items={materials}
            onSelect={selectMaterial}
        />
    )
}
