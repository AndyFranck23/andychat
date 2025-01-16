import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link, useParams } from 'react-router-dom';

export const Offre = ({ data, navigation }) => {
    const { title } = useParams()
    const { type } = useParams()
    const path = title

    if (data.length == 0) {
        return <div className="h-screen w-full flex justify-center items-center">Loading...</div>
    }
    return (
        <>
            <div className="flex justify-center w-full">
                <div className="">
                    {path ? <h1 className='text-gray-600 text-3xl text-center font-bold my-10 '>{type + ': ' + path} </h1> : <h1 className='text-gray-600 text-3xl text-center font-bold my-10 '>Acceuil </h1>}
                    <div className='flex flex-wrap justify-around mx-5'>
                        {data.map((item, index) =>
                            <Chatbot key={index} data={item} navigation={navigation} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export const Chatbot = ({ data, navigation, className }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className={`hover:bg-gray-300 bg-white/20 blakdrop-opacity-20 shadow-lg my-3 w-full sm:w-[350px] ${className}`}>
                <div className="z-40">
                    <div onClick={() => navigate(`/selectionOD/${data.title}`, { state: data })} className="flex items-center px-3 pt-3 ">
                        <img src={data.image} className='mr-5 w-[65px] h-[65px]' />
                        <div className="space-y-2">
                            <h1 className='text-2xl text-black font-bold'>{data.title} </h1>
                            <p className='font-medium sm:text-md text-sm border-gray-200 border-2 px-2 sm:py-1 py-0 rounded-[50px]'>Screen recording</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 flex flex-wrap list-none sm:w-[350px] w-full text-white text-[10px] sm:text-xs space-x-1 space-y-1">
                        {
                            data.classement.map((item, index) =>
                                <button onClick={() => navigation(item)} key={index} className='bg-gray-200 text-black px-2 py-0 rounded-2xl z-40'>{item}</button>
                            )
                        }
                    </div>
                </div>
                <div className="bg-gray-200 px-5 py-1 text-xs sm:text-sm ">
                    <p className=''>From $16</p>
                </div>
            </div>
        </>
    )
}


export const Pagination = ({ data = [], navigation }) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const page = parseInt(searchParams.get("page"), 10) || 1;

        // Vérifie si une mise à jour est nécessaire pour éviter les boucles infinies
        if (page !== currentPage) {
            setCurrentPage(page);
        }

        if (items.length !== data.length) {
            setItems(Array.isArray(data) ? data : []);
        }
    }, [searchParams, currentPage, data]);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setSearchParams({ page });
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 3;
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        if (startPage > 1) {
            pages.push(
                <button
                    key="first"
                    onClick={() => handlePageChange(1)}
                    className="mx-1 px-3 py-1 border rounded-[50px] bg-gray-200"
                    aria-label="Première page"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="left-ellipsis" className="mx-1 px-3 py-1">
                        ...
                    </span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 px-3 py-1 border rounded-[50px] ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    aria-current={currentPage === i ? 'page' : undefined}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="right-ellipsis" className="mx-1 px-3 py-1">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key="last"
                    onClick={() => handlePageChange(totalPages)}
                    className="mx-1 px-3 py-1 border rounded-[50px] bg-gray-200"
                    aria-label="Dernière page"
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div>
            {/* Affichage des éléments paginés */}
            <Offre data={currentItems} navigation={navigation} />

            {/* Affichage des boutons de pagination */}
            <div className="flex mt-4 justify-center">
                {totalPages > 1 && renderPageNumbers()}
            </div>
        </div>
    );
};