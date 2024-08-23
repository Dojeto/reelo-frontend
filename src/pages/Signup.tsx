import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const url = "https://reelo-backend-production.up.railway.app"

const Signup : React.FC = ()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")

    const onSubmit = async()=>{
        const response = await fetch(`${url}/signup`,{
            method:"POST",
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },
            body:JSON.stringify({ email : email, password:password,name:name,username:username}),
        })
        if(response.status != 200){
            return
        }
        navigate("/")
    }
    return(
        <div className="flex flex-col justify-center items-center bg-gray-900 text-white h-screen">
            <div className="flex flex-col justify-center items-center gap-y-5 bg-slate-700 p-14 rounded-md bg-opacity-35">
                <h1 className=" font-bold text-2xl">Welcome To the Reelo</h1>
                <div>
                    <div className="pb-3">Name</div>
                    <input onChange={(e)=>{
                        setName(e.target.value)
                    }} className=" bg-gray-700 bg-opacity-40 border border-gray-300 border-opacity-50 w-96 rounded-md h-10" type="text" name="" id="" />
                </div>
                <div>
                    <div className="pb-3">Username</div>
                    <input onChange={(e)=>{
                        setUsername(e.target.value)
                    }} className=" bg-gray-700 bg-opacity-40 border border-gray-300 border-opacity-50 w-96 rounded-md h-10" type="text" name="" id="" />
                </div>
                <div>
                    <div className="pb-3">Email address</div>
                    <input onChange={(e)=>{
                        setEmail(e.target.value)
                    }} className=" bg-gray-700 bg-opacity-40 border border-gray-300 border-opacity-50 w-96 rounded-md h-10" type="text" name="" id="" />
                </div>
                <div>
                    <div className="pb-3">Password</div>
                    <input onChange={(e)=>{
                        setPassword(e.target.value)
                    }} className=" bg-gray-700 bg-opacity-40 border border-gray-300 border-opacity-50 w-96 rounded-md h-10" type="text" name="" id="" />
                </div>
                <button onClick={onSubmit} className=" bg-[#6366F1] w-96 rounded-md h-10 mt-3">Sign Up</button>
                <p>
                    <span>Already have an account?</span><Link to={'/login'}><span className=" text-blue-500"> Sign in</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup