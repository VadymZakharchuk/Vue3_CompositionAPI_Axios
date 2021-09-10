import axios from 'axios'

const API_DOMAIN = 'http://interview.agileengine.com'

const Api = axios.create({
  baseURL: `${API_DOMAIN}`
})

Api.interceptors.request.use(async (config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = ' Bearer ' + localStorage.getItem('token')
  }
  config.headers['Content-Type'] = 'application/json'
  return config
})

export default Api
