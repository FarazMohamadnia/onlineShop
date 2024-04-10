import { useState } from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Navbars from '../../component/navbar/navbar';
import './cartid.css'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiSolidBadgeDollar} from 'react-icons/bi'
import {TbReportMoney, TbShoppingBagPlus} from 'react-icons/tb'
import ProductsList from '../../component/ProductsList/ProductsList';
import imgicon from '../../asset/Businessman searching for solutions - 480x576.png'
import bgImg from '../../asset/bgImg.jpg'

function CardId() {
    const params = useParams().cardid;
    const[Data,LoadTime]=useFetch(`http://localhost:8000/Products/${params}`)
    const[Data2,LoadTime2]=useFetch(`http://localhost:8000/Products`)
    let isoffer=''
    let newData ={}
    if(LoadTime == false){
      newData = Data
    }
    newData.offer == true ? isoffer = 'Have' : isoffer = 'dontHave'
    
    const nextPrice = newData.price - ((newData.price * newData.offerPercent)/100)

    const cartSelected = ()=>{
      localStorage.setItem(newData.id,JSON.stringify(newData))
      // window.open("/cart")
    }
  return (
    <>
    <div className='bg-dark'>
        <Navbars/>                     
        <Container fluid='lg'>
            <Row className='d-flex flex-lg-row-reverse justify-content-around mt-2 mb-5'>
              <Col className='productPhoto mb-3 mt-2' lg={4} sm={9}>
                <img src={newData.img} className='w-100 h-100 rounded-5 box-shadow-1 '/>
                <div className='setfont d-lg-block d-none rounded-3 my-2 p-1 pt-4 border border-3 border-black text-center fw-bold ' style={{height:'5rem' , background :'linear-gradient(to top right,rgba(0, 0, 0, 0.399) , white )'}}>
                  {newData.CompanyName}
                </div>
              </Col>
              <Col className='mb-3 productDescrption' lg={3} sm={5} >
                <h2 className='fw-bold setfont pt-3 ps-1'>
                  {newData.title}
                </h2>
                <hr/>
                <p className='fs-5 '>
                  {newData.description}
                </p>
              </Col>
              <Col className='productCart rounded' lg={4} sm={6} >
              <div className='text-center'>
                <p><TbReportMoney size={'3rem'} color='gold'/></p>
                <h2 className='setfont d-lg-none fw-bold text-white'>{newData.CompanyName}</h2>
              </div>
                <div className='d-flex my-5 fs-5 text-light  setfont'>
                  <div className='w-75'>
                    <p>Price :</p>
                    <p>Discount :</p>
                    <p className=''>Discount Percent :</p>
                  </div>
                  <div className='w-25 text-end'>
                    <p>{newData.price}</p>
                    <p>{isoffer}</p>
                    <p ><Badge className='bg-danger'>{newData.offerPercent}%</Badge></p>
                  </div>
                </div>
                <div className=' mx-auto text-center my-3 p-2 w-75 rounded rounded-4 fs-4 fw-bold bg-black text-white' >
                {nextPrice}<BiSolidBadgeDollar size={'27px'} color='gold'/>
                </div>
                <div className='d-flex justify-content-center'>
                  <Button onClick={cartSelected} className='bg-danger fw-bold w-50 rounded rounded-4 border border-black '>Buy<TbShoppingBagPlus/></Button>
                  <button className='border rounded-circle ms-1 bg-danger' style={{width:'45px',height:'45px'}}><AiOutlineHeart size={'1.3rem'} color=''/> </button>
                </div>

              </Col>
            </Row>
            <hr/>
            <Row className='mt-5'>
              <Col lg={3} xxl={2} className='box-shadow-icon rounded' style={{backgroundImage:`url(${bgImg})` , backgroundSize:`cover` ,backgroundColor:'rgb(232, 232, 232)',backgroundBlendMode:'multiply' }}>
                <h4 className='d-flex align-item-start'>
                  <span className='align-self-start'>Similar Items</span>
                  <span className='d-none d-lg-block'>
                    <lord-icon
                      src="https://cdn.lordicon.com/whtfgdfm.json"
                      trigger="loop"
                      delay="1500"
                      colors="primary:#848484"
                      style={{width:'30px',height:'30px'}}>
                    </lord-icon>
                  </span>
                </h4>
                <img src={imgicon} className='d-lg-block d-none Similar-icon'/>
              </Col>
              <Col lg={9} xxl={10} className='Similar-Items rounded'>
                {
                  LoadTime2 ? <p>loading....</p>:
                  Data2.filter(item => item.CompanyName === newData.CompanyName && item.id !== newData.id)
                  .map(newitems => (<Link to={`/Card/${newitems.id}`}><ProductsList {...newitems}/></Link>))
                }
              </Col>
            </Row>

        </Container>
    </div>
    </>
  );
}

export default CardId;