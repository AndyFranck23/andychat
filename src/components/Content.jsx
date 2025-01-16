import React, { useEffect } from 'react'
import Slider from './Slider'
import Title from './Title'
import { Pagination } from './Offre'
import Faq from './Faq'
import Alternative from './Alternative'
import { scrollToSection } from '../pages/CategorieOD'
import { Blog } from './Blog'

const Content = ({ classement, data, navigation, alternative }) => {
    useEffect(() => {
        // Remettre le scroll en haut de la page lors du rendu initial
        // window.scrollTo(0, 0);
        scrollToSection('head')
    }, [navigation, data]);

    return (
        <>
            <div id='head' className="">
                <div className="">
                    {/* affiche le slider */}
                    <Slider />
                    <div className="space-y-20">
                        <Title />
                        {/* affiche tous les types d'offres avec la pagination et les classements par catégories */}
                        <Pagination data={data} navigation={navigation} />
                    </div>
                    <Blog />
                </div>
                <Faq />
                <Alternative alternative={alternative} classement={classement} navigation={navigation} />
            </div>
        </>
    )
}

export default Content