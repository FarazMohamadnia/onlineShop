import Navbars from '../../component/navbar/navbar';
import './create.css';
//mui lib
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
//react icons
import { AiOutlineCloudUpload , AiOutlineSend } from 'react-icons/ai'
import { BsSendCheckFill } from 'react-icons/bs'
import { BiLeftArrow } from 'react-icons/bi'
import { useMemo, useRef, useState } from 'react';
// img def
import img from '../../asset/ax.jpeg'
//axios lib
import axios from 'axios';
// sweetalert lib
import Swal from 'sweetalert2';
//swiper lib for pagination img
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import { set } from 'lodash';






export default function Create(){
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const offerDisplay = useRef()
    const  createStoryBtn = useRef()
    const createProductBtn =useRef()
    const [ ImgUrl , setImgUrl]=useState(img)
    const [loading, setLoading] = useState(false);
    const [formData , setformData]=useState({
        CompanyName:"",
        title:"",
        description:"",
        price:0,
        offer:false,
        offerPercent:0,
        img:ImgUrl
    })
    // mui lib for upload file
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    // sweet alert
    const Toast = Swal.mixin({
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })
    
    //mui lib slider
    const valuetext=(value) => {
        return `${value}`;
    }
    
    // Initialize the form
    const formHandler =async(e)=>{
        setformData({...formData, [e.target.name] : e.target.value})
        

        if(e.target.name == 'img'){
            const file = e.target.files[0]
            const render =new FileReader()
            
            render.onload=(e)=>{   
                setImgUrl(e.target.result)
            }
            render.readAsDataURL(file)
            setformData({...formData ,"img": ImgUrl})
        }
       

        if (e.target.name === 'offer' && e.target.checked === true){
            offerDisplay.current.style.display = 'block'
            setformData({...formData,[e.target.name] : true})
        }else if(e.target.name === 'offer' && e.target.checked === false){
            offerDisplay.current.style.display = 'none'
            setformData({...formData,[e.target.name] : false ,['offerPercent'] : 0})
        }
            
        
    }
    //send data
    const clickHandler =async ()=>{
        // error handling .....
        if(Object.values(formData).includes("")){
            Swal.fire('Complete the form')
        }
        else{
            setLoading(true)
            const response= await axios.post(`http://localhost:8000/Products`,{...formData,'img':ImgUrl })
            if(response.status === 201){
                Toast.fire({
                    icon: 'success',
                    title: 'Send data'
                })

            }else{
                Toast.fire({
                    icon: 'error',
                    title: 'Error ....'
                })
            }
        
            setLoading(false)
        }
        
    }
    
    //createStoryBtnHandler function
    const createStoryBtnHandler =()=>{
        createStoryBtn.current.classList.toggle('d-none')
        createProductBtn.current.classList.toggle('d-none')
    }

    // images in create Story section
    const [selectedImages, setSelectedImages] = useState([img,img]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        const imagesArray = [];

        if(files.length <= 1 || files.length > 2){
            Toast.fire({
                icon: 'error',
                title: 'You have to choose only two photos',
                timer :4000
            })
        }else{
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              const reader = new FileReader();
            
              reader.onload = (e) => {
                imagesArray.push(e.target.result);
                if (imagesArray.length === files.length) {
                  setSelectedImages(imagesArray);
                }
            };
        
              reader.readAsDataURL(file);
            }
        }
    }

    // form handler 2
    const formStoryHandlers =async() => {
        const response =await axios.post(`http://localhost:8000/Advertisings`,{
            img1:selectedImages[0],
            img2:selectedImages[1]
        })
        response.status === 201 ? Swal.fire('Submitted successfully'):Swal.fire('could not be sent')
        setSelectedImages([img , img])
    }



    return(
        <>
            <Navbars />
            <div className='create-container'>
                <div className='form-body' ref={createStoryBtn} data-aos="fade-right">
                    <h2 className='text-center fw-bold mb-3 fw-bold'>create product</h2>
                    <div className='w-75 d-flex justify-content-around mb-4 mx-auto'>
                        <TextField required onChange={formHandler} name='CompanyName' label="componyName" variant="outlined" color="error" style={{width:"190px"}} />
                        <TextField required onChange={formHandler} name='title' label="Title" variant="outlined" color="error" style={{width:"150px"}}/>
                    </div>
                    <div className='input-form-create w-75 m-auto'>
                        <label className='fw-bold' >Description*</label>:
                        <input required onChange={formHandler} name='description' className='p-1 w-100 rounded border border-2 shadow' type='text' placeholder='iphone 15 is new phone....' style={{ backgroundColor:'rgba(255,255,255,0.1)', color:'white' }}/>
                    </div>
                    <h3 className='ms-5 mt-3 ps-2'>setPrice</h3>
                    <div className='w-75 d-flex justify-content-between align-items-center mx-auto'>
                        <input required onChange={formHandler} name='price' type='number' placeholder='1000$' className=' p-1 rounded border shadow' style={{width:'135px' , height:'40px',backgroundColor:'rgba(255,255,255,0.06)',color:'white'}} />
                        <div>
                            <label>make offer</label>
                            <Switch name='offer' onChange={formHandler} {...label} color="error"/>
                            <Slider
                                ref={offerDisplay}
                                onChange={formHandler}
                                name='offerPercent'
                                aria-label="Temperature"
                                defaultValue={0}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={100}
                                color="error"
                                style={{display : 'none'}}
                            />
                        </div>
                    </div>
                    <div className='w-75 d-flex justify-content-between align-items-center mt-3 mx-auto '>
                        <div className=''>
                            <Button component="label" variant="contained" startIcon={<AiOutlineCloudUpload />} color="error" size='large'>
                              Upload
                            <VisuallyHiddenInput type="file" name='img' onChange={formHandler} multiple/>
                            </Button>
                        </div>
                        <img src={ImgUrl} className='rounded border border-danger border-2 shadow' style={{width:'135px' , height:'135px'}}/>
                    </div>
                    <div className='w-75 d-flex justify-content-between align-items-center mt-5 mx-auto'>
                        <LoadingButton
                          onClick={clickHandler}
                          endIcon={<BsSendCheckFill />}
                          loading={loading}
                          loadingPosition="end"
                          variant="contained"
                          size='large'
                          color='error'
                        >
                          <span>create </span>
                        </LoadingButton>
                        <Button variant="outlined" color="error" size='large' onClick={createStoryBtnHandler}>
                          create story <AiOutlineSend />
                        </Button>
                    </div>
                </div>
                <div className='form-body d-none' data-aos="fade-left" ref={createProductBtn}>
                    <h3 className='text-center'>Create Story</h3>
                    <div className='w-75 mx-auto'>
                        <div className='d-flex justify-content-center my-3'>
                            <button  className="btnAnimation" type='button'>
                                {/* input type file */}
                                <input multiple onChange={handleFileChange}  type="file" accept="image/*" className="position-absolute fade" style={{zIndex:'3' , cursor :'pointer' }}/>
                                <strong className='Title-Btn-Animation'>Upload File</strong>
                                <div id="container-stars">
                                  <div id="stars"></div>
                                </div>
        
                                <div id="glow">
                                  <div className="circle"></div>
                                  <div className="circle"></div>
                                </div>
                            </button>
                        </div>
                        <div className='image-background-set'>
                            <Swiper
                              cssMode={true}
                              navigation={true}
                              mousewheel={true}
                              keyboard={true}
                              modules={[Navigation, Mousewheel, Keyboard]}
                              className="w-100 h-100 rounded-4"
                            >
                              <SwiperSlide> <img src={selectedImages[0]} className='w-100 h-100'/><p className='position-absolute top-0 w-100 fs-6 fw-bold text-black background-text-photo'>Background Photo</p> </SwiperSlide>
                              <SwiperSlide> <img src={selectedImages[1]} className='w-100 h-100'/><p className='position-absolute top-0 w-100 fs-6 fw-bold text-black background-text-photo'>Advertising Photo</p> </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className='d-flex justify-content-between' >
                            <Button variant="outlined" color="error" size='large' onClick={createStoryBtnHandler} >
                                <BiLeftArrow />create product
                            </Button>
                            <LoadingButton
                                onClick={formStoryHandlers}
                                endIcon={<BsSendCheckFill />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                size='large'
                                color='error'
                            >
                              <span>create </span>
                            </LoadingButton>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        </>
    )
}