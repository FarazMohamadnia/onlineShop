// swiper liberies 
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './header.css';
import img from '../../asset/ax.jpeg'

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard ,Autoplay} from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function Headers() {
  const gj=[1,2,3,4,5,6,7]
  return (
    
        <Swiper
            spaceBetween={1}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
        {
          gj.map((item)=> 
          <SwiperSlide>
            <Link to="/s"><img src={img}/></Link>
          </SwiperSlide>
          )
          
          
          
        }
        
        
        </Swiper>
        
  );
}
