import React from 'react';
import '../style/Select_breed.scss'


function SelectBreed(props) {

    return (

        <select className={`form-control select_breed`} value={props.selectValue} onChange={props.handleSelectValue}>
            {props.items.map(item => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>

    );

}

export default SelectBreed;
