# Lesson 8 - Advanced - Mapped types and indexing on mapped types. 


Let's pick up in a similar place as where we left off in Lesson 7. 

To let's say we have some different event types: 

```typescript
type PossibleEventTypes = "foo" | "bar" | "biz"; 
```

And each of those event types have their own payload: 


```typescript
type FooPayload = {
    name: string; 
    age: number; 
}

type BarPayload = {
    value: number; 
    description: {
        shortDescription: string; 
        longDescription: string; 
    }
}

type BizPayload = {
    type: "blurp" | "derp"; 
    text: string; 
}


type PossibleEventPayloads = FooPayload | BarPayload | BizPayload; 
```

And now lets say we are going to create a function that creates a default payload, for a given event type. 

You'll recall we can't do: 

```typescript
function badGenerateDefaultEventPayload(eventType: PossibleEventTypes) : PossibleEventPayloads{

}

const z0 = badGenerateDefaultEventPayload("foo"); 

//Property 'name' does not exist on type 'FooPayload | BarPayload | BizPayload'.
console.log(z0.name); 
```

As TypeScript won't _discriminate_ (TODO: check terminology) the return type based the input type.

That is - TypeScript isn't narrowing the return type based on what `PossibleEventType` you gave it. The return type is always the union of all the possible payloads. 




Instead, we use function overloading, like we did in lesson 7: 


```typescript
function generateDefaultEventPayload(eventType: "foo") : FooPayload;  
function generateDefaultEventPayload(eventType: "bar") : BarPayload; 
function generateDefaultEventPayload(eventType: "biz") :  BizPayload; 
function generateDefaultEventPayload(eventType: PossibleEventTypes) : PossibleEventPayloads{
    

    if (eventType === "foo") {
        return {
            name: "bob", 
            age: 99, 
        }; 
    }

    if (eventType === "bar") {
        return {
            value: 99, 
            description: {
                shortDescription: "short desc", 
                longDescription: "longer desc",
            }
        }
    }

    if (eventType === "biz") {
        return {
            type: "blurp", 
            text: "lalalalal"
        }
    }


    throw new Error ("We should not have reached here");
}


const a = generateDefaultEventPayload("foo"); 
//@ts-expect-error - TypeScript knows that this can only be a FooPayload
const a2: BarPayload = generateDefaultEventPayload("foo"); 
```

Now already we can kind of see that this looking a bit cumbersome to maintain, what if we were to add another event type `"bash"` with the payload 

```
type BashPayload = {
    alpha: string; 
    beta: number; 
}
```


We would make the following changes: 

1. Add `"bash"` to the `PossibleEventTypes`
2. Declare the `BashPayload`
3. Add an additional overload to the function
4. Update the bottom function declaration to include the `BashPayload` return type.
5. Update the function implementation to return the the default data.  


But to really drive the point home, let's also say that we have a data type `PossibleEvents`: 

```typescript
type PossibleEvents = {
    eventType: "foo", 
    payload: FooPayload, 
} | {
    eventType: "bar", 
    payload: BarPayload, 
} | {
    eventType: "biz", 
    payload: BizPayload, 
}; 


```

And a function `processEvent`: 


```typescript
function processEvent(event: PossibleEvents) : FooPayload | BarPayload | BizPayload {

    const {eventType, payload} = event; 
    if (eventType === "foo") {
        console.log(payload.name); 
    }

    if (eventType === "bar") {
        console.log(payload.description.longDescription); 
    }

    if (eventType === "biz") {
        console.log(payload.type); 
    }


    return payload;
}

```


So to properly type this, we can repeat the same function overloading process: 

```typescript
function processEvent(event: {
    eventType: "foo", 
    payload: FooPayload, 
} ) : FooPayload; 
function processEvent(event: {
    eventType: "bar", 
    payload: BarPayload, 
} ) : BarPayload; 
function processEvent(event: {
    eventType: "biz", 
    payload: BizPayload, 
} ) : BizPayload; 
function processEvent(event: PossibleEvents)  : FooPayload | BarPayload | BizPayload   {
     //Snip
}

const b1 = processAndExtractPayload({
    eventType: "foo", 
    payload: {
        name: "alice", 
        age: 99
    }
}); 

//@ts-expect-error - TypeScript know this can only be a FooPayload
const b2: BarPayload = processAndExtractPayload({
    eventType: "foo", 
    payload: {
        name: "alice", 
        age: 99
    }
}); 
```

