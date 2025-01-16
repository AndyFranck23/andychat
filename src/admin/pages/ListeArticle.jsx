import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOM_DE_DOMAIN } from '../../App';

const ListeArticle = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const navigate = useNavigate();

    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    const deleteArticle = async (id) => {
        try {
            await axios.delete(`${NOM_DE_DOMAIN}/articles/${id}`);
            setArticles(articles.filter(article => article.id !== id));
        } catch (e) {
            console.error('Erreur lors de la suppression de l\'article:', e);
        }
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${NOM_DE_DOMAIN}/articles`);
                // const { articles } = response.data;
                setArticles(response.data);
            } catch (e) {
                console.error(e);
                setError('Impossible de charger les articles.');
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    if (selectedArticle) {
        return <ArticleContent article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
    }

    if (loading) {
        return <div className="text-black h-screen flex justify-center items-center">Chargement...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Liste des articles
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            {/* Affichage de l'image */}
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    {article.title}
                                </h2>
                                <p className="text-gray-400 mb-4">{article.date}</p>
                                <p className="text-gray-600 mb-4">{article.description}</p>
                                <button
                                    onClick={() => handleReadMore(article)}
                                    className="text-blue-500 p-1 hover:underline underline-offset-2 transition"
                                >
                                    Lire la suite
                                </button>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => navigate(`/admin/modifierBlog/${article.id}`)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => deleteArticle(article.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListeArticle;

const ArticleContent = ({ article, onBack }) => {
    return (
        <div className="bg-gray-100 py-10 mt-20">
            <div className="container mx-auto px-6">
                <button
                    onClick={onBack}
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-2"
                >
                    Retour au blog
                </button>
                <div className="bg-white/20 blakdrop-opacity-20 rounded-lg shadow-lg overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {article.title}
                        </h1>
                        <p className="text-gray-600">{article.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
