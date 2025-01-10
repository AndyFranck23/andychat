import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Content from '../components/Content'
import { CategorieOD } from './CategorieOD'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { Footer } from '../components/footer'

export const Home = ({ classement, data, blog, types }) => {
    const [dataCat, setDataCat] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if ((!data || data.length === 0) && (!classement || classement.length === 0)) return;
        const path = location.pathname
        const slug = path.split('/').pop(); // récupération du dernier url
        // filtrer les données par rapport à l'url
        let tab = []
        data.map(elt => {
            elt.classement.map(item => {
                if (item == slug)
                    tab.push(elt)
            })
        })
        setDataCat(tab) // récupération des données filtrer
        setLoading(true)
    }, [location.pathname, data])

    // changer la page vers la filtre selectionner et réactualisé la page
    const navigation = (pageName) => {
        let out = ''
        classement.forEach(element => {
            element.classement.forEach(ele => {
                if (ele.title == pageName) {
                    out = element.title
                }
            })
        });
        navigate(`/classement/${out + '/' + pageName}`)
    }

    if (!loading) {
        return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>
    }
    return (
        <div className="bg-gray-100">
            {/* affiche la bar de header et le menu */}
            <div className="">
                <Header navigation={navigation} classement={classement} />
                <Menu navigation={navigation} classement={classement} className={'hidden lg:block'} />
            </div>
            <div className=''>
                <div className="lg:ml-[250px] pt-10">
                    <Routes>
                        <Route path="/" element={<Content classement={classement} navigation={navigation} alternative={data} types={types} data={data} blog={blog} />} />
                        {
                            classement.map((item) =>
                                item.classement.map((ele, i) =>
                                    <Route
                                        key={i}
                                        path={`/classement/${item.title + "/" + ele.title}`}
                                        element={
                                            <Content
                                                classement={classement}
                                                navigation={navigation}
                                                types={types}
                                                data={dataCat}
                                                alternative={data}
                                                blog={blog}
                                            />
                                        }
                                    />
                                )
                            )
                        }
                        {
                            data.map((item, index) => (
                                item.descriptionOD == null || '' ? '' :
                                    <Route key={index} path={`/selectionOD/${item.title}`} element={<CategorieOD />} />
                            ))
                        }
                    </Routes>
                    {/* affiche le footer */}
                    <Footer data={blog} />
                </div>
            </div>
        </div>
    )
}