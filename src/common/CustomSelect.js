/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import Select from 'react-select';

export default ({ onChange, options, value, className }) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    return (
        <div className={className}>
             <Select
                value={defaultValue(options, value)}
                onChange={value => {
                    onChange(value)

                }} options={options} />
        </div>
    )
}

// const CustomSelect = (onChange, options, value, className) => {

//     const defaultValue = (options, value) => {
//         console.log(options);
//         //return options ? options.find(option => option.value === value) : "";
//     };

//     return (
//         <div className={className}>
//             <Select
//                 value={defaultValue(options, value)}
//                 onChange={value => {
//                     onChange(value)

//                 }} options={options} />
//         </div>

//     )

// }

// export default CustomSelect;