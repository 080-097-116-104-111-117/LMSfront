import React, {useState} from "react";

function Count(){
    const [count, setCount] = useState(0);

    
    function increase(){
        setCount(count + 1);
    }
    // ! setInterval(increase, 1000);

    function decrease(){
        if(count !=0){
            setCount(count - 1);
        }
    }

    return(
        <div>
            <h1>{count}</h1>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
        </div>
    )
}

export default Count;