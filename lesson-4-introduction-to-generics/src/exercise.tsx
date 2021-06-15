
// Exercise 1

// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation
export function returnsSameTypeAsValueParameter<T>(value: T) :T {
    return value; 
}


// Change the type
type Payload<T> = {
    value: T; 
    weight:number; 
}

// Exercise 2

// Change the function typing the such that the test does not have errors
// You do not need to change the function implementation
export function returnPayloadOfValue<T>(value:T) : Payload<T> {
    return {
        weight: Math.random(), 
        value: value
    }
}; 



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




// Exercise 5

// This function be showing a type error, but it is not. 
// Update the function typing such that it the fallback return statement has an error
function createStringFromNumber(value: number) {

    if (value) {
        return `${value}`; 
    }

    //@ts-expect-error
    return value; 
}



