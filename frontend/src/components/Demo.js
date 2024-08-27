import React from "react";

const Demo = (props) => {

    const component1 = (e) => {
        alert("`Component")
    }
    return (
        <>
            <button onClick={component1}>1</button>
            {/* <button onClick={component2}>2</button>
        <button onClick={component3}>3</button> */}
        </>
    )
}
export default Demo;