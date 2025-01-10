import { useEffect, useState } from "react"
import { MyInput } from "../SignUp"
import axios from "axios"
import { useParams } from "react-router-dom"
import { listClassement, listType } from "../components/api"

export default function ModifierOffre() {
    const { id } = useParams()
    const [types, setTypes] = useState([])
    const [classements, setClassements] = useState([])
    const [loading, setLoading] = useState(true)
    const [descCourt, setDescCourt] = useState('')
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        title: '',
        classement: [],
        descriptionOC: [],
        image: '',
        prix: 0,
        reduction: 0,
        lien: '',
        descriptionOD: ''
    })
    const [odActive, setOdActive] = useState(form.descriptionOD == '' ? false : true)

    useEffect(() => {
        listType(setTypes)
        listClassement(setClassements)
        offre()
        setLoading(false)
    }, [])

    const offre = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/offreSelect/${id}`)
            const { offre } = response.data

            let description = ''
            JSON.parse(offre[0].descriptionOC).forEach((elt, index) => {
                if (index == JSON.parse(offre[0].descriptionOC).length - 1)
                    description = description + elt
                else
                    description = elt + "|" + description
            })

            descCourtControle(description)
            let desc = description.split("|")
            setForm({
                title: offre[0].title,
                classement: JSON.parse(offre[0].classement),
                descriptionOC: desc,
                image: offre[0].image,
                prix: offre[0].prix,
                reduction: offre[0].reduction,
                lien: offre[0].lien,
                descriptionOD: offre[0].descriptionOD
            })
            if (offre[0].descriptionOD != '')
                setOdActive(true)
        } catch (e) {
            console.log(e)
            setMessage(e.response.data.message)
        }
    }

    const descCourtControle = (e) => {
        setDescCourt(e)
        let liste = e.split("|")
        setForm({ ...form, descriptionOC: liste })
    }

    const submit = async () => {
        if ((form.title && form.classement && form.descriptionOC && form.image && form.lien) !== '') {
            try {
                const response = await axios.post(`http://localhost:5000/offreUpdate/${id}`, { form })
                // console.log(response.data.message)
                setMessage(response.data.message)
            } catch (err) {
                console.log(err.message)
            }
        } else {
            setMessage('Veuillez remplir les champs nécessaires')
        }
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

    if (loading)
        return <div className="w-full h-screen flex justify-center items-center text-black">Loading...</div>
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
                Modifier
            </button>
            <p className='mt-5 flex justify-center text-red-400'>{message}</p>
        </div>
    )
}
