//bitlectro api interactions
import axios from "axios";

const TEST_BASE_URL = 'https://dlv1api.bitlectrolabs.com/dreamloopsv1';


export function SAY_UNWRAP_TOKEN (token_id) {
  
  return axios.post(`${TEST_BASE_URL}/token/unwrap/${token_id}`)

}


export function GET_TOKEN_METADATA (token_id) {
  
  return axios.get(`${TEST_BASE_URL}/metadata/${token_id}`)

}