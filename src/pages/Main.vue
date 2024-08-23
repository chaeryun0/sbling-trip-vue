<template>
  <main>
    <!-- 숙소 리스트 섹션 -->
    <StayList
      :stays="stays"
    /> 
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StayList from '@components/StayList.vue'
import http from '@utils/http.js'

const stays = ref([])
const currentPage = ref(0)

const getStays = async () => {
  try {
    const response = await http.get(`/stay/list?cursor=${currentPage.value}`)
    stays.value = response.data.result
    console.log('response.data.result', response.data.result)
  } catch (error) {
    console.error('숙소 데이터를 가져오는 중 에러 발생:', error)
  }
}

onMounted(() => {
  getStays()
})
</script>

<style scoped lang="scss">
</style>
