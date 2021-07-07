import React from "react";
import styled from "styled-components";


/**
 * React.ComponentClass vs React.FunctionComponent vs React.ComponentType
 */
type User = {
    name: string;
    id: string;
    imgSrc: string;
}


// Class component
class ClassBasedUserPanel extends React.Component<{ user: User }> {
    render() {
        return <div>{this.props.user.name}</div>;
    }
}

// Class component that returns a string
class ClassBasedUserPanelThatReturnsString extends React.Component<{ user: User }>  {
    render() {
        return this.props.user.name;
    };
}


// Function component
const FunctionBasedUserPanel = (props: { user: User }) => {
    return <div>{props.user.name} </div>;
}

// Function component that returns a string
const FunctionBasedUserPanelThatReturnsString = (props: { user: User }) => {
    return props.user.name;
};

// Directly referencing the component itself

// TypeScript is not being very helpful here!
const a = ClassBasedUserPanel;  //const a: typeof ClassBasedUserPanel
const b = FunctionBasedUserPanel;
// const b: (props: {
//     user: User;
// }) => JSX.Element

const c = ClassBasedUserPanelThatReturnsString; //const a2: typeof ClassBasedUserPanelThatReturnsString

const d = FunctionBasedUserPanelThatReturnsString;
//const b2: (props: {
//    user: User;
//}) => string



// Referencing output of the components
const e = new ClassBasedUserPanel({ user: { name: "hello", id: "1", imgSrc: "" } }).render();  //const a: JSX.Element
const f = FunctionBasedUserPanel({ user: { name: "hello", id: "1", imgSrc: "" } });    //const b: JSX.Element

const g = new ClassBasedUserPanelThatReturnsString({ user: { name: "hello", id: "1", imgSrc: "" } }).render(); //const e: string
const h = FunctionBasedUserPanelThatReturnsString({ user: { name: "hello", id: "1", imgSrc: "" } }); //const f: string


console.log(JSON.stringify(a) === JSON.stringify(b)); // true




function acceptsReactComponentType(value: React.ComponentType<{ user: User }>) {

}

acceptsReactComponentType(a); //OK
acceptsReactComponentType(b); //OK
acceptsReactComponentType(c); //OK
acceptsReactComponentType(d); // Not OK!  <--❗

acceptsReactComponentType(e);   //Not OK
acceptsReactComponentType(f);   //Not OK
acceptsReactComponentType(g);   //Not OK
acceptsReactComponentType(h);   //Not OK

function acceptsReactComponentClass(value: React.ComponentClass<{ user: User }>) {

}

acceptsReactComponentClass(a);  //OK
acceptsReactComponentClass(b);  //Not OK

acceptsReactComponentClass(c);  //OK
acceptsReactComponentClass(d);  //Not OK

acceptsReactComponentClass(e);  //Not OK
acceptsReactComponentClass(f);  //Not OK
acceptsReactComponentClass(g);  //Not OK
acceptsReactComponentClass(h);  //Not OK

function acceptsReactFunctionComponent(value: React.FunctionComponent<{ user: User }>) {

}

acceptsReactFunctionComponent(a); //Not OK
acceptsReactFunctionComponent(b); //OK

acceptsReactFunctionComponent(c); //Not OK
acceptsReactFunctionComponent(d); //Not OK! <--❗

acceptsReactFunctionComponent(e); //Not OK
acceptsReactFunctionComponent(f); //Not OK
acceptsReactFunctionComponent(g); //Not OK
acceptsReactFunctionComponent(h); //Not OK

/**
 * React.Component
 */

function acceptsReactComponent(value: React.Component) {

}


acceptsReactComponent(a); //Not OK
acceptsReactComponent(b); //Not OK
acceptsReactComponent(e); //Not OK
acceptsReactComponent(f); //Not OK
acceptsReactComponent(new ClassBasedUserPanel({ user: { name: "hello", id: "1", imgSrc: "" } })); // OK



/**
 * ReactElement vs ReactNode vs JSX.Element
 */



function acceptsReactElement(value: React.ReactElement) {

}
acceptsReactElement(a);     // Not OK
acceptsReactElement(b);     // Not OK
acceptsReactElement(e);     //OK
acceptsReactElement(f);     //OK
acceptsReactElement(g);     //Not OK
acceptsReactElement(h);     //Not OK

function acceptsJsxElement(value: JSX.Element) {

}

acceptsJsxElement(a);     // Not OK
acceptsJsxElement(b);     // Not OK
acceptsJsxElement(e);     //OK
acceptsJsxElement(f);     //OK
acceptsJsxElement(g);     //Not OK
acceptsJsxElement(h);     //Not OK


function acceptsReactNode(value: React.ReactNode) {

}

acceptsReactNode(a);     // Not OK
acceptsReactNode(b);     // Not OK
acceptsReactNode(e);     //OK
acceptsReactNode(f);     //OK
acceptsReactNode(h);     //OK
acceptsReactNode(g);     //OK


/**
 * React.PropsWithChildren
 */

type MyComponentProps = {
    title: string;
    onClick: () => void;
};


