import React from "react"; 

type User = {
    id: string; 
    name: string; 
    imgSrc: string; 
}


type UserProfilePageProps = {
    RenderUserPanel: React.ComponentType<{user: User}>; 
}

export const fetchUser = async () : Promise<User> => {
    return {
        id: "123", 
        imgSrc: "placeholdit", 
        name: "Joe Bloggs"
    }
}


const UserProfilePage =  (props: UserProfilePageProps) => {
    const {RenderUserPanel} = props; 
    const [user, setUser] = React.useState<null |User>(null); 

    React.useEffect(()=> {
        fetchUser().then(user => setUser(user)); 
    }, []);

    return <section>
        <h2>User Details</h2>
        {user && <RenderUserPanel user = {user}/>}
    </section> 
}



class ClassBasedUserPanel extends React.Component<{user: User}> {
    render() {
        return <div> 
                {this.props.user.name}
        </div>
    }
}

class ClassBasedUserPanelThatReturnsString extends React.Component<{user: User}> {
    render() {
        return  this.props.user.name; 
    }
}

const FunctionBasedUserPanel = (props: {user: User}) => {
    return <div> 
      {props.user.name}
    </div>
}

const FunctionBasedUserPanelThatReturnsString = (props: {user: User}) => {
    return  props.user.name;
}

const Main = () => {
    return <div> 
        <UserProfilePage RenderUserPanel = {ClassBasedUserPanel}/>
        <UserProfilePage RenderUserPanel = {ClassBasedUserPanelThatReturnsString}/>
        <UserProfilePage RenderUserPanel = {FunctionBasedUserPanel}/>
        
        {/* ERROR! */}
        <UserProfilePage RenderUserPanel = {FunctionBasedUserPanelThatReturnsString}/>

    </div> 
}