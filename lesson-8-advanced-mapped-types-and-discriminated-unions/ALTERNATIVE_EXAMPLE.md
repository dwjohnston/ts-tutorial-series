## Table Example: 


In this example,  we are defining a data structure to represent some table data. 

We have an array of RowData, which is just an object with key/value pairs, and also must contain an ID. 

We also have an array of Column objects. These objects describe the cells in a row. ie the Columns must relate to one of the keys of the RowData. The Column has a label (to give a longer description of the key), and an `action` function, which is say, when we click a cell the action is fired. 


```
type RowData = Record<string, unknown> & {id: string}; 

//eg. 

const row1  = {
    id: "row-1",
    name: "bob", 
    age: 99, 
    numWidgets: 10, 
    numPockets: 2, 
    address: {
        streetNumber: 1, 
        streetName: "Foo St"
    }
}; 

const row2  = {
    id: "row-2",
    name: "alice", 
    age: 99, 
    numWidgets: 3, 
    numPockets: 1, 
    address: {
        streetNumber: 1, 
        streetName: "Foo St"
    }
}; 



type Column<T extends RowData, K extends keyof T> = {  
  key: K; 
  label: string; 
  action: (value: T[K], rowData: T) => void;
}

// A column is derived from the row data, and is used to describe all of the keys in the row. 
// It also has some kind of 'action' function that can 

const column1 : Column<typeof row1, "name"> = {
    key: "name", 
    label: "Patient Name",
    action: (value, rowData) => {

        console.log(value);
    }
}; 

const column2 : Column<typeof row1, "age"> = {
    key: "age", 
    label: "Patient Age",
    action: (value, rowData) => {
        console.log(value);
    }
}; 

const column3 : Column<typeof row1, "numWidgets"> = {
    key: "numWidgets", 
    label: "Average Number of Widgets",
    action: (value, rowData) => {
        // Silly example to show that you can access the rest of the row data
        console.log(rowData.numWidgets/ rowData.numPockets); 
    }
}; 

// All of our data
type RowsAndColumns<T extends RowData> = {
  rows: Array<T>; 
  columns: Array<Column<T, keyof T>>; 
}


//Now, given that all of the data is ultimately derived from the RowData, there should be only one generic type. 
function myFn<T extends RowData>(config: RowsAndColumns<T>) {

}




myFn({
  rows: [
    {id: "foo", 
      bar: "bar", 
      bing: 999, 
      bong: {
        a: 99, 
        b: "aaa"
      }
    }
  ], 
  columns: [
    {
      key: "bar", 
      label: "Bar",
      action: (value, rowData) => {
          console.log(value);
      }
    },
     {
      key: "bong", 
      label: "Bong",
      action: (value, rowData) => {
          console.log(value.a); //Property 'a' does not exist on type 'string | number | { a: number; b: string; }'.
          // The problem here is that TypeScript doesn't know if the value type is the one corresponding to "bar" or "bing" or "bong" 
          // Even though that's what we want to happen here. 

      }
    }
  ]
}); 

```

