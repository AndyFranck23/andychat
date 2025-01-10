import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { deleteType, listClassement, listType } from '../components/api'
import { useNavigate } from 'react-router-dom'

const ListeClassement = () => {
    const navigate = useNavigate()
    // const [message, setMessage] = useState('')
    const [types, setTypes] = useState([])
    const [classements, setClassements] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        listType(setTypes)
        listClassement(setClassements)
        setLoading(false)
    }, [])

    if (loading)
        return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>

    return (
        <div className='text-black'>
            {
                types.map((item, index) =>
                    <div key={index} className="">
                        <div className="flex w-full justify-between items-center">
                            <p className='text-blue-500 text-xl' >{item.title} </p>
                            <div className="space-x-3">
                                <button className='text-blue-500' onClick={() => navigate(`/admin/modifierType/${item.id}`)}>Modifier</button>
                                <button className='text-red-500' onClick={() => deleteType(item.id, types, setTypes)}>Supprimer</button>
                            </div>
                        </div>
                        <div className="ml-10 font-medium text-md text-gray-700">
                            {
                                classements.map((elt, i) =>
                                    elt.type == item.title ? <li key={i}>{elt.title}</li> : undefined
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ListeClassement