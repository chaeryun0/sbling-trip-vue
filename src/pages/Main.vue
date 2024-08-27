<template>
  <main>
    <!-- 숙소 리스트 섹션 -->
    <StayList :stays="stayStore.stays" @load-more="loadMoreStays" />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStayStore } from '@stores/stayStore'
import StayList from '@components/StayList.vue'

const stayStore = useStayStore()

onMounted(() => {
  stayStore.getStays()
})

const loadMoreStays = () => {
  stayStore.loadMoreStays()
}
</script>

<style scoped lang="scss">
</style>