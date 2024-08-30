import { ref } from 'vue';
import { defineStore } from 'pinia';
import http from '@utils/http';

/** 숙소 관련 상태 관리를 위한 스토어 */
export const useStayStore = defineStore('stayStore', () => {
  const stays = ref([]);
  const staysByType = ref({});
  const currentPage = ref(0);

  /**
   * 주소를 포맷팅하는 함수
   * @param {String} address - 원본 주소
   * @returns {String} 포맷팅된 주소
   */
  const formatLocation = (address) => {
    const [province, city] = address.split(' ', 2);
    const filteredProvince = province.slice(0, 2);
    return `${filteredProvince} ∙ ${city}`;
  };

  /**
   * 괄호를 제거하는 함수
   * @param {String} str - 원본 문자열
   * @returns {String} 괄호가 제거된 문자열
   */
  const removeParentheses = (str) =>
    str?.replace(/\((.*?)\)/g, '').trim();

  /**
   * 숙소 리스트를 포맷팅하는 함수
   * @param {Array} data - 원본 숙소 데이터 배열
   * @returns {Array} 포맷팅된 숙소 데이터 배열
   */
  const formatStays = (data) =>
    data.map((stay) => ({
      ...stay,
      stayName: removeParentheses(stay.stayName),
      originalAddress: stay.address,
      formattedAddress: formatLocation(stay.address),
    })
    );

  /**
   * 기본 숙소 리스트를 서버에서 가져오는 함수
   */
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

  /**
   * 특정 타입의 숙소 리스트를 서버에서 가져오는 함수
   * @param {Number} type - 숙소 타입 ID
   */
  const getStaysByType = async (type) => {
    try {
      const { data } = await http.get(`/stay/list/recommend/review-rank?stayType=${type}`);
      staysByType.value[type] = formatStays(data.result);
    } catch (error) {
      console.error('숙소 타입 별 데이터를 가져오는 중 에러 발생:', error);
    }
  };

  /** 추가로 숙소 데이터를 로드하는 함수 */
  const loadMoreStays = () => {
    currentPage.value += 1;
    getStays();
  };

  /**
   * 숙소 타입이 변경될 때 호출되는 함수
   * @param {Number} type - 변경된 숙소 타입 ID
   */
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