https://www.typescriptlang.org/play?#code/FDAuE8AcFMAICUD2B3AIgQ1O2BeB0BjRAJwBMAeAZ1GIEsA7AcwBpYBXega3pXoD5YAMlgBvWqQBcsanSYBfANywQAehXRGAOmXAi9arGIoAjLFyjgZs+KkAiI8gC0x280tX66ALbQ7AI0Q-V2UrWHRGX1gATijWdzN6Ni8AdXEI0EopYwAGONDErwAFRAJOaAypACY8q3RSUmJoSkyLUNCZaHKAOSS-aGIsmrbpGk7QLu9I2wAxRERYAGVQW3jYOWBFHT0DB0qzPBFVm1h7FEdK11XPHzt0ABtaAmhg1fDImKHYAtTSdJaAZk+BWKpXKLWMnzqDSaLUOwzMHW6vX6gxC8MR40mdlm8yWK1C602IBAEBgsAAwog7kl6OQACqwaAAD1A0HopEoCBQGCwrAA0oyWWyObAyuBEAAzWB0gQHMzuMVSPlKdx3dB9O5SGQMRgqszoAigWiIehSAAUADd7mxInSANp8gC6rAcPPQUjpAEpcAILYhxAoNqoVLAAIKwIjUrz0WC0Tmkfq0C3QUiwCVGLywUAACzgDlgpEw6FY6HZsc5bEoKaz8wTlAIdD6YTud1gkqzudF0HAnIYHbzKG0wDUsAAkqBm5R5tn0Jypz5RQxU+2AOQGo0mldpjiG40xnOYCOlrYmgyRmmmKSUqO00nQdsOCEna7PWWtKyK5+TF6hNUauyFJgtBshOEw+JcoTrnu5pWtS0AutyRbejgAiHKsoTbFS0CaHciCMJa1rQJ6gYEhsKq6KeE7ntGexXlSNLkHeD4mKwthvLYb5wh+3a3BEP5WH+0CaicgFGiBYZ8W4kG7iaMGEQhaBIT677DJhdzYbh+GwTaxGrIS5HbFR9HRv8sB0TejFQPeUqPqx3xpGCHHmFxZifrY9m-I5nyCcJtihsmxBvLAPReH0xBtlKPx-BBtQyaasAEXBClushqHoVYI4LLQLbgIK3iQOpNbSNmKAdoe4psEeMYGk8zT9oYTQTu2OYDsgBZFulZhqRpeFmq6RaaB5fwhv1WCDUkIJlBkxFomY+k6COoYthFbZsOFhZYGAVlcsglChuy140pQ9KCqy7KckgilYJx7gOC0obEIF4D0nweoRsZ+hSA9T3kId0b0qwYrtjKr3KOswZdCgrCMEmbJlRO9yts1nYbdgcbsHcRpeJgQm5QmdDJqm6aIJmLU7W6rAtY0xWIGwdypk2Jp3LlJpwBE9CJgQWZWUOEo7huMZeOA0y0gyzJnSKl1unwZp6BKtCMFIl17QdH3HTK3poeDxJCyLZpcXdUh2qsYiSCcEpzPxoR+OgAwnDbxBW1Yfg6lIMSxLNzsmorKltO60Qe51sB+Lc6DoPibTrKRZjOmi1GfbAxuhC53HgP4ttO2YPl2AAQhnUl+3FclJYYiFYKlvuqaeWE4b12lESRkd6QXVgp65PH297mewNnJw513LexQLxc2slSkoZXbTdbXWmEZo6AzWohRGDAxAQLAa5bqQiBNF8iATsycZNfu20rtqTCwAAPl8yLhdfIhhFIBRhUoIcjLIuprCumhB2YI50p2SARg-DqUzLmam6MDwTjpFZBYDZaCQAnNvJo9AVwTm4KVWgUoyb125mSSBnZWbvUek0SAJpSA6iKrYB2tg2zhWoTqWhJBO5MFob-WAI4ACiyZ9wlTYIwbM8Mz6wGQDOCcyA4DIFLBOUA050CQBgDGcB2EdDDCjlYdRjoNgzWJEAA


So what's the problem here? 

We need to look closer here: 

```

type Column<T extends RowData, K extends keyof T> = {  
  key: K; 
  label: string; 
  action: (value: T[K], rowData: T) => void;
}

// All of our data
type RowsAndColumns<T extends RowData> = {
  rows: Array<T>; 
  columns: Array<Column<T, keyof T>>; 
}
```

Here, ultimately all of our types are being derived the shape of the `RowData`, which is what we want. 

The problem is this: 

```
  columns: Array<Column<T, keyof T>>; 
```

`keyof T` is going to create a union list of all possible keys, and the narrowing stops there. 

That is, what this is doing is: 

```
columns: Array<Column<T, "bar" | "bing" | "bong">>
```

