import React from 'react'
import { Chatbot } from './Offre'
import { useLocation } from 'react-router-dom';

const Alternative = ({ alternative, navigation }) => {
    const location = useLocation()
    const url = location.pathname
    const lastUrl = url.split("/").pop()

    const filteredData = alternative
        .filter(item => !item.classement.includes(lastUrl)) // Exclure les éléments qui contiennent `lastUrl` dans le classement
        .slice(0, 10); // Limiter à 10 éléments

    return (
        <>
            {lastUrl &&
                <div className=" mt-10">
                    <h1 className='text-3xl text-gray-600 font-bold my-5 flex justify-center items-center'>Autres</h1>
                    <div className="flex justify-center w-full">
                        <div className='flex flex-wrap justify-around mx-5'>
                            {filteredData.map((item, index) =>
                                <Chatbot key={index} data={item} navigation={navigation} />
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Alternative