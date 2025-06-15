import earphone from '../assets/images/earphone.png'
import watch from '../assets/images/watch.png'
import macbook from '../assets/images/macBook.png'
import Button from './button'

export default function Category(){
    
    return(
        <>
          <div className="px-8 py-4 flex flex-col sm:flex-row gap-8">
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-black/90 to-black/70 px-6 py-8 text-primary-text">
                <div className='flex flex-col space-y-4 capitalize'>
                  <h1>enjoy</h1>
                  <h1 className='text-2xl font-bold text-white'>with</h1>
                  <h1 className='text-5xl tracking-widest z-0 font-bold'>earphone</h1>
                   <Button 
                    text="browse"
                    bgColor = "primary"
                    textColor = "white" 
                  />
                </div>
                <div>
                    <img src={watch} className='w-[300px]'/>
                </div>
            </div>
            <div className="flex flex-shrink items-center rounded-xl bg-gradient-to-br from-black/90 to-black/70">
               <div>
                <h1>enjoy</h1>
                <h1>with</h1>
                <h1>gadjet</h1>
                <Button 
                  text="browse"
                  bgColor = "primary"
                  textColor = "white" 
                />
               </div>

               <div>
                <img src={watch} />
               </div>
            </div>
            <div className="flex items-center rounded-xl bg-gradient-to-br from-black/90 to-black/70">
                <div>
                    <h1>enjoy</h1>
                    <h1>with</h1>
                    <h1>laptop</h1>
                </div>
                <div>
                    <img src={macbook}/>
                </div>
            </div>
          </div> 
        </>
    )
}