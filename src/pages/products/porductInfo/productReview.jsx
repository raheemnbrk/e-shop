import { useOutletContext } from "react-router-dom";

import { FaCircleUser } from "react-icons/fa6";

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductReviews() {
    const product = useOutletContext()

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : false
    };
    return (
        <>
            <div className="p-8 space-y-6">
                <h1 className="text-xl font-bold capitalize">reviews({product.reviews.length})</h1>
                <div>
                    <Slider {...settings}>
                        {product.reviews.map((ele) => (
                            <div key={ele}>
                                <div className="space-y-4 bg-gray-300 p-6 rounded-2xl">
                                    <div className="flex gap-4 items-center ">
                                        <h1 className="text-4xl"><FaCircleUser /></h1>
                                        <div>
                                            <h1 className="font-semibold ">{ele.reviewerName}</h1>
                                            <h1 className="text-light-text">{ele.reviewerEmail}</h1>
                                        </div>
                                    </div>
                                    <h1>{new Date(ele.date).toLocaleDateString()}</h1>
                                    <h1>rating:{"⭐".repeat(Math.round(ele.rating))}</h1>
                                    <h1>
                                        <span className="text-lg font-semibold">comments: </span>
                                        <span className="text-light-text">{ele.comment}</span>
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    )
}