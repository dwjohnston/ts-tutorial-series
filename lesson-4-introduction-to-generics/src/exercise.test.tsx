import { createFruitFromColor, returnFavouriteColor, returnPayloadOfValue, returnsSameTypeAsValueParameter} from "./exercise";

describe("returnsSameTypeAsValue", () => {
    it ("does not have an error if the types are the same", () => {


        const result : number = returnsSameTypeAsValueParameter(9);

        const result2 : {obj: string} = returnsSameTypeAsValueParameter({obj: "hello"});

    });

    it ("does have an error if the types are not the same", () => {
        //@ts-expect-error
        const result : number = returnsSameTypeAsValueParameter("aaa");

        //@ts-expect-error
        const result2 : {obj: string} = returnsSameTypeAsValueParameter({foo: "hello"});

    }); 
})


describe ("returnPayloadOfValue", () => {
    it ("does not have errors if the typing is the same", () => {


        const result = returnPayloadOfValue("hello"); 
        const value : string = result.value; 
        const weight: number = result.weight; 


        const result2 = returnPayloadOfValue({fn: () => 9}); 
        const value2 :{fn: () => number} = result2.value; 
        const weight2: number = result2.weight; 

    }); 


    it ("does not have errors if the typing is the same", () => {


        const result = returnPayloadOfValue(999); 
        //@ts-expect-error
        const value : string = result.value; 
        const weight: number = result.weight; 


        const result2 = returnPayloadOfValue({fn: () => "hello"}); 

        //@ts-expect-error
        const value2 : {fn: () => number} = result2.value; 
        //@ts-expect-error
        const weight2: string = result2.weight; 

    }); 
}); 

describe ("returnFavouriteColor", () => {
    it ("has type errors if you don't pass a correct color in", () => {
        //@ts-expect-error
        returnFavouriteColor("orange"); 
    })


    it ("has the return type matches the color passed in", () => {
        const color : "red" =returnFavouriteColor("red");
        
        //@ts-expect-error
        const color2: "blue" =returnFavouriteColor("red");
    })
}); 



describe ("createFruitFromColor", () => {

    it ("has type errors if you pass the wrong color in", () => {
        //@ts-expect-error
        createFruitFromColor("orange"); 
    })


    it ("has the return type matches the color passed in", () => {
        const result =createFruitFromColor("red");
        
        const color : "red" = result.color; 

        //@ts-expect-error
        const color2: "blue" = result.color; 
    })
   
}); 