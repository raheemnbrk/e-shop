import {
  MdOutlineLocalShipping,
  MdOutlineWifiProtectedSetup,
  MdKeyboardReturn,
  MdOutlineWorkspacePremium,
} from "react-icons/md";

export default function Features() {
  const featuresList = [
    {
      icon: <MdOutlineLocalShipping />,
      text: "free shipping",
      details: "on orders over $100",
    },
    {
      icon: <MdOutlineWifiProtectedSetup />,
      text: "1 year warranty",
      details: "Quality guaranteed",
    },
    {
      icon: <MdKeyboardReturn />,
      text: "easy return",
      details: "30-days return policy",
    },
    {
      icon: <MdOutlineWorkspacePremium />,
      text: "premium quality",
      details: "Curated selection",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center p-4 md:p-8 border-b-2 pb-4 gap-4 md:justify-items-center border-b-gray-300">
      {featuresList.map((ele, ind) => (
        <div key={ind} className="flex items-center gap-3">
          <h1 className="p-3 rounded-full text-primary font-bold bg-purple-200 md:text-2xl" >{ele.icon}</h1>
          <div>
            <h1 className="text-xl font-semibold capitalize">{ele.text}</h1>
            <h1 className="text-gray-600 font-light" >{ele.details}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