Whereas, what we want is: 

```
columns: Array<Column<T, "bar"> | Column<T, "bing">  | Column<T, "bong">>
```

An important difference!

To do this, we change the way we declare column: 

```
type NarrowColumn<T extends RowData> = {
  [K in keyof T] : {
    key: K; 
    label: string; 
    action: (value: T[K], rowData: T) => void; 
  }
}[keyof T]; 

// All of our data
type RowsAndColumns<T extends RowData> = {
  rows: Array<T>; 
  columns: Array<NarrowColumn<T>>; 
}

```


https://www.typescriptlang.org/play?ssl=91&ssc=3&pln=61&pc=1#code/FDAuE8AcFMAICUD2B3AIgQ1O2BeB0BjRAJwBMAeAZ1GIEsA7AcwBpYBXega3pXoD5YAMlgBvWqQBcsanSYBfANywQAehXRGAOmXAi9arGIoAjLFyjgZs+KkAiI8gC0x280tX66ALbQ7AI0Q-V2UrWHRGX1gATijWdzN6Ni8AdXEI0EopYwAGONDErwAFRAJOaAypACY8q3RSUmJoSkyLUNCZaHKAOSS-aGIsmrbpGk7QLu9I2wAxRERYAGVQW3jYOWBFHT0DB0qzPBFVm1h7FEdK11XPHzt0ABtaAmhg1fDImKHYAtTSdJaAZk+BWKpXKLWMnzqDSaLUOwzMHW6vX6gxC8MR40mdlm8yWK1C602IBAEBgsAAwog7kl6OQACqwaAAD1A0HopEoCBQGCwrAA0oyWWyObAyuBEAAzWB0gQHMzuMVSPlKdx3dB9O5SGQMRgqszoAigWiIehSAAUADd7mxInSANp8gC6rAcPPQUjpAEpcAILYhxAoNsTSXAJsQHJTqV5aQzmaz2ZykGhMOhZa1YA7YAxRdBxVK6Y7YFI4VZFbBlWizGqNVqaDq9bVDcbTbBLdbbQ7nYZuSmPd6cL7-aQG4S7WLJdLHSrg1A4IVOndoKQwxGqTT6YL4yKk260yXM9nx-nC8XVmWK6tq9BNSNZLrK2EmybzVbqR2nS6e1g+z7YH6A2ihKBsSwAShwT70I+TyQBk87XkuK4oJG66xkKCZcsmWB8Garq9tKrBEFGLZwYuy7oOGSFrtG9J8N6hxBsABrQbBC4IeRq5EWaJbWJIJwOI44gvKE7onOgQlWH4UixMocisOmPGnvCObgHYgmfKEV43rYlCID4sCabAAAW-TPOpjZGs+ravjan6Yeg-YCNx8JqNZcB4NqTC2W6UigMZ3bINIhnoDAqwEqsskPiJTmhGWthiWZVbqtedg6XpBnGY04nDAaFktm2b5eSmDnyUpsAue25geSw-nebAvlwA4gXBdAoVWOsBJuKEkklTFub+FlbSaSlulwOlJkDcJEEvu2hVYMV0XOSornmAUfTELNIn1f5TUhUp7VtRsnogWosAAIKwIRNJZpypD9LQFpLrAEpGF4dV+Y1pApqw6Dstd7CUI9oDzLdlAEHQfRhHcdywBOW1ipy2ZbQ42jACdACSoCQzpRnoJyqVwJwDCkDDUoAOQ5c2pNPeBuVvZgF0-VsJoGJd0amFIyHUSGE4OBCJzXM8e5nn1-OTANQ0nIUmC0GymMTD4lyTbl00FTVRW-vRSnbFS0CaHciCMPlNqeoGYVErozOY6z9B7BzVG0tzUq86wcURLYQu9Spolu58Eu2FLRqy2dPuvFNVkzWrc0a61Zja4uesG0b0Am+FGzTtsVv2-8RYUvb5CO-5fO2N8aRgu75hObFJe-GXvtJVpp0PcQbywD0XhrSTsA-H8ivmc2Ks2ZH9nR0pJ0LLQUPgIK3iQIudXzJQhkoHTmPimwDOQUxMJvQ1TSY7D73L59WAxxdzM6wnhu4VgmjV38KhD7fSQgmUGQmw+QE6Cdp1Q53iBsMQWAx90BgFnBhSgp12Sc30BuOMwpExflTBXdwDgWinXDOgcANEGzWzQRgrBiFkDQJonwFU6xVAqC6CgVgjB7pshXpDaGB84DAL+mwO4RovCYGvFPW6dAHrE2erpHeGE3SsHqo0QK-87jEwhiaO4U8TRwAiPQO6BA6qzhRmBegEFYBeHANMGMm54GiJTNhPQEpaCMCkEmCBUD7aUBonREA5DiT6MMVxFBKAWh2lWGIXitgJRzAmrAPw5F-DkRCX4HUUkPgPjMAEJgil4QiTiafbqcV0BiVavtMw+0uzuFwVIXxoQFqxTCcQEJfsABCkTOptAppZJOG15qn1jufeO+tDauRTsMXJax6lWDKSLWwiTGBVPrnYapJpxmDL7k01yLSR6lTjrrLpSdND2SUGoQoRgYDEAgLAcmVNSCICaF8RAmNmS0AMCaDRZJSZVVgAAHy+MiQBryRBhCkKtfoShupVSUHIUmmg2llQfnSPykAjB+EXK9DKcAbkMLpLOBYYNaAwSAWcyg9BSaY24MvWgUotrLRDH9LaSiz7hiaJAE0pAdTzxOBU2wMNAGjJ1CykgTKZksrBSdAAog9SCvl-6MEMivR5sBkBBUxsgOAyAfqYyBjjSAMBIIIpRjk1OZhHSHWnMAIAA

