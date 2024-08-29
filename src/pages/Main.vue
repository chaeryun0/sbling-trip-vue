<template>
  <main>
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
import { onMounted } from 'vue'
import Carousel from '@components/Carousel.vue';
import StayList from '@components/StayList.vue'
import { useStayStore } from '@stores/stayStore'

const mainBannerImages = [
  '/assets/banner_1.png',
  '/assets/banner_2.png',
  '/assets/banner_3.png',
  '/assets/banner_4.png',
];

const stayStore = useStayStore()

onMounted(() => {
  stayStore.getStays()
})

const loadMoreStays = () => {
  stayStore.loadMoreStays()
}
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

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