type Bar = Readonly<{
    name: string; 
    obj: {
        value: number; 
    }
}>; 

const bar : Bar = {
    name: "bob", 
    obj: {
        value: 999
    }
}; 


bar.name ="aaa"; //Cannot assign to 'name' because it is a read-only property.ts(2540)
bar.obj.value = 9999; 



const foo = {
    a: {
        b: "hello"
    }
}; 
// const foo: {
//     a: {
//         b: string;
//     };
// }

const foo2 = Object.freeze(foo);
// const foo2: Readonly<{
//     a: {
//         b: string;
//     };
// }>
