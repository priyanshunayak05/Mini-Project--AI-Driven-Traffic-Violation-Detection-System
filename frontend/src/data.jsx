import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);    

const Data = function({email, setUser}){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!email) return;
        setLoading(true);
        const res = async function(){
            const response = await fetch(`${apiUrl}/api/${email}`);
            const data = await response.json();
            console.log(data);
            setUser(data);
            setLoading(false);
        }
        res();
    }, [])
    return(
        <>
        {loading &&
        <div className="w-full h-screen flex items-center justify-center">
            loading ....
        </div>
        }
        </>
    )
}

export default Data;