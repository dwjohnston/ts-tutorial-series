# Lesson 8 - Advanced - Mapped types and discriminated unions. 


Let's pick up in a similar place as where we left off in Lesson 7. 

To let's say we have some different event types: 

```
type PossibleEventTypes = "foo" | "bar" | "biz"; 
```

And each of those event types have their own payload: 


```
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

```
function badGenerateDefaultEventPayload(eventType: PossibleEventTypes) : PossibleEventPayloads{

}
```

As TypeScript won't _discriminate_ (TODO: check terminology) the return type based the input type: 

```
function badGenerateDefaultEventPayload(eventType: PossibleEventTypes) : PossibleEventPayloads{

}

const z0 = badGenerateDefaultEventPayload("foo"); 
//Property 'name' does not exist on type 'FooPayload | BarPayload | BizPayload'.
console.log(z0.name); 
```

That is - TypeScript isn't narrowing the return type based on what `PossibleEventType` you gave it. The return type is always the union of all the possible payloads. 




Instead, we use function overloading, like we did in lesson 7: 


```
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


But to really drive the point home, let's also say that we have a data type `MyEvent`: 

```
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

And a function `processAndExtractPayload`: 


```
function processAndExtractPayload(event: PossibleEvents)  {

    console.log(event); 

    return event.payload; 
}

```


So to properly type this, we can repeat the same function overloading process: 

```

