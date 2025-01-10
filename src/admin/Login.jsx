import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MyInput } from './SignUp'
import axios from 'axios'

export const Login = () => {
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    const location = useLocation()
    const tokenMessage = location.state

    useEffect(() => {
        if (tokenMessage != null)
            setMessage(tokenMessage)
        else
            setMessage('')
    }, [])


    const submit = async () => {
        if ((form.email && form.password) !== '') {
            try {
                let response = await axios.post("http://localhost:5000/login", { form }, { withCredentials: true }) // Inclure les cookies
                const { user } = response.data
                if (user.autorisation === 1) {
                    localStorage.setItem('userData', JSON.stringify(user)); // Sauvegarder l'utilisateur
                    navigate("/admin"); // Redirection vers la page admin
                } else {
                    setMessage("Vous venez de vous inscrire, votre demande doit passer par l'administration");
                }
            } catch (e) {
                setMessage(e.response.data.message)
            }
        } else {
            setMessage('Veuillez remplir tous les champs')
        }
    }

    return (
        <div className='flex justify-center items-center w-full h-screen mt-[-30px] '>
            <div className="sm:w-[600px] w-[80vw] ">
                <h1 className='text-center mb-5 text-2xl'>Se connecter</h1>
                <div className="">
                    <MyInput type={'email'} value={form.email} label={'Adresse e-mail'} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <MyInput type={'password'} value={form.password} label={'Mot de passe'} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
                <div className=" justify-between sm:flex w-full">
                    <div className="flex items-center">
                        <p className=''>Vous n'avez pas encore de compte ?
                            <button onClick={() => navigate('/signUp')} className='ml-2 text-blue-500 hover:border-b-[1px] border-blue-500 focus:text-blue-400'>S'inscrire</button>
                        </p>
                    </div>
                    <button onClick={submit} className='bg-blue-500 p-2 rounded-md px-5 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-violet-300'>
                        Connecté
                    </button>
                </div>
                <div className="text-center mt-5 text-red-400">
                    {message}
                </div>
            </div>
        </div>
    )
}

