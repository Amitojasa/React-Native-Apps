import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
const Icons = ({ name }) => {
    switch (name) {
        case 'circle':
            return <FontAwesome name="circle-thin" size={45} color="#F4C724" />

        case 'cross':
            return <FontAwesome name="times" size={45} color="#10A881" />

        default:
            return <FontAwesome name="pencil" size={45} color="#303030" />

    }
}


export default Icons;