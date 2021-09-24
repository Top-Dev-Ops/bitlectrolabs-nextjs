import axios from 'axios'

const axiosDreamloops = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DREAMLOOPS_URL}`,
    headers: {
        accept: 'application/json',
    },
})

const axiosOpenSea = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_OPENSEA_URL}`,
    headers: {
        accept: 'application/json'
    }
})

axiosDreamloops.interceptors.request.use(
    (request) => {
        return request
    },
    (error) => {
        console.error(`Request error: ${error.message} at ${error.config.url}`)
    }
)

axiosDreamloops.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.error(`Response error: ${error.message} at ${error.config.url}`)
    }
)

axiosOpenSea.interceptors.request.use(
    (request) => {
        return request
    },
    (error) => {
        console.error(`Request error: ${error.message} at ${error.config.url}`)
    }
)

axiosOpenSea.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.error(`Response error; ${error.message} at ${error.config.url}`)
    }
)

export {
    axiosDreamloops,
    axiosOpenSea
}