So this works, but I hope it's clear that long term, this is not a sustainable way for us to write our code. 

[TypeScript Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBACg9gZwQSwEYBsIFEBuEB2wAKuBAlALxQBEAZnHNVAD42oCGATk69asgC9qAbigAoCaEhQAYgxjsQ6OOwAmlKAG8xUXVHzsAthABcUBME7J8Ac1E697G6f0BXQ6gid7AX0mkoACEuBSUVdSptPSgcdnRXF3x3T29xaNUyAGMrMGBkOHwzKOi9BAALOE5gABEsnLyCswsrW3sSvWVbWoRs5Fz8wvNLazs0vT8-MSloQMFQ5TUNYt1psz54zjAeGgzNkTGViAAPYCbh1vFJ6dhEFAxsPEJ58PIqOThnxdZgzk-1b7migWqnsElornwmQa+CgHFUAHECF52MAILVaOxXOhgLgCMA-gAKCCPYikMzwJBoTC4wgkSAIACUUHJtypDzxf3IyygAHoeQh8H0xJNMgULFABAAGDRwxH4ZGo9GY7E0-FA8IEugMagM+x8mCcOCQKogKAAcgMxjNUFUcDI+jgwCgx2Q4oKUGuZvefxYQRC6q+QUBYTUZoAdGJRfgEHBMGHlDYCVKw5aILrxBIxODIdCoM55ZwUWiIBisTiSYTiXi6S4tYwmWZvQGQbosxCoQM80jC4qS8ryxzm0SSTW1hxuA2-b9m-Zsx33fmFcXSyqK0Oq7SyWxBDrmbpZgI-rP27nFz3l-3VZWR1uKXdqTf6ZO72yr82ENyJNFkLQoMPqwEFBATQ9D1loDjtJwEDAK4nAwty7S6KmY5wKg1AADQHIhuhOC4ACceGYRBJQ+G04xfnoP5-hupLSEBVB8Fwu4IXoUEwXB4HYdEsTxPhhFYdhGQ9PUAxFMRXGlBUVTdL0-SNDQ5SVE6QmZBhAkSVAnQ2DJInydQWleDaWQYeJiF+Nh5nkcRVH-pudHAXwO5MixuhsbB8Gme0qxsBsWxERpHrHKcNDoHEYWheg1CeVAlm6JMxHAGUhoAO76BAqVYJwhqcH+1AAOrQIpWLqPgjpQGU7B4FAUHsJkZQQOo9VQTqwjCpmUbiuwGhnkWSplm+IaqJqoEteIfIAALAAgAC0xyQFCs1ZZUUDTVANYAMqyU6ADWpXJeQiUoh6ZSulAmTsDCBToKanhQF1TaDZGYpOuwABMZg-D6VA9b2K4Dk8Q51qNmZTAEL73KqrycXoNGjiB2r+XoYDNo28jNkRPi+tysNbox3CI7oyODR9-qDRjWPETjkBjjuBNQETwIfcGwIY6Cc65mAhqZGQCAAIL4KoWAnIWULXniYnRFTtYjXTDPhKjHzo5cUCTg9wLHjmnac3A3NIPzgvC7VaqDbZwXY4+tbjmpxFy2oJPTmTyuTp9M7iOzWtczz+tC5YRti4QEswxbNNCLLKNBoeSvCire4Hkebsnh7OtewLPsi8bwKmyylIQySjK6Nn97sgDg3kNDugdbGEDxnAiY0emxFuRxNFhrbLZtU90ZOqgACMGja7rfOp4botDubAHU-DjBh8T5clMhNBxMg3PW9huFmARxETA3YgTVNs1HPNwCLdlK1raQm31FAu1wKliWnedl34NdsLQPdaOPR13fvVOX3057eth6+1HibcedlpYIywm3QO7QF7UCXivOm0R15QE3tEbeoIQZiCAA)



## Type Maps

The first thing I would identify is that in each of our functions, we're redeclaring the relationship between the event type (`"foo"`) and the event payload (`FooPayload`). 

