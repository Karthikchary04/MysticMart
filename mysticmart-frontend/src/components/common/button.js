import React from "react";

const button = ({children, ...props}) => {
    return (
        <button {...props}>
            {children}
        </button>
    )
}

export default button;