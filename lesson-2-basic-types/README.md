# Lesson 2 - Basic Types 

## Why TypeScript?

- Get errors before runtime
- Makes you think about your code
- Improves your intellisense. 

**Exercise**

Look at the code in `index1.ts`. Note that we have ignored a compiler error with `@ts-ignore`. 

Run `yarn exercise1` - note the error we get. 

TypeScript assists us by telling us what is wrong _before_ we run the code. 

Especially on a larger, more complex code base this is going to save a lot of time!

To be clear - we like TypeScript _because_ it gives us errors. We would prefer to know about them earlier!


**Exercise** 

Open `index2.ts`

Where the comment is, start typing `foo.` and note all the suggestions that intellisense gives you. 

## Some Misconeptions about TypeScript

>TypeScript is to do Object Oriented TypeScript. 

Not true. The class construct is native JavaScript feature that was introduced in ES6, you can easily do OO without TypeScript. 

>TypeScript is a Micrsoft alternative/variant of JavaScript. 

TypeScript is created by Microsoft but it's not an alternative to JavaScript - it still compiles down to JavaScript. 

## Types

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

### Basic Types

See more here: 


Basic types: 

- string
- number
- boolean

Does what you expect. 

Also, other 'JavaScripty' types: 

- null
- undefined


### Narrow types

Those primitive types can also be narrowed to specific value of that type.

```
type Teacher = {
    type: "teacher"; 
    name: string; 
}
```


### The `type` keyword 

You can use the `type` keyword to declare a type. 

```
type MyType = string; 

type MyType2 = {
    a: string; 
}
```


### Object Types 

You can define a type that matches an Object

```
type MyType2 = {
    a: string; 
}
```

You can nest it as deeply as you want: 

```
type MyType3 = {
    a: string;
    b: {
        label: string; 
    } 
}
```

You can use the `Object` type I don't recommend it! - It doesn't contain any typing information, 

### Function types
```

    type SomeFunction = () => void; 

    type SomeFunction2 = (value: string) => number; 
    type SomeFunction3  = (value: MyType2) => number; 



```


You can use `Function` type - but I don't recommend it! It doesn't contain any typing information about the parameters. 




### What about the `interface` keyword? 

You may see some documentation that uses the `interface` keyword, instead of the `type` keyword. 

The interface keyword more or less is like creating an object type. 

```
type SomeObject = {
    a: string; 
}

interface SomeObject2 {
    a: string;
}

```

There are some _very_ subtle differences between thte two - you can read about them here: 

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces


My recommendation is that as a convention you only use the `interface` keyword in conjuction with an OO style of programming - ie, if you are going to do: 

```
interface IRunnable {
    run: () => string; 
}

class FooThing implements IRunnable {


    run() : string {
        return "hello";
    }
}

```

### Optional Types 

Use the `?` syntax when declaring types to denote that a type is optional. 

Note that using `?` is basically just creating a union type (more on that later), ie. the following are basicaly the same thing: 

```
type HasOptional = {
    a?: string; 
}

type HasOptional2 = {
    a: string | undefined; 
}

```
### Type Unions and Intersections 

You can union and intersect types ('or' and 'and' types)

```
// Union types

type MyUnionType = string | number; 

function usesUnionType(value: MyUnionType) {

}

usesUnionType("hello"); 
usesUnionType(999);
usesUnionType({a: "hello"}); //error!
usesUnionType(null); // error!

``` 


```


type SideA = {
    a: string; 
}

type SideB = {
    b: number; 
}


type Both = SideA & SideB; 

function usesBoth(value: Both) {

}


usesBoth({
    a: "hello"  //error!
}); 
usesBoth({
    b: 999      //error!
}); 

usesBoth({
    a: "hello", // No error!
    b: 999

}); 
```


Note that if you try intesect two types that are inherrently incompatiable, this will result in an `never` type (more below), and will likely show errors. 


```
type Impossible = string & number; // TypeScript doesn't show an error at this point. 

function usesImpossible(value: Impossible) {

}

usesImpossible(); //Expected 1 arguments, but got 0.ts(2554)
usesImpossible("a"); //Argument of type 'string' is not assignable to parameter of type 'never'.ts(2345)
```


### Arrays

There are two syntaxes for  declaring arrays: 

```
type ArrayOfNumbers1 = number[]; 
type ArrayOfNumbers2 = Array<number>; 

```

That second way, with the angle brackets, has simple use of a generic parameter, more about that later. 


### `any`, `unknown` and `never`

#### `any`

`any` is basically an escape hatch which tells TypeScript that anything goes. This removes the the advantage of using TypeScript to catch errors early!

```
function needsANumber(value: number) {

}

function usesAny (value: any) {

    value.ldfjadsljfdsjfkfdljk(); // No type errors here!
    const foo = value.aaaaa(); // The result of the function call will also be any; 


    needsANumber(foo);  // No type error, any satisfys all type constraints. 
}
```


#### `unknown`

`unknown` is similar to `any`, but is kind of the opposite. 

`unknown` tells TypeScript 'we don't know the type of this value, and we can't make any assumptions about it'. 

```
function returnsUnknown() : unknown {
    return ""; 
}

function usesUnknown(value: unknown) {


    value(); // error!
    value.toString();  //error!

    needsANumber(value); //error!
}


usesUnknown(99999); // Anything goes here!
usesUnknown(() => undefined); // Anything goes here!
usesUnknown(returnsUnknown()); // Anything goes here!

```

_If you don't know the type that is coming in, then use `unknown`_. 



`unknown` is useful for using at service boundaries. 

eg. Say you have some code like: 

```
type User = {
    name: string; 
}

async function getUser()  : Promise<User> {


    const result = await fetch("/hello"); 
    const json = await result.json();

    

    return json; 
}

```

We could do this - no type errors here! 

But we can't be sure that that end point returned data in the right format. 

To correct this, we migth create a function like this: 

```
function parseUser(_value: unknown) : User {


    // This is actually quite messy. I don't like it. 
    const value = _value as User; 

    if (value && value.name && typeof value.name === 'string'){
        return _value as User; 
    }
    else {
        throw new Error ("user was invalid!")
    }
}
```

That asserts, at runtime, that the unknown object really does have all the propeties we expect of it. 

There are libraries out there can create these validation functions from your typings. 

#### `never`


The `never` type is used to indicate that a given type is impposible. It's actually more useful than it sounds!

For example: 


```
type PossibleStrings = 'foo' | 'bar'; 


function fail() : never {
    throw new Error("This endpoint should never be reached");
}

function usesString(value: PossibleStrings) : number {
    if (value === 'foo') {
        return 1
    }; 

    if (value === 'bar') {
        return 2
    }; 


    return fail();


}
```

Now if we add another possible string, 


Waaaait, I would expect this would throw an error here. 


### Generic types

Generic types are going to be another lesson, but just know that when you see arrow brackets like 

```
type MyGeneric<T> = {
    value: T
}
```

that's a generically typed type. 


## Exercises

Open `index4.ts`

There are several type errors there. 

Fix them. 

