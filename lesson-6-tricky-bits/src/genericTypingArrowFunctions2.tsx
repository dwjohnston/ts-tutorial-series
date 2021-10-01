import React from 'react'; 

type ComponentProps<T> = {
    value: T; 
}

// // A bunch of red squigly lines!
const MyGenericComponent = <T>(value: ComponentProps<T>) => {
    return value; 
}; 

// const MyGenericComponent2 = <T,>(value: ComponentProps<T>) => {
//     return value; 
// }; 