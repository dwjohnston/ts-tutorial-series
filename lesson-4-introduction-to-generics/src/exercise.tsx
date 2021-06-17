
//EXERCISES

// I have created untyped functions here. 
// You need to type the functions such that the tests no longer have errors. 


// Exercise 1

// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation
export function returnsSameTypeAsValueParameter(value){
    return value; 
}


// Change the type
type Payload = unknown; 

// Exercise 2

// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation
export function returnPayloadOfValue(value) : Payload{
    return {
        weight: Math.random(), 
        value: value
    }
}; 

// Exercise 2.5 
// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation
// Do not allow typescript to infer the type. 

export async function fetchRandomUser() : unknown {
    return {
        name: "alice", 
        age: 11, 
    }
}; 

// Exercise 2.6

// nb. no corresponding test for this one

// This function be showing a type error, but it is not. 
// Update the function typing such that the fallback return statement has an error
function createStringFromNumber(value: number )  {

    if (value) {
        return `${value}`; 
    }

    return value; 
}




type PossibleColors = "red" | "green" | "blue"; 

// Exercise 3

// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation
export function returnFavouriteColor(color) {
    return color; 
}

// Exercise 4

// You need to add a generic to the type. 
type Fruit = {
    color: PossibleColors; 
    fruitName: string; // You do not need to change this line - we are ok with the actual fruits being just a string for this exercise
}

// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation 
export function createFruitFromColor(color: PossibleColors) : Fruit {
    
    const fruits  = {
        "red": [
            "apple", 
            "cherry"
        ], 
        "green": [
            "pear", 
            "grape"
        ], 
        "blue": [
            "blueberry", 
        ]
    } as Record<PossibleColors, Array<string>>; 
    
    
    const possibleFruits = fruits[color]; 

    const fruit = {
        color, 
        fruitName: possibleFruits[Math.floor(possibleFruits.length * Math.random())]
    }; 

    return fruit; 
}







// Exercise 6 

// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation

// You need to implement this type
type CType = unknown; 

export function someFunction(a, b, c) {
    return c; 
}



//Exercise 7

// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation

export function callTheFunctionForMe<TParam, TReturnType>(fn, param)  {
    return fn(param); 
}