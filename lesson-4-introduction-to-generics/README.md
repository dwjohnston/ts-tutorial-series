# Introduction to generics

If you have used a programming language like Java you likely have already used generics before. 

Generics use the angle brackets (`<>`) and allow defining types of a specific type, but where that specific type is defined by the developer, not by the typing itself. 

Some examples to get us going, you might have already seen them: 

We can define an array in TypeScript in two ways: 

```typescript
type ListOfNumber2 = number[]; 
type ListofNumbers2 = Array<number>; 
```

These are functionaly exactly the same. I believe the first style is just a syntactic convenience.

Or if we create an async function, an async function always returns a Promise: 

```typescript

type User = {
    name: string; 
    id: string; 
}

async function fetchUser() : Promise<User> {
    return {
        name: "bob", 
        id: "123", 
    };
}
```

Internally the way I read these generics is 'Array of number' or 'Promise of user' - It's an Array object, but the type of value the array contains is a number. 

## Creating our first generic

We can declare a generic by opening angled brackets after declaring the type. 

```typescript
export type MyFirstGeneric<T> = {
    value: T; 
    name: string; 
}
```

The `T` in this case is a called a _generic parameter_. It's similar to a function parameter in that is an input value (an input type in this case) that determines how the thing will behave, in this case what typing information it will assume it will have. 

The label `T` is nothing special, it's just generic parameter name. Convention is that in most documentation for simple generic parameters a single `T` is used, which flys in the face of the advice of 'don't use single letter variable names'. 

For more real world generic parameters, the convention is to prefix the generic parameter with `T` to a descriptive PascalCase name, eg `TValueType` or `TUser` etc. 

## Using a generic

Let's say you have a function that wants to use this type, but only for values of type `string`, then you would do this: 


```typescript
function usesFirstGeneric(obj: MyFirstGeneric<string>) {
    console.log(obj.value); //(property) value: string
}

usesFirstGeneric({
    value: "foo", 
    name: "a"
}); 

usesFirstGeneric({
    value: 9, //Type 'number' is not assignable to type 'string'.ts(2322)
    name: "a"
}); 
```

The function knows that the type of `obj.value` is always a string. 


What's say we don't want to restrict the function to just the `value` being string? 

Well, we can use an unknown type here: 

```typescript 
function usesFirstGeneric2(obj: MyFirstGeneric<unknown>) {
    console.log(obj.value); //(property) value: unknown

}

usesFirstGeneric2({
    value: "foo", 
    name: "a"
}); 


usesFirstGeneric2({
    value: 9, 
    name: "a"
}); 
```

## Adding generic typings to a function 

Just as we can add generic typings to a _type_ we can also add generic typings to a function. 

eg.

```typescript
function myFirstGenericFunction<T> (value: T) {
    
}
```

When we call the function, we can tell the function what the generic arguments is: 

```typescript
myFirstGenericFunction<string>("hello"); 
myFirstGenericFunction<string>(999); // Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
```

**However!** We don't _have_ to explicitly state what the generic arguments, TypeScript will _infer_ the generic arguments, by examining the types of the function arguments. 


```typescript
myFirstGenericFunction("bob"); //function myFirstGenericFunction<string>(value: string): void
```

In the above scenario, TypeScript  infers that because the value passed into the function is a `string` that the generic argument must be `string. 

🤔 Why has TypeScript inferred it as type `string` and not as type `"bob"`? 

For the most part, when using generic functions you don't need to explicitly state the generic arguments. There are scenarios where you might want to do this, we will cover them later. 
## T is always T. 

We can reference the generic parameter T in many places, including the return value of a function. 

eg: 

```typescript 
function mySecondGenericFunction<T> (value: T) : T {
    return value; 
}

const a = 1 as number; // I'm intentionally widening the type to number, for clarity. 
const b = mySecondGenericFunction(a); //const b: number

const c = "foo" as string; 
const d = mySecondGenericFunction(c); //const d: string


```

Here, this function's value parameter has the same type as the functions return value. Not the same _value_ but the same _type_!


## Constraining generic parameters

You can constrain the kind of types that a generic parameter is allow to be using the `extends` keyword, and this is something you will want to do a lot.

For example, taking the previous example, if we want to the value parameter and return value to be the same type, but only a string or a number we can do: 

function mySecondGenericFunction<T extends > (value: T) : T {
    return value; 
}

```typescript
function myThirdGenericFunction<T extends string | number> (value: T) : T {
    return value; 
}

const e = 1 as number; 
const f = myThirdGenericFunction(e); 

const g = "foo" as string; 
const h = myThirdGenericFunction(g); 

const i = {
    hello: "world"
}; 

