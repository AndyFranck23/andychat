import React, { useEffect, useState } from 'react'
import { agreeDemande, deleteDemande, listeDemand } from '../components/api'

export const ListeDemand = () => {
    const [demandes, setDemandes] = useState([])

    useEffect(() => {
        listeDemand(setDemandes)
    }, [])

    return (
        <div className="text-black">
            <p className='text-xl font-medium mb-5'>Liste des demandes</p>
            <div className="space-y-5">
                {
                    demandes.map((user, index) =>
                        <Demande key={index} userData={user} onClickAdd={() => agreeDemande(user.id)} onClickDel={() => deleteDemande(user.id, demandes, setDemandes)} />
                    )
                }
            </div>
        </div>
    )
}

export const Demande = ({ userData, onClickAdd, onClickDel }) => {
    return (
        <div className='text-black border-gray-200 border-2 p-3 space-y-2 rounded-md hover:bg-gray-200 active:border-blue-500'>
            <div className="flex items-center w-full justify-between">
                <h1 className='text-lg font-medium text-blue-500'>{userData.identite} </h1>
                <div className="space-x-3">
                    <button className='text-blue-400' onClick={onClickAdd}>
                        Accepter
                    </button>
                    <button className='text-red-400' onClick={onClickDel}>
                        Supprimer
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className="w-full">
                    <p><span className='font-medium text-gray-700'> Rôle: </span>{userData.role} </p>
                    <p><span className='font-medium text-gray-700'> e-mail: </span>{userData.email} </p>
                </div>
                <div className="flex w-full justify-end items-end">
                    <p><span className='font-medium text-gray-700'> Date: </span>{userData.date} </p>
                </div>
            </div>
        </div>
    )
}
