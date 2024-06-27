import {Heading} from "../components/Heading";
import {SubHeading} from "../components/Subheading"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/Bottomwarning";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Signup(){
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate()
    return <div className="bg-slate-500 h-screen flex justify-center" >
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4" >
                <Heading label={"Sign up"}/>

                <SubHeading label={"Enter your information to create an acoount"} />

                <InputBox onChange={e=>{
                    setFirstName(e.target.value);
                }} label={"First Name"} placeholder={"John"} />

                <InputBox onChange={(e)=>{
                    setLastName(e.target.value)
                }} label={"last Name"} placeholder={"doe"} />

                <InputBox onChange={(e=>{
                    setUsername(e.target.value);
                })} label={"Email"} placeholder={"john@gmail.com"} />

                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"Enter password"} />

                <div className="pt-4" >
                    <Button onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username:username,
                            firstname:firstName,
                            lastname:lastName,
                            password:password
                        });
                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign up"} />
                </div>

                <BottomWarning label={"Already have an acoount"} buttonText={"Sign in"} to={"/signin"}/>
                
            </div>
        </div>      
    </div>
}