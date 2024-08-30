<template>
  <main>
    <!-- 추천 숙소 섹션 -->
    <section class="main-recommend">
      <div class="main-recommend-wrapper">
        <Title title="인기 추천 숙소" class="recommend-title" />
        <StayTypeMenu :activeTab="activeTab" @handle-tab-click="handleTabClick" />
        <CustomCarousel :items="selectedStays" />
      </div>
    </section>
    <!-- 배너 섹션 -->
    <section class="main-banner">
      <div class="main-banner-wrapper">
        <Carousel
          :images="mainBannerImages"
          :navigation="false"
          :autoplay="true"
          :autoplayDelay="3500"
          :fadeEffect="{ crossFade: true, duration: 800 }"
          :pagination="{ type: 'bullets', clickable: true }"
          class="carousel"
        />
      </div>
    </section>
    <!-- 숙소 리스트 섹션 -->
    <StayList :stays="stayStore.stays" @load-more="loadMoreStays" />
  </main>
</template>

<script setup>
import { onMounted, ref, markRaw } from 'vue'

import CustomCarousel from '@components/CustomCarousel.vue';
import Carousel from '@components/Carousel.vue';
import StayList from '@components/StayList.vue';
import StayTypeMenu from '@components/StayTypeMenu.vue';
import Title from '@components/shared/Title.vue';
import StayItemContents from '@components/shared/StayItemContents.vue';

import { StayType } from '@utils/stayTypes';
import { useStayStore } from '@stores/stayStore';


/**
 * 메인 배너 이미지 배열
 * @constant {Array} mainBannerImages
 */
const mainBannerImages = [
  '/assets/banner_1.png',
  '/assets/banner_2.png',
  '/assets/banner_3.png',
  '/assets/banner_4.png',
];

/** 숙소 스토어 인스턴스 가져오기 */
const stayStore = useStayStore()

/** 현재 활성화된 탭을 지정하는 ref */
const activeTab = ref(StayType.Hotel)

/** 선택된 숙소 리스트를 담는 ref */
const selectedStays = ref([])

/**
 * 탭 클릭 시 호출되는 함수
 * @param {Number} type - 클릭된 탭의 타입 ID
 */
const handleTabClick = async (type) => {
  activeTab.value = type;
  await stayStore.handleStayTypeChange(type);

  // 선택된 숙소 리스트를 갱신
  selectedStays.value = (stayStore.staysByType[type] || []).map(stay => ({
    imageUrl: stay.roomImageUrlList[0],  // 이미지 URL
    staySeq: stay.staySeq,  // 숙소 고유 번호
    contents: markRaw(StayItemContents),  // 렌더링할 컴포넌트
    props: { stay },  // 컴포넌트에 전달할 데이터
  }));
}

/** 컴포넌트가 마운트될 때 초기 데이터 가져오기 */
onMounted(() => {
  stayStore.getStays()
  handleTabClick(activeTab.value);
})

/** 추가 데이터 로드하는 함수 */
const loadMoreStays = () => {
  stayStore.loadMoreStays()
}
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

.main-recommend {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;

  .main-recommend-wrapper {
    margin-bottom: 60px;
  }

  .recommend-title {
    margin-top: 40px;
    margin-bottom: 12px;

    h2 {
      font-weight: 600;
      @include t2;
    }
  }
}

.main-banner {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;

  .main-banner-wrapper {
    margin-bottom: 60px;
  }

  .carousel {
    animation: fadeInUp 1s ease-in-out;

    --swiper-pagination-bottom: 15px;
    --swiper-pagination-bullet-width: 12px;
    --swiper-pagination-bullet-height: 12px;
  }
}
</style>