We shouldn't _need_ redeclare this relationship each time, and in fact this would be prone to error, we could easily make a typo where we accidentally switch assign an event type to the wrong payload type. 

Instead we should declare these relationships in one place, and use that in all of our functions. 

This is what I call a *type map* and it looks like this.    (TODO: check terminology)


```typescript
type EventNameToPayloadMap = {
    "foo": {
        name: string;
        age: number;
    };
    "bar": {
        value: number;
        description: {
            shortDescription: string;
            longDescription: string;
        }
    };
    "biz": {
        type: "blurp" | "derp";
        text: string;
    }
}

```

Now, note that we _could_ instantiate an object against this type: 

```typescript
const myObject : EventNameToPayloadMap= {
    foo: {
        name: "a", 
        age: 111, 
    }, 
    bar:  {
        value: 999, 
        description: {
            shortDescription: "", 
            longDescription: ""
        }
    }, 
    biz: {
        type: "blurp", 
        text: "aa"
    }
}
```

But that's not what the purpose of this type map is, and this object doesn't really make any sense in business sense. 

Instead, the purpose of the type map is to derive other types. 

For example `PossibleEventTypes` can be derived like: 

```typescript
type PossibleEventTypes = keyof EventNameToPayloadMap; 
//type PossibleEventTypes = keyof EventNameToPayloadMap

const a: PossibleEventTypes = "foo"; 
const b: PossibleEventTypes = "bar"; 
//Type '"zip"' is not assignable to type 'keyof EventNameToPayloadMap'.(2322)
const c: PossibleEventTypes = "zip"; 
```


### Losing Intellisense
Now, unfortunately your mouseover intellisense loses a bit of information.

```typescript 
type PossibleEventTypes = keyof EventNameToPayloadMap; 
//type PossibleEventTypes = keyof EventNameToPayloadMap
```

 If we look at our old `PossibleEventTypes` we get: 


```typescript
type PossibleEventTypes = "foo" | "bar" | "biz"; 
//type PossibleEventTypes = "foo" | "bar" | "biz"
```

Which is _a lot_ more readable, it's a lot easier to understand what the type is. 

Fortunately, there's an easy trick to solve this - we just add an `& string` type intersection: 




```typescript
type PossibleEventTypes = keyof EventNameToPayloadMap & string; 
//type PossibleEventTypes = "foo" | "bar" | "biz"
```

