import { ClipLoader } from "react-spinners"

export default function LoadingPage(){
    return(
        <>
          <div className="p-8 flex flex-col items-center justify-center">
            <ClipLoader color="#f42c37" size={50} />
            <h1 className="text-xl font-semibold capitalize dark:text-white" >loading...</h1>
          </div>
        </>
    )
}