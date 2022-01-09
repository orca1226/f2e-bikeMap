<template>
  <div id="app" class="flex flex-col h-[100vh]" style="height: 100vh">
    <div id="nav">
      <Navbar />
    </div>
    <div class="pages w-[100vw] flex-grow relative">
      <div id="map" class="w-full h-full"></div>
      <TheList
        :results="mapResults"
        @search="searchPlace"
      />
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/TheNavbar.vue'
import TheList from '@/components/TheList.vue'
import countyConfig from '@/utils/countyConfig.js'

export default {
  name: 'googleMap',
  components: {
    Navbar,
    TheList
  },
  data () {
    return {
      countyConfig: countyConfig,
      google: null,
      googleMap: null,
      googleGeocoder: null,
      mapOptions: {
        zoom: 15,
        mapTypeId: 'roadmap',
        mapId: 'fac25d86163ff505',
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false,
        center: {
          lat: 25,
          lng: 121
        }

      },
      userLocation: {
        lat: 25,
        lng: 121
      },
      markers: [
        // {
        //   position: {
        //     lat: 20,
        //     lng: 20
        //   }
        // },
        // {
        //   position: {
        //     lat: 30,
        //     lng: 30
        //   }
        // }
      ],
      loading: true,
      city: null,
      searchLocation: null,
      mapResults: []
    }
  },

  computed: {
  },
  methods: {
    getUserPosition () {
      navigator.geolocation.getCurrentPosition(res => {
        this.loading = false
        this.userLocation = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
        this.googleMap.setCenter(this.userLocation)
        this.googleMap.setZoom(15)
        this.setMarker()
      })
    },

    /**
     * 建立地圖
     */
    initMap () {
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      this.googleMap = new this.google.maps.Map(document.getElementById('map'), this.mapOptions)
    },
    /**
     * 使用地址定位
     */
    geocode (addressOpt) {
      return this.googleGeocoder.geocode(addressOpt)
        .then((res) => {
          return res.results[0].address_components
        // this.googleMap.setCenter(results[0].geometry.location)
        // this.googleMap.fitBounds(results[0].geometry.viewport)
        })
        .catch(res => {
          console.log(res)
        })
    },
    /**
     * 建立圖標
     */
    setMarker (location, opts) {
      // 建立一個新地標
      const marker = new this.google.maps.Marker({
        // 設定地標的座標
        position: location,
        // 設定地標要放在哪一個地圖
        map: this.googleMap,
        animation: this.google.maps.Animation.DROP,
        ...opts
      })
      this.markers.push(marker)
    },
    /**
     * 搜尋地點
     */
    async searchPlace (searchText) {
      const vm = this
      var request = {
        query: searchText,
        fields: ['formatted_address', 'place_id', 'geometry', 'name']
      }

      var placesService = new this.google.maps.places.PlacesService(this.googleMap)

      placesService.findPlaceFromQuery(request, function (results, status) {
        if (status === vm.google.maps.places.PlacesServiceStatus.OK) {
          const item = results[0]
          vm.searchLocation = {
            lat: item.geometry.location.lat(),
            lng: item.geometry.location.lng()
          }
          vm.setMarker(item.geometry.location)
          vm.geocode({
            location: item.geometry.location
          }).then((res) => {
            vm.city = vm.getCity(res)
            vm.mapStationStatus(vm.searchLocation)
          })
          vm.googleMap.setCenter(item.geometry.location)
          vm.googleMap.setZoom(16)
        }
      })
    },
    /**
     * 匹配目前取得的站點動態資料
     */
    async mapStationStatus (locationObj) {
      await this.axios.all([
        this.$api.getCityBikeAvailability({
          city: this.city
        })
          .then(res => {
            this.stationStatus = res.data
          }),
        this.$api.getCityBikeStation({
          city: this.city,
          paramsObj: {
            $spatialFilter: `nearby(${locationObj.lat}, ${locationObj.lng}, 500)`
          }
        })
          .then(res => {
            this.stations = res.data
          })
          .catch(err => {
            console.log(err)
          })
      ])

      const stationIds = this.stations.map((item) => item.StationUID)
      // 整理所需的資料格式
      const mapResults = []
      this.stationStatus.forEach(item => {
        const index = stationIds.indexOf(item.StationUID)
        if (index !== -1) {
          mapResults.push({
            ...item,
            ...this.stations[index]
          })
        }
      })
      this.getDistance(mapResults)
    },
    /**
     * 計算目前搜尋位置與各站點的距離
     */
    getDistance (mapResults) {
      const vm = this
      // 把要計算的點存成陣列
      const destinations = []
      mapResults.forEach(item => {
        destinations.push(new this.google.maps.LatLng(item.StationPosition.PositionLat, item.StationPosition.PositionLon))
      })

      // 查詢的位置跟各點的距離
      const service = new this.google.maps.DistanceMatrixService()
      service.getDistanceMatrix({
        origins: [this.searchLocation],
        destinations: destinations,
        travelMode: 'WALKING', // 交通方式：BICYCLING(自行車)、DRIVING(開車，預設)、TRANSIT(大眾運輸)、WALKING(走路)
        unitSystem: this.google.maps.UnitSystem.METRIC, // 單位 METRIC(公里，預設)、IMPERIAL(哩)
        avoidHighways: true, // 是否避開高速公路
        avoidTolls: true // 是否避開收費路線
      }, function (response, status) {
        for (let i = 0, len = mapResults.length; i < len; i++) {
          mapResults[i].distance = response.rows[0].elements[i].distance.value
          mapResults[i].distance_text = response.rows[0].elements[i].distance.text
          mapResults[i].distance_time = response.rows[0].elements[i].duration.text
        }
        // 按距離重排
        vm.mapResults = mapResults.sort((a, b) => {
          return a.distance > b.distance ? 1 : -1
        })

        for (const item of vm.mapResults) {
          const pos = {
            lat: item.StationPosition.PositionLat,
            lng: item.StationPosition.PositionLon
          }
          // 以數量決定icon的顏色
          let color
          let iconUrl
          if (item.AvailableRentBikes > 0) {
            color = item.AvailableRentBikes > 5 ? '#738047' : '#E75578'
            iconUrl = item.AvailableRentBikes > 5 ? 'green' : 'red'
          } else {
            color = '#9A9A9A'
            iconUrl = 'gray'
          }

          vm.setMarker(pos, {
            label: {
              text: `${item.AvailableRentBikes}`,
              color: color,
              fontWeight: '700'
            },
            icon: {
              url: require(`@/assets/icon-bikeStation-${iconUrl}.svg`),
              // icon的縮放
              scaledSize: new vm.google.maps.Size(50, 50),
              // 文字的位移
              labelOrigin: new vm.google.maps.Point(25, 19)
            }
          })
        }
      })
    },
    getCity (addressArr) {
      const area = addressArr.find(item =>
        item.types.indexOf('administrative_area_level_1') !== -1
      )
      const cityInfo = this.countyConfig.find(city =>
        city.CityName === area.long_name
      )
      return cityInfo.City
    }
  },

  async mounted () {
    try {
      this.google = await this.gmapsInit()
      this.googleGeocoder = new this.google.maps.Geocoder()
      this.initMap()
      // this.getUserPosition()
      // await this.geocode({
      //   address: 'Taiwain Taipei'
      // })

      this.searchPlace('台北市')
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/app.scss";
.google-map {
  width: 100%;
  height: 100%;
}
.markerLabel {
  @apply font-bold text-prime-400;
}
</style>
