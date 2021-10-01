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



/**ex.3 use an index access type _and_ the keyof keyword to return the value of an object property*/


function getObjectProperty(obj, key) {
    return obj.objectProperties[key]; 
}


//correct usage
const r1: string = getObjectProperty(myObject, "color");

//incorrect - the key is bad
//@ts-expect-error
const r2: string = getObjectProperty(myObject, "foo");

//incorrect the return type should typed
//@ts-expect-error
const r3 :number = getObjectProperty(myObject, "color");



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

