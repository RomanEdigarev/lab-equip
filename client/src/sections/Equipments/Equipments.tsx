import * as React from "react";
import {FC} from "react";
import {server} from '../../lib/api'
import {EquipmentsData, DeletingData, DeletingVariables} from './types'

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

export const Equipments : FC<Props> = ({name}) => {

    const fetchEquipments = async () => {
        const {data} = await server.graphqlAPI<EquipmentsData>({query: EQUIPMENTS})
        console.log(data.equipments)
    }

    const deletingEquipment = async () => {
        const {data} = await server.graphqlAPI<DeletingData, DeletingVariables>({query:DELETE_EQUIPMENT, variables:{id:'5fc9f92db68e9a0f7022eb68'}})
        console.log(data)
    }

    return (
        <div>
            <h2>{name}</h2>
            <button onClick={fetchEquipments}>Query Equipments!</button>
            <button onClick={deletingEquipment}>Delete Equipment</button>
        </div>
    );
};
