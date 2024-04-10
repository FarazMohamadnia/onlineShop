import { useEffect, useState } from 'react'
import './cartSelection.css'

export default function CartSelection(){
    let datas=[]
    useEffect(()=>{
            datas.push(JSON.parse(localStorage.getItem(localStorage)))
            console.log(datas)
    },[])
    return(
        <>
            <div>
                {datas.CompanyName}k
            </div>
        </>
    )
}