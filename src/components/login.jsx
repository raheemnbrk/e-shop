import { Form } from "react-router-dom"

export default function Login(){
    return(
        <>
          <div className="p-8 space-y-6">
            <Form className="flex flex-col space-y-4">
              <input
               type="email" 
               placeholder="Email"
               name="email"
               className="border-2 dark:text-white border-light-text dark:border-dark-text focus:border-primary focus:outline-0 px-4 py-2 rounded-full w-[400px] mx-auto"
               />

               
              <input
               type="password"
               placeholder="Password"
               name="password"
               className="border-2 dark:text-white border-light-text dark:border-dark-text focus:border-primary focus:outline-0 px-4 py-2 rounded-full w-[400px] mx-auto"
               />
              <button className="bg-primary text-white px-4 py-2 rounded-full w-[400px] cursor-pointer capitalize font-semibold text-xl mx-auto">Log in</button>
            </Form>
          </div> 
        </>
    )
}