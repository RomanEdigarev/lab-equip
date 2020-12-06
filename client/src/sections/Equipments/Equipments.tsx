import * as React from "react";
import {FC, useState, useEffect} from "react";
import {server, useQuery} from '../../lib/api'
import {EquipmentsData, DeletingData, DeletingVariables, Equipment} from './types'

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
    const {data} = useQuery<EquipmentsData>(EQUIPMENTS)

    const deletingEquipment = async (id: string) => {
        const {data} = await server.graphqlAPI<DeletingData, DeletingVariables>({
            query: DELETE_EQUIPMENT,
            variables: {id}
        })

    }

    const equipments = data?.equipments

    const equipmentsList =
        <ul>
            {equipments?.map(equip => {
                return (
                    <li key={equip.id}>
                        {equip.name + ' ' + equip.model}
                        <button onClick={() => deletingEquipment(equip.id)}> Delete</button>
                    </li>
                )
            })}
        </ul>

    return (
        <div>
            <h2>{name}</h2>
            {equipmentsList}
        </div>
    );
};
