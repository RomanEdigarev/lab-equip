import * as React from "react";
import {FC} from "react";
import {server, useQuery, useMutation  } from '../../lib/api'
import {DeletingData, DeletingVariables, EquipmentsData} from './types'

const EQUIPMENTS = `
    query Equipments {
        equipments {
            id
            number
            name
            model
        }
    }

`

const DELETE_EQUIPMENT = `
    mutation DeleteEquipment($id: String!) {
        deleteEquipments(id: $id) {
            id
            name
            model
        }
    }
`

type Props = {
    id?: string,
    name: string,
    model?: string,
    number?: string
}

export const Equipments: FC<Props> = ({name}) => {
    const {data, refetch, loading, error} = useQuery<EquipmentsData>(EQUIPMENTS)
    const [deletingEquipment, {loading: deleteLoading, error: deleteError}] = useMutation<DeletingData, DeletingVariables>(DELETE_EQUIPMENT)

    const handleDeletingEquipment = async (id: string) => {
        await deletingEquipment({id})
        refetch()
    }

    const equipments = data?.equipments

    const equipmentsList =
        <ul>
            {equipments?.map(equip => {
                return (
                    <li key={equip.id}>
                        {equip.name + ' ' + equip.model}
                        <button onClick={() => handleDeletingEquipment(equip.id)}> Delete</button>
                    </li>
                )
            })}
        </ul>

    if (loading) {
        return <h2>Loading</h2>
    }
    if (error) {
        return <h2>ERROR!</h2>
    }

    const deleteLoadingInProcess = deleteLoading ? <h2>Deleting Equipment in process...</h2>: null
    const deletingErrorMessage = deleteError ? <h2>Oh! Deleting crashed with error, try again later</h2>: null


    return (
        <div>
            <h2>{name}</h2>
            {equipmentsList}
            {deleteLoadingInProcess}
            {deletingErrorMessage}
        </div>
    );
};
