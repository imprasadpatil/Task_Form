import { useContext } from "react";
import { UserContext } from "./context/userContext"
const SampleUser = () =>{
    const userState = useContext(UserContext);

    return(
        <>
        <p>{userState.user}</p>
        console.log(useContext.user)
            <h1>Sample User</h1>
        </>
    )
}
export default SampleUser;