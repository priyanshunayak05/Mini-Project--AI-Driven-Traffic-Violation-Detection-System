import { useEffect } from "react";

const Data = function({email, setUser}){

    useEffect(() => {
        if(!email) return;
        const res = async function(){
            const response = await fetch(`http://localhost:5000/api/${email}`);
            const data = await response.json();
            console.log(data);
            setUser(data);
        }
        res();
    }, [])
    return(
        <div className="">
        </div>
    )
}

export default Data;