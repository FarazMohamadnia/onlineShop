import './ProductsList.css'
import { BiSolidOffer } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import { Badge }from 'react-bootstrap'
import '../../index.css'
import { useState } from 'react'



export default function ProductsList({title,description,price,offerPercent,img}){
    const nextPrice = price - ((price * offerPercent)/100)
    const param = useParams().cartid
    return(
        <>
            <div className='productsBox box-shadow-1'>
                <span className='offericon'><BiSolidOffer size={'30px'} color='black'/></span>
                <div className='img-Box'><img src={img} className='rounded'/></div>
                <p className='m-1 fw-bold fs-6'>{title}</p>
                <p className='m-1 text-design'>{description}</p>
                <div className='d-flex justify-content-between m-1 mt-4 align-item-center'>
                    <p className='m-0'><span className='text-danger'>{price}</span>
                     <lord-icon
                         src="https://cdn.lordicon.com/zmkotitn.json" 
                         trigger="loop" 
                         delay="1500" 
                         colors="primary:#121331" 
                         style={{width:'20px', height:'20px',top:'6px'}}> 
                     </lord-icon>
                    <span className='text-success'>{nextPrice}</span></p>
                    <span >
                        <Badge bg="danger" text="dark" className='mt-2 fw-bold'>
                            {offerPercent}%
                        </Badge>
                    </span>
                </div>
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                       
        </>
    )
}