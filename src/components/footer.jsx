import { Link } from "react-router-dom"
import { FaInstagram, FaFacebook, FaTwitter, FaRegCopyright } from "react-icons/fa";

export default function Footer() {
    const date = new Date().getFullYear()
    return (
        <>
            <div className="bg-darkBg dark:bg-black text-white rounded-t-3xl p-8 relative bottom-0 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3">
                    <div className="flex flex-col space-y-6">
                        <h1 className="text-2xl dark:text-white capitalize font-bold">quick links</h1>
                        <ul className="flex flex-col space-y-6 capitalize mx-4">
                            <li className="hover:text-primary font-semibold cursor-pointer"><Link to={""}>home</Link></li>
                            <li className="hover:text-primary font-semibold cursor-pointer"><Link to={"products"}>products</Link></li>
                            <li className="hover:text-primary font-semibold cursor-pointer"><Link to={"about"}>about</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <h1 className="text-2xl dark:text-white capitalize font-bold">contact</h1>

                        <div className="space-y-4">
                            <h1 className="font-semibold text-xl">contact us via social media</h1>
                            <ul className="flex gap-8 text-2xl">
                                <li className="hover:text-primary cursor-pointer"><FaInstagram /></li>
                                <li className="hover:text-primary cursor-pointer"><FaFacebook /></li>
                                <li className="hover:text-primary cursor-pointer"><FaTwitter /></li>
                            </ul>
                        </div>

                        <div>
                            <h1 className="font-semibold text-xl">contact us via email</h1>
                            <p className="text-lg text-dark-text font-semibold">eShop@gamil.com</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <h1 className="text-2xl dark:text-white capitalize font-bold">company links</h1>
                        <ul className="flex flex-col space-y-6 capitalize mx-4">
                            <li className="hover:text-primary font-semibold cursor-pointer">clinet services</li>
                            <li className="hover:text-primary font-semibold cursor-pointer">our brands</li>
                            <li className="hover:text-primary font-semibold cursor-pointer">more services</li>
                        </ul>
                    </div>
                </div>
                <div className="text-dark-text flex gap-2 items-center capitalize justify-center text-center">
                    <p><FaRegCopyright /></p>
                    <h1 className="text-xl font-semibold">{date} e-shop copyrights</h1>
                </div>
            </div>
        </>
    )
}