function processAndExtractPayload(event: {
    eventType: "foo", 
    payload: FooPayload, 
} ) : FooPayload; 
function processAndExtractPayload(event: {
    eventType: "bar", 
    payload: BarPayload, 
} ) : BarPayload; 
function processAndExtractPayload(event: {
    eventType: "biz", 
    payload: BizPayload, 
} ) : BizPayload; 
function processAndExtractPayload(event: PossibleEvents)  : FooPayload | BarPayload | BizPayload   {
    console.log(event); 
    return event.payload; 
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

https://www.typescriptlang.org/play?#code/C4TwDgpgBACg9gZwQSwEYBsIFEBuEB2wAKuBAlALxQBEAZnHNVAD42oCGATk69asgC9qAbigAoCaEhQAYgxjsQ6OOwAmlKAG8xUXVHzsAthABcUBME7J8Ac1E697G6f0BXQ6gid7AX0mkoACEuBSUVdSptPSgcdnRXF3x3T29xaNUyAGMrMGBkOHwzKOi9BAALOE5gABEsnLyCswsrW3sSvWVbWoRs5Fz8wvNLazs0vT8-MSloQMFQ5TUNYt1psz54zjAeGgzNkTGViAAPYCbh1vFJ6dhEFAxsPEJ58PIqOThnxdZgzk-1b7migWqnsElornwmQa+CgHFUAHECF52MAILVaOxXOhgLgCMA-gAKCCPYikMzwJBoTC4wgkSAIACUUHJtypDzxf3IyygAHoeQh8H0xJNMgULFABAAGDRwxH4ZGo9GY7E0-FA8IEugMagM+x8mCcOCQKogKAAcgMxjNUFUcDI+jgwCgx2Q4oKUGuZvefxYQRC6q+QUBYTUZoAdGJRfgEHBMGHlDYCVKw5aILrxBIxODIdCoM55ZwUWiIBisTiSYTiXi6S4tYwmWZvQGQbosxCoQM80jC4qS8ryxzm0SSTW1hxuA2-b9m-Zsx33fmFcXSyqK0Oq7SyWxBDrmbpZgI-rP27nFz3l-3VZWR1uKXdqTf6ZO72yr82ENyJNFkLQoMPqwEFBATQ9D1loDjtJwEDAK4nAwty7S6KmY5wKg1AADQHIhuhOC4ACceGYRBJQ+G04xfnoP5-hupLSEBVB8Fwu4IXoUEwXB4HYdEsTxPhhFYdhGQ9PUAxFMRXGlBUVTdL0-SNDQ5SVE6QmZBhAkSVAnQ2DJInydQWleDaWQYeJiF+Nh5nkcRVH-pudHAXwO5MixuhsbB8Gme0qxsBsWxERpHrHKcNDoHEYWheg1CeVAlm6JMxHAGUhoAO76BAqVYJwhqcH+1AAOrQIpWLqPgjpQGU7B4FAUHsJkZQQOo9VQTqwjCpmUbiuwGhnkWSplm+IaqJqoEteIfIAALAAgAC0xyQFCs1ZZUUDTVANYAMqyU6ADWpXJeQiUoh6ZSulAmTsDCBToKanhQF1TaDZGYpOuwABMZg-D6VA9b2K4Dk8Q51qNmZTAEL73KqrycXoNGjiB2r+XoYDNo28jNkRPi+tysNbox3CI7oyODR9-qDRjWPETjkBjjuBNQETwIfcGwIY6Cc65mAhqZGQCAAIL4KoWAnIWULXniYnRFTtYjXTDPhKjHzo5cUCTg9wLHjmnac3A3NIPzgvC7VaqDbZwXY4+tbjmpxFy2oJPTmTyuTp9M7iOzWtczz+tC5YRti4QEswxbNNCLLKNBoeSvCire4Hkebsnh7OtewLPsi8bwKmyylIQySjK6Nn97sgDg3kNDugdbGEDxnAiY0emxFuRxNFhrbLZtU90ZOqgACMGja7rfOp4botDubAHU-DjBh8T5clMhNBxMg3PW9huFmARxETA3YgTVNs1HPNwCLdlK1raQm31FAu1wKliWnedl34NdsLQPdaOPR13fvVOX3057eth6+1HibcedlpYIywm3QO7QF7UCXivOm0R15QE3tEbeoIQZiCAA

## Type Maps

The first thing I would identify is that in each of our functions, we're redeclaring the relationship between the event type (`"foo"`) and the event payload (`FooPayload`). 

We shouldn't _need_ redeclare this relationship each time, and in fact this would be prone to error, we could easily make a typo where we accidentally switch assign an event type to the wrong payload type. 

Instead we should declare these relationships in one place, and use that in all of our functions. 

This is what I call a *type map* and it looks like this.    (TODO: check terminology)


```
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

```
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

```
type PossibleEventTypes = keyof EventNameToPayloadMap; 
//type PossibleEventTypes = keyof EventNameToPayloadMap

const a: PossibleEventTypes = "foo"; 
const b: PossibleEventTypes = "bar"; 
//Type '"zip"' is not assignable to type 'keyof EventNameToPayloadMap'.(2322)
const c: PossibleEventTypes = "zip"; 
```

Now, unfortunately your mouseover intellisense loses a bit of information. If we look at our old `PossibleEventTypes` we get: 


```
type PossibleEventTypes = "foo" | "bar" | "biz"; 
//type PossibleEventTypes = "foo" | "bar" | "biz"
```

Which is _a lot_ more readable, it's a lot easier to understand what the type is. 

Fortunately, there's an easy trick to solve this - we just add an `& string` type intersection: 

TODO: Find out why this is. 


```
type PossibleEventTypes = keyof EventNameToPayloadMap & string; 
//type PossibleEventTypes = "foo" | "bar" | "biz"
```

The `PossibleEventPayloads` can be derived in a similar manner: 


```
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

```
function badGenerateDefaultEventPayload(eventType: PossibleEventTypes) : PossibleEvents{

}
```

We're going to have the same result as we did earlier. 


Instead, we can start using a _generic_ to discriminate the return type. 


Now we might think that this would work: 



```

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

1. We introduce a generic parameter T, which is going to be `PossibleEventTypes` or `"foo" | "bar" | "biz"`. 
2. The function parameter `eventType` is going be of this type `T`. 
3. The return type, we are referencing via a _type index_ (TODO check terminology) on our original type map. 


Now the first thing is, we're getting this issue where _type guards_ don't work when using generics. We covered this lesson 7. 

So as a workaround, let's a do a type coercion. 


```
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


This works - we can see the TypeScript knows that the return type is one for the corresponding event type. 


So now lets move on to other function: 


First, we want to declare our event, which includes both the event type, and the payload, as a generic: 


```
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

```
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

Now we can implement our `processAndExtractPayload` in a similar fashion: 

```
function processAndExtractPayload<T extends PossibleEventTypes>(event: OurEvent<T>)  : OurEvent<T>['payload']  {
    console.log(event); 
    return event.payload; 
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



So at this point I'm hoping you're on board with the value of using type maps, now let's throw a more tricky problem at you. 




https://www.typescriptlang.org/play?#code/C4TwDgpgBAogbhAdsAcgQwLYQCoHsAKaIANrmgCYCyaYUAvFAN4BQUbUARAGa64cBcTVuxGJMEQQGdgAJwCWiAOYBuYSLZpFEqIgCuGAEYQZqkQF9T7DgbQyBQ9ezhpiu7XsPHLj8hEkBjeTBgOVxEQRZHR0kAC1wZYAARP0C5YNDwqGl5JW8otlIlZICgkLCpWQUVNXUzGosa6zkAL3tIqNBIQWtXGTAOKAAfTl8+jjyRYAgAD2AKnOrzZjrmZn8w6SgMEAB5AwArCH9gKEF4JFRxPEISMioaBna2HlwImtFxbrQOABood-Ymm0AEZQX96uCRDYZIIHFFnK5tABOFGQqK+EppMqZJ75LJxBLFVLpcqcX7-PHsQqKImlDLdDgAth1cxotgGFpvfKdbQ9XRjNnqKazL7ferLVaSnlQfC4SSSOQGYgQc7IbDgPz0KAAawgIFwXFgCGQ6Cw1yIpAo1FoADIspVcv8APRO6Wy+WK5Wq4DqyCSLXcXgDYbWWzBzgc1qS9aITZoQTuhVKlXGn0a-0MQN8ZT-GObAwJuVJr2p32azPQ8bOp1lqAAcg4zTSHDrUDk-sQuBOaA9ijEyagwFwg419d1+sN3tNOAIFru1rrADoABQAJgAzKvVwBKNYbE7+Qse5PessZzhN-o51ZuouelMXG6W8jnqdXWe3K00ADaifvp-TABda8XRHSAZTvE9U0kJ87nPFhQI+LB5iqVREMBLRBA8IwTGYUCzCGIR0LYBE3Cw-QcLQp11AxYlsTeYj1FieIkhSOlSWyVC8Oo-JqVpLF6XtBYqNqESCOGBCePYHluiVfl+kIjhRivbihRmOYhK4-DJWYLhdEQY4MigLREGMNApmSLg0F0YhgG9WCKAAfTgYEAB5sCgdSkBfCDjxLC4zwAPmXCBSw1QRsG3U4jQuadzU-e4wG-bBALhNhVhEORDRCsLwLofLOBeDgotxEQXVrOtGB0T5NMdIFyM8EwoDMVt2x0LsoB7BU+zQAchzA6A6zfM0P2fa1ksApcmSgGQIGAflEDSvExGQiNcAMclppEeqoFRCkogsfbmQy9gsqgHKAtHfKKzDErpvK0dKqgUj3AorwoFo9icXxFj+JJTJOMdPi2IEjiHRUZqcxatsOw6rq5B6vrh2lIbUzi0b5x-FKpvyWb5pkRbSvhFwyN2pFBXyT7QZxLaomYwkQf+7p6ZOWjNspRxgcxJnOGpYwPpSX5aeO-IWXYFZMuy0LLrygqmlaO78ge8CnpkiNeivQd1JQx1obaztu17ftlUHZHHuGmcHMSiacaiPGFqW7lwvV+T2Y54UNI4YgXB973iEZUXxROthgBiGRcAAdx0CAo5gGRw5kc6OAAdWgZibPIdqThiNAEBmiA0H8GIIEz4vZuK1QVj0gzsWMpAzIsiArJsuzUyt5zV3czzZm8-0-ygmW-GC6W1WdyLoot+Kxqx1LcWDtspdy6BrsKoNFaiZXBqqlbtEBiGduw969dhw3uuN6B+pRyeMa-JLscXab7YJx2oh32T1rdykdr26aCJ7GKTTvituNFK14lg1DOhdUessbp2HXo4Te9YqovQapRAW3N6JMB+gzDBgk945i5nRPB4MoZQ1aifTqRteom0vubNGQC5y3xtg-XGc0HZE0cCgsmFN0SM0wRwvELM-qYI4CzdB-hP4cwKGEGkfDBJexkfzNmPxhbNV-pQgBlwRrAJnmA8W89IEjzTDAiMLRiovzYIg1Wzs+RjBzB7HWENj5Z0oWfahF8zYq2vjou+k0WF2zYc-ARkwbFyQFEdPEDjea+19gHA6GjvGMOtqAiJKwaih3DlHUysd47xCTqnH6GcXE5zzrNQuxdS7GAgBXCUqw8wnBkMCLUJkG4QEstZWy9kkkd2XFmCuuYNi4GVIuUgihlyNMXECbcIEnSLnwOHSACQQD1heq2cguBNQG27u2E4YQBpIOqqtfBnVMI6Dek1FqK4NzriRLuPMQyIAjNwGMiZL1pn-BvKOHY-JvRdy8ogHy-d-LQKHlqXERiywRT0WwMASSzj0O0UkkBwFljXj3LGE4EBgSCG+TIX5fTApgpqBCmxRVBSwoSlyV+NUOA9kkdtU5oJxSHTqfuTyq4cU-NTK5AlRKRAkq6KvPggoXTzNwIs0A9YgTkK2O2BUSg2yLRRtvGqxzoYGF0A0iAABHXQchZqZwUPsp6b9ar71OYfC5S41wAHYAAswJdwiApc+KljhTW0skJtZlaL6meXXJyvF3LeWPGJUvboZKIkuruG69QViqpq2OVEtVMqtnw0RjQzxW9Dm7xISc16jUyH+MpGrWx-QeGOCiV7GJfs4mODqCy9FmwIB2sDfiyMHBCWhv5eG0xrRyVwosUKUJGt6UdG1tEv2sTf6oo+cwW8fkHzIHPLi35QKl3GKHmi0C0oACCxBiDru9PBVSPbB5HmLBus8IlnWDskstVVJDT1RAPucm94tCL3vyFwy176fByNJF+jmQiAMAyfYxXiMjhHEOEs++tf7mqfrg8OwVZbwxKWMCpCD0kJ34OQw0bSqxq6GT2WAcO-g-CSF3QCmAswZCF2AFbP5PcAV90gsCzdkhh6pjbdy7AgUorRVXXxwK346zRooHWVKS17nDNGVA4A7yahP0WkYxcEnyDXhWH6gwTSGBkdwBR+U1HyC0dkAxq2y5wW9r6QOylQ6PUuDkBRsdGhTkomZUpptDynljN05MrQSnRULOMJKusqyPobIoTMHZUA9nKpzY4nMr7C3NWtdc253m5PPOXP5t5aKpSjnsvIeIchQDWj5VYIq0UOAxARjESRoY7DdDq4oBrgp5b2AURHRkja3QlfkCESQJdfkeX+YC9jV70xdqWgK7Q2BoWeTbgNsrIB4WPhW+V3RUbB2JISsirTrKMVQDANimUm32wjeDUVGb1nz1CskUY+ZoRBtrc4K19rNQNOxqQryOlFb82CCZUsRtfqwAcvOy9srl3TPXaDLdsN93bMRKe5tt73Wha3vswIxzXqAc7WB-ow6QA




