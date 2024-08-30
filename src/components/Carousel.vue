<template>
  <div :class="['carousel-comp', className]">
    <Swiper
      :spaceBetween="spaceBetween"
      :rewind="rewind"
      :mousewheel="mousewheel"
      :navigation="navigation"
      :pagination="pagination"
      :breakpoints="breakpoints"
      :effect="effect"
      :fadeEffect="fadeEffect"
      :autoplay="autoplayConfig"
      :modules="[Navigation, Pagination, Autoplay, EffectFade]" 
      @slideChange="handleSlideChange"
    >
      <SwiperSlide v-for="(imgUrl, idx) in images" :key="imgUrl">
        <img :src="imgUrl" :alt="`${idx + 1}번째 이미지`" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

/**
 * Carousel 컴포넌트 Props 정의
 * @property {Array} images - 슬라이드에 표시될 이미지 배열
 * @property {Number} spaceBetween - 슬라이드 간의 간격
 * @property {Boolean} rewind - 슬라이드 끝에서 다시 시작할지 여부
 * @property {Boolean} mousewheel - 마우스 휠로 슬라이드 제어 가능 여부
 * @property {Boolean} navigation - 내비게이션 버튼 활성화 여부
 * @property {Object} pagination - 페이지네이션 설정
 * @property {Boolean} autoplay - 자동 재생 활성화 여부
 * @property {Number} autoplayDelay - 자동 재생 지연 시간
 * @property {String} effect - 슬라이드 효과 타입
 * @property {Object} fadeEffect - 페이드 효과 설정
 * @property {Object} breakpoints - 슬라이드 반응형 설정
 * @property {String} className - 사용자 정의 클래스
 * @property {Function} onSlideChange - 슬라이드 변경 시 호출되는 함수
 * @property {Function} onPaginationChange - 페이지네이션 변경 시 호출되는 함수
 */
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  spaceBetween: {
    type: Number,
    default: 20,
  },
  rewind: {
    type: Boolean,
    default: true,
  },
  mousewheel: {
    type: Boolean,
    default: true,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Object,
    default: undefined,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  autoplayDelay: {
    type: Number,
    default: 3000,
  },
  effect: {
    type: String,
    default: 'slide',
  },
  fadeEffect: {
    type: Object,
    default: undefined,
  },
  breakpoints: {
    type: Object,
    default: undefined,
  },
  className: {
    type: String,
    default: '',
  },
  onSlideChange: Function,
  onPaginationChange: Function,
});

const emit = defineEmits(['slideChange', 'paginationChange']);

/** 
 * 슬라이드 변경 시 호출되는 함수
 * @param {Object} swiper - Swiper 인스턴스
 */
const handleSlideChange = (swiper) => {
  if (props.onSlideChange) {
    props.onSlideChange(swiper);
  }
  if (props.onPaginationChange) {
    props.onPaginationChange(swiper.realIndex + 1, swiper.slides.length);
  }
};

/** 
 * 자동 재생 설정 객체
 * @returns {Object|Boolean} - 자동 재생 설정을 반환하거나 false를 반환
 */
const autoplayConfig = props.autoplay
  ? {
      delay: props.autoplayDelay,
      disableOnInteraction: false,
    }
  : false;
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

.carousel-comp {
  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-position: center;
  }
}

.swiper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;

  --swiper-theme-color: var(--white);
  --swiper-navigation-size: 35px;
  --swiper-navigation-sides-offset: 20px;
  --swiper-navigation-top-offset: 50%;

  --swiper-pagination-color: var(--white);
  --swiper-pagination-bottom: 15px;
  --swiper-pagination-bullet-width: 15px;
  --swiper-pagination-bullet-height: 15px;
  --swiper-pagination-bullet-horizontal-gap: 7px;
  --swiper-pagination-bullet-inactive-color: var(--gray300);
  --swiper-pagination-bullet-inactive-opacity: 0.9;
  --swiper-pagination-bullet-opacity: 1;

  img {
    height: 270px;
    background-position: center;
  }
}

</style>
