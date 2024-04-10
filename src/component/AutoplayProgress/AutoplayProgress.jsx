import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import './AutoplayProgress.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// import Img test
import Img from '../../asset/ax.jpeg'

// import icon from react-icons
import { BiRightArrowAlt }from 'react-icons/bi'

export default function AutoplayProgress() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay ]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="swiper2"
      >
        <SwiperSlide><img src={Img} />
        <div className='swiper-slide-div d-none d-md-block'>
            <p>
                <h3 className='fw-bold'>fadd</h3>
                kdkdkdkdkdk kdjfkdsbf fkbsfjk kbfdskb kbfkj
            </p>
            <button>Buy<BiRightArrowAlt /></button>
        </div>
        </SwiperSlide>
        <SwiperSlide><img src={Img} />
        <div className='swiper-slide-div d-none d-md-block'>
            <p>
                <h3 className='fw-bold'>fadd</h3>
                kdkdkdkdkdk dfhksdjfjkdsf dkjfbkdsjbfjkds ldnlkdfd sfdslfdkf
            </p>
            <button>Buy<BiRightArrowAlt /></button>
        </div>
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
