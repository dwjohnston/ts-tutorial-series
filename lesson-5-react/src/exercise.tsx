import React, { useEffect, useState } from 'react';


// Exercise 1 - Add typings that make sense to the function. 
// Note how the component is being used in exercise 2


type HeaderProps = {

}
export const Header = (props: HeaderProps) => {
    const { children, className, style } = props;
    return <header className={className} style={style}>{children}</header>
}

const App0 = () => {
    return <div> 

            <Header>foo </Header>; 
            <Header><span>foo</span> </Header>; 
            <Header className ="bar">foo </Header>; 

            <Header style = {{color: "red"}}> foo </Header>; 


            {/* @ts-expect-error */}
            <Header style = {{blurp: "red"}}> foo </Header>; 





    </div>;
}

type MainProps = {

}
// Exercise 2 add typings to make sense. 
export const Main = (props : MainProps) => {
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
        header={<Header>Hello world!</Header>}
        body={<div>I am a the body!</div>}
        footer={<div>I am the footer</div>}
    />
}

export const App2 = () => {
    //@ts-expect-error
    return <Main
        header={<Header>Hello world!</Header>}
        footer={<div>I am the footer</div>}
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

const fetchUser = async (): Promise<User> => {
    return {
        id: "123",
        imgSrc: "placeholdit",
        name: "Joe Bloggs"
    }
}

export const UserPane = (props: UserPaneProps) => {

    const { user } = props;
    const { imgSrc, name } = user;

    return <div>
        Name: {name}
        <img src={imgSrc} alt={name} />
    </div>
}


export const UserPane2 = (props: UserPaneProps) => {
    return props.user.name; 
}

export const UserDetailsPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser().then(user => setUser(user));
    }, []);

    return <section>
        <h2>User Details</h2>
        {user && <UserPane user={user} />}
        {user && <UserPane2 user = {user}/>}
    </section>
}


// Simple use case  
const App3 = () => {
    return <UserDetailsPage />
}


// Exercise 4 - Add typings that make sense
// This scenario is like above, but allows a flexible way to render the user pane via a render prop

type FlexibleUserDetailsPageProps = {
}

export const FlexibleUserDetailsPage = (props : FlexibleUserDetailsPageProps) => {
    const { RenderUserPane } = props;
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser().then(user => setUser(user));
    }, []);

    return <section>
        <h2>User Details</h2>
        {user && <RenderUserPane user={user} />}
    </section>
}

const App4 = () => {
    return <div>
        {/* @ts-expect-error*/}
        <FlexibleUserDetailsPage />
        <FlexibleUserDetailsPage RenderUserPane ={UserPane}/>
        <FlexibleUserDetailsPage RenderUserPane = {UserPane2}/>
</div>
}

const App5 = () => {

    return 
}


// Exercise 5 

// Change the typing to fix the type errors. 

const Title1 = () => {
    return <div>Hello World!</div>;
}

type Title2Props = {
    isRaw: boolean;
}
const Title2 = (props: Title2Props) => {

    const { isRaw } = props;
    if (isRaw) {
        return "Hello World!"
    } else {
        return <span> Hello world!</span>
    }
}

type TitleHolderProps = {
    title: React.ReactElement;
}
const TitleHolder = (props: TitleHolderProps) => {
    return <div>
        {props.title}
    </div>

}


const App6 = () => {
    return <div>
        <TitleHolder
            title={<Title1 />} />
        <TitleHolder
            title={<Title2 isRaw={true} />} />
        <TitleHolder
            title={<Title2 isRaw={false} />} />
    </div>
}