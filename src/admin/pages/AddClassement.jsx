import React, { useEffect, useState } from 'react'
import { MyInput } from '../SignUp'
import AddType from './AddType'
import axios from 'axios'

const AddClassement = ({ userdata }) => {
    const [message, setMessage] = useState('')
    const [types, setTypes] = useState([])

    // État pour stocker les FAQ ajoutées
    const [form, setForm] = useState({
        title: '',
        type: '',
        logo: '',
        responsable: userdata.identite,
        faqListe: []
    })


    useEffect(() => {
        listType()
    }, [])

    const listType = async () => {
        try {
            const response = await axios.get("http://localhost:5000/allType")
            const { types } = response.data
            // setMessage(response.data.message)
            setTypes(types)
        } catch (e) {
            console.log(e)
        }
    }

    const submit = async () => {
        if ((form.title && form.type) !== '') {
            try {
                const response = await axios.post('http://localhost:5000/addClassement', { form })
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
            <h1 className='text-center text-2xl font-medium mb-10'>Ajouter un classement</h1>
            <div className="space-y-2 text-md text-gray-700 font-medium">
                <MyInput label={"Title"} type={'text'} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <MyInput label={"URL du logo"} type={'text'} value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
                <div className="sm:mb-5 mb-2">
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-md">Type</label>
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className={`${form.type === '' ? 'text-gray-400' : 'text-gray-700'} block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500`}>
                        <option className='hidden' value="">Type du classement</option>
                        {
                            types.map((type, index) =>
                                <option key={index} className='text-gray-700' value={type.title}>{type.title} </option>
                            )
                        }
                    </select>
                </div>
                <AddFaq form={form} setForm={setForm} />
                <div className="w-full justify-end flex">
                    <button onClick={submit} type='submit' className='bg-blue-500 p-2 rounded-md px-5 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-violet-300'>
                        Ajouter
                    </button>
                </div>
            </div>
            <p className='flex justify-center text-red-400'>{message}</p>
            <AddType />
        </div>

    )
}

export default AddClassement


const AddFaq = ({ form, setForm }) => {
    // État pour stocker les champs du formulaire
    const [faq, setFaq] = useState({ question: "", answer: "" });


    // Gestion de la saisie utilisateur
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFaq({ ...faq, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        if (faq.question.trim() && faq.answer.trim()) {
            setForm({ ...form, faqListe: [...form.faqListe, faq] }); // Ajouter la nouvelle FAQ à la liste
            setFaq({ question: "", answer: "" }); // Réinitialiser le formulaire
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    const handleDelete = (index) => {
        const updatedList = form.faqListe.filter((_, i) => i !== index); // Supprime l'élément à l'index donné
        setForm({ ...form, faqListe: updatedList });
    };

    return (
        <div className="p-6 w-full sm:flex justify-between bg-gray-100 rounded-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Champ pour la question */}
                <div>
                    <h1 className="text-2xl font-bold mb-4">Ajouter une FAQ</h1>
                    <label htmlFor="question" className="block font-medium mb-1">
                        Question
                    </label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        value={faq.question}
                        onChange={handleChange}
                        placeholder="Entrez une question"
                        className="border rounded p-2 w-full"
                    />
                </div>

                {/* Champ pour la réponse */}
                <div>
                    <label htmlFor="answer" className="block font-medium mb-1">
                        Réponse
                    </label>
                    <textarea
                        id="answer"
                        name="answer"
                        value={faq.answer}
                        onChange={handleChange}
                        placeholder="Entrez une réponse"
                        className="border rounded p-2 w-full sm:w-[200px] h-24"
                    />
                </div>

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                >
                    Ajouter
                </button>
            </form>

            {/* Afficher la liste des FAQ ajoutées */}
            <div className="mt-5 sm:mt-0">
                <h2 className="text-xl font-bold mb-4">Liste des FAQ</h2>
                {form.faqListe.length > 0 ? (
                    <ul className="space-y-2 bg-white p-5">
                        {form.faqListe.map((item, index) => (
                            <div key={index} className="flex space-x-2 w-full sm:w-[250px] ">
                                <li className="border py-1 px-2 rounded shadow bg-gray-100">
                                    <p className="font-semibold">Q: {item.question}</p>
                                    <p className=" ml-2">R: {item.answer}</p>
                                </li>
                                <div className="">
                                    <button className='text-blue-500'>Modifier</button>
                                    <button className='text-red-500' onClick={() => handleDelete(index)}>Supprimer</button>
                                </div>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Aucune FAQ ajoutée pour le moment.</p>
                )}
            </div>
        </div>
    );
};