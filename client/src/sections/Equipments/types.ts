export type Equipment = {
    id: string
    number: string
    name: string
    model: string
}

export type EquipmentsData = {
    equipments: Equipment[]
}

export type DeletingData = {
    deletingEquipment: Equipment
}

export type DeletingVariables = {
    id: string
}