[See this StackOverflow question for why this works](https://stackoverflow.com/questions/69547866/why-does-adding-string-fix-improve-the-intellisense-of-keyof)


The `PossibleEventPayloads` can be derived in a similar manner: 


```typescript
type PossibleEventPayloads = EventNameToPayloadMap[PossibleEventTypes]; 
// type PossibleEventsPayloads = {
//     name: string;
//     age: number;
// } | {
//     value: number;
//     description: {
//         shortDescription: string;
//         longDescription: string;
//     };
// } | {
//     type: "blurp" | "derp";
//     text: string;
// }
```


So that's a bit of a tidy up, so how do declare our functions using these types? 

Well we still can't just do a naive 

```typescript
function badGenerateDefaultEventPayload(eventType: PossibleEventTypes) : PossibleEvents{

}
```

We're going to have the same result as we did earlier. 


Instead, we can start using a _generic_ to discriminate the return type. 


Now we might think that this would work: 

```typescript

function generateDefaultEventPayload_v1<T extends PossibleEventTypes>(eventType: T) : EventNameToPayloadMap[T] {
    if (eventType === "foo") {
        //Type '{ name: string; age: number; }' is not assignable to type 'EventNameToPayloadMap[T]'.
        return {
            name: "bob", 
            age: 99, 
        }; 
    }

    if (eventType === "bar") {
        //Type '{ value: number; description: { shortDescription: string; longDescription: string; }; }' is not assignable to type 'EventNameToPayloadMap[T]'.
        return {
            value: 99, 
            description: {
                shortDescription: "short desc", 
                longDescription: "longer desc",
            }
        }
    }

    if (eventType === "biz") {
        //Type '{ type: "blurp"; text: string; }' is not assignable to type 'EventNameToPayloadMap[T]'.
        return {
            type: "blurp", 
            text: "lalalalal"
        }
    }


    throw new Error ("We should not have reached here");
}
```


To explain what we are doing here: 

1. We introduce a generic parameter `T`, which is going to be `PossibleEventTypes` or `"foo" | "bar" | "biz"`. 
2. The function parameter `eventType` is going be of this type `T`. 
3. The return type, we are referencing via a _type index_ (TODO check terminology) on our original type map. 


Now the first thing is, we're getting this issue where _type guards_ don't work when using generics. We covered this lesson 7. 

So as a workaround, let's a do a type coercion. 


```typescript
function generateDefaultEventPayload_v2<T extends PossibleEventTypes>(eventType: T) : EventNameToPayloadMap[T] {
    

    if (eventType === "foo") {
        //Type '{ name: string; age: number; }' is not assignable to type 'EventNameToPayloadMap[T]'.
        return {
            name: "bob", 
            age: 99, 
        } as EventNameToPayloadMap[T]; 
    }

    if (eventType === "bar") {
        //Type '{ value: number; description: { shortDescription: string; longDescription: string; }; }' is not assignable to type 'EventNameToPayloadMap[T]'.
        return {
            value: 99, 
            description: {
                shortDescription: "short desc", 
                longDescription: "longer desc",
            }
        } as EventNameToPayloadMap[T]; 
    }

    if (eventType === "biz") {
        //Type '{ type: "blurp"; text: string; }' is not assignable to type 'EventNameToPayloadMap[T]'.
        return {
            type: "blurp", 
            text: "lalalalal"
        } as EventNameToPayloadMap[T]; 
    }


    throw new Error ("We should not have reached here");
}


const r1 = generateDefaultEventPayload_v2("foo"); 
console.log(r1.age); 
//.Property 'value' does not exist on type '{ name: string; age: number; }'.(2339)
console.log(r1.value); 
```

This works - we can see the TypeScript knows that the return type is one for the corresponding event type. Although the type coercion is a bit icky. 

So now lets move on to other function: 

First, we want to declare our event, which includes both the event type, and the payload, as a generic, this means that the `eventType` and the `payload` will be in sync with each other: 


```typescript
type OurEvent<T extends PossibleEventTypes> = {
    eventType: T; 
    payload: EventNameToPayloadMap[T];
}; 

const e1: OurEvent<"foo"> = {
    eventType: "foo", 
    payload: {
        name: "as", 
        age: 11
    }
}; 

const e2: OurEvent<"foo"> = {
    eventType: "foo", 
    //Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'.(2741)
    payload: {
        name: "as", 

    }
}; 

const e3: OurEvent<"foo"> = {
    eventType: "foo", 
    payload: {
        //Type '{ type: string; text: string; }' is not assignable to type '{ name: string; age: number; }'.
            type: "blurp", 
            text: "lalalalal"
        }
}; 

const e4: OurEvent<"biz"> = {
    eventType: "biz", 
    payload: {
            type: "blurp", 
            text: "lalalalal"
        }
}; 
```

Ok great, so we've got `OurEvent` type working fine. 

Btw, if we want to derive the `PossibleEvents`  union type, we just pass the the wider `PossibleEventTypes` as the generic argument. 

```typescript
type PossibleEvents = OurEvent<PossibleEventTypes>; 

// type AllPossibleEvents = {
//     eventType: PossibleEventTypes;
//     payload: {
//         name: string;
//         age: number;
//     } | {
//         value: number;
//         description: {
//             shortDescription: string;
//             longDescription: string;
//         };
//     } | {
//         type: "blurp" | "derp";
//         text: string;
//     };
// }
```

Now we can implement our `processEvents` in a similar fashion: 

```typescript
function processAndExtractPayload<T extends PossibleEventTypes>(event: OurEvent<T>)  : OurEvent<T>['payload']  {
    //snip
}

const b1 = processAndExtractPayload({
    eventType: "foo", 
    payload: {
        name: "alice", 
        age: 99
    }
}); 

console.log(b1.age); 
//Property 'value' does not exist on type '{ name: string; age: number; }'.(2339)
console.log(b1.value); 
```


So at this point it should be clear the advantage that using type maps provides - it's a lot more maintainable and concise than function overloading everywhere. 


https://www.typescriptlang.org/play?#code/C4TwDgpgBAggRgZ2AJwIYGNgFEBuEB2wAcqgLYQAqA9gAqogA2VqAJgLKphQC8UA3gCgowqAG0A1hBAAuKEmQBLfAHMAurICu+cfioB3fAG4oAgL4CBoSLEQoMwGlQQIFcBhFwFgFcBAQAeCigIAA9gAhYEG3l7T0IScmo6RmZ2TgA+HihJECoAMygggDI5FCVlY0tfaLtMR2dXdziHeiZWAKDQ8PxImrRMZoTKWlbUjjBM3gpReBi6pxc3DzxCH0gO9NVKiytoWdrgABEIPNQNBhaU1gBxAgg0YCpkDuCwiKj9-uwV4jJh5LaaQmWUEIjEOSgSmyUnyhXUUAAFABKHiZaY5LYmcwCPJaTAKKj4KCoWxfW74e4KdDHU7nS6AwKvbq9T6xH5DJKjVjjAA0hWaa2gXXefXs9UWTR+go26QRYC5LHJ91Qj2eslZmBpZwuANSSoeTw2fIgUt8sgoAt8KPNogtpsgqn4QhE6EJSCg8quiruBuQWU9gP1KsNohNXkFmOdwmQEGAGmQRIDep9weQyMMZgsAld+HdpBAupuKdVUV4oJEACJUAwwAALVAV2TI1FOsFgmNxhOtts9044KjxhThADCVCYyFkFZjLArfKjbdMlTBpjnYIrcFjDabKO4mXLPY78aJ+57Ihw1Y0EFkAE5b3zT2358v5yvMxYc+6GABGLIkubAfUqS1OlCxYBF81AoMSz5Ksa3rCskQzLNdigQY-k5L1xhBecKzyKgqEbbse3wP5ZHkcoMwfVBlCvKB8A0UgN2QSiREXHC4FQZBCJPMFzwYS9ZHoxj7hYnsWD8dBFDAYACXwWQeNPBBayeI4JKkmTCTIsoVFEh8oCYFRjgQSSFGk2StMUHSn1Yl9dPXBQAC9uOs4RdknNx4zACsoAAHygCtxOQLzdLBcIwgsiiXzfbM3WAKB8wAeTgAArCBMCgWQ0MSEZMM4Mt5zwqh5JcujSP8htV1PajaK-WrKuEFcTDBDiJ2EBThD4gSoFva96rbcTjPU8yiL0pSVKMkyzM0-zZyavThAM5QJqG6aKwrErzGXPq4Ec4qHzc-yPKC2aSrC4BJ1QBsouxZDqnFRplnDXxS2hXICiy-4FSwkpyJ0kwAHp-pQ+6lktdYslw-DvL89dOOhw7HPW99YuJWQQclJ7wd4SGCMqD84rgNGFgesG-AhlqK0qQHBSgAByCsHNMitachKJdDi1AGmUEiligR4+eqWmclhD6MMBcZaYAOgRAAmABmGWZaRGLczi9AiYaUH7TJ7HGeCkwqmsdHHsIUCXtFnLxc4URjdJhBI0BgWjeJrWvAQM3sMdsESPICKrK9kRqsEhimIzR3TF8p0A46i9aKE0OBGjqABsmjS5Kj-7RuU5BVMG0y079ipE8zh9FuW-Pht+ouk7Y8PI8EJODvXfjjsjgL7mC4u2zOwuw8zm6cTxNOoBoikHggYCLmaUCAH0cC-RlhR6KJbe1hBZTDVYzUKa1UPZdDLbGa2KEdE8LDBBQCgRTfvGqbh7-8wqEJGsFqcFvhSt90pLIqYkaOD4SzEoCmBZgoNmVAOZcx5u4PmVAnbQFphbUC4xbSqCliVQ8XZ2pth9rRdcVA4AnXmsIIO3VepzR7IuChwDz4iEvoiG+NN77YwpiibBb9rC0w-p1OOIcRLJzUhXaaH8xo53LlNdOVdjBl0ERI3uwDjAgNZnRCBxIoEkhgfzFCiD97ZWQcfNBksMGxiPC-U8PCbzkJKmCFOK107YIfKI3OqdhoVicQI4yRDiFghkXnOR-lFr3A8egWc1ibIPk2jZec9Dr7ax4A-eyTk2ElQ4Qgj+Tcjr6x7t-CiwDQHgMgS4bmGjoBaMFkgr6Bj0EPkwceMJrlt7N08l4+a2SKwMGrJ0jpDB1oRKirQ1ytZkD6DohAPQqFkDDL9AiCsAB1aAY1zgsBUXFeseAoAxgwLWCAyztkxgQhmbEuJ8D4kJCPYsE8Tjam+F4WeOAZaLzeMvKAq9MZ+A3trc0u8Km5TAKgkaAzIRX0YXfBJT9kkPlSXTD+uD5GkPjvwpRYCVlqKKdA0pcDtE-Ktn8k+1TTy1LMcRMq+DCF9Sov-Mh5LWJqL3l4Dkh9uQGKXFEi+wK4nMMOnDCFp4oVcKgBYuifCgG2KEfYuQ2dnF2Pkb4lx00pEKLyco9mqKFDFN5mUzh2Kj64sMcYzsdTvGCrvNQh8or-EOMUpK8RBd-LuJTi07x+lCRLVkba9pLqgkOp5PUmhETaXaqZbqllDVAUxJBdYTliTn7sP+jTflGSW5ZK6PIpFBTVXqs0Zi8pujPq-NQfig8JisG+sTc06lPY2ndK6dWXpp4I6czpfEA++jg3UJuqFIZIyKTjKwJMp4iI5kLOUkslFazoCbPQNs3Z9wIAHOivjDZP5eCj2VOESeNzTYKjnjLGZ4K8ZujHBASWTBlAImQF+SW1VEIA3+pLGgwzIA5xAHTHhLMWBUDJiq0IYC4pnO0TCsqCr4XCsUVLWWcs5bXmVh+I9J6qBnovZLHhN7brWASvGZojzmQrxdhjLe6xJgjQjbRCgIaPQKkyrmsWOrUGHO2IuiAX5ZAYeQFhnGFYiMnhI5OJ+fUkysD2qeWF5UECOrBKQ2q10GMowgDLFjmGfj+A41x+cPHH5Qz6oDB9VAn2gDptVfJ8UwEuBUJCIkAHP60QVUouAGg4oxgAI4aAUNOcz8DoVWbhZShFQCQHSxlgAdgACxfmVmCATLAhPEq-lWMTc5pMG0Y3LBTbGlMqewmCdTHH+OUaJVAPl6Tt4KuyTZozKrOZopKbAjz-KRPAZ86BvJRjvFluOhW7uKaAk1u6XWyhZgZOq2CMF1L7GdpOVU1lz5CMnK5a9NFvSbWvIddCl19pPXa0bQGwbQ20BXmEBeqxrD+3b6Ee2I7FCMAGAMBOy9BuJcRDqZO9KPubZIvFSTt7ID2lq4PZ7CBwBr3lz1y7g+QVvmgennNba+7TqnE2srj9yH81ZXSpyf7P7C5kfAJB59kQS34bt2Otj1b4V0e-ax13G6xzTmJmGegPwCAYA9CwGEL4oFsMime89D5XhRtKYoOkFEGUoBHYF+kUQtNIu00dCNWD7h4Nnpvqh9sxaiQ30lpFyo2JF1wGXR6enjPmcsFZwcUCCJuPTZy9Q97+WROwSpHOjrpDbzXVQyrBAcHT0Ij11emiqHtOPvuPp2mb7k6fvTT+90-735efJ8YAHodmsQagzBw9Cvve+5Q9sND0Bp6KCeEOEAWF8prifiListY1W1kdbDLik4q-KBr31aNk4mB6HWlQnYd0C+KBkggHZWHOhPN6NzwjmXHvTbI9Qm+D6CR95kE2hwvei8oJPuR23gagR0axMjIbYBmMvJX-3wf6Wn6Tcn283jmmZ8-Dn4X0ADfq+hIi3l7B9vObicDpSqTz4u8e7ijAHkyP3nyHDAVPy8GU3Pwn2EGyz41v1uWP0Xw9Q7x9Vf3mztxJU-2dx-y-ESyAA


## Let's make this more generic 

The solution we've just implemented is nice, but it's suitable for just the one set of events we've declared. 

What if we were trying to write an open source library where people could define their own events? 


Well we can do it the following way: 

First, we define our EventNameToPayloadMap as just something Abstract: 

```typescript
type AbstractEventNameToPayloadMap = {
    [key: string]: unknown; 
}
```

Next we can define our other types just like we did before: 

```typescript

type AbstractPossibleEventTypes<T extends AbstractEventNameToPayloadMap> = keyof T & string; 
type AbstractPossibleEventPayloads<T extends AbstractEventNameToPayloadMap> = T[AbstractPossibleEventTypes<T>]; 


type AbstractDefaultPayloadGenerators<T extends AbstractEventNameToPayloadMap> = {
    [key in keyof T]: () => T[key]; 
}
```


Our generate payload function is similar, except now we pass in an object that does payload generators: 

```typescript
type AbstractEventNameToPayloadMap = {
    [key: string]: unknown; 
}

type AbstractPossibleEventTypes<T extends AbstractEventNameToPayloadMap> = keyof T & string; 
type AbstractPossibleEventPayloads<T extends AbstractEventNameToPayloadMap> = T[AbstractPossibleEventTypes<T>]; 


type AbstractEvent<T extends AbstractEventNameToPayloadMap> = {
    eventType: AbstractPossibleEventTypes<T>; 
    payload: AbstractPossibleEventPayloads<T>; 
}

type EventPayloadProcessors<T extends AbstractEventNameToPayloadMap> = {
    [K in keyof T]: (data: T[K]) => void; 
}


const myPayloadProcessors = {
    "alpha": (value: {
        favouriteColor: string
    }) => {
        console.log(value);
    }, 

    "beta": (value: {
        value: number
    }) => {
        console.log(value);
    }
}


function processEvents<T extends AbstractEventNameToPayloadMap> (pyaloadProcessors: EventPayloadProcessors<T>, events: Array<AbstractEvent<T>>) {

    events.forEach((event) => {
        const processor = pyaloadProcessors[event.eventType]; 
        processor(event.payload);
    }); 
}



function processSingleEvent<T extends AbstractEventNameToPayloadMap> (pyaloadProcessors: EventPayloadProcessors<T>, event: AbstractEvent<T>)  {
    const processor = pyaloadProcessors[event.eventType]; 

    processor(event.payload);
}


processSingleEvent(myPayloadProcessors,     {
        eventType: "alpha", 
        payload: {
            favouriteColor: "red"
        }
    });



processSingleEvent(myPayloadProcessors,     {
        eventType: "alpha", 
        payload: {

            //@ts-expect-error
            favouriteColor: 999
        }
    });

processEvents(myPayloadProcessors, [
    {
        eventType: "alpha", 
        payload: {
            favouriteColor: "red"
        }
    },
      {
        eventType: "beta", 
        payload: {
            value: 999
        }
    },
      {
        eventType: "alpha", 
        payload: {
            
            //@ts-expect-error - we're not getting an error here! why not? 
            // No intellisense either
            value: 999
        }
    },
      {
        //@ts-expect-error - it will error on garbage event types
        eventType: "asdasd", 
        payload: {
            value: 999
        }
    },
          {
        eventType: "alpha", 
        payload: {
            //@ts-expect-error - it will error completely unrecgnised event payloads
            foo: "bar"
        }
    }
])
```

Now before we talk about the error (or lack of) that we're getting here, you might note that, it looks like we're repeating our selves a bit. 

That is, we're explicitly stating the shapes of the event payloads here when we create the event processors - when technically already know the shapes of the payloads, from when we declared the default payload generators. 

This is something we can tidy up, we'd do it by having one object that contains all of the 'generateDefaultPayload' 'proccessEvent' and anything functions we might create. 

But for the purpose of this exercise it's easier to keep things seperate. 

So the problem we've got is that for some reason when we start referring to an array of events, it loses synchronization of the event type to the event payload. 

Let's take a closer look at what's happening here: 







## Resources

https://stackoverflow.com/questions/69534672/why-does-indexing-into-a-mapped-type-keep-the-type-narrow

https://stackoverflow.com/questions/64744734/typescript-keyof-index-type-is-too-wide