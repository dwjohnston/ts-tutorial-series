type SomeObject = {
    userType: "admin" | "user"; 
}


function usesAnObject(obj: SomeObject) {

}


usesAnObject({
    userType: "admin"
}); 




const theObject = {
    userType: "admin"
}; 

usesAnObject(theObject); //Argument of type '{ userType: string; }' is not assignable to parameter of type 'SomeObject'.





const theObject2 = {
    userType: "admin" as const
}; 

usesAnObject(theObject2);

const theObject3 = {
    userType: "admin" as "admin" | "user"
}; 

usesAnObject(theObject3);



const theObject4 = {
    userType: "admin"
} as SomeObject; 

usesAnObject(theObject4);

const theObject4b : SomeObject = {
    userType: "admin"
}; 

usesAnObject(theObject4b);



const theObject5 = Object.freeze({
    userType: "admin"
}); 

usesAnObject(theObject5);



const theObject6 = {
    userType: "admin"
} as const; 

usesAnObject(theObject6);



type SomeObject2 = {
    userType: "admin" | "user"; 
    b: {
        userType: "admin" | "user"
    }
}

function usesSomeObject2(obj: SomeObject2) {

}



const theObject7 = {
    userType: "admin", 
    b: {
        userType: "admin"
    }
} as const; 

usesSomeObject2(theObject7); 