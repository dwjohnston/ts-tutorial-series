/**
 * VARIABLE REASSIGNMENT
 */

const foo = {
    name: 'bob'
}; 

console.log(foo); 

try {
    // This will give a runtime error!
// Object _reassignment_ is not allowed with the const keyword. 
    foo = {
        name: 'alice'
    }; 
}catch(err) {
    console.log(err);
}

/**
 * OBJECT MUTATION
 */

// But object _mutation_ is A-OK.
foo.name = 'alice'; 
console.log(foo);


/**
 * OBJECT.FREEZE
 */

//of course, you can use Object.freeze to prevent mutation. 

const foo2 = Object.freeze(foo); 
console.log(foo2);

// This won't give a runtime error, but the object won't be mutated. 
foo2.name = 'chaz'; 

console.log(foo2);


// But object.freeze is shallow
const bar = {
    name: "foo", 
    obj: {
        value: 1
    }
}

const frozenBar = Object.freeze(bar); 
console.log(frozenBar); 

frozenBar.obj.value = 10; 
console.log(frozenBar);