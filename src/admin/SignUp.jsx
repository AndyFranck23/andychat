import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NOM_DE_DOMAIN } from '../App'

export const SignUp = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const today = new Date()
    const date = today.toLocaleDateString()
    const [form, setForm] = useState({
        identite: '',
        role: '',
        email: '',
        autorisation: 0,
        date: date,
        password: '',
        tryPassword: '',
    })

    const submit = async () => {
        if ((form.identite && form.role && form.email && form.password && form.tryPassword) !== '') {
            if (form.password == form.tryPassword) {
                try {
                    const response = await axios.post(`${NOM_DE_DOMAIN}/signUp`, { form })
                    setMessage(response.data.message)
                    console.log(response.data)
                    navigate('/login')
                } catch (e) {
                    setMessage(e.response.data.message)
                }
            } else {
                setMessage('Mot de pass incorrect')
            }
        } else {
            setMessage('Veuillez remplir tous les champs')
        }
    }

    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <div className="sm:w-[600px] w-[80vw] ">
                <h1 className='text-center mb-5 text-2xl'>Inscription</h1>
                <div className="">
                    <MyInput value={form.identite} label={'Identité'} onChange={(e) => setForm({ ...form, identite: e.target.value })} />
                    <div className="sm:mb-5 mb-2">
                        <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-md">Rôle</label>
                        <select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className={`${form.role === '' ? 'text-gray-400' : 'text-gray-700'} block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500`}>
                            <option className='hidden' value="">Choisissez votre rôle</option>
                            <option className='text-gray-700' value="Administration">Administration</option>
                            <option className='text-gray-700' value="Blogeur">Blogeur</option>
                            <option className='text-gray-700' value="Produit">Produit</option>
                        </select>
                    </div>
                    <MyInput type={'email'} value={form.email} label={'Adresse e-mail'} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <MyInput type={'password'} value={form.password} label={'Mot de passe'} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    <MyInput type={'password'} value={form.tryPassword} label={'Confirmer le mot de passe'} onChange={(e) => setForm({ ...form, tryPassword: e.target.value })} />
                </div>
                <div className=" justify-between sm:flex w-full">
                    <div className="flex items-center">
                        <p className=''>Vous avez déjà un compte ?
                            <button onClick={() => navigate('/login')} className='ml-2 text-blue-500 hover:border-b-[1px] border-blue-500 focus:text-blue-400'>Se connecter</button>
                        </p>
                    </div>
                    <button onClick={submit} type='submit' className='bg-blue-500 p-2 rounded-md px-5 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-violet-300'>
                        Inscrire
                    </button>
                </div>
                <div className="text-center mt-5 text-red-400">
                    {message}
                </div>
            </div>
        </div>
    )
}

export const MyInput = ({ label, value, onChange, type, placeholder }) => {
    const [showPassword, setShowPassword] = useState(true)

    return (
        <div className="sm:mb-4 mb-2">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-md">{label}</label>
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={
                    type == 'password' ?
                        showPassword ? 'password' : 'text'
                        : type
                }
                className="z-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 text-gray-700 "
            />
            <div className="absolute z-50 transform translate-x-[73vw] -translate-y-8 sm:translate-x-[570px]">
                {label == 'Mot de passe' &&
                    <button onClick={() => setShowPassword(!showPassword)} className='text-gray-400'>
                        {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                    </button>
                }
            </div>
        </div>
    )
}

