const someThing = {
    a: "hello", 
    b: 99
}; 


type MyType = typeof someThing; 
//type MyType = {
//    a: string;
//    b: number;
//}


type Foo = {
    a: string; 
    b: number; 
}

type KeyofFoo = keyof Foo; 
const a  : KeyofFoo = "a"; 
const b  : KeyofFoo = "b"; 
const c  : KeyofFoo = "c"; //Type '"c"' is not assignable to type 'keyof Foo'.ts(2322)



type Bar = "bar"; 
type KeyofBar = keyof Bar; 
//type KeyofBar = number | typeof Symbol.iterator | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | ... 35 more ... | "matchAll"





function myFunction(value : "foo" | "bar") {

    if (value === "foo") {
        // return a random number
        return Math.random(); 
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + ""; 
    }

    throw new Error("We shouldn't have got here"); 
}

const value = myFunction("foo");  //const value: string | number
const value2 = myFunction("bar"); //const value2: string | number
const value3 = myFunction("aaa"); //Argument of type '"aaa"' is not assignable to parameter of type '"foo" | "bar"'.ts(2345)





function myFunction2<T extends "foo" | "bar">(value : T) : T extends "foo" ? number : string {

    if (value === "foo") {
        // return a random number
        return Math.random(); //Type 'number' is not assignable to type 'T extends "foo" ? number : string'.ts(2322)
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + ""; //Type 'number' is not assignable to type 'T extends "foo" ? number : string'.ts(2322)
    }

    throw new Error("We shouldn't have got here"); 
}

function myFunction3<T extends "foo" | "bar">(value : T) : T extends "foo" ? number : string {

    if (value === "foo") {
        // return a random number
        return Math.random() as T extends "foo" ? number : string ; 
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + "" as T extends "foo" ? number : string ;
    }

    throw new Error("We shouldn't have got here"); 
}

function foo(value: "foo" | "bar") {
    if (value === "foo") {
       return "";  
    }

    // TypeScript knows that it's not possible for value to be "foo"
    if (value === "foo") { //his condition will always return 'false' since the types '"bar"' and '"foo"' have no overlap.ts(2367)
        
    }
}


function foo2<T extends "foo" | "bar">(value: T) {
    if (value === "foo") {
       return "";  
    }

    // TypeScript has not done type narrowing here 
    if (value === "foo") {
        
    }
}


const value4 = myFunction3("foo"); //const value4: number
const value5 = myFunction3("bar"); //const value5: string


function myFunction4(value : "foo" ) :  number;  
function myFunction4(value : "bar") : string  ;
function myFunction4(value : "foo" | "bar") : string | number {

    if (value === "foo") {
        // return a random number
        return Math.random(); 
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + "" ;
    }

    throw new Error("We shouldn't have got here"); 
}

const value6 = myFunction4("foo"); //const value6: number
const value7 = myFunction4("bar"); //const value7: string



function someOtherFunction<T extends "foo" | "bar" | "biz"> (value: T) : T extends "foo" ? number : T extends "bar" ? string : boolean {

    if (value === "foo") {
        return 999 as T extends "foo" ? number : T extends "bar" ? string : boolean ; 

    }
    if (value === "bar") {
        return "hi" as T extends "foo" ? number : T extends "bar" ? string : boolean ; 
    }

    if (value === "biz") {
        return false as T extends "foo" ? number : T extends "bar" ? string : boolean 
    }
}

