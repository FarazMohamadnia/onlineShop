import './SearchingCart.css'
import img from '../../asset/ax.jpeg'
import { Button } from 'react-bootstrap'
import { AiOutlineDollar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
export default function SearchingCart({id,title,price,description,img}){

    return(
        <>
            <div className="Searching-cart">
                <div className='d-flex h-75 overflow-hidden '>
                    <div>
                        <img src={img} className='' />
                        <p className='fw-bold fs-6 text-light mt-2 ms-3'>{price}<AiOutlineDollar color='gold' size={'18px'}/></p>
                    </div>
                    <div className='text-justify'>
                        <p className='fw-bold mb-2 border-bottom'>{title}</p>
                        <p className='ps-1'>{description}</p>
                    </div>
                </div>
                <div className='h-25  text-center border-top'>
                    <Link to={`/card/${id}`}><Button size='sm' className='w-50 mt-2'>Open</Button></Link>
                </div>
            </div>
        </>
    )
}