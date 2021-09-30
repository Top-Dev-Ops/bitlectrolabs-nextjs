import { axiosTokens } from './axios'

export function SAY_UNWRAP_TOKEN(tokenId) {
    axiosTokens
        .post(`/dreamloopsv1/token/unwrap/${tokenId}`)
        .then(res => {
            return res.data
        })
        .catch(error => console.log(error))
}

export function GET_TOKEN_METADATA(tokenId) {
    axiosTokens
        .get(`/dreamloopsv1/metadata/${tokenId}`)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
}