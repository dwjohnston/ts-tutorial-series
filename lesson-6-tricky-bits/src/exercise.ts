

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


// Fix the type errors.
export async function createUser(firstName: string, lastName: string): Promise<User> {
    const userData = {
        firstName,
        lastName,
        role: "user",
    }

    const newUser = await postUser(userData);
    return newUser; 
}

export async function createAdminUser(firstName: string, lastName: string): Promise<User> {
    const userData = {
        firstName,
        lastName,
        role: "admin",
    }; 

    const newUser = await postUser(userData);
    return newUser; 
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
