<template>
  <div :class="['custom-carousel-comp', className]">
    <Swiper
      :slidesPerView="4"
      :spaceBetween="spaceBetween"
      :breakpoints="breakpoints"
      :rewind="true"
      :navigation="true"
      :modules="[Navigation]"
      class="swiper"
    >
      <SwiperSlide v-for="stay in items" :key="stay.staySeq" class="border: 3px solid green">
        <article>
          <img :src="stay.imageUrl" :alt="`${stay.staySeq}번째 이미지`" />
          <component :is="stay.contents" v-bind="stay.props" />
        </article>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  spaceBetween: {
    type: Number,
    default: 30,
  },
  className: {
    type: String,
    default: '',
  },
});

const breakpoints = {
  1: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
  1200: {
    slidesPerView: 4,
  },
};
</script>

<style lang="scss">
@import 'src/styles/mixins';

.custom-carousel-comp {
  position: relative;

  .swiper {
    position: static;
    --swiper-navigation-size: 14px;

    img {
      display: block;
      width: 100%;
      height: 170px;
      border-radius: 12px;
      background-position: center;
    }
  }

  .swiper > div:nth-child(2),
  .swiper > div:nth-child(3) {
    top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    visibility: visible;
    z-index: 2;
    background: var(--white);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 40px;
    height: 40px;
    color: var(--black);

    &:hover {
      background-color: var(--gray50);
    }
  }

  .swiper > div:nth-child(2) {
    left: -20px;
  }

  .swiper > div:nth-child(3) {
    right: -20px;
  }
}
</style>
