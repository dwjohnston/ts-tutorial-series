# Todo

- check if JSX.Elmeent is assignable to ReactNode. 
- Check stuff about 'Function of a certain type'. 



# TypeScript and React

Typings for React can be added by install `yarn add -D @types/react`. 

There are a lot of typings for React. 

In this lesson we will go over the ones you may need to use the most. 

Remember though - by allowing TypeScript to infer types, you often don't need to explicitly state the types!

## Before we start - let's talk about React and JSX. 

React introduces this new syntax called JSX, which we're all familiar with. But it's probably important to understand what it actually is. 

When we declare a function component: 

```typescript
const MyComponent = ({name}) => {
    return <div> hello {name} </div>; 
}
```

The component declaration is just a straight up function. 

When we type the `<div> hello {name}</div>` - this is just syntatic shorthand for writing: 

```typescript
React.createElement("div", null,
        "hello ",
        name);
```

If we use the above component in another component like: 

`<MyComponent name ="foo"/>` then similarly the actual code is just: 

```typescript 
const OtherComponent = () => {
    return React.createElement(MyComponent, { name: "foo" });
};
```

Now when we execute this code, what we get is:

```
console.log(<MyComponent name ="foo"/>); 
console.log(<OtherComponent/>); 
```

```
{ '$$typeof': Symbol(react.element),
  type: [Function: MyComponent],
  key: null,
  ref: null,
  props: { name: 'foo' },
  _owner: null,
  _store: {} }
{ '$$typeof': Symbol(react.element),
  type: [Function: OtherComponent],
  key: null,
  ref: null,
  props: {},
  _owner: null,
  _store: {} }
```



It is these objects that ultimately go to the React engine and determines what gets displayed on the screen. 

So what I want to highlight here is that when we talk about _components_, we are talking about functions (or the React.Component class) that return JSX. When we talk about _JSX_ or _rendered JSX_ we are talking about that object. 

### Exercise 

Look at the code in `src/render.tsx`. 

Now run `yarn build:render`. 

Look at the compiled code in `lib/render.js`

Now run `yarn start:render`

Examine the output. 



## React.ComponentClass vs React.FunctionComponent vs React.ComponentType

`React.ComponentType` is the easiest to understand, it's just `React.ComponentClass | React.FunctionComponent`. 

These types are essentially *functions* that create the component *instances* themselves. 

But there is an important distinction: 

A Function component accepts props only and directly returns JSX. 

A Class component is first instantiated, and then returns JSX via it's render method.


eg. 


```typescript

// Class component
class Foo extends React.Component {

    render() {
        return <div> hello </div>; 
    }
}

// React component
const Bar = ()=> {
    return <div> hello </div>; 
}

//These two produce the same result
const a = new Foo().render(); 
const b = Bar();

console.log(JSON.stringify(a) === JSON.stringify(b)); // true

```

`React.ComponentClass` has more generic parameters than `React.FunctionComponent`. 

## ReactComponent 

Is a special case. 

This is the instantiation of the class component, but not the rendered JSX. 

ie. 

```typescript
   const instance = new Foo(); //Instantiating the component, without calling the render method. 
```

I can't think of a scenario where this might be useful, except maybe in testing, because if you are writing JSX, you are always both instantiating the component and calling the render method. 

https://codesandbox.io/s/elastic-bhabha-oss83?file=/src/App.js


## ReactElement vs ReactNode vs JSX.Element

These types are the rendered JSX objects that are created by the above types. 

More details here

https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement

To understand the difference between these, see this code: 



A `ReactElement` is specifically a 'reacty' JSX object, it basically looks like this: 

```
{ '$$typeof': Symbol(react.element),
  type: 'div',
  key: null,
  ref: null,
  props: { children: 'hello' },
  _owner: null,
  _store: {} }
```

A `ReactNode` is this, and also other valid JSX expressions - such as a ReactFragment, a string, a number or an array of ReactNodes, or null, or undefined, or a boolean.

A `JSX.Element` 


## React.PropsWithChildren

If you are creating a component that has children, the easiest way to define it is with the `React.PropsWithChildren` type. 

```typescript

type MyComponentProps = {
    title: string; 
    onClick: () => void; 
}; 


const MyComponent = (props: React.PropsWithChildren<MyComponent>) => {
    const {title, onClick, children} = props; 

    return <div> 
        {title}
        <button onClick = {onClick}> click!</button> 
        {children}
    </div>; 
}

```

## Accepting ReactNodes elsewhere (eg. in a title)

Often we want to accept 'children' in multiple places of a component, eg: 

```typescript
const HomePage = ({header, body, footer}) => {
    return <div> 
        <header>{header}</header> 
        <main>{main}</main>
        <footer>{footer}</footer>
    <div>; 
}

```

In this scenario - `ReactNode` is the best type to use:


```typescript
type HomePageProps = {
    header: ReactNode; 
    body: ReactNode; 
    footer: ReactNode; 
}; 

``` 

## Accepting React Components elsewhere (ie. renderProps) 

Sometimes rather than straight up declaring content that will go into the header, like we did above, we want to pass a _component_ (ie. a function) in, and have the component we are passing into determine what it's properties are. 

In this case, you could do it like: 


```
// TODO. 
```


## Accepting only children of a certain type

This is possible. But we will leave this for another day. 




## useState

Often we will need to set the generic parameter when using the `useState` function: 

eg: 



TODO: UPDATE
```typescript

const MyComponent = () => {

    const [name, setName] = useState(null); 

    return <input value = {name} onChange = {(e) => setName(e.target.value)}>
}
```

## Leaf elements are typed


What do you call them? 
TODO


## Inferences when passing callbacks. 

As mentioned in lesson 3 - The easiest way to get the typings of React events is to declare the event handler inline: 

//TODO


## React events vs normal events

// TODO

## Styled components

TODO

## CSSProperties

The list of all CSS properties is available as React.CSSProperties

TODO


## Some tricky bits

### refs

I found that refs really fuck up the typings. 


