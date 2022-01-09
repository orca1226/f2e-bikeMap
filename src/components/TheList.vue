<template>
  <div class="shadow-list w-[425px] overflow-y-auto py-[28px] px-[32px] absolute top-[36px] left-[36px] bottom-[36px] rounded-8px flex flex-col z-10 bg-white">
    <div class="h-[36px] flex items-center flex-shrink-0">
      <!-- 搜尋框 -->
      <div class="h-full py-[4px] pl-[16px] pr-[32px] bg-gray-200 rounded-8px relative flex items-center flex-grow">

        <input
          type="text"
          class="bg-transparent h-full w-full focus-visible:outline-none"
          v-model="searchText"
          placeholder="搜尋站點或鄰近地點"
          @keydown.stop.prevent.enter="goSearch"
        >
        <button
          type="button" class="absolute right-2"
          @click="goSearch"
        >
          <img class="" :src="require('@/assets/icon-search.svg')" alt="icon">
        </button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="mt-[36px] flex-grow overflow-y-auto">
      <div
        class="border-b border-gray-300 py-[20px]"
        v-for="(item, index) in results" :key="index"
      >
        <h5 class="text-prime-500 font-bold mb-[12px]">{{ item.StationName.Zh_tw.split('_')[1] }}</h5>
        <div class="flex">
          <div
            class="infoBlock h-[72px] flex-grow mr-3 rounded-8px flex flex-col items-center bg-prime-100 p-3 text-prime-500"
            :class="{ 'limit': item.AvailableRentBikes <= 5, 'disabled': item.AvailableRentBikes === 0 }"
          >
            <span class="text-15 transform -translate-y-1"><i class="fas fa-bicycle mr-1"></i>可租借</span>
            <h4 class="font-bold transform -translate-y-1">{{ item.AvailableRentBikes }}</h4>
          </div>
          <div
            class="infoBlock h-[72px] flex-grow ml-3 rounded-8px flex flex-col items-center bg-prime-100 p-3 text-prime-500"
            :class="{'limit': item.AvailableReturnBikes <= 5 , 'disabled': item.AvailableReturnBikes === 0}"
          >
            <span class="text-15 transform -translate-y-1"><i class="fas fa-parking mr-1"></i>可停車</span>
            <h4 class="font-bold transform -translate-y-1">{{ item.AvailableReturnBikes }}</h4>
          </div>
        </div>
        <div class="flex justify-between items-center mt-3">
          <span
            class="label rounded-6px py-1 px-2 text-15 border border-solid border-accent-300 text-accent-500"
            :class="{ 'limit': getStationStatus(item) < 0 }"
          >{{ getStationStatus(item, 'text') }}</span>
          <span class="text-gray-500 text-15"><i class="fas fa-map-marker-alt mr-1"></i>{{ item.distance_text }} 走路 {{ item.distance_time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheList',
  props: {
    results: {
      type: Array
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    goSearch () {
      console.log(123)
      this.$emit('search', this.searchText)
    },
    getStationStatus (item, type) {
      let flag
      if (item.AvailableReturnBikes > 0 && item.AvailableRentBikes > 0) {
        flag = 1
      } else if (item.AvailableReturnBikes > 0 && item.AvailableRentBikes === 0) {
        flag = -1
      } else if (item.AvailableReturnBikes === 0 && item.AvailableRentBikes > 0) {
        flag = -2
      } else {
        flag = 0
      }
      if (type === 'text') {
        switch (flag) {
        case 0:
          return '站點施工中'
        case -1:
          return '只可還車'
        case -2:
          return '只可借車'
        default:
          return '可借可還'
        }
      } else {
        return flag
      }
    }
  }
}
</script>

<style lang="scss">
  .infoBlock.limit {
    @apply bg-second-100 text-second-600 #{!important};
    &.disabled {
      @apply bg-gray-200 text-gray-400 #{!important};
    }
  }
  .label.limit {
    @apply text-second-400 border-second-300;
  }
</style>
