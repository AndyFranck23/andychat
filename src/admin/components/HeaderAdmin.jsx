import React, { useState } from 'react'
import { MenuAdmin } from './MenuAdmin'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const HeaderAdmin = ({ userdata }) => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)
    const toggleMenu = () => {
        setIsActive(!isActive)
    }

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            console.log('Déconnecté');
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        }
    };

    return (
        <>
            <div className='fixed w-full p-2 bg-gray-800 text-white text-md z-50'>
                <div className="flex justify-between">
                    <div className="flex space-x-5">
                        {/* <img src="" alt="" /> */}
                        <button className='sm:hidden block' onClick={toggleMenu}>
                            {isActive ? (<i className="fa-solid fa-xmark"></i>) : (<i className="fa-solid fa-bars"></i>)}
                        </button>
                        <p>PenPilot</p>
                    </div>
                    <div className="flex ">
                        <p className='flex items-center space-x-2'><span className='sm:block hidden'>Bonjour, </span>
                            <button onClick={() => setToggleUser(!toggleUser)} >
                                {userdata.identite} <i className="fa-regular fa-circle-user text-lg"></i>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div className={`fixed p-2 bg-gray-700 text-gray-300 text-sm sm:text-md right-0 block transform ease-in-out duration-300 z-10 ${toggleUser ? "translate-y-[100%]" : "translate-y-[0%]"}`}>
                <div className="">
                    <button onClick={logout}>
                        Se déconnecter
                    </button>
                </div>
            </div>
            {isActive ? <div onClick={() => setIsActive(!isActive)} className="sm:hidden fixed h-screen w-screen z-20 bg-black opacity-50"></div> : ''}
            <MenuAdmin userType={userdata.admin} className={`sm:hidden block transform ease-in-out duration-500 z-50 ${isActive ? 'translate-x-[0%]' : ' translate-x-[-100%]'}`} />
        </>
    )
}