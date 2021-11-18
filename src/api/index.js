import request from '@/api/request'

const tourism = {
  getScenicSpot (paramsObj) {
    const url = '/Tourism/ScenicSpot'
    return request.get(url, {
      params: paramsObj
    })
  },
  getActivity (paramsObj) {
    const url = '/Tourism/Activity'
    return request.get(url, {
      params: paramsObj
    })
  },
  getFood (paramsObj) {
    const url = '/Tourism/Restaurant'
    return request.get(url, {
      params: paramsObj
    })
  },
  getHotel (paramsObj) {
    const url = '/Tourism/Hotel'
    return request.get(url, {
      params: paramsObj
    })
  },
  getCityScenicSpot (obj) {
    const { city, paramsObj } = obj
    const url = `/Tourism/ScenicSpot/${city}`
    return request.get(url, {
      params: paramsObj
    })
  },
  getCityActivity (obj) {
    const { city, paramsObj } = obj
    const url = `/Tourism/Activity/${city}`
    return request.get(url, {
      params: paramsObj
    })
  },
  getCityFood (obj) {
    const { city, paramsObj } = obj
    const url = `/Tourism/Restaurant/${city}`
    return request.get(url, {
      params: paramsObj
    })
  },
  getCityHotel (obj) {
    const { city, paramsObj } = obj
    const url = `/Tourism/Hotel/${city}`
    return request.get(url, {
      params: paramsObj
    })
  }
}
export default tourism
