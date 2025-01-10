import React from 'react'
import Slider from './Slider'
import Title from './Title'
import { Pagination } from './Offre'
import Faq from './Faq'
import Alternative from './Alternative'

const Content = ({ types, classement, data, navigation, alternative }) => {

    return (
        <>
            <div className="">
                <div className="">
                    {/* affiche le slider */}
                    <Slider types={types} />
                    <div className="space-y-20">
                        <Title />
                        {/* affiche tous les types d'offres avec la pagination et les classements par catégories */}
                        <Pagination data={data} navigation={navigation} />
                    </div>
                </div>
                <Faq />
                <Alternative alternative={alternative} classement={classement} navigation={navigation} />
            </div>
        </>
    )
}

export default Content