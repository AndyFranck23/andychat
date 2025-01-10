import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const MenuAdmin = ({ className, userType, role }) => {
    const navigate = useNavigate()

    const [isActiveOffre, setIsActiveOffre] = useState(false)
    const [isActiveClassement, setIsActiveClassement] = useState(false)
    const [isActiveCompte, setIsActiveCompte] = useState(false)
    const [isActiveSousClassement, setIsActiveSousClassement] = useState(false)

    const toggleOffre = () => {
        setIsActiveClassement(false)
        setIsActiveCompte(false)
        setIsActiveOffre(!isActiveOffre)
    }

    const toggleClassement = () => {
        setIsActiveOffre(false)
        setIsActiveCompte(false)
        setIsActiveClassement(!isActiveClassement)
    }

    // const toggleSousClassement = () => {
    //     navigate('/admin/Classement')
    //     setIsActiveOffre(false)
    //     setIsActiveClassement(!isActiveClassement)
    // }

    const toggleCompte = () => {
        setIsActiveOffre(false)
        setIsActiveClassement(false)
        setIsActiveCompte(!isActiveCompte)
    }

    return (
        <div className={`${className} fixed bg-gray-800 w-40 mt-10 h-full text-white text-sm sm:text-md overflow-y-auto py-2`}>
            <ul className='space-y-2 list-none touch-pan-y'>
                <li className=''>
                    <MyButton disabled={!userType} text={'Comptes'} icon={'fa-regular fa-user'} onClick={toggleCompte} className={`space-x-3 ${!userType && 'cursor-not-allowed opacity-50'}`} />
                    <div className={`bg-gray-700 text-gray-300 ${isActiveCompte ? 'block' : 'hidden'}`}>
                        <MyButton text={'Tous les comptes'} onClick={() => {
                            navigate('/admin/toutCompte')
                        }} />
                        <MyButton onClick={() => {
                            navigate('/admin/demande')
                        }}
                            text={"Demande d'inscription"} />
                    </div>
                </li>
                <li className=''>
                    <MyButton onClick={toggleOffre} text={'Offre'} icon={'fa-regular fa-user'} className={`space-x-3 ${isActiveOffre ? 'bg-blue-500 text-white hover:text-white' : ''}`} />
                    <div className={`bg-gray-700 text-gray-300 ${isActiveOffre ? 'block' : 'hidden'}`}>
                        <MyButton text={'Tous les offres'} onClick={() => {
                            navigate('/admin/toutOffre')
                        }} />
                        <MyButton onClick={() => {
                            navigate('/admin/ajoutOffre')
                        }}
                            text={'Ajouter un offre'} />
                    </div>
                </li>
                <li>
                    <MyButton text={'Classement'} icon={'fa-regular fa-user'} onClick={toggleClassement} className={`space-x-3 ${isActiveClassement ? 'bg-blue-500 text-white hover:text-white' : ''}`} />
                    <div className={`bg-gray-700 text-gray-300 ${isActiveClassement ? 'block' : 'hidden'}`}>
                        <MyButton text={'Tous les classements'} onClick={() => {
                            navigate('/admin/toutClassement')
                        }} />
                        <MyButton onClick={() => {
                            navigate('/admin/ajoutClassement')
                        }}
                            text={'Ajouter un classement'} />
                    </div>
                </li>
                {/* <li>
                    <MyButton text={'Sous-classement'} icon={'fa-regular fa-user'} onClick={toggleSousClassement} className={`${isActiveSousClassement ? 'bg-blue-500 text-white hover:text-white' : ''}`} />
                    <div className={`bg-gray-700 text-gray-300 ${isActiveSousClassement ? 'block' : 'hidden'}`}>
                        <MyButton onClick={() => {
                            navigate('/admin/ajoutSousClassement')
                        }}
                            text={'Ajouter un classement'} />
                        <MyButton text={'Tous les Sous-classement'} onClick={() => {
                            navigate('/admin/ToutSousClassement')
                        }} />
                    </div>
                </li> */}
            </ul>
        </div>
    )
}


const MyButton = ({ text, icon, onClick, className, disabled }) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${className} flex items-center p-2 w-full hover:border-l-4 border-blue-500 hover:text-blue-500`}>
            <i className={icon}></i>
            <p>{text} </p>
        </button>
    )
}