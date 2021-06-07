# Lesson 3 - TypeScript is clever

In this lesson we are going to talk about some ways typescript works, and letting typescript work for you. 


## The primary tool we will use in this tutorial - mouse over in VSCode

If you mouse over a variable in VSCode it will tell you its type information. 

In this lesson in any code examples, I will print what is displayed as a comment beside the code when I want to highlight something. 

eg. 

``` typescript
let a = "hello"; //let a: string
const b = "world"; //const b: "world"
```

I will also put any errors as a comment beside the code. 

```typescript
const myStr: string = 9; //Type 'number' is not assignable to type 'string'.ts(2322)
```

## Type assertions 

We can assert the type of variable by using a colon (`:`). 

For example: 

```typescript
const alpha : string = "andy"; 
```

If the type doesn't match, you will get an error, as we saw before: 

```typescript
const myStr: string = 9; //Type 'number' is not assignable to type 'string'.ts(2322)
```

This can be useful in same cases when declaring the existence of a complicated object, in a test for example: 

```typescript

type SomeObject = {
    a: string; 
    b: number; 
    c: () => number; 
}; 

const instanceOfSomeObject: SomeObject = {
    a: "ehllo", 
    b: 9, 
    c: () => { //Type '() => void' is not assignable to type '() => number'.

    }
}; 
```

It might be tempting to type assertions everywhere, 'to be extra safe!', like: 

```typescript
function createNumber() : number {
    return 9; 
}

function usesNumber(value: number) {

}
 // Asserting here that 'foundNumber' is a number isn't neccessary
const foundNumber: number = createNumber(); 
usesNumber(foundNumber);
```

But this isn't neccesary - TypeScript already knows the the type of foundNumber is `number`. 

This is what we will be talking about in this lesson. 



## Inference 

You'll likely hear the term 'inference' or 'infer' a lot when talking about TypeScript, as in 'TypeScript will _infer_ the type'. 

What we mean is that 'given what you (the developer) have told us (the TypeScript engine) we can logically deduce, logically _infer_ XYZ'. 

## Examples of inference

### Variable assignment

Take a previous example: 

```
let a = "hello"; //let a: string
const b = "world"; //const b: "world"
```

When we assign we `let a = "hello"` TypeScript _infers_ that the type of `a` is a string. We have't written a single line of TypeScript syntax, but TypeScript is already adding typings to your code. 

With the const - TypeScript is smarter - it knows that because you can't reassign a const, it's impossible for `b` to be anything but `"world"` and so assigns with the narrower `"world"` type, rather than a string. 

Note though that this inference might get in your way - for example, if we wanted to later reassign `a` to `9`, we get an error: 

```typescript
a = 9; //Type 'number' is not assignable to type 'string'.ts(2322)
```

The way we would resolve this is with a _type coercion_, like: 


```typescript
let c = "hello" as string | number; 
c = 9; 
```

Here what we're doing is just telling typescript that, "Hey, this string here, I want you to treat it like a `string | number`" and that is logically consistent so TypeScript is ok with it. 

If on the other hand, you were do try do a type coercion that doesn't make sense, like: 

```typescript
let d = "hello" as number; //Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.ts(2352)
```

TypeScript will complain. 

You can, as an escape hatch cast to `unknown` first: 

```typescript
let e = "hello" as unknown as number; 
```

However, this is a nuclear option. 

Generally as a rule for type coercion: 

- It is always ok to do a `as SomeWiderType` coercion if that's what is needed. 
- You avoid `as unknown as SomeOtherType` coercions, and that can lead to errors that TypeScript will not detect, because you overrode it. 

### Return statements / inferring the return type of a function

If you do not declare the return type of a function, TypeScript will infer it: 

```typescript 
const myFunction = () => {
    const random = Math.random(); 
    if (random> 0.5) {
        return "hello"!
    } else {
        return 9; 
    }
}

const result = myFunction(); //const result: "hello" | 9

```

Here, TypeScript knows that the only possible values this function can return are "hello" or 9. 

#### Should you allow TypeScript to infer function return values? 

I say no. 

Despite TypeScript being able to _infer_ the return value of a function, I think it is better to be explicit about what the return value should be. 

