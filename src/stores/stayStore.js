import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '@utils/http.js'

export const useStayStore = defineStore('stayStore', () => {
  const stays = ref([])
  const currentPage = ref(0)

  const getStays = async () => {
    try {
      const response = await http.get(`/stay/list?cursor=${currentPage.value}`)
      if (currentPage.value === 0) {
        stays.value = response.data.result
      } else {
        stays.value = [...stays.value, ...response.data.result]
      }
    } catch (error) {
      console.error('숙소 데이터를 가져오는 중 에러 발생:', error)
    }
  }

  const loadMoreStays = () => {
    currentPage.value += 1
    getStays()
  }

  return {
    stays,
    currentPage,
    getStays,
    loadMoreStays,
  }
})
