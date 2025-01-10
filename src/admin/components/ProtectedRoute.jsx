import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NOM_DE_DOMAIN } from '../../App';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`${NOM_DE_DOMAIN}/protected`, { withCredentials: true });
                setIsAuthenticated(true);
            } catch (error) {
                // if (error.response && error.response.status === 401) {
                navigate('/login', { state: error.response.data.message }); // Redirige l'utilisateur vers la page de connexion
                // }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) {
        return <div className='w-screen h-screen flex justify-center items-center'>Chargement...</div>; // Affiche un écran de chargement pendant la vérification
    }

    if (!isAuthenticated) {
        return null; // Empêche un rendu non désiré
    }

    return children; // Affiche le contenu protégé si l'utilisateur est authentifié
};

export default ProtectedRoute;
