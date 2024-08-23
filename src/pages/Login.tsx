import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const url = "https://reelo-backend-production.up.railway.app/"

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const getUser = async()=>{
        const response = await fetch(`${url}/is-verified`,{
            method:"GET",
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },
        })
        const data = await response.json()
        console.log(data)
    }
    useEffect(()=>{
        getUser()
    },[])

    const onSubmit = async()=>{
        const response = await fetch(`${url}/login`,{
            method:"POST",
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },
            body:JSON.stringify({ email : email, password:password}),
        })
        if(response.status != 200){
            return
        }
        navigate("/")
    }
    return (
        <div className="flex flex-col justify-center items-center bg-gray-900 text-white h-screen">
            <div className="flex flex-col justify-center items-center gap-y-5 bg-slate-700 p-14 rounded-md bg-opacity-35">
                <h1 className=" font-bold text-2xl">Sign in to your account</h1>
                <div>
                    <div className="pb-3">Email address</div>
                    <input onChange={(e) => {
                        setEmail(e.target.value)
                    }} className=" bg-gray-700 bg-opacity-40 border border-gray-300 border-opacity-50 w-96 rounded-md h-10" type="text" name="" id="" />
                </div>
                <div>
                    <div className="pb-3">Password</div>
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }} className=" bg-gray-700 bg-opacity-40 border border-gray-300 border-opacity-50 w-96 rounded-md h-10" type="text" name="" id="" />
                </div>
                <button onClick={onSubmit} className=" bg-[#6366F1] w-96 rounded-md h-10 mt-3">Sign In</button>
                <p>
                    <span>Not a member?</span><Link to={'/signup'}><span className=" text-blue-500"> Sign up</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login