const MyComponent = (props: React.PropsWithChildren<MyComponentProps>) => {
    const { title, onClick, children } = props;

    return <div>
        {title}
        <button onClick={onClick}> click!</button>
        {children}
    </div>;
}



/** 
 * Accepting render props
 */


// Style A - lowerCase, direct function call

type StyleAProps = {
    title: string;
    renderFoo: (value: number) => React.ReactNode;
};

const StyleA = (props: StyleAProps) => {

    const { title, renderFoo } = props;
    const foo = Math.random();

    return <div>
        {title}
        {renderFoo(foo)}
    </div>

}

// StyleB - PascalCase, props style
//❗❗❗ - The problem with this style is that issue I mentioned earlier!

type StyleBProps = {
    title: string;
    RenderFoo: React.ComponentType<{ foo: number }>;
}

const StyleB = (props: StyleBProps) => {
    const { title, RenderFoo } = props;
    const foo = Math.random();

    return <div>
        {title}
        <RenderFoo foo={foo} />
    </div>
}

type FooProps = {
    foo: number;
}

const Foo1 = (props: FooProps) => {
    return <div> {props.foo}</div>;
}

const Foo2 = (props: FooProps) => {
    return props.foo;
}


const App = () => {
    return <div>
        <StyleA title="A1" renderFoo={(foo) => <div>{foo}</div>} />
        <StyleA title="A2" renderFoo={(foo) => foo} />
        <StyleB title="B1" RenderFoo={Foo1} />

        {/*     Type 'number' is not assignable to type 'ReactElement<any, any> | null'.ts(2322) */}
        <StyleB title="B2" RenderFoo={Foo2} />
    </div>
}


/*
useState
*/


const MyComponentWithState = () => {

    const [name, setName] = React.useState(null);

    //Argument of type 'string' is not assignable to parameter of type 'SetStateAction<null>'.ts(2345)
    return <input defaultValue='' onChange={(e) => setName(e.target.value)} />
}


const MyComponentWithState2 = () => {

    const [name, setName] = React.useState<null | string>(null);
    return <input defaultValue='' onChange={(e) => setName(e.target.value)} />
}


/*
callBack inference
*/


const MyComponentWithInputs = () => {
    const changeHandler = (e) => {
        // No intellisense here!
        console.log(e);
    }
    return <div>
        <input onChange={(e) => {

            // This is so much easier!
            console.log(e.target.offsetHeight);
        }} />

        <input onChange={changeHandler} />
    </div>
}

/**
 * Styled Components
 */

const SomeComponent = (props: { className?: string, title: string }) => {
    return <div className={props.className}></div>
}


const StyledDiv = styled.div`
    color: red; 
`;

const StyledInput = styled.input` 

`;

const StyledSomeComponent = styled(SomeComponent)`

`;


const App2 = () => {
    return <div>
        <StyledDiv style={{ color: 'red' }} />
        <StyledInput onClick={(e) => {
            // Typing of the original event is retained. 
            console.log(e.target);
        }} />
        <StyledSomeComponent title="hello" />


        {/* Unknown types not allowed */}
        <StyledDiv foo="bar" />
        {/* Missing types are a problem */}
        <StyledSomeComponent />

    </div>
}




const StyledDiv2 = styled.div<{ isSelected: boolean; mode: "green" | "blue" }>`
  border: solid 1px black;

  // We get intellisense here
  color: ${(props) => (props.isSelected ? "red" : "blue")};

  background-color: ${(props) => props.mode};
`;

const App3 = () => {
    return (
        <div>
            <StyledDiv2 isSelected mode="green">
                one
            </StyledDiv2>
            <StyledDiv2 isSelected mode="blue">
                two
            </StyledDiv2>
            <StyledDiv2 isSelected={false} mode="green">
                three
            </StyledDiv2>
        </div>
    );
};


/**
 * CSS Properties
 */



type MyComponentThatAcceptsStylesProps = {
    style?: React.CSSProperties;
    className?: string;
    title: string;
}

export const MyComponentThatAcceptsStyles = (props: MyComponentThatAcceptsStylesProps) => {
    const {
        style,
        className,
        title
    } = props;

    return <div className={className} style={style}>
        {title}
    </div>
}

const App4 = () => {
    return <div>
        <MyComponentThatAcceptsStyles title="foo" />v
        <MyComponentThatAcceptsStyles style={{
            color: "red"
        }} title="foo" />
        <MyComponentThatAcceptsStyles style={{
            //Type 'number' is not assignable to type 'Color | undefined'.ts(2322)
            color: 9999,
        }} title="foo" />
        <MyComponentThatAcceptsStyles style={{
            //Type '{ blurp: number; }' is not assignable to type 'Properties<string | number, string & {}>'.
            blurp: 9999,
        }} title="foo" />
    </div>
}


/**
 * Ref Forwarding
 */


const StandardRefExample = () => {

    const ref = React.useRef<HTMLDivElement | null>(null); 

    return <div ref = {ref}> 

    </div>
}

const RefForwardedExampled = React.forwardRef<HTMLDivElement>((props, ref) => {
    return <div ref ={ref}> 

    </div>
}); 

const App5 = () => {

    const ref = React.useRef<HTMLDivElement | null>(null); 

    return <RefForwardedExampled ref = {ref}/>
}