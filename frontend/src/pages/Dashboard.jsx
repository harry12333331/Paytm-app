import { Appbar } from "../components/Appbar";
import {Balance} from "../components/Balance"
import {Users} from "../components/Users"
import axios from "axios";
import { useEffect, useState } from "react";
export function Dashboard(){
    const[balance,setBalance] = useState(0)

    useEffect(()=>{
        const fetchBalance = async()=>{
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    Authorization:"Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(response.data.balance.toFixed(2))}
        fetchBalance();
    })
  
    return <div>
        <Appbar/>
        <Balance value={balance} />
        <Users/>
    </div>
}