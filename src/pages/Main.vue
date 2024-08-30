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

const mainBannerImages = [
  '/assets/banner_1.png',
  '/assets/banner_2.png',
  '/assets/banner_3.png',
  '/assets/banner_4.png',
];

const stayStore = useStayStore()
const activeTab = ref(StayType.Hotel)
const selectedStays = ref([])

const handleTabClick = async (type) => {
  activeTab.value = type;
  await stayStore.handleStayTypeChange(type);

  selectedStays.value = (stayStore.staysByType[type]).map(stay => ({
    imageUrl: stay.roomImageUrlList[0],
    staySeq: stay.staySeq,
    contents: markRaw(StayItemContents),
    props: { stay },  
  }));
}

onMounted(() => {
  stayStore.getStays()
  handleTabClick(activeTab.value);
})

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