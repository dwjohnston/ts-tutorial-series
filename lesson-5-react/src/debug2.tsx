import React from "react"; 

type User = {
    id: string; 
    name: string; 
    imgSrc: string; 
}

type UserPanelProps = {
    user: User; 
}

export const UserPanel1 = (props: UserPanelProps) => {
    return <div> 
        {props.user.name}
    </div> 
}

export const UserPanel2 = (props: UserPanelProps) => {
    return props.user.name;
}

export const UserPanel3 = (props: UserPanelProps) => {
    return <>props.user.name</>
}


export const UserPanel4 = (props: UserPanelProps) => {
    return null;
}


class UserPanel5 extends React.Component<UserPanelProps> {
    render() {
        return this.props.user.name; 
    }
}

const Main = () => {
    const user = {
        id: "1", 
        name: "Foo bar", 
        imgSrc: ""
    }
    return <div> 
        <UserPanel1 user = {user}/>
        {/*   
            'UserPanel2' cannot be used as a JSX component.
            Its return type 'string' is not a valid JSX element.ts(2786)
         */}
        <UserPanel2 user = {user}/>
        <UserPanel3 user = {user}/>
        {UserPanel2({user})}

        <UserPanel4 user = {user}/>

        <UserPanel5 user = {user}/>


    </div>
}