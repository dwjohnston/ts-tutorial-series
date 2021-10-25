// ABANDONED THIS APPROACH, AS YOU ARE ACTUALLY MAPPING BETWEEN TWO TYPES, AND THERE ARE ISSUES. 



const assert = require('assert');

/** We have three kinds of users
 * 
 * Teacher
 * Student
 * Admin
 */

type CourseTypes = "Science" | "Math" | "Arts";

type Teacher = {
    userType: "teacher",
    firstName: string;
    lastName: string;

    teacherType: "Professor" | "Lecturer" | "Tutor";
    field: CourseTypes;
}

type Student = {
    userType: "student",
    firstName: string;
    lastName: string;

    major: CourseTypes
};

type Admin = {
    userType: "admin",
    firstName: string;
    lastName: string;

    accessLevel: 1 | 2 | 3;
}


// We also have three kinds of access tokens: 

type PossibleSoftware = "Course Reader" | "Sci Journal" | "Code Writer";

type UserAcessToken = {
    accessType: "user",
    softwareAvailable: Array<PossibleSoftware>;
}

type StaffAccessToken = {
    accessType: "staff";
    specialRoomAccess: boolean;
}

type AdminAccessToken = {
    accessType: "admin",
    adminPrivileges: {
        read: boolean;
        write: boolean;
        execute: boolean;
    }
};



// Task 1 - (Already completed)
// Using function overloading ,
// Write a function that creates an access token for a user 


type PossibleUsers = Student | Teacher | Admin;
type PossibleAccessTokens = UserAcessToken | StaffAccessToken | AdminAccessToken

// function createAccessToken(user: Student): UserAcessToken
// function createAccessToken(user: Teacher): TeacherAccessToken
// function createAccessToken(user: Admin): AdminAccessToken
// function createAccessToken(user: PossibleUsers): PossibleAccessTokens {



//     //Rules: 

//     // All students get access to Course Reader
//     // Science students get access to Sci Journal 
//     // Math students get access to Code Writer


//     // Only Profressors get access to the special room 

//     // level 1 admin = read
//     // level 2 admin = read + write
//     // level 3 admin = read + write + execute 

//     if (user.userType === "student") {

//         let extraSoftwareAccess = [] as Array<PossibleSoftware>
//         switch (user.major) {
//             case "Science": {
//                 extraSoftwareAccess = ["Sci Journal"];
//                 break;
//             }

//             case "Math": {
//                 extraSoftwareAccess = ["Code Writer"]
//                 break;
//             }

//             case "Arts": {
//                 break;
//             }
//         }

//         return {
//             accessType: "user",
//             softwareAvailable: ["Course Reader", ...extraSoftwareAccess,]
//         }

//     }

//     if(user.userType === "teacher") {
//         return {
//             accessType: "staff", 
//             specialRoomAccess: user.teacherType === "Professor"
//         }; 
//     }

//     if (user.userType === "admin") {

//         return {
//             accessType: "admin", 
//             adminPrivileges: {
//                 read: user.accessLevel >=1, 
//                 write: user.accessLevel >= 2, 
//                 execute: user.accessLevel >= 3
//             }
//         }
//     }


//     throw new Error("We shouldn't have got here");
// }

assert.equal(createAccessToken({
    firstName: "Alice",
    lastName: "Alison",
    userType: "student",
    major: "Science",
}), {
    accessType: "user",
    softwareAvailable: ["Course Reader", "Sci Journal"]
});

assert.equal(createAccessToken({
    firstName: "Andy",
    lastName: "Andyson",
    userType: "student",
    major: "Arts",
}), {
    accessType: "user",
    softwareAvailable: ["Course Reader"]
});

assert.equal(createAccessToken({
    firstName: "Bob",
    lastName: "Bobson",
    userType: "teacher",
    teacherType: "Professor",
    field: "Math"
}), {
    accessType: "staff",
    specialRoomAccess: true,
});

assert.equal(createAccessToken({
    firstName: "Cindy",
    lastName: "Cindyson",
    userType: "admin",
    accessLevel: 1,
}), {
    accessType: "admin",
    adminPriviledges: {
        read: true,
        write: false,
        executre: false,
    }
});


// Type Assertions 


//STUDENT / USER TOKEN

//@ts-expect-error -garbage major
createAccessToken({
    firstName: "Alice",
    lastName: "Alison",
    userType: "student",
    major: "asdasd",
});


const at1 = createAccessToken({
    firstName: "Alice",
    lastName: "Alison",
    userType: "student",
    major: "Science",
});

