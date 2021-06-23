import React from "react"; 
import axios from "axios"; 

export type MyFirstGeneric<T  = any> = {
    value: T; 
    name: string; 
}

function usesFirstGeneric(obj: MyFirstGeneric<string>) {
    console.log(obj.value); //(property) value: string
}

usesFirstGeneric({
    value: "foo", 
    name: "a"
}); 


usesFirstGeneric({
    value: 9, //Type 'number' is not assignable to type 'string'.ts(2322)
    name: "a"
}); 



function usesFirstGeneric2(obj: MyFirstGeneric) {
    console.log(obj.value); //(property) value: unknown

}

usesFirstGeneric2({
    value: "foo", 
    name: "a"
}); 


usesFirstGeneric2({
    value: 9, 
    name: "a"
}); 



function myFirstGenericFunction<T> (value: T) {

}

myFirstGenericFunction<string>("hello"); 
myFirstGenericFunction<string>(999); // Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)

myFirstGenericFunction("bob"); //function myFirstGenericFunction<string>(value: string): void


function mySecondGenericFunction<T> (value: T) : T {
    return value; 
}

const a = 1 as number; 
const b = mySecondGenericFunction(a); //const b: number

const c = "foo" as string; 
const d = mySecondGenericFunction(c); //const d: string


function functionWithTwoParams<T> (value1: T, value2: T) {

}

functionWithTwoParams(1,1); 
functionWithTwoParams("a", "b"); 
functionWithTwoParams(1, "2"); //Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)



function myThirdGenericFunction<T extends string | number> (value: T) : T {
    return value; 
}

const e = 1 as number; 
const f = myThirdGenericFunction(e); 

const g = "foo" as string; 
const h = myThirdGenericFunction(g); 

const i = {
    hello: "world"
}; 

const j = myThirdGenericFunction(i); // Argument of type '{ hello: string; }' is not assignable to parameter of type 'string | number'.


function myNonGenericFunction(value: string | number) : string | number {
    return value; 
}

const k = 1 as number; 
const l = myNonGenericFunction(k); //const l: string | number



function justAPlainStringFunction(input: string) : string {

    const result =  myNonGenericFunction(input); //const result: string | number
    return result; //Type 'string | number' is not assignable to type 'string'.
}


function myFourthGenericFunction<T extends string | number> (obj: MyFirstGeneric<T>) : T {
    return obj.value; 
}

myFourthGenericFunction("hello"); //Argument of type 'string' is not assignable to parameter of type 'MyFirstGeneric<string | number>'.ts(2345)

myFourthGenericFunction({
    name: "hello", 
    value: { //Type '{ thisIsAnObject: true; }' is not assignable to type 'string | number'.
        thisIsAnObject: true
    }
}); 

const m = "hello" as string; 
const n = myFourthGenericFunction({ // const n: string
    name: "hello", 
    value: m
}); 


const MyComponent = () => {
    const [value, setValue] = React.useState(null); 

    return <div> 
        {/* Argument of type 'string' is not assignable to parameter of type 'SetStateAction<null>'.ts(2345) */}
        <input type ="text" onChange = {(e) => setValue(e.target.value) }/> 
    </div>
}; 

const MyComponent2 = () => {
    const [value, setValue] = React.useState<string | null>(null); 

    return <div> 
        <input type ="text" onChange = {(e) => setValue(e.target.value) }/> 
    </div>
}; 


async function useAxios() {
    const result = await axios({  //const result: AxiosResponse<any>
        url: "/foo", 
        method: "GET"
    }); 

    const data = result.data; //const data: any


    
}

type User = {
    name: string; 
    age: number; 
}

async function useAxios2() {
    const result = await axios({  //const result: AxiosResponse<any>
        url: "/foo", 
        method: "GET"
    }); 

    const data = result.data; //const data: any


    
}



// UGH, SCRAP THIS. NOT A GOOD EXAMPLE. 


type FruitTypes = "apple" | "banana" | "cherry"; 
type FruitGrades = "A" | "B" | "C" | "F"; 

type FruitInstance<TFruitType extends FruitTypes, TWeight extends number, TGrade extends FruitGrades> = {
    fruitName: TFruitType; 
    weight: TWeight; 
    grade: TGrade; 
}; 

function fruitCloner<T extends FruitTypes, U extends FruitInstance<T, number, FruitGrades>>(fruitInstance: U) : Array<U> {

    return [
        fruitInstance, 
        fruitInstance
    ]; 
}

const fruit = {
    fruitName: "apple" as const, 
    weight: 12, 
    grade: "A" as const
} ; 

const fruits = fruitCloner(fruit);





type Jackpot<T extends string | number> = {
    winningValue: T; 
    prizeType: "money" | "holiday"; 
}

function verifyJackpot<TPayloadType extends string |number, TJackpot extends Jackpot<TPayloadType>> (possibleValues: Array<TPayloadType>, jackpot: TJackpot) : TJackpot  {
    if (possibleValues.includes(jackpot.winningValue)){
        return jackpot; 
    }
    else {
        throw new Error("The jackpot was not valid");
    }
}

// Note that the generic variables can be referenced in any order
function verifyJackpot2<TJackpot extends Jackpot<TPayloadType>, TPayloadType extends string |number> (possibleValues: Array<TPayloadType>, jackpot: TJackpot) : TJackpot  {
    if (possibleValues.includes(jackpot.winningValue)){
        return jackpot; 
    }
    else {
        throw new Error("The jackpot was not valid");
    }
}







function returnsAString(value: number) : string {
    return ""; 
}

describe("A test", () => {

    it ("has type errors in the right places", () => {

        //@ts-expect-error
        returnsAString("hello");
    }); 
}); 