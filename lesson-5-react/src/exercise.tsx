import React, { useEffect, useState } from 'react';


// Exercise 1 - Add typings that make sense to the function. 
// Note how the component is being used in exercise 2
export const Header = (props) => {
    const {children, className, style} = props; 
    return <header className ={className} style = {style}>{children}</header>
}


// Exercise 2 add typings to make sense. 
export const Main = (props) => {
    const {
        header, 
        body, 
        footer
    } = props; 

    return <main> 
        <div> {header}</div>
        <div>{body}</div>
        <div>{footer}</div>

        </main>
}


export const App1 = () => {
    return <Main
        header = {<Header>Hello world!</Header>}
        body = {<div>I am a the body!</div>}
        footer = {<div>I am the footer</div>}
    />
}

export const App2 = () => {
    //@ts-expect-error
    return <Main
        header = {<Header>Hello world!</Header>}
        footer = {<div>I am the footer</div>}
    />
}




// Exercise 3 - Add typings that make sense


type User = {
    id: string; 
    imgSrc: string; 
    name: string; 
}

type UserPaneProps = {
    user: User; 
}

const fetchUser = async () : Promise<User> => {
    return {
        id: "123", 
        imgSrc: "placeholdit", 
        name: "Joe Bloggs"
    }
}

export const UserPane = (props: UserPaneProps) => {

    const {user} = props; 
    const {imgSrc, name} = user; 

    return <div> 
        Name: {name}
        <img src = {imgSrc} alt = {name}/>
    </div>
}

export const UserDetailsPage = () => {
    const [user, setUser] = useState(null); 

    useEffect(()=> {
        fetchUser().then(user => setUser(user)); 
    }, []);

    return <section>
        <h2>User Details</h2>
        {user && <UserPane user = {user}/>}
    </section> 
}


// Simple use case 
const App3 = () => {
    return <UserDetailsPage/> 
}


// Exercise 4 - Add typings that make sense
// This scenario is like above, but allows a flexible way to render the user pane via a render prop

export const FlexibleUserDetailsPage = (props) => {
    const {RenderUserPane} = props; 
    const [user, setUser] = useState(null); 

    useEffect(()=> {
        fetchUser().then(user => setUser(user)); 
    }, []);

    return <section>
        <h2>User Details</h2>
        {user && <RenderUserPane user = {user}/>}
    </section> 
} 

// Simple use case 
const App4 = () => {
    //@ts-expect-error
    return <FlexibleUserDetailsPage/> 
}

const App6 = () => {
    
    return <FlexibleUserDetailsPage RenderUserPane={UserPane}/> 
}


// Exercise 5 

// Something about the difference between ReactNode and React Element. 

