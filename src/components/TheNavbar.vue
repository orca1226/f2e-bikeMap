<template>
  <header class="navbar w-full bg-prime-400 flex items-center px-6 justify-between z-50">
    <router-link :to="{name: 'Home'}" class="navbar__logo h-[26px] w-36 flex-grow">
      <img class="h-full object-contain" :src="require('@/assets/logo-light.svg')" alt="logo">
    </router-link>
    <a class="text-12 text-prime-200" href="https://2021.thef2e.com/users/6296427084285739387">Designer —— HsiaoHan Hsu</a>

  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .navbar {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  }
</style>
