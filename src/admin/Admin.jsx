import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HeaderAdmin } from './components/HeaderAdmin'
import { MenuAdmin } from './components/MenuAdmin'
import ListeOffre from './pages/ListeOffre'
import ListeClassement from './pages/ListeClassement'
import { ListeCompte } from './pages/ListeCompte'
import { ListeDemand } from './pages/ListeDemand'
import AddClassement from './pages/AddClassement'
import AddOffre from './pages/AddOffre'
import ModifierOffre from './pages/ModifierOffre'
import ModifierType from './pages/ModifierType'
import ListeArticle from './pages/ListeArticle'
import AddArticle from './pages/AddArticle'
import ModifierArticle from './pages/ModifierArticle'

export const Admin = () => {
    const user = JSON.parse(localStorage.getItem('userData'));

    // console.log(user.admin)
    return (
        <>
            <HeaderAdmin userdata={user} />
            <MenuAdmin className={'sm:block hidden'} userType={user.admin} role={user.role} />
            <div className="sm:ml-40 text-white text-sm sm:text-md h-screen pt-10">
                <div className="w-full p-6 shadow-md rounded-lg md:flex justify-center">
                    <div className="md:w-[600px] lg:w-[900px] ">
                        <Routes>
                            {/* Tous les comptes */}
                            <Route path='/toutCompte' element={<ListeCompte />} />
                            <Route path='/demande' element={<ListeDemand />} />

                            {/* A propos des offres */}
                            <Route path='/toutOffre' element={<ListeOffre />} />
                            <Route path='/ajoutOffre' element={<AddOffre />} />
                            {/* Modification d'un offre */}
                            <Route path='/modifierOffre/:id' element={<ModifierOffre />} />

                            {/* A propos des classements */}
                            <Route path='/toutClassement' element={<ListeClassement />} />
                            <Route path='/ajoutClassement' element={<AddClassement userdata={user} />} />
                            <Route path='/modifierType/:id' element={<ModifierType />} />

                            {/* A propos des blogs */}
                            <Route path='/toutBlog' element={<ListeArticle />} />
                            <Route path='/ajoutBlog' element={<AddArticle userdata={user} />} />
                            <Route path='/modifierBlog/:id' element={<ModifierArticle />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

