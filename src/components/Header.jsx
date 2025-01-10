import React, { useState } from 'react'
import { Menu } from './Menu'

export const Header = ({ classement, navigation }) => {
    const [isActive, setIsActive] = useState(false)

    const toggleMenu = () => {
        setIsActive(!isActive)
    }

    return (
        <>
            <div className="fixed w-full z-50 bg-white">
                <div className='flex justify-between px-3 h-[65px] items-center text-2xl border-b-2'>
                    <div className="flex justify-between lg:w-[450px] items-center">
                        <button className='lg:hidden' onClick={toggleMenu}>{isActive ? (<i className="fa-solid fa-xmark"></i>) : (<i className="fa-solid fa-bars"></i>)}</button>
                        {/* <Category navigation={navigation} classement={classement} className={'hidden lg:block'} /> */}
                    </div>
                    <div className="">
                        <h1>Chatbot-AI</h1>
                    </div>
                </div>
                <div className="flex justify-end">
                </div>
                {isActive && <div onClick={() => setIsActive(!isActive)} className="lg:hidden h-screen bg-black/20 backdrop-blur-sm blakdrop-opacity-20 w-screen fixed z-40"></div>}
                <Menu navigation={navigation} classement={classement} className={`lg:hidden block transform ease-in-out duration-500 z-50 ${isActive ? 'translate-x-[0%]' : ' translate-x-[-100%]'}`} />
            </div>
        </>
    )
}

export const Category = ({ className, classement, navigation }) => {
    const [isActive, setIsActive] = useState(null)

    const hoverCategory = (category) => {
        if (isActive == category) {
            return true
        } else {
            return false
        }
    }

    const toggleClassement = (category) => {
        setIsActive(category)
        if (category == isActive) {
            setIsActive(null)
        }
    }

    return (
        <div className={`w-[300px] text-[15px] ${className}`}>
            <div className="flex justify-around items-center">
                {classement.map((category, index) => (
                    <div key={index} className="">
                        <button
                            className={`flex items-center space-x-2 px-2 py-1 ease-in duration-[500] transform hover:translate-y-[-5px] transition-[500] ${hoverCategory(category.title) ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
                            onClick={() => toggleClassement(category.title)}
                        >
                            <p>{category.title}</p>
                            <p className='mt-1 text-xs'>{category.title == isActive ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}</p>
                        </button>
                        {
                            isActive == category.title &&
                            <div className={`absolute bg-gray-200 rounded-md p-3`}>
                                {category.classement.map((cat, i) =>
                                    <button key={i} className='w-full flex justify-between items-center hover:bg-gray-300 p-2 rounded-md' onClick={() => navigation(cat.title)}>
                                        {cat.logo != '' && <img src={cat.logo} className='rounded-md object-cover w-[25px] h-[25px] mr-5' />}
                                        {cat.title}
                                    </button>
                                )}
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

