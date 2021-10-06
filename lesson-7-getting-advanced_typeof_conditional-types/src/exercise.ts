const myObject = {

    objectName: "foobar", 
    objectValue: 111, 
    objectProperties: {
        isVisible: true, 
        color: "red", 
        age: 11, 
    }
}; 

/**ex.1 Do something here to avoid the type errors */

function doSomethingWithObject(obj) {
    console.log(obj.objectName); 
    console.log(obj.objectValue); 
    console.log(obj.objectProperties.color.split('')); 

    //@ts-expect-error
    console.log(obj.objectProperties.foobar); 
};

doSomethingWithObject(myObject); 
doSomethingWithObject({
    //@ts-expect-error
    foo: "bar"
}); 


/**ex.2 use an index access type to add typings to the function */
function updateObjectProperties(obj, newObjectProperties) {

    const newObj = {
        ...obj, 
        objectProperties: newObjectProperties
    }; 

    return newObj; 
}

// Correct usage
const newObj = updateObjectProperties(myObject, {
    isVisible: false, 
    color: "blue", 
    age: 12, 
})

// incorrect
const newObj2 = updateObjectProperties(myObject, {
    //@ts-expect-error
    foo: "bar"
})


// incorrect
const newObj3 = updateObjectProperties({
    //@ts-expect-error
    foo: "bar"
}, 
{
    isVisible: false, 
    color: "blue", 
    age: 12, 
}
); 



/**ex.3 
 *  The function below takes an object of shape PossibleProperties, and a key of the possible properties ("a" | "b" | "c")
 *  And returns the value. 
 * 
 *  You need the make the return type of the function to be properly type. 
 * 
 *  Note! This is quite an advanced challenge! 
 * 
 * You need to use: 
 * 
 * - Generics
 * - An index type
 * - The keyof operator 
 * */


type PossibleProperties = {
    a: string; 
    b: number; 
    c: {
        foo: string; 
        bar: number; 
    }
}; 


function getObjectProperty (properties , key) {
    return properties[key]; 
}

const properties: PossibleProperties  = {
    a: "hello",
    b: 99, 
    c: {
        foo: "fooby", 
        bar: 11
    }
}; 

//correct usage
const r1: string = getObjectProperty(properties, "a");

//incorrect - the key is bad
//@ts-expect-error
const r2: string = getObjectProperty(properties, "foo");

//incorrect the return type should typed
//@ts-expect-error
const r3 :number = getObjectProperty(properties, "a");



/** ex.4 Implement MyMapReturnType such that the myMap function has the right return signature. 

/**
myMap is a dumb mapping function, it takes a number, or an array of numbers, and coverts them into a string, or array of strings. 
 * @param value - an array of numbers, or a single number
 * @param fn  - function to transform a single number into a string
 * @returns - 
 */

 type MyMapReturnType<T extends number | number[]> = unknown;


function myMap<T extends number | number[]> (value: T, fn: (value: number) => string)  : MyMapReturnType<T>{


    if (Array.isArray(value)){
        return value.map(fn) as MyMapReturnType<T> 
    }
    else {
        return fn(value)as MyMapReturnType<T>; 
    }
}


// Correct use - single value - convert to string
const r6 : string = myMap(1, (v) => `${v}`); 
// Correct use - multiple values - convert to array of strings string
const r7 : string[] = myMap([1,2,3], (v) => `${v}`); 





/** ex.5 use function overloading to to implement myMap2 */

function myMap2(value: number[], fn: (v: number)=> string) : string[] {

    if (Array.isArray(value)){
        return value.map(fn); 
    }
    else {
        return fn(value); 
    }
}

// Correct use - single value - convert to string
const r8 : string = myMap2(1, (v) => `${v}`); 
// Correct use - multiple values - convert to array of strings string
const r9 : string[] = myMap2([1,2,3], (v) => `${v}`); 

