import { useEffect, useState } from "react"
import { MyInput } from "../SignUp"
import axios from "axios"
import { listClassement, listType } from "../components/api"

export default function AddOffre() {
    const [descCourt, setDescCourt] = useState('')
    const [odActive, setOdActive] = useState(false)
    const [types, setTypes] = useState([])
    const [classements, setClassements] = useState([])

    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        title: '',
        classement: [],
        descriptionOC: [],
        image: '',
        prix: 0,
        reduction: 0,
        lien: '',
        descriptionOD: '',
    })

    const descCourtControle = (e) => {
        setDescCourt(e)
        let liste = e.split("|")
        setForm({ ...form, descriptionOC: liste })
    }

    // Fonction pour gérer les changements
    const handleCheckboxChange = (event) => {
        const value = event.target.value;

        setForm((prevForm) => {
            const alreadySelected = prevForm.classement.includes(value);

            return {
                ...prevForm,
                classement: alreadySelected
                    ? prevForm.classement.filter((item) => item !== value) // Supprime si déjà présent
                    : [...prevForm.classement, value], // Ajoute sinon
            };
        });
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         // Lire l'image en Base64
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setForm({ ...form, image: reader.result }); // Supprimer le préfixe Base64
    //             console.log(reader.result)
    //             setMessage(reader.result)
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const submit = async () => {
        if ((form.title && form.classement && form.descriptionOC && form.image && form.lien) !== '') {
            if (odActive && form.descriptionOD == '') {
                setMessage("Veuillez remplir le OD")
            } else {
                try {
                    const response = await axios.post('http://localhost:5000/addOffre', { form })
                    setMessage(response.data.message)
                    console.log(response.data.message)
                } catch (e) {
                    console.log(e)
                    setMessage(e.response.data.message)
                }
            }
        } else {
            setMessage('Veuillez remplir les champs nécessaires')
        }
    }

    const test = (e) => {
        console.log(e.target.checked)
        setOdActive(e.target.checked)
    }

    useEffect(() => {
        listType(setTypes)
        listClassement(setClassements)
    }, [])

    return (
        <div className="text-black">
            <h1 className='flex justify-center text-xl font-medium mb-5'>Ajout d'un offre</h1>
            <MyInput type={'text'} label={'Titre'} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <MyInput type={'text'} label={'Description court'} value={descCourt} onChange={(e) => descCourtControle(e.target.value)} />

            <MyInput type={'text'} label={"URL de l'image"} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <MyInput type={'number'} label={'Prix'} value={form.prix} onChange={(e) => setForm({ ...form, prix: e.target.value })} />

            <MyInput type={'number'} label={'Reduction'} value={form.reduction} onChange={(e) => setForm({ ...form, reduction: e.target.value })} />
            <MyInput placeholder={'https://exemple.com'} type={'text'} label={'Lien principale'} value={form.lien} onChange={(e) => setForm({ ...form, lien: e.target.value })} />
            <div className="items-center flex justify-between p-3">
                <label className=" mb-2 font-medium text-gray-700 ">Ajouter un OD :</label>
                <input
                    type="checkbox"
                    className="border"
                    checked={odActive}
                    onChange={(e) => test(e)}
                />
            </div>
            {
                odActive &&
                <div className="">
                    <textarea onChange={(e) => setForm({ ...form, descriptionOD: e.target.value })} value={form.descriptionOD} className="mb-5 w-full outline-none border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 text-gray-700 h-[100px] sm:h-[200px] p-2  " />
                </div>
            }
            <label className="block text-gray-700 font-medium mb-2 text-md border-t-2 border-gray-200">Classements: </label>
            {/* selection de classement */}
            <div className='text-black flex flex-wrap justify-center'>
                {
                    types.map((item, index) =>
                        <div key={index} className=" px-10">
                            <p className='text-blue-500 text-xl' >{item.title} </p>
                            <div className="ml-10 font-medium text-md text-gray-700">
                                {
                                    classements.map((elt, i) =>
                                        elt.type == item.title ?
                                            <div key={i} className="flex items-center   ">
                                                <input
                                                    type="checkbox"
                                                    value={elt.title}
                                                    className="mr-2"
                                                    checked={form.classement.includes(elt.title)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <p>{elt.title}</p>
                                            </div>
                                            : undefined
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <button onClick={submit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                Ajouter
            </button>
            <p className='mt-5 flex justify-center text-red-400'>{message}</p>
        </div>
    )
}
