

// You don't need to touch this
type User = {
    id: string;
    firstName: string;
    lastName: string;
    role: "user" | "admin"
};

// You don't need to touch this
// Simulating saving a user to backend, where the id will be generated
export async function postUser(user: Omit<User, "id">): Promise<User> {
    const userId = Math.floor(Math.random() * 100000) + "";
    return {
        ...user,
        id: userId,
    }
}


// Finish implementing the functions
export async function createUser(firstName: string, lastName: string): Promise<User> {
    const user = {
        firstName,
        lastName,
        role: "user",
    }

    //postUser
    //return user; 


}

export async function createAdminUser(firstName: string, lastName: string): Promise<User> {
    const user = {
        firstName,
        lastName,
        role: "admin",
    }

    //postUser
    //return user

}





function doSomethingWithUser(user: User) {

}


const bob = {
    id: "123",
    firstName: "bob",
    lastName: "jones",
    role: "admin",
    address: "123 jones street",
    age: 29,
    favouriteMovie: "Up"
}

// Fix the type error 
doSomethingWithUser(bob);


// Fix the type error
doSomethingWithUser({
    id: "123",
    firstName: "jane",
    lastName: "does",
    role: "admin",
    address: "123 jane street",
    age: 31,
    favouriteMovie: "Down"
}) ;
