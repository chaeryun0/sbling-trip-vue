<template>
  <main>
    <StayList :stays="stayStore.stays" />
  </main>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import StayList from '@components/StayList.vue'
import { useStayStore } from '@stores/stayStore'

const stayStore = useStayStore()

// 스크롤 위치 추적
const { y } = useScroll(window)

// 스크롤이 최하단에 도달했을 때 다음 데이터를 로드
watch(y, (scrollY) => {
  if (scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    stayStore.loadMoreStays()
  }
})

onMounted(() => {
  stayStore.getStays()
})
</script>

<style scoped lang="scss">
</style>