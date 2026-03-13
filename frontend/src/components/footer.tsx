import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <Link to="/">
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <h1 className="bg-primary px-2 py-0.5 rounded-sm text-white text-xl font-bold">
                e
              </h1>
              <h1 className="text-xl font-bold">e-shop</h1>
            </div>
          </Link>
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Quick links</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"products"}>products</Link>
              </li>
              <li>
                <Link to={"orders"}>track orders</Link>
              </li>
              <li>
                <Link to={"my-profile"}>my profile</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-212-456-7890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright {new Date().getFullYear()} ©,e-shop. All Right Reserved.
      </p>
    </footer>
  );
}
