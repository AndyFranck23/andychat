import React, { useEffect, useState } from 'react'
import { Chatbot } from './Offre'

const Alternative = ({ alternative, classement, navigation }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        if (!alternative || alternative.length === 0) return;
        const path = location.pathname
        const slug = path.split('/').pop(); // récupération du dernier url
        // filtrer les données par rapport à l'url
        // console.log(alternative)

        let tab = []
        alternative.map(elt => {
            let test = false
            elt.classement.map(elt => {
                elt == slug ? test = true : ''
            })
            !test ? tab.push(elt) : ''
        })
        setData(tab)
    }, [])

    return (
        <div className="flex justify-center w-full mt-20">
            <div className='flex flex-wrap justify-center'>
                {data.map((item, index) =>
                    <Chatbot key={index} data={item} navigation={navigation} />
                )}
            </div>
        </div>
    )
}

export default Alternative