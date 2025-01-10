import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Admin } from './admin/Admin'
import { Login } from './admin/Login'
import { SignUp } from './admin/SignUp'
import ProtectedRoute from './admin/components/ProtectedRoute'
import axios from 'axios'


export const NOM_DE_DOMAIN = import.meta.env.VITE_API_URL

function App() {
  const [loading, setLoading] = useState(true)
  const [classement, setClassement] = useState([])
  const [data, setData] = useState([])
  const [types, setTypes] = useState([])


  useEffect(() => {
    // Récupérer les catégories et les éléments
    const fetchData = async () => {
      try {
        const response = await axios.get(`${NOM_DE_DOMAIN}/allType`)
        const { types } = response.data
        setTypes(types)
        const response2 = await axios.get(`${NOM_DE_DOMAIN}/allClassement`)
        const { classements } = response2.data
        const response3 = await axios.get(`${NOM_DE_DOMAIN}/offres`)
        const { offres } = response3.data

        // Associer les éléments à leurs catégories
        const combinedData = types.map((category) => ({
          ...category,
          classement: classements.filter((item) => item.type == category.title),
        }));
        setClassement(combinedData);
        console.log(combinedData)

        const combinedData2 = offres.map((item) => ({
          ...item,
          classement: JSON.parse(item.classement),
          descriptionOC: JSON.parse(item.descriptionOC)
        }))

        setData(combinedData2)
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
    setLoading(false)
  }, []);


  const blog = [
    { title: 'Célébrer le nouvel an sous les tropiques : destinations balnéaires', lien: '' },
    { title: 'Réveillon en amoureux : Séjours romantiques et privilégiés pour 2024-2025', lien: '' },
    { title: 'Réveillon en amoureux : Séjours romantiques et privilégiés pour 2024-2025', lien: '' },
    { title: 'Réveillon en amoureux : Séjours romantiques et privilégiés pour 2024-2025', lien: '' },
    { title: 'Réveillon en amoureux : Séjours romantiques et privilégiés pour 2024-2025', lien: '' },
  ]


  if (loading)
    return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>
  else
    return (
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/*" element={<Home types={types} classement={classement} data={data} blog={blog} />} />
          <Route path='admin/*' element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
          />
          <Route path='login' element={<Login />} />
          <Route path='signUp' element={<SignUp />} />
        </Routes>
      </Router>
    )
}

export default App
