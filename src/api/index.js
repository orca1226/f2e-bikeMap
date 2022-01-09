import request from '@/api/request'

const api = {
  getCityBikeStation (obj) {
    const { city, paramsObj } = obj
    const url = `/Bike/Station/${city}`
    return request.get(url, {
      params: paramsObj
    })
  },
  getCityBikeAvailability (obj) {
    const { city, paramsObj } = obj
    const url = `/Bike/Availability/${city}`
    return request.get(url, {
      params: paramsObj
    })
  }

}
export default api
