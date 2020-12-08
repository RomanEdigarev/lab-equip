import * as React from 'react';
import {Skeleton, Divider, Alert} from "antd";
import {FC} from "react";
import './styles/EquipmentsSkeleton.css'

type Props = {
    title: string
    error?: boolean
}
export const EquipmentsSkeleton : FC<Props> = ({title, error}) => {
    const errorAlert = error ? <div className={'equipments-skeleton__alert'}><Alert  type={'error'} message={'ERROR!'}/></div> : null

    return <div className={'equipments_skeleton'}>
        {errorAlert}
        <h2>{title}</h2>
        <Skeleton active paragraph={{rows: 1}}/>
        <Divider/>
        <Skeleton active paragraph={{rows: 1}}/>
        <Divider/>
        <Skeleton active paragraph={{rows: 1}}/>
    </div>
};