//@ts-expect-error - we shouldn't expect a user token to have a specialRoomAccess field
console.log(at1.specialRoomAccess);
//@ts-expect-error - shouldn't have admin priviledges on User token
console.log(at1.adminPrivileges);
console.log(at1.softwareAvailable);


// TEACHER / STAFF TOKEN

const at2 = createAccessToken({
    firstName: "Alice",
    lastName: "Alison",
    userType: "teacher",
    field: "Science",
    teacherType: "Professor"
});

console.log(at2.specialRoomAccess);
//@ts-expect-error
console.log(at2.adminPrivileges);
//@ts-expect-error
console.log(at2.softwareAvailable);


// ADMIN / ADMIN TOKEN
const at3 = createAccessToken({
    firstName: "Alice",
    lastName: "Alison",
    userType: "admin",
    accessLevel: 3,
});

//@ts-expect-error
console.log(at3.specialRoomAccess);
console.log(at3.adminPrivileges);
//@ts-expect-error
console.log(at3.softwareAvailable);






// Ex2 - rewrite createAccessToken to use a type map to do the same thing. 

// function createAccessToken(user: Student): UserAcessToken
// function createAccessToken(user: Teacher): TeacherAccessToken
// function createAccessToken(user: Admin): AdminAccessToken


const tokenCreatorMap = {
    student: (user: Student) => {
        let extraSoftwareAccess = [] as Array<PossibleSoftware>
        switch (user.major) {
            case "Science": {
                extraSoftwareAccess = ["Sci Journal"];
                break;
            }

            case "Math": {
                extraSoftwareAccess = ["Code Writer"]
                break;
            }

            case "Arts": {
                break;
            }
        }

        return {
            accessType: "user",
            softwareAvailable: ["Course Reader", ...extraSoftwareAccess,]
        }
    },
    teacher: (user: Teacher) => {
        return {
            accessType: "staff",
            specialRoomAccess: user.teacherType === "Professor"
        };
    },
    admin: (user: Admin) => {
        return {
            accessType: "admin", 
            adminPrivileges: {
                read: user.accessLevel >=1, 
                write: user.accessLevel >= 2, 
                execute: user.accessLevel >= 3
            }
        }
    }
}


type UserDataMap = {
    student: {
        accessToken: UserAcessToken, 
        dataType: Student; 
    }, 
    teacher: {
        accessToken: StaffAccessToken, 
        dataType: Teacher; 
    }, 
    admin: {
        accessToken: AdminAccessToken, 
        dataType: Admin
    }
};


type UserMap = {
    student: Student;
    teacher: Teacher; 
    admin: Admin;
}

type UserToAccessToken = {
    student: UserAcessToken; 
    teacher: StaffAccessToken; 
    admin: AdminAccessToken; 
}


type AllPossibleUsers<T extends keyof UserMap> = UserMap[T] & string; 

type TokenCreatorMap<T extends UserMap, U extends UserToAccessToken> = {
    [K in (keyof T & keyof U)]: (user: T[K]) => U[K]; 
};








// function createAccessToken<T>): PossibleAccessTokens {



//     //Rules: 

//     // All students get access to Course Reader
//     // Science students get access to Sci Journal 
//     // Math students get access to Code Writer


//     // Only Profressors get access to the special room 

//     // level 1 admin = read
//     // level 2 admin = read + write
//     // level 3 admin = read + write + execute 

//     if (user.userType === "student") {

//         let extraSoftwareAccess = [] as Array<PossibleSoftware>
//         switch (user.major) {
//             case "Science": {
//                 extraSoftwareAccess = ["Sci Journal"];
//                 break;
//             }

//             case "Math": {
//                 extraSoftwareAccess = ["Code Writer"]
//                 break;
//             }

//             case "Arts": {
//                 break;
//             }
//         }

//         return {
//             accessType: "user",
//             softwareAvailable: ["Course Reader", ...extraSoftwareAccess,]
//         }

//     }

//     if(user.userType === "teacher") {
//         return {
//             accessType: "staff", 
//             specialRoomAccess: user.teacherType === "Professor"
//         }; 
//     }

//     if (user.userType === "admin") {

//         return {
//             accessType: "admin", 
//             adminPrivileges: {
//                 read: user.accessLevel >=1, 
//                 write: user.accessLevel >= 2, 
//                 execute: user.accessLevel >= 3
//             }
//         }
//     }


//     throw new Error("We shouldn't have got here");
// }