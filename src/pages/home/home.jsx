import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { Suspense } from "react";

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getHomeProducts } from "../../data";

export function loader() {
  return defer({ products: getHomeProducts() })
}

export default function Home() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false ,
    autoplay : true ,
    autoplaySpeed : 3000 , 
    pauseOnSpeed : true ,
  }

  const products = useLoaderData()
  console.log(products)
  return (
    <>
      <div className="p-8">
        <Suspense fallback={<h1>loading...</h1>} >
          <Await resolve={products.products}>
            {(products) => (
              <div className="bg-bg-gray rounded-lg">
                <Slider {...settings} >
                {products.map(ele => (
                  <div key={ele.id}>
                    <div className=" grid grid-cols-1 md:grid-cols-2 items-center justify-between">
                      <div className="p-8 flex flex-col space-y-6 order-2 md:order-1">
                        <h1 className="text-2xl font-semibold capitalize">{ele.title}</h1>
                        <h1 className="text-4xl font-bold">{ele.category}</h1>
                        <h1 className="text-lg text-gray-700" >{ele.description}</h1>
                        <h1 className="text-xl font-bold" >{ele.price}$</h1>
                        <button className="px-4 py-2 w-fit transition-all duration-300 text-white bg-primary rounded-full capitalize font-semibold hover:scale-105 cursor-pointer" >
                          <Link to={'products'} >shop now</Link>
                        </button>
                      </div>
                      <div className="justify-center order-1 md:order-2">
                        <img className="w-60 h-60 mx-auto mix-blend-multiply" src={ele.images[0]} />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  )
}