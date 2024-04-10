// Bootstrap liberies
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { BiSearchAlt } from "react-icons/bi";
import useFetch from '../../hooks/useFetch';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useRef, useState } from 'react';
import SearchingCart from '../SearchingCart/searchinCart';



function Navbars() {
  const expand ='lg';
  const searchingDiv=useRef()
  const [data , loadingTime]=useFetch('http://localhost:8000/Products')
  let newData ={}
  const [searchingValue ,setsearchingValue ]=useState('')
  if(loadingTime == false){
    newData = data
  }
  const searchProducts =(e)=>{
    searchingDiv.current.classList.remove('d-none')
    e.target.value == ''?searchingDiv.current.classList.add('d-none'):searchingDiv.current.classList.remove('d-none')
    setsearchingValue(e.target.value)
  }

  return (
    <>
      
        <Navbar key={expand} expand={expand} className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3 align-items-lg-center">
                  <NavLink to='/' className='links mx-3'>Home</NavLink>
                  <NavLink to='/create' className='links mx-3'>create</NavLink>
                  <NavLink to='/Login' className='links mx-3'>Login</NavLink>
                </Nav>
                <div className="mycontainer d-none d-lg-block">
                    <input onChange={searchProducts} type="text" name="text" className="myinputs" placeholder="Type to search..." />
                    <div className="myicon">
                      <BiSearchAlt />     
                    </div>
                    <div ref={searchingDiv} className='searchCointainer rounded d-none overflow-scroll'>
                      <span><AiFillCloseCircle onClick={()=>{searchingDiv.current.classList.add('d-none')}} size={'35'} className='m-auto w-100'/></span>
                      <div className='d-flex flex-wrap justify-content-around'>
                      {searchingValue !=''? 
                        newData.filter(item => item.title == searchingValue)
                        .map(item => <SearchingCart {...item}/>):''
                      }
                      </div>
                    </div>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
    </>
  );
}

export default Navbars;