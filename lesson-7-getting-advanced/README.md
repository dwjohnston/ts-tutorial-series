# Lesson 7 - Getting advanced - The easy stuff. 


## typeof 

I've been holding out on you. `typeof` is the most awesome keyword, it almost feels like cheating. 

`typeof` will get the inferred type of a variable as a type. 

For example: 

```typescript

const someThing = {
    a: "hello", 
    b: 99
}; 


type MyType = typeof someThing; 
//type MyType = {
//    a: string;
//    b: number;
//}
```

**nb.** There is also a JavaScript `typeof` operator - They are not the same thing!

## Indexed access types 

You can reference a part of of a type via indexing, similar to how you do with objects. 

eg. 

```typescript
type MyObject = {
    name: string; 
    somethingComplicated: {
        a: string; 
        b: number; 
    }
}


function createMyObject(theComplicatedBit: MyObject['somethingComplicated']) {

}

```

This is particularly helpful not having to copy paste types everywhere. 

Where I tend to use this is referencing just one prop of a React component. 

## Conditional types 

Conditional types are useful and common used in conjunction with generics. 

For example, lets say I've got the plain JavaScript function: 

```javascript
function myFunction(value) {

    if (value === "foo") {
        // return a random number
        return Math.random(); 
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + ""; 
    }

    throw new Error("We shouldn't have got here"); 
}
```

This looks similar to something we did in lesson-3 in type inferences. Let's make this TypeScript and allow TypeScript to infer the return type. 

```typescript
function myFunction(value : "foo" | "bar") {

    if (value === "foo") {
        // return a random number
        return Math.random(); 
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + ""; 
    }

    throw new Error("We shouldn't have got here"); 
}

const value = myFunction("foo");  //const value: string | number
const value2 = myFunction("bar"); //const value2: string | number
const value3 = myFunction("aaa"); //Argument of type '"aaa"' is not assignable to parameter of type '"foo" | "bar"'.ts(2345)
```

We can see that TypeScript infers the return type as `string | number` even though we know that if the input value is `"foo"` then the return type will always be `number`. 

To achieve this we can use a generic and a conditional type: 

```typescript
function myFunction2<T extends "foo" | "bar">(value : T) : T extends "foo" ? number : string {

    if (value === "foo") {
        // return a random number
        return Math.random(); 
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + ""; 
    }

    throw new Error("We shouldn't have got here"); 
}

```

Unfortunately, this doesn't work out the box, it's a limitation of TypeScript - see open issue here: https://github.com/microsoft/TypeScript/issues/33912

Basically what the issue seems to be that if you are using generics, TypeScript does not perform type narrowing as it otherwise does. 

https://stackoverflow.com/questions/60475431/generic-type-extending-union-is-not-narrowed-by-type-guard


```typescript
function foo(value: "foo" | "bar") {
    if (value === "foo") {
       return "";  
    }

    // TypeScript knows that it's not possible for value to be "foo"
    if (value === "foo") { //his condition will always return 'false' since the types '"bar"' and '"foo"' have no overlap.ts(2367)
        
    }
}


function foo2<T extends "foo" | "bar">(value: T) {
    if (value === "foo") {
       return "";  
    }

    // TypeScript has not done type narrowing here 
    if (value === "foo") {
        
    }
}
```


So one thing you can do here is coerce the type: 


```typescript
function myFunction3<T extends "foo" | "bar">(value : T) : T extends "foo" ? number : string {

    if (value === "foo") {
        // return a random number
        return Math.random() as T extends "foo" ? number : string; 
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + "" T extends "foo" ? number : string; 
    }

    throw new Error("We shouldn't have got here"); 
}

const value4 = myFunction3("foo"); //const value4: number
const value5 = myFunction3("bar"); //const value5: string
```


There's no concept of a switch statement for a conditional return type, so it's not uncommon to see chained ternary operators in a conditional type: 

```typescript
function someOtherFunction<T extends "foo" | "bar" | "biz"> (value: T) : T extends "foo" ? number : T extends "bar" ? string : boolean {

    if (value === "foo") {
        return 999 as T extends "foo" ? number : T extends "bar" ? string : boolean ; 

    }
    if (value === "bar") {
        return "hi" as T extends "foo" ? number : T extends "bar" ? string : boolean ; 
    }

    if (value === "biz") {
        return false as T extends "foo" ? number : T extends "bar" ? string : boolean 
    }
}

```

### You might not need conditional types - function signature overloading 

An alternative, is that you can _overload_ the function signature, and avoid generics and conditional types: 

```typescript
function myFunction4(value : "foo" ) :  number;  
function myFunction4(value : "bar") : string  ;
function myFunction4(value : "foo" | "bar") : string | number {

    if (value === "foo") {
        // return a random number
        return Math.random(); 
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + "" ;
    }

    throw new Error("We shouldn't have got here"); 
}

const value6 = myFunction4("foo"); //const value6: number
const value7 = myFunction4("bar"); //const value7: string
```

![mind blown](./assets/mind-blown-explosion.gif)




## Type predicates - (the `is` keyword)

