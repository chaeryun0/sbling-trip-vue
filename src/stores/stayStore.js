import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@utils/http";
import { formatStays } from "@utils/stayFormatters";

/** 숙소 관련 상태 관리를 위한 스토어 */
export const useStayStore = defineStore("stayStore", () => {
  const stays = ref([]);
  const staysByType = ref({});
  const currentPage = ref(0);
  const isMoreDataAvailable = ref(true); // 추가 데이터를 로드할 수 있는지 여부

  /**
   * 기본 숙소 리스트를 서버에서 가져오는 함수
   */
  const getStays = async () => {
    if (!isMoreDataAvailable.value) return; // 더 이상 불러올 데이터가 없으면 함수를 종료
    try {
      const { data } = await http.get(`/stay/list?cursor=${currentPage.value}`);
      if (data.result.length === 0) {
        isMoreDataAvailable.value = false; // 더 이상 불러올 데이터가 없는 경우
      } else if (currentPage.value === 0) {
        stays.value = formatStays(data.result);
      } else {
        stays.value = [...stays.value, ...formatStays(data.result)];
      }
    } catch (error) {
      console.error("숙소 데이터를 가져오는 중 에러 발생:", error);
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
      console.error("숙소 타입 별 데이터를 가져오는 중 에러 발생:", error);
    }
  };

  /** 추가로 숙소 데이터를 로드하는 함수 */
  const loadMoreStays = () => {
    if (isMoreDataAvailable.value) {
      // isMoreDataAvailable가 true일 때만 추가 데이터 로드
      currentPage.value += 1;
      getStays();
    }
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
