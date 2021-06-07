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