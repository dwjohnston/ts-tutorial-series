type SomeObject = {
    userType: "user" | "admin"
    name: string; 
}


export function makeAdmin<T extends SomeObject> (value: T) : T {

    // Type '{ userType: "admin"; name: string; }' is not assignable to type 'T'.
    // '{ userType: "admin"; name: string; }' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'SomeObject'.ts(2322)
    return {
        userType: "admin", 
        name: value.name
    }; 
}



export function makeAdmin2<T extends SomeObject> (value: T) : {
    userType: "admin", 
    name: string; 
} {

  return {
        userType: "admin", 
        name: value.name
    }; 
}