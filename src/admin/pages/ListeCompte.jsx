import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NOM_DE_DOMAIN } from '../../App'

export const ListeCompte = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const test = async () => {
            try {
                const response = await axios.get(`${NOM_DE_DOMAIN}/compte`)
                const { users } = response.data
                // console.log(users)
                setData(users)
                // Sauvegarder le token
            } catch (e) {
                console.log(e)
            }
        }
        test()
    }, [])

    const deleteCompte = async (id) => {
        try {
            await axios.delete(`${NOM_DE_DOMAIN}/compte/${id}`)
            setData(data.filter((data) => data.id != id))
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="text-black">
            <p className='text-xl font-medium mb-5'>Liste des emploiées</p>
            <div className="space-y-5">
                {
                    data.map((user, index) =>
                        <Emploier key={index} userData={user} onClick={() => deleteCompte(user.id)} />
                    )
                }
            </div>
        </div>
    )
}

export const Emploier = ({ userData, onClick }) => {

    return (
        <div className='text-black border-gray-200 border-2 p-3 space-y-2 rounded-md hover:bg-gray-200 active:border-blue-500'>
            <div className="flex items-center w-full justify-between">
                <h1 className='text-lg font-medium text-blue-500'>{userData.identite} </h1>
                <button className='text-red-400' onClick={onClick}>
                    Supprimer
                </button>
            </div>
            <div className="flex">
                <div className="w-full">
                    <p><span className='font-medium text-gray-700'> Rôle: </span>{userData.role} </p>
                    <p><span className='font-medium text-gray-700'> e-mail: </span>{userData.email} </p>
                </div>
                <div className="flex w-full justify-end items-end">
                    <p><span className='font-medium text-gray-700'> id: </span>{userData.id} </p>
                </div>
            </div>
        </div>
    )
}