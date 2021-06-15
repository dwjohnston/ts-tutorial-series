import React, { PureComponent } from "react";
//ex.1 Fix the type error without changing the function signature

function generateAStringOrNumber(): string | number {
    let returnValue = "foo";

    if (Math.random() > 0.5) {
        returnValue = 0;
    }

    return returnValue;
}




type PossiblePayloadTypes = "foo" | "bar" | "biz";

type Payload = {
    payloadType: PossiblePayloadTypes;
    value: number;
}

//ex.2 Fix the type error by changing function implementation. 
// Do not change the function signature or fallback return value. 

function usesPayload(payload: Payload): number | "biz" {

    if (payload.payloadType === "foo") {
        return 1;
    }

    // Change function implmentation here. 



    // Do not change this line.
    return payload.payloadType;

}


//ex3. Fix the type errors by filling in the if conditions 
function usesString(value: string) {
    console.log(value);
}


function usesNumber(value: number) {
    console.log(value);
}

function takesStringOrNumber(value: string | number): void {

    // Fill in the if condition
    if (someCondition) {
        usesString(value)
    }

    // Fill in the if condition
    if (otherCondition) {
        usesNumber(value)
    }
}




//ex.3 implment the onChange to console.log the input value as a date. 
// Implement the onMouseOver to print the clientX and clientY values of the mouse event. 
// HINT: There is any easy way to find these values within VSCode.

const SomeComponent = () => {

    const handleChange = 

    const handleMouseOver = (event) => {

    }

    return <div>
        <input
            onMouseOver={(event) => {

            }}
            onChange={(event) => {

            }}
        />
    </div>
}


//ex4. You do not need to understand the generic typings here. 
// They are to intentionally make 'difficult to understand' typing that might come from another library.

type Generic1<T> = {
    value: T; 
    body: string; 
}

type Generic2<T, U>  = {
    a: T; 
    b: U; 
}

type Generic3<T, U> = {
    fn: (value: T) => U;
}

function createsCrazyObject ()  : Generic1<Generic2<Generic3<string, number>, number>> {

    return {
        value: {
            a: {fn: (value: string) => 99}, 
            b: 9
        }, 
        body: "foo"
    };
}

function usesCrazyObject(value: Generic1<Generic2<Generic3<string, number>, number>> ) {
    console.log(value);
}


function main() {
    //ex4. Fix the type error, by deleting code only. 

    const result: unknown = createsCrazyObject(); 
    usesCrazyObject(result);


    //ex5. Call the function on the crazy object. 
    result.someFunction(); 
    
}



