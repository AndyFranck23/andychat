import React, { useState } from 'react'

export const Menu = ({ className, classement, navigation }) => {
    const [isActive, setIsActive] = useState(null)
    const showOptions = (index) => {
        index == isActive ? setIsActive(null) : setIsActive(index)
    }

    return (
        <div className={`fixed overflow-y-auto z-40 lg:mt-[64px] list-none space-y-1 bg-white border-r-8 border-gray-300 w-[200px] sm:w-[250px] h-screen py-5 px-5 ${className}`}>
            <li>
                <a href='/' className='flex justify-between items-center w-full hover:bg-gray-200 p-3 rounded-2xl'>Accueil</a>
            </li>
            {classement.map((option, index) => (
                <li key={index} className=''>
                    <button onClick={() => showOptions(index)} className='flex justify-between items-center w-full hover:bg-gray-200 p-3 rounded-2xl'>
                        {option.title}
                        {isActive == index ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-right"></i>}
                    </button>
                    {isActive == index ? <OptionSelect navigation={navigation} options={classement} index={index} /> : ''}
                </li>
            )
            )}
        </div>
    )
}

export const OptionSelect = ({ index, options, navigation }) => {
    return (
        <div className="p-2 space-y-2 bg-gray-100 rounded-lg">
            {
                options[index].classement.map((option, i) => (
                    <ul key={i}>
                        <li>
                            <a
                                href={`/classement/${options[index].title + '/' + option.title}`}
                                // onClick={() => navigation(option.title)}
                                className='flex items-center w-full hover:bg-gray-200 p-2 rounded-xl p-1'
                            >
                                <img src={option.logo} className='rounded-md object-cover w-[25px] h-[25px] mr-5' />
                                <p>{option.title}</p>
                            </a>
                        </li>
                    </ul>
                ))
            }
        </div>
    )
}