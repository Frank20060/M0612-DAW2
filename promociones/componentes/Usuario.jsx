
import { Camera, Trash, Pencil, Eye  } from 'lucide-react';




export function Usuario(){


    return(

        <div className="border p-5 shadow bg-white rounded-xl border-gray-600 hover:-translate-y-2.5 duration-300 hover:scale-125 hover:shadow-2xl">
           <div className="w-[100px] h-[100px] overflow-hidden rounded-full border-3 border-pink-300">
                <img className="scale-150" src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png" alt="avatar" />
           </div>
           <div className="text-center font-bold text-xl">
                Frank
           </div>
           <div>
                Villar Redondo
           </div>
           <div className='mt-2 flex gap-2 justify-center '>
                <Trash size={16} color='red' className='hover:scale-125 duration-300 '/>
                <Pencil size={16} color='green ' className='hover:scale-125 duration-300 '/>
                <Eye size={16} color='blue' className='hover:scale-125 duration-300 '/>    
           </div>
        </div>


    )
}