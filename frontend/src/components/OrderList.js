import React from 'react'
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';

const OrderList = (props) => {
    return <List {...props}>
        <Datagrid>
            <TextField source='_id' />
            <TextField source='customerId'/>
            <TextField source='subOrders' />
            <DateField source='createdAt' />
            
        </Datagrid>
    </List>
}

export default OrderList;