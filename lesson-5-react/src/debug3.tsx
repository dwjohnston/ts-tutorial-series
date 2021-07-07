import React from "react"; 

// For my Stack Overflow answer: 

type TypeImLookingFor<P = {}>  = React.ComponentType<P> | ((props: P) => React.ReactNode); 

class ComponentA extends React.Component {
    render() {
        return "aaa"; 
    }
}

const ComponentB = () => {
    return "bbb"; 
}

// They do match the type signature
const A: TypeImLookingFor = ComponentA; 
const B: TypeImLookingFor = ComponentB; 

const Main =  () => {
    return <div> 
        <ComponentA/> 
        
        {/* 
        'ComponentB' cannot be used as a JSX component.
        Its return type 'string' is not a valid JSX element.ts(2786) */}
        <ComponentB/>
    </div>;

}


const ComponentC = () : React.ReactElement => {
    //Type 'string' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.ts(2322)
    return "aaa"; 
}

const ComponentD = () : React.ReactElement => {
    return <> aaa </>
}

const Main2 =  () => {
    return <div> 
        <ComponentA/> 
        <ComponentD/>
    </div>;

}