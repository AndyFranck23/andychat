import React, { useEffect, useState } from 'react';
import { MyInput } from '../SignUp';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NOM_DE_DOMAIN } from '../../App';

const ModifierArticle = () => {
    const { id } = useParams()
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD pour MySQL
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadType, setUploadType] = useState('file');

    const [form, setForm] = useState({
        title: '',
        description: '',
        content: '',
        date: today,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (validTypes.includes(fileType)) {
                setImageFile(file);
            } else {
                setMessage('Veuillez télécharger une image au format JPG, JPEG ou PNG.');
            }
        }
    };

    const handleUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${NOM_DE_DOMAIN}/articles/${id}`);
                // const { articles } = response.data;
                setForm({
                    title: response.data[0].title,
                    description: response.data[0].description,
                    content: response.data[0].content,
                    date: today
                })
                setImageUrl(response.data[0].image_url)
                setImageFile(response.data[0].image);
                // console.log(response.data[0].title)
            } catch (e) {
                console.error(e);
                setError('Impossible de charger les articles.');
            }
        };
        fetchArticles();
        setLoading(false);
    }, []);

    const submit = async () => {
        if (form.title && form.description && form.content) {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('content', form.content);
            formData.append('date', form.date);

            if (uploadType === 'url' && imageUrl) {
                formData.append('imageUrl', imageUrl);
            } else if (uploadType === 'file' && imageFile) {
                formData.append('image', imageFile);
            }

            try {
                const response = await axios.post(`${NOM_DE_DOMAIN}/modifierArticles/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage(response.data.message);
                console.log(response.data);
            } catch (error) {
                setMessage(error.response?.data?.message || 'Une erreur est survenue');
            }
        } else {
            setMessage('Veuillez remplir tous les champs');
        }
    };

    if (loading) {
        return <div className="text-black h-screen flex justify-center items-center">Chargement...</div>;
    }

    return (
        <div className='text-black'>
            <h1 className='text-center text-2xl font-medium mb-10'>Modifier un article</h1>
            <div className="space-y-2 text-md text-gray-700 font-medium">
                <MyInput label={"Title"} type={'text'} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <MyInput label={"Déscription"} type={'text'} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-md">Contenue</label>
                <textarea
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    value={form.content}
                    className="mb-5 w-full outline-none border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 text-gray-700 h-[100px] sm:h-[200px] p-2"
                />

                <div>
                    <h1>Upload Image</h1>
                    <label>
                        Choose upload type:
                        <select onChange={(e) => setUploadType(e.target.value)} value={uploadType}>
                            <option value="file">File</option>
                            <option value="url">URL</option>
                        </select>
                    </label>
                    {uploadType === 'file' && (
                        <input type="file" onChange={handleFileChange} />
                    )}
                    {uploadType === 'url' && (
                        <MyInput label={"Image"} type={'text'} value={imageUrl} onChange={handleUrlChange} />
                    )}
                </div>

                <div className="w-full justify-end flex">
                    <button
                        onClick={submit}
                        type='submit'
                        className='bg-blue-500 p-2 rounded-md px-5 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-violet-300'>
                        Modifier
                    </button>
                </div>
            </div>
            <p className='flex justify-center text-red-400'>{message}</p>
        </div>
    );
};

export default ModifierArticle;
