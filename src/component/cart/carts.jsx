import {useState} from 'react';
import '../cart/carts.css'
import { useParams } from 'react-router-dom';


function Cards({title,description,price,img}) {
  return (
    <>
      <div className=''>
          <div className="card1">
            <div className="image">
              <img src={img}/>
            </div>
        	  <div className="productTitle1">
              {title}
        	  </div>
        	  <div className="cost1">
        		  {price}$
        	  </div>
            <div className="description1">
              <p>{description} </p>
            </div>
        	<button className="addtocart1" >Check Details </button>
        </div>
      </div>
    </>
  );
}

export default Cards;