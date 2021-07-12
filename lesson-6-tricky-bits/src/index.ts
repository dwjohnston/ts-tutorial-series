type Bar = Readonly<{
    name: string; 
    obj: {
        value: number; 
    }
}>; 

const bar : Bar = {
    name: "bob", 
    obj: {
        value: 999
    }
}; 


bar.name ="aaa"; 
bar.obj.value = 9999; 