The reason being - is that if you make a mistake in your function implementation, and say, forget to return a value, or return the wrong value type, then allowing TypeScript to infer the type will just mean that the function signature changes. 

For example, lets that in the previous function the `return 9` is a mistake, we really mean to return `"9"`, if we explicitly set the return type, then we get an error: 

```typescript 
const myFunction2 = () : string => {
    const random = Math.random(); 
    if (random> 0.5) {
        return "hello"!
    } else {
        return 9; //Type 'number' is not assignable to type 'string'.ts(2322)

    }
}
```

### Type Exhaustion 

Where a given type can be one of many things, TypeScript will narrow the type as it learns that a given type isn't possible. 

For example: 

```typescript
const hasManyTypes = (value: "foo" | "bar" | "biz") =>  {

    if (value === "foo") {
        console.log(value); //(parameter) value: "foo"
        return;
    }

    // TypeScript knows at this point that the value can not be "foo" because if it were, we have already returned. 
    if (value ==="foo") { //This condition will always return 'false' since the types '"bar" | "biz"' and '"foo"' have no overlap.ts(2367)

    }

    if (value === "bar") { //(parameter) value: "bar" | "biz"
        console.log(value);
    }
}
```

Similarly this can apply to object types: 

```typescript
type Teacher = {
    type: "teacher", 
    degree: string; 
}

type Student = {
    type: "student"
    age: number; 
}

function processPerson(person: Student | Teacher) {
    if (person.type ==="teacher") {
        console.log(person.degree);
        console.log(person.age); //Property 'age' does not exist on type 'Teacher'.ts(2339)
    }
}
```

This can be very helpful when coding and using the VSCode intellisense!

Additionally, if you do a `typeof` command (The JavaScript command) then TypeScript will do type narrowing based on that result: 

```typescript

function useStringOrNumber(value: string | number) {
    if (typeof value === "string") {
        console.log(value); //(parameter) value: string

    }
}
```


### But TypeScript isn't that smart. 

For example: 

```typescript
function conditonalTypeIsNotInferred(value: "foo" | "bar") {
    if (value === "foo") {
        return 1; 
    }
    else {
        return 2; 
    }
}

const result2 = conditonalTypeIsNotInferred("foo"); //const result2: 1 | 2

```

Here, logically we can see that if the value passed in is "foo", then the expected result will _always_ be 1. However TypeScript isn't smart enough to infer this by itself. We can write some code to do this, it's called _conditional typing_ and we will cover that in a later lesson. 


### As function parameters

This you will commonly encounter with React, typically when you are passing onClick, onChange handlers into a compoennt. 

Here's a non-react example: 

```typescript 

type CallBackFunction = (value: string) => void; 

const functionThatTakesACallback = (fn: CallBackFunction) => {
    const myString = "hello"; 
    fn(myString);
}

const callback = (value) => { //Parameter 'value' implicitly has an 'any' type.ts(7006)

}

functionThatTakesACallback(callback); 

// Here when we declare the function inside the function parameters, TypeScript automatically infers the types of the callback params. 
functionThatTakesACallback((value) => {
    console.log(value); // (parameter) value: string
})
```

Here is a React example: 


```tsx
const MyComponent = () => {


    const inputHandler = (e) => { //Parameter 'e' implicitly has an 'any' type.ts(7006)

    }; 

    return <div> 
        <input onChange = {inputHandler}/> 
        <input onChange = {e => { //(parameter) e: React.ChangeEvent<HTMLInputElement>
                console.log(e.target.value);
        }}/>
        
    </div> 
}
```

Now, you may have heard that you shouldn't declare inline event handlers like this in React, for performance reasons. We will discuss this later. 

But this example demonstrates one _very good_ reason to want to declare event handlers inline, the automatic type inference of the callback parameter types is much easier to work with than having to manually look up and declare what those parameter types are. 

I'll note also that _it would be nice_ if TypeScript could see that, in this example, `inputHandler` is only being used in one place, for the parameter types to be inferred. However, that's not something TypeScript can do. 

TODO: there must be a github issue about this. 







## I don't have anything past inference. 

## Exercise 3 - 
