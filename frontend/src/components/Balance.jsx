export function Balance({value}){
    return <div className="flex " >
        <div className="font-bold text-lg ml-4" >
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg" >
            Rs {value}
        </div>
    </div>
}