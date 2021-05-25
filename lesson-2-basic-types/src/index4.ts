


// For the following functions, fix the type errors
// By changing the implmentation of the function. 
// (ie. not by changing the typing of the function)



function getMyFavouriteNumber() : number{
    return "7"; 
}

function getMyFavouriteString() : string {

}

function returnNumberAsString(value? : number) {
    return value.toString();
}



function isNumberOdd(value: number) : boolean{
    if (value%2 ===0) {
        console.log("is even");
    }
    else {
        console.log("is odd");
    }
}

type Fruit =  {
    name: "apple" | "banana", 
    weight: number
    isRound: boolean;
}

function getMyFavouriteFruit() : Fruit {
    return {
        name: "apple", 
        isRound: true,
    }
}



type GetFruitFunction = (wantRoundFruit: boolean) => Fruit; 

function makeFruitSalad(nFruits: number, getFruitFn: GetFruitFunction) : Fruit[] {



    const fruits =  new Array(nFruits).fill(true).map(() => {
        return getFruitFn();
    })
}


function usesStringOrNumber(value: string | number) : string {

    return returnNumberAsString(value);
}




// For the following functions, change the type from 'unknown' to something else (not any!) to remove the type errors. 





type A = unknown; 


function usesA(value: A) {
    if (value <10 ) {
        console.log("is less than 10!"); 
    }
}

type B = unknown; 

function usesB(value: B) {
    console.log(value.subStr(1, 2 )); 
}


type C = unknown; 


function usesC(value:C) : number{


    const {
        a, b, c 
    } = value; 

    return a + b() + c("111"); 

}



type D = unknown; 

function usesD(value: D) : string[] {
    return value.map(v => v.name)
}

