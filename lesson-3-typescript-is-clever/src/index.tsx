import React from "react"; 
let a = "hello"; //let a: string
const b = "world"; //const b: "world"

const myStr: string = 9; //Type 'number' is not assignable to type 'string'.ts(2322)


const alpha : string = "andy"; 

type SomeObject = {
    a: string; 
    b: number; 
    c: () => number; 
}; 

const instanceOfSomeObject: SomeObject = {
    a: "ehllo", 
    b: 9, 
    c: () => { //Type '() => void' is not assignable to type '() => number'.

    }
}; 


function createNumber() : number {
    return 9; 
}

function usesNumber(value: number) {

}

const foundNumber = createNumber(); 
usesNumber(foundNumber);


a = 9; //Type 'number' is not assignable to type 'string'.ts(2322)



type SomeTypeZ = number; 


//@ts-ignore - 
const myZ = "hello" as SomeTypeZ; 





let c = "hello" as string | number; 
c = 9; 

let d = "hello" as number; 

let e = "hello" as unknown as number; 

const myFunction = () => {
    const random = Math.random(); 
    if (random> 0.5) {
        return "hello"!
    } else {
        return 9; 
    }
}

const result = myFunction(); //const result: "hello" | 9


const myFunction2 = () : string => {
    const random = Math.random(); 
    if (random> 0.5) {
        return "hello"!
    } else {
        return 9; //Type 'number' is not assignable to type 'string'.ts(2322)

    }
}



const hasManyTypes = (value: "foo" | "bar" | "biz") =>  {

    if (value === "foo") {
        console.log(value); //(parameter) value: "foo"
        return;
    }

    // TypeScript knows at this point that the value can not be "foo" because if it were, we have already returned. 
    if (value ==="foo") { //This condition will always return 'false' since the types '"bar" | "biz"' and '"foo"' have no overlap.ts(2367)

    }

    if (value === "bar") { //(parameter) value: "bar" | "biz"
        console.log(value);
    }
}



type Teacher = {
    type: "teacher", 
    degree: string; 
}

type Student = {
    type: "student"
    age: number; 
}

function processPerson(person: Student | Teacher) {
    if (person.type ==="teacher") {
        console.log(person.degree);
        console.log(person.age); //Property 'age' does not exist on type 'Teacher'.ts(2339)
    }
}


function useStringOrNumber(value: string | number) {
    if (typeof value === "string") {
        
        console.log(value); //(parameter) value: string

    }
}


function conditonalTypeIsNotInferred(value: "foo" | "bar") {
    if (value === "foo") {
        return 1; 
    }
    else {
        return 2; 
    }
}

const result2 = conditonalTypeIsNotInferred("foo"); //const result2: 1 | 2


type CallBackFunction = (value: string) => void; 

const functionThatTakesACallback = (fn: CallBackFunction) => {
    const myString = "hello"; 
    fn(myString);
}

const callback = (value) => { //Parameter 'value' implicitly has an 'any' type.ts(7006)

}

functionThatTakesACallback(callback); 

// Here when we declare the function inside the function parameters, TypeScript automatically infers the types of the callback params. 
functionThatTakesACallback((value) => {
    console.log(value); // (parameter) value: string
})




const MyComponent = () => {


    const inputHandler = (e) => { //Parameter 'e' implicitly has an 'any' type.ts(7006)

    }; 

    return <div> 
        <input onChange = {inputHandler}/> 
        <input onChange = {e => { //(parameter) e: React.ChangeEvent<HTMLInputElement>
                console.log(e.target.value);
        }}/>
        
    </div> 
}