import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Content from '../components/Content'
import { CategorieOD } from './CategorieOD'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { Footer } from '../components/Footer'
import axios from 'axios'
import { NOM_DE_DOMAIN } from '../App'

export const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [classement, setClassement] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const currentUrl = location.pathname;

    // Fonction pour extraire le dernier segment de l'URL
    const getLastSegment = (url) => {
        return decodeURIComponent(url.split("/").pop());
    };

    useEffect(() => {
        // Récupération des données de l'API
        const fetchData = async () => {
            try {
                const response = await axios.get(`${NOM_DE_DOMAIN}/allType`);
                const { types } = response.data;

                const response2 = await axios.get(`${NOM_DE_DOMAIN}/allClassement`);
                const { classements } = response2.data;

                const response3 = await axios.get(`${NOM_DE_DOMAIN}/offres`);
                const { offres } = response3.data;

                // Associer les éléments à leurs catégories
                const combinedData = types.map((category) => ({
                    ...category,
                    classement: classements.filter((item) => item.type === category.title),
                }));
                setClassement(combinedData);

                const combinedData2 = offres.map((item) => ({
                    ...item,
                    classement: JSON.parse(item.classement),
                    descriptionOC: JSON.parse(item.descriptionOC),
                }));
                setData(combinedData2);

                // Filtrer les données après que toutes les données aient été récupérées
                const lastSegment = getLastSegment(currentUrl);
                const filtered = combinedData2.filter((item) =>
                    item.classement.includes(lastSegment)
                );
                setFilteredData(filtered);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [currentUrl]); // Recharge les données et effectue le filtrage dès que l'URL change

    const blog = [
        { title: 'Célébrer le nouvel an sous les tropiques : destinations balnéaires', lien: '' },
        { title: 'Réveillon en amoureux : Séjours romantiques et privilégiés pour 2024-2025', lien: '' },
        { title: 'Réveillon en amoureux : Séjours romantiques et privilégiés pour 2024-2025', lien: '' },
        { title: 'Réveillon en amoureux : Séjours romantiques et privilégiés pour 2024-2025', lien: '' },
        { title: 'Réveillon en amoureux : Séjours romantiques et privilégiés pour 2024-2025', lien: '' },
    ];

    const navigation = (pageName) => {
        let out = '';
        classement.forEach((element) => {
            element.classement.forEach((ele) => {
                if (ele.title === pageName) {
                    out = element.title;
                }
            });
        });
        navigate(`/classement/${out + '/' + pageName}`);
    };

    return (
        <>
            <div className="bg-gradient-to-br from-white to-green-100 h-full pb-20">
                {/* Affiche la barre de header et le menu */}
                <div className="">
                    <Header navigation={navigation} classement={classement} />
                    <Menu navigation={navigation} classement={classement} className={'hidden lg:block'} />
                </div>
                <div className=''>
                    <div className="lg:ml-[250px] pt-10">
                        <Routes>
                            <Route path="/" element={<Content classement={classement} navigation={navigation} alternative={data} data={data} />} />
                            <Route path="/classement/:type/:title" element={
                                <Content
                                    classement={classement}
                                    navigation={navigation}
                                    data={filteredData}
                                    alternative={data}
                                />
                            }
                            />
                            <Route path='/selectionOD/:title' element={<CategorieOD navigation={navigation} alternative={data} />} />
                        </Routes>
                        {/* Affiche le footer */}
                        <Footer data={blog} />
                    </div>
                </div>
            </div>
        </>
    );
};
