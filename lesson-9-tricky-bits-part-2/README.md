At reason not to do type assertions when declaring constants: 



```

type RowData = Record<string, unknown> & {id: string}; 

//eg. 

const row1  : RowData = {
    id: "row-1",
    name: "bob", 
    age: 99, 
    address: {
        streetNumber: 1, 
        streetName: "Foo St"
    }
}; 


const row2  = {
    id: "row-1",
    name: "bob", 
    age: 99, 
    address: {
        streetNumber: 1, 
        streetName: "Foo St"
    }
}; 


type Column<T extends RowData, K extends keyof T> = {  
  key: K; 
  action: (value: T[K], rowData: T) => void;
}


const column1 : Column<typeof row1, "name"> = {
    key: "name", 
    action: (value, rowData) => {
        type A = typeof value; 
        //type A = unknown
        type B = typeof rowData; 
        // type B = Record<string, unknown> & {
        //     id: string;
        // }
    }
}; 

const column2 : Column<typeof row2, "name"> = {
    key: "name", 
    action: (value, rowData) => {
        type A = typeof value; 
        //type A = string
        type B = typeof rowData; 
        // type B = {
        //     id: string;
        //     name: string;
        //     age: number;
        //     address: {
        //         streetNumber: number;
        //         streetName: string;
        //     };
        // }
    }
}; 

```

Doing a type assertion will narrow the type, which might not be what you want. 
