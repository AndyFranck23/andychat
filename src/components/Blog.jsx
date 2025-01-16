import axios from "axios";
import React, { useEffect, useState } from "react";
import { NOM_DE_DOMAIN } from "../App";

export const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

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
        setLoading(false)
    }, []);

    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };

    if (selectedArticle) {
        return <Articlecontent article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
    }

    if (loading) {
        return <div className="text-black h-screen flex justify-center items-center">Chargement...</div>;
    }

    return (
        <div className="bg-green-900 py-10 mt-20">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-center text-white mb-8">
                    Bienvenue sur notre blog
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white/20 blakdrop-opacity-20 rounded-lg shadow-lg overflow-hidden"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-white mb-2">
                                    {article.title}
                                </h2>
                                <p className="text-white/50 mb-4">{article.date} </p>
                                <p className="text-white/90 mb-4">{article.description}</p>
                                <button
                                    onClick={() => handleReadMore(article)}
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Lire la suite
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Articlecontent = ({ article, onBack }) => {
    return (
        <div className="bg-green-900 py-10  mt-20">
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
                        <h1 className="text-3xl font-bold text-white mb-4">
                            {article.title}
                        </h1>
                        <p className="text-white/90">{article.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
