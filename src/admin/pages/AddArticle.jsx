import React, { useState } from 'react';
import { MyInput } from '../SignUp';
import axios from 'axios';
import { NOM_DE_DOMAIN } from '../../App';

const AddArticle = () => {
    const [message, setMessage] = useState('');
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
                const response = await axios.post(`${NOM_DE_DOMAIN}/addArticles`, formData, {
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

    return (
        <div className='text-black'>
            <h1 className='text-center text-2xl font-medium mb-10'>Ajouter un article</h1>
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
                        Ajouter
                    </button>
                </div>
            </div>
            <p className='flex justify-center text-red-400'>{message}</p>
        </div>
    );
};

export default AddArticle;
