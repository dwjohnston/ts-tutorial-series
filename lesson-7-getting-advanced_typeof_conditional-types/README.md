# Lesson 7 - Getting advanced - The easy stuff. 

In this lesson we are covering: 


- The `typeof` keyword
- Indexed acesss types 
- Conditonal types
- Function overloading
- `is` predicates





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


## keyof 

The `keyof` keyword will create a type that is _all of the keys_ of a type. We almost always use this when referring to a object type. 

```
type Foo = {
    a: string; 
    b: number; 
}

type KeyofFoo = keyof Foo; "a" | "b"; 
```


nb. `keyof` of things that are not object types will return a list of their properties!


```typescript
type Bar = "bar"; 
type KeyofBar = keyof Bar; 
//type KeyofBar = number | typeof Symbol.iterator | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | ... 35 more ... | "matchAll"
```




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
        return Math.random(); //Type 'number' is not assignable to type 'T extends "foo" ? number : string'.ts(2322)
    }
    if (value === "bar") {
        // Return a random string 
        return Math.random() + ""; //Type 'number' is not assignable to type 'T extends "foo" ? number : string'.ts(2322)
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


![but](./assets/but.png)

But you might be noticing, that what if we were adding `zip`, `zap`, `zing` `zerp`... etc? This is surely not particularly maintainable. We'll be talking about that in a later lesson about _mapped types_. 


## Type predicates - (the `is` keyword), (also, the `in` keyword)

An `is` predicate is essentially just a function that returns a boolean. But what it's really doing is providing a before-compile time hint to TypeScript to allow it to make inferences. 

As an example: 


```typescript
type Student = {
    id: string; 
    year: number; 
}

type Teacher = {
    id: string; 
    department: "Science" | "Math" | "English"; 
}



function grantAccess(person: Student | Teacher) {

    //Typescript doesn't like this, which is kind of annoying
    if (person.department) {

    }

    if ("department" in person) {
        //TypeScript is ok with this. 
        // But you can imagine this not working in some scenarios
    }
}
```


Alternative way to do it, is with an type predicate 


```typescript 

function personIsTeacher(person: Student | Teacher) : person is Teacher {
    return ("department" in person); 
}

function grantAccess2(person: Student | Teacher) {
    if(personIsTeacher(person)) {
        // This is more readable too
        console.log(person.department);
    }
}
```


What's happening here is that we are saying "if, at run time, this function returns true, then at compile time, we can treat the object as a `Teacher`". 




