import React from "react";
import star from './images/star.png'

const Rating = ()=>{
    return (
        <>
            <div className="flex gap-1 mt-1 mb-3">
                 <img src={star} className="w-4" />
                 <img src={star} className="w-4" />
                 <img src={star} className="w-4" />
                 <img src={star} className="w-4" />
                 <img src={star} className="w-4" />
            </div>
            
        </>
    )
}

export default Rating