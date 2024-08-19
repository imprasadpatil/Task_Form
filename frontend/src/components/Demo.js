import React from "react";

const Demo = () =>{

    const component1 = (e) =>{
        alert("Component 1")
    }

    const component2 = (e) =>{
        return(
            <h1>Component 2</h1>
        )
    }

    const component3 = (e) =>{
        return(
            <h1>Component 3</h1>
        )
    }

    return(
        <>
        <button onClick={component1}>1</button>
        <button onClick={component2}>2</button>
        <button onClick={component3}>3</button>
        </>
    )
}
export default Demo;