import { ref } from 'vue';
import { defineStore } from 'pinia';
import http from '@utils/http';

export const useStayStore = defineStore('stayStore', () => {
  const stays = ref([]);
  const staysByType = ref({});
  const currentPage = ref(0);

  const formatLocation = (address) => {
    const [province, city] = address.split(' ', 2);
    const filteredProvince = province.slice(0, 2);
    return `${filteredProvince} ∙ ${city}`;
  };

  const removeParentheses = (str) =>
    str?.replace(/\((.*?)\)/g, '').trim();

  const formatStays = (data) =>
    data.map((stay) => ({
      ...stay,
      stayName: removeParentheses(stay.stayName),
      originalAddress: stay.address,
      formattedAddress: formatLocation(stay.address),
    })
    );

  const getStays = async () => {
    try {
      const { data } = await http.get(`/stay/list?cursor=${currentPage.value}`);
      if (currentPage.value === 0) {
        stays.value = formatStays(data.result);
      } else {
        stays.value = [...stays.value, ...formatStays(data.result)];
      }
    } catch (error) {
      console.error('숙소 데이터를 가져오는 중 에러 발생:', error);
    }
  };

  const getStaysByType = async (type) => {
    try {
      const { data } = await http.get(`/stay/list/recommend/review-rank?stayType=${type}`);
      staysByType.value[type] = formatStays(data.result);
    } catch (error) {
      console.error('숙소 타입 별 데이터를 가져오는 중 에러 발생:', error);
    }
  };

  const loadMoreStays = () => {
    currentPage.value += 1;
    getStays();
  };

  const handleStayTypeChange = async (type) => {
    if (!staysByType.value[type]) {
      await getStaysByType(type);
    }
  };

  return {
    stays,
    staysByType,
    currentPage,
    getStays,
    loadMoreStays,
    handleStayTypeChange,
  };
});
