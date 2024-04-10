
import { useEffect, useMemo, useRef, useState } from 'react'
import Card from '../../component/cart/carts'
import Navbars from '../../component/navbar/navbar'
import '../home/home.css'
import { Link } from 'react-router-dom';
import Headers from '../../component/headers/header';
import ProductsList from '../../component/ProductsList/ProductsList';
import AdvertisingStory from '../../component/AdvertisingStory/AdvertisingStory';
import {BsArrowLeftCircleFill ,BsArrowRightCircleFill} from 'react-icons/bs'
import AutoplayProgress from '../../component/AutoplayProgress/AutoplayProgress';
//custom hook
import useFetch from '../../hooks/useFetch';
//Aos lib [animation]
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import Footer from '../../component/Footer/Footer';
// ..
AOS.init();


export default function Home(){
    // Fetch data width custom hook
    const [AdvertisingsData , loadingTime1] = useFetch('http://localhost:8000/Advertisings')
    const[ProductsData , loadingTime2] = useFetch(`http://localhost:8000/Products`)

    //scrolling function
    const [scrollX, setscrollX] = useState(0)
    let scrl = useRef();
    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
        setscrollX(scrollX + shift);
    }

    return(
        <>
        <div>
            <Navbars />
        </div>
        <div>
            <Headers />
        </div>
        <div className='productsList'>
        {
            loadingTime2 == true ?<p>loading....</p>: 
            ProductsData.filter(item =>item.offer == true).map(datas => <Link to={`/Card/${datas.id}`}> <ProductsList {...datas}/> </Link> )
            
            
        
        }
        </div>
        <div className="d-flex m-3 justify-content-center flex-wrap justify-content-lg-start">
            
            {
                loadingTime2 == true ?<p>loading....</p>:
                ProductsData.filter(item => item.offer == false).map(item =>(
                <Link key={item.id} to={`/card/${item.id}`} data-aos="fade-right">
                    <Card  {...item} />
                </Link>
                ))
            }
        </div>
        <div className='Advertising-story-container' ref={scrl}>
        <span  onClick={()=>slide(-120)} className='icon-left'><BsArrowLeftCircleFill size={'30px'}/></span>
        {   
            loadingTime1 == true ?<p>loading....</p>:
            AdvertisingsData.map(item => (
                <AdvertisingStory {...item}/>
            ))
        }
        <span onClick={() => slide(+120)} className='icon-right'><BsArrowRightCircleFill size={'30px'} /></span>
        </div>
        <div>
            <AutoplayProgress />
        </div>
        <div>
            <Footer />
        </div>
        </>
    )
}