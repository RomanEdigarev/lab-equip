import * as React from "react";
import {FC} from "react";
import {useMutation, useQuery} from 'react-apollo'
import {gql} from 'apollo-boost'
import {DeletingData, DeletingVariables, EquipmentsData} from './types'
import {Alert, Avatar, Button, List, Spin} from 'antd'
import {EquipmentsSkeleton} from './components'
import './styles/Equipments.css'

const EQUIPMENTS = gql`
    query Equipments {
        equipments {
            id
            number
            name
            model
        }
    }

`

const DELETE_EQUIPMENT = gql`
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
        await deletingEquipment({variables: {id}})
        refetch()
    }

    const equipments = data?.equipments

    const equipmentsList = equipments ?
        <List itemLayout={'horizontal'}
              dataSource={equipments}
              renderItem={equipment => (
                  <List.Item actions={[
                      <Button type={'primary'} onClick={() => handleDeletingEquipment(equipment.id)}>
                          Delete
                      </Button>
                  ]}>
                      <List.Item.Meta title={equipment.name}
                                      description={equipment.model}
                                      avatar={<Avatar
                                          src={'https://cdn1.iconfinder.com/data/icons/education-vol-2-18/32/30-512.png'}
                                          size={48}/>}
                      />
                  </List.Item>
              )}
        > </List>
        : null


    if (loading) {
        return <div><EquipmentsSkeleton title={name}/></div>
    }

    if (error) {
        return <div><EquipmentsSkeleton title={name} error/></div>
    }

    const deletingErrorAlert = deleteError ? <Alert type={'error'} message={'Oh! Deleting crashed with error, try again later'}/> : null


    return (
        <div className={'equipments'}>
            <Spin spinning={deleteLoading}>
                <h2>{name}</h2>
                {deletingErrorAlert}
                {equipmentsList}
            </Spin>
        </div>
    );
};
