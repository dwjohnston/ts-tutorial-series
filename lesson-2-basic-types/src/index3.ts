// Primitive types

type ExampleTypes = {
    a: string; 
    b: number; 
    c: boolean; 
    d: null; 
    e: undefined; 
    
}

// Narrow type


type Teacher = {
    type: "teacher"; 
    name: string; 
}

function usesTeacher(teacher: Teacher) {

}

usesTeacher({
    name: "bob", 
    type: "teacher"
})

usesTeacher({
    name: "bob", 
    type: "aaa" //Error!
})


// Using the `type` key word
type MyType = string; 

type MyType2 = {
    a: string; 
}


// Object type
type MyType3 = {
    a: string;
    b: {
        label: string; 
    } 

    
}


// Function types

type SomeFunction = () => void; 

type SomeFunction2 = (value: string) => number; 
type SomeFunction3  = (value: MyType2) => number; 



// Example of interface
interface IRunnable {
    run: () => string; 
}

class FooThing implements IRunnable {


    run() : string {
        return "hello";
    }
}

// Optional Types 


type HasOptional = {
    a?: string; 
}

type HasOptional2 = {
    a: string | undefined; 
}



// Union types

type MyUnionType = string | number; 

function usesUnionType(value: MyUnionType) {

}

usesUnionType("hello"); 
usesUnionType(999);
usesUnionType({a: "hello"}); //error!
usesUnionType(null); // error!



// Intersection type: 


type SideA = {
    a: string; 
}

type SideB = {
    b: number; 
}


type Both = SideA & SideB; 

function usesBoth(value: Both) {

}


usesBoth({
    a: "hello"  //error!
}); 
usesBoth({
    b: 999      //error!
}); 

usesBoth({
    a: "hello", // No error!
    b: 999

}); 



// Impossible intersection type


type Impossible = string & number; // TypeScript doesn't show an error at this point. 

function usesImpossible(value: Impossible) {

}

usesImpossible(); //Expected 1 arguments, but got 0.ts(2554)
usesImpossible("a"); //Argument of type 'string' is not assignable to parameter of type 'never'.ts(2345)



// Use of any



function needsANumber(value: number) {

}

function usesAny (value: any) {

    value.ldfjadsljfdsjfkfdljk(); // No type errors here!
    const foo = value.aaaaa(); // The result of the function call will also be any; 


    needsANumber(foo);  // No type error, any satisfys all type constraints. 
}



// Use of unknown 


function returnsUnknown() : unknown {
    return ""; 
}

function usesUnknown(value: unknown) {


    value(); // error!
    value.toString();  //error!

    needsANumber(value); //error!
}


usesUnknown(99999); // Anything goes here!
usesUnknown(() => undefined); // Anything goes here!
usesUnknown(returnsUnknown()); // Anything goes here!






type User = {
    name: string; 
}

async function getUser()  : Promise<User> {


    const result = await fetch("/hello"); 
    const json = await result.json();

    

    return json; 
}


function parseUser(_value: unknown) : User {


    // This is actually quite messy. I don't like it. 
    const value = _value as User; 

    if (value && value.name && typeof value.name === 'string'){
        return _value as User; 
    }
    else {
        throw new Error ("user was invalid!")
    }
}





type PossibleStrings = 'foo' | 'bar' | 'chaz'; 


function fail() : never {
    throw new Error("This endpoint should never be reached");
}

function usesString(value: PossibleStrings) : number {
    if (value === 'foo') {
        return 1
    }; 

    if (value === 'bar') {
        return 2
    }; 



    return fail();


}


const result = usesString("bar");