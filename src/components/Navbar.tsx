import React from "react";
import { Link } from "react-router-dom";

interface Props{
    login: boolean
}

const Navbar: React.FC<Props> = ({login}) => {
    return (
        <div className=" text-white bg-black fixed flex justify-between items-center w-full h-20 p-4 z-10">
            <img className=" -m-7 -ml-24" src="logo.png" alt="" />
            <Link className={!login?"hidden":"visible"} to={'/login'}>
                <button className=" bg-white p-2 rounded-lg h-fit bg-opacity-25">Login</button>
            </Link>
        </div>
    )
}

export default Navbar