import { useNavigate } from "react-router-dom";
import { PaytmLogo } from "./PaytmLogo";

export function Header(){
    const navigate = useNavigate()

    return <header className="bg-white-500 text-black p-4" >
    <div className="flex justify-between container mx-auto items-center" >
        <h1 className="text-lg  font-bold" >{<PaytmLogo/>}</h1>
        <nav>
            <ul className="flex space-x-4 font-semibold">
                <li onClick={()=>{
                    navigate('/signup')
                }} className="bg-paytmBlue rounded-lg p-1 hover:bg-sky-400 text-white hover:cursor-pointer" > Signup</li>
            </ul>
        </nav>
    </div>
</header>
}