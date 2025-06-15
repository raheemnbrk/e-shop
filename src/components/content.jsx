import Slider from "react-slick"
import img1 from '../assets/images/headSpeakers.png'
import img2 from '../assets/images/vr.png'
import img3 from '../assets/images/macBook.png'

import Button from "./button"

export default function Content(){
 
    const settings = {
      dots: false,
      arrows : false ,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const data = [
        {
          img : img1 ,
          subtitiles : "beats solo" , 
          title1: "wireless" ,
          title2 : "headphone" ,
          description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam repellat, dolorem odio perferendis, delectus, natus exercitationem consequuntur illum nihil praesentium sit unde asperiores similique cupiditate non alias magni tempora quaerat." 
        } ,
        {
          img : img2 ,
          subtitiles : "beats solo" , 
          title1: "wirless" ,
          title2 : "virtual" ,
          description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam repellat, dolorem odio perferendis, delectus, natus exercitationem consequuntur illum nihil praesentium sit unde asperiores similique cupiditate non alias magni tempora quaerat." 
        },
        {
          img : img3 ,
          subtitiles : "beats solo" , 
          title1: "wirless" ,
          title2 : "branded" ,
          description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam repellat, dolorem odio perferendis, delectus, natus exercitationem consequuntur illum nihil praesentium sit unde asperiores similique cupiditate non alias magni tempora quaerat." 
        }
    ]

    return(
        <>
          <div className="px-8 py-4">
            <div className="rounded-2xl bg-bg-primary dark:bg-night-secondary">
                <Slider {...settings} >
                    {data.map((ele , ind) => (
                        <div key={ind}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center space-y-4 p-4 sm:py-20 sm:px-8 overflow-hidden">
                              <div className="flex flex-col justify-center space-y-4 dark:text-white capitalize text-center sm:text-left order-2 sm:order-1">
                                <h1 className="text-2xl sm:text-3xl font-bold">{ele.subtitiles}</h1>
                                <h1 className="text-5xl sm:text-7xl font-bold">{ele.title1}</h1>
                                <h1 className="text-5xl sm:text-9xl text-white dark:text-night-text font-bold uppercase tracking-wide z-0">{ele.title2}</h1>
                                <Button
                                  text="shop by category"
                                  bgColor = "primary"
                                  textColor = "white" 
                                />
                            </div>

                            <div className="order-1 sm:order-2">
                                <img src={ele.img} className="w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] sm:scale-105 lg:scale-110 object-center mx-auto" />
                            </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
          </div>
        </>
    )
}