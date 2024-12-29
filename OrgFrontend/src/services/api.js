import axios from "axios";


const BASE_URL = "http://127.0.0.1:8000/api/persons/";

export async function getPersons() {
    return await axios.get(BASE_URL)
}

export async function createPersonsAPI(data) {
    return await axios.post(BASE_URL, data)
}

export async function getPersonsDetails(id) {
    return await axios.get(BASE_URL + `${id}/`)
}

export async function updatePersonsAPI(id, data) {
    return await axios.put(BASE_URL + `${id}/`, data)
}

export async function deletePersonsAPI(id) {
    return await axios.delete(BASE_URL + `${id}/`)
}