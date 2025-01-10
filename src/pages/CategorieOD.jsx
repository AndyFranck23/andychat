import React from 'react'
import { useLocation } from 'react-router-dom'

export const CategorieOD = () => {
    const location = useLocation()
    const data = location.state

    return (
        <div className="w-full sm:flex block mt-5 bg-gray-90">
            <div className="border-r-2 border-white p-5">
                <div className=" border-b-2 border-white">
                    <div className="w-full">
                        <div className="flex items-center px-3 pt-3 ">
                            <img src={data.image} className='mr-2 w-[65px] h-[65px] rounded-xl' />
                            <div className="">
                                <h1 className='text-2xl text-black font-bold m-2'>{data.title} </h1>
                                <p className='font-medium sm:text-md text-sm border-gray-100 border-2 px-2 sm:py-1 py-0 rounded-[50px] m-2'>Screen recording</p>
                            </div>
                        </div>
                        <div className="px-3 py-1 flex flex-wrap text-white text-md font-medium lg:text-lg space-x-1 space-y-1">
                            <button className='bg-white px-5 py-2 rounded-lg text-black m-2'>Use tool</button>
                        </div>
                    </div>
                </div>

                <div className=' pt-4'>
                    <img src="IMG1.jpg" alt="" />
                </div>
                <Caracteristiques data={data} />
                <Description />
                <div className='p-5'>
                    <button className='bg-neutral-900 rounded-lg text-white py-3 m-1 w-full hover:bg-gray-700'>Use tools</button>
                    <button className='bg-gray-200 rounded-lg text-black py-3 m-1 w-full'>Save</button>
                    <button className='bg-cyan-500 rounded-lg text-white py-3 m-1 w-full'> Vote Best AI Tool of 2024</button>
                </div>
            </div>

            <div className="sm:w-[300px] w-full">
                ofrre court
            </div>
        </div>
    )
}



const Caracteristiques = ({ data }) => {
    return (
        <div className='rounded-lg p-5 bg-white mt-8  '>

            <div className='rounded-lg bg-gray-200 m-5'>
                <div className="border-[30] rounded-lg place-items-center ">
                    <p className='text-black p-1'>Primary task</p>
                    <button className='border-[30] bg-gray-100 rounded-lg text-black px-5 py-1'>voice changing</button>
                </div>
                <div className='rounded-b-lg bg-gray-300 place-items-center mt-2'>
                    <p className='text-white p-1'>*un most recent</p>
                </div>
            </div>
            <div className='flex flex-wrap m-3'>
                {
                    data.classement.map((item, index) =>
                        <button key={index} className='border-[30] bg-gray-100 rounded-lg text-black px-3 py-1 m-1 text-xs sm:text-sm'>{item} </button>
                    )
                }
                <p className=' p-1'>from $13,5/mo</p>
            </div>
            <p className='p-4 text-[15px]'>Most popular alternative:  <span className='font-bold'> MetaVoice Studio  </span> (321 saves)</p>
            <div className=''>
                <button className='flex bg-gray-100 rounded-lg  px-3 py-2 m-2 text-[15px] w-full'> View all 9alternatives</button>
                <button className='flex bg-gray-100 rounded-lg px-3 py-2 m-2 text-[15px] w-full'> recommendation </button>
            </div>

        </div>

    )
}

const Description = () => {
    return (
        <div className='rounded-lg p-5 bg-white mt-8 '>
            <div className='flex bg-gray-100 rounded-lg p-5 justify-between'>
                <div className='h-[20px] items-center flex '>
                    <img src="IMG1.jpg" alt="" className='w-10 h-10' />
                    <p className='font-bold text-black'>Xing Balanca </p>
                </div>
                <div className='ml-[150px]'>
                    <p className='font-bold text-black '>Message</p>
                </div>
            </div>
            <div className=''>

            </div>

        </div>
    )
}