
import axios from "axios"
import {useState } from "react"


const useSenddatas = (url , Dataobject)=>{
    const [snedData , setsendData]=useState(null)
    axios.post(url,Dataobject).then(res => setsendData(res))
    return [snedData]
}
export default useSenddatas;