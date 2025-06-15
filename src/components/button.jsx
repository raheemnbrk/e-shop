export default function Button(props){
    return(
        <>
          <button className={`bg-${props.bgColor} text-${props.textColor} px-8 py-2 rounded-full w-fit cursor-pointer hover:scale-105 transition-all duration-300`} >
            {props.text}
          </button>
        </>
    )
}