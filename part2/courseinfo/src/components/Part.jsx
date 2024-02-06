import React, { useDebugValue } from "react";

const Part = ({part}) => {
    return(
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

export default Part;