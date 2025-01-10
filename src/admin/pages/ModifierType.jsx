import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MyInput } from '../SignUp'
import axios from 'axios'

const ModifierType = () => {
    const { id } = useParams()
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        title: '',
        image: ''
    })

    useEffect(() => {
        handleType()
    }, [])

    const handleType = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/typeSelect/${id}`)
            const { type } = response.data
            setForm({ title: type[0].title, image: type[0].image })
        } catch (e) {
            setMessage(e.response.data)
        }
    }

    const submit = async () => {
        if (form.title !== '') {
            try {
                const response = await axios.post(`http://localhost:5000/typeUpdate/${id}`, { form })
                setMessage(response.data.message)
                console.log(response.data)
            } catch (e) {
                setMessage(e.response.data.message)
            }
        } else {
            setMessage('Veuillez remplir tous les champs')
        }
    }

    return (
        <div className='text-black'>
            <h1 className='text-center text-2xl font-medium mb-10'>Modifier un type de classement</h1>
            <div className="space-y-2 text-md text-gray-700 font-medium">
                <MyInput label={"Titre"} type={'text'} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <MyInput label={"URL de l'image"} type={'text'} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                <div className="w-full justify-end flex">
                    <button onClick={submit} type='submit' className='bg-blue-500 p-2 rounded-md px-5 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-violet-300'>
                        Modifier
                    </button>
                </div>
            </div>
            <p className='flex justify-center text-red-400'>{message}</p>
        </div>
    )
}

export default ModifierType