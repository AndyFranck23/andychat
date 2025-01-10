import axios from "axios"

export const listType = async (setTypes) => {
    try {
        const response = await axios.get(`${NOM_DE_DOMAIN}/allType`)
        const { types } = response.data
        setTypes(types)
    } catch (e) {
        console.log(e)
    }
}

export const listClassement = async (setClassements) => {
    try {
        const response = await axios.get(`${NOM_DE_DOMAIN}/allClassement`)
        const { classements } = response.data
        setClassements(classements)
    } catch (e) {
        console.log(e)
    }
}

export const deleteType = async (id, types, setTypes) => {
    try {
        await axios.delete(`${NOM_DE_DOMAIN}/typeDelete/${id}`)
        setTypes(types.filter((data) => data.id != id))
    } catch (err) {
        console.log(err.message)
    }
}

export const deleteOffre = async (id, data, setData) => {
    try {
        await axios.delete(`${NOM_DE_DOMAIN}/offreDelete/${id}`)
        setData(data.filter((data) => data.id != id))
    } catch (err) {
        console.log(err.message)
    }
}

export const listes = async (setData) => {
    try {
        const response = await axios.get(`${NOM_DE_DOMAIN}/offres`)
        const { offres } = response.data
        setData(offres)
    } catch (e) {
        console.log(e)
    }
}

export const listeDemand = async (setDemandes) => {
    try {
        const response = await axios.get(`${NOM_DE_DOMAIN}/demande`)
        const { users } = response.data
        // console.log(users)
        setDemandes(users)
    } catch (e) {
        console.log(e)
    }
}


export const deleteDemande = async (id, demandes, setDemandes) => {
    try {
        await axios.delete(`${NOM_DE_DOMAIN}/demandeDelete/${id}`)
        setDemandes(demandes.filter((demandes) => demandes.id != id))
    } catch (err) {
        console.log(err.message)
    }
}

export const agreeDemande = async (id) => {
    try {
        await axios.put(`${NOM_DE_DOMAIN}/demandeAgree/${id}`)
        listeDemand()
        // console.log(response.data)
    } catch (err) {
        console.log(err.message)
    }
}