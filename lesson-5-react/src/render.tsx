
import React from "react";


export const MyComponent = ({name} : {name: string}) => {
    return <div>hello {name}</div>
}

const OtherComponent = () => {
    return <MyComponent name ="foo"/>;
}

console.log(<MyComponent name ="foo"/>); 
console.log(<OtherComponent/>);

