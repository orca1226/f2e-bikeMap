
import axios from 'axios'
import jsSHA from 'jssha'

function getAuthorizationHeader () {
//  填入自己 ID、KEY 開始
  const AppID = 'cf4fc1f88024448c87de2f6276a32a13'
  const AppKey = '11iMc9UPovBLtwlrr5wroVKmDXc'
  //  填入自己 ID、KEY 結束
  const GMTString = new Date().toGMTString()
  const ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  const Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"'
  return {
    Authorization: Authorization,
    'X-Date': GMTString
  }
}

// axios 實例化
const request = axios.create({
  // API base url
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2',
  // 跨域請求是否發送 cookie
  // withCredentials: true,
  // 請求抬頭
  headers: getAuthorizationHeader(),
  // 請求超時設置
  timeout: 30000,
  params: {
    $format: 'JSON'
  }
})

export default request