And this solves our problem: 


So what's happening here? 

It's all in the magic of this structure, which I'll be to be the first to admit, is a bit arcane. 

```
type NarrowColumn<T extends RowData> = {
  [K in keyof T] : {
    key: K; 
    label: string; 
    action: (value: T[K], rowData: T) => void; 
  }
}[keyof T]; 
```

Let's peel it back one, and just examine if it looks like this: 

```
type PeeledNarrowColumn<T extends RowData> = {
  [K in keyof T] : {
    key: K; 
    label: string; 
    action: (value: T[K], rowData: T) => void; 
  }
}; 
```

In this case, what we're saying is, 'this is an object, and for each of the keys of T, it has a property matching that key, and one  of these `{key, label, action}` objects. 

That is, the if the RowData is: 

```typescript
const row = {
    id: "row-id", 
    a: "a", 
    b: 9, 
}; 

```

Then the `PeeledNarrowColumn<typeof row>` would be an object like: 

```typescript
const column = {
    id: {
        key: "id", 
        label: "some label here", 
        action: (value, rowData) => {
            //value = string, rowData: the row shape
        }
    }, 
    a: {
        key: "a", 
        label: "some label here", 
        action: (value, rowData) => {
            //value = string, rowData: the row shape
        }
    }
    b: {
        key: "b", 
        label: "some label here", 
        action: (value, rowData) => {
            //value = number, rowData: the row shape
        }
    }
}
```

The extra `[keyof T]` now makes a lot more sense. We're saying 'Ok, given that object, actually we only what the type accessible by this index'. 

And this is exactly what we want, it's going to be a union type like: 

```typescript 
    {
        key: "id", 
        label: string, 
        action: (value, rowData) => {
            //value = string, rowData: the row shape
        }
    } | {
        key: "a", 
        label: string, 
        action: (value, rowData) => {
            //value = string, rowData: the row shape
        }
    } | {
        key: "b", 
        label: string, 
        action: (value, rowData) => {
            //value = number, rowData: the row shape
        }
    }

```