const j = myThirdGenericFunction(i); // Argument of type '{ hello: string; }' is not assignable to parameter of type 'string | number'.
```


## Wait, so why are we doing this? 

So you might be asking with these examples - why do we need to introduce a generic parameter, why can't we type the value and return type directly, like: 

``` typescript

function myNonGenericFunction(value: string | number) : string | number {
    return value; 
}
```

Well, lets see how this behaves: 

```typescript
const k = 1 as number; 
const l = myNonGenericFunction(k); //const l: string | number
```

Here, what's happened is that even though we know `k` is a number, the return type is `string | number`, we've lost typing information, which will be a huge pain. 

eg: 

```typescript

function justAPlainStringFunction(input: string) : string {
    const result =  myNonGenericFunction(input); //const result: string | number
    return result; //Type 'string | number' is not assignable to type 'string'.
}
```

Using the generic parameter means that we are are being more specific about how we are saying the function behaves 'I always return the same type as the value passed in' as opposed to 'maybe I return a string, maybe I return a number'. 


## Generic parameters can be passed as generic arguments to other generics

Let's use our two generics we've created together: 

```typescript 
function myFourthGenericFunction<T extends string | number> (obj: MyFirstGeneric<T>) : T {
    return obj.value; 
}


```

Let's step through what we are doing here: 

1. We are introducing generic paramter T and we are saying that it must be a `string` or a `number`. 
2. We are saying that `obj` parameter of our function must be an object matching the shape `MyFirstGeneric` with its generic type being that generic type that we introduced. 
3. We are saying that the return value of this function is that generic value T. 


The result: 

```
myFourthGenericFunction("hello"); //Argument of type 'string' is not assignable to parameter of type 'MyFirstGeneric<string | number>'.ts(2345)

myFourthGenericFunction({
    name: "hello", 
    value: { //Type '{ thisIsAnObject: true; }' is not assignable to type 'string | number'.
        thisIsAnObject: true
    }
}); 

const m = "hello" as string; 
const n = myFourthGenericFunction({ // const n: string
    name: "hello", 
    value: m
}); 
```


Here the first scenario has an error because "hello" doesn't match the expected shape of the `MyFirstGeneric` object. 
 
The second errors because although the value does fit a  `MyFirstGeneric` generally - `{thisIsAnObject: true}` is not a `string | number`. 

The third shows us that the result is a type `string`. 



## You don't have to specify the function generic parameter, but it can be helpful. 

I mentioned that when using a generic function you usually don't need to explicitly state the generic arguments, as they will be inferred. However, in some cases it can be useful. 

For example, when you when you want to widen the type. I use this often with React's `setState` function: 

```typescript
const MyComponent = () => {
    const [value, setValue] = React.useState(null); 

    return <div> 
        {/* Argument of type 'string' is not assignable to parameter of type 'SetStateAction<null>'.ts(2345) */}
        <input type ="text" onChange = {(e) => setValue(e.target.value) }/> 
    </div>
}; 
```

Here, because TypeScript has inferred the type as a `null` type, rather than `null | string` type, I am getting TypeErrors in my change handler. 

To avoid this, I typically state the generic argument. 

```typescript
const MyComponent2 = () => {
    const [value, setValue] = React.useState<string | null>(null); 

    return <div> 
        <input type ="text" onChange = {(e) => setValue(e.target.value) }/> 
    </div>
}; 
```


TODO 

Another case is when the function will otherwise return an `any` or `unknown` type, for example when using axios to make API calls. 

Here, axios allows you to 

## Generic parameters can reference each other. 

For example: 

``` typescript
type Jackpot<T extends string | number> = {
    winningValue: T; 
    prizeType: "money" | "holiday"; 
}

function verifyJackpot<TPayloadType extends string |number, TJackpot extends Jackpot<TPayloadType>> (possibleValues: Array<TPayloadType>, jackpot: TJackpot) : TJackpot  {
    if (possibleValues.includes(jackpot.winningValue)){
        return jackpot; 
    }
    else {
        throw new Error("The jackpot was not valid");
    }
}

// Note that the generic variables can be referenced in any order
function verifyJackpot2<TJackpot extends Jackpot<TPayloadType>, TPayloadType extends string |number> (possibleValues: Array<TPayloadType>, jackpot: TJackpot) : TJackpot  {
    if (possibleValues.includes(jackpot.winningValue)){
        return jackpot; 
    }
    else {
        throw new Error("The jackpot was not valid");
    }
}
```



## @ts-expect-error

`//@ts-expect-error` is a helpful tool, particularly in writing tests. 

It will show an error if TypeScript _is not_ giving an error. 

This is helpful when writing tests to check that TypeScript is giving you errors in the right places: 

```typescript
describe("A test", () => {

    it ("has type errors in the right places", () => {

        //@ts-expect-error
        returnsAString("hello");
    }); 
}); 
```