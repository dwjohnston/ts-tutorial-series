


type Foo<T extends number | string> = {
    label: string; 
    value: T; 
}

export const fooIsNumber = <T extends number |string>(foo: Foo<T>) : T extends number?  true : false => {
    if (typeof foo.value === 'number'){
        return true as T extends number ? true : false; 
    }
    else {
        return false as T extends number ? true : false; 
    }
}



console.log("start");
const result = fooIsNumber({
    label: "foo", 
    value: 1
})
console.log(result); 
console.log("end");