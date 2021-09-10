import Api from './api'

const getImagesList = (pageNo) => Api.get(`/images?page=${pageNo}`)
const getImage = (id) => Api.get(`/images/${id}`)
const getBearerToken = () => {
  const Json = {}
  Json.apiKey = '23567b218376f79d9415'
  Api.post('/auth', Json).then((res) => {
    localStorage.setItem('token', res.data.token)
  })
}

export default {
  getImagesList,
  getImage,
  getBearerToken
}
