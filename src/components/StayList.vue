<template>
  <div class="stay-list-comp">
    <Title title="전체 숙소" />
    <ul>
      <StayItem v-for="stay in stays" :key="stay.staySeq" :stay="stay" />
      <li ref="loadMoreTrigger" class="load-more-trigger"></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import StayItem from './StayItem.vue'
import Title from './shared/Title.vue'

/**
 * StayList 컴포넌트 Props 정의
 * @property {Array} stays - 렌더링할 숙소 목록
 */
const props = defineProps({
  stays: {
    type: Array,
    required: true,
  }
})

const loadMoreTrigger = ref(null);  // loadMoreTrigger 엘리먼트를 참조하기 위한 ref
const observer = ref(null);  // IntersectionObserver 객체를 참조하기 위한 ref

const emit = defineEmits(['load-more'])

/** 
 * IntersectionObserver를 설정하여 무한 스크롤을 구현하는 함수
 */
const setupIntersectionObserver = () => {
  observer.value = new IntersectionObserver((entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      emit('load-more')
    }
  }, {
    root: null,
    threshold: 1.0,
  })

  if (loadMoreTrigger.value) {
    observer.value.observe(loadMoreTrigger.value)
  }
}

/** 
 * 컴포넌트가 마운트될 때 IntersectionObserver를 설정
 */
onMounted(() => {
  setupIntersectionObserver()
})

/** 
 * 컴포넌트가 언마운트될 때 IntersectionObserver를 해제
 */
onUnmounted(() => {
  if (observer.value && loadMoreTrigger.value) {
    observer.value.unobserve(loadMoreTrigger.value)
  }
})
</script>

<style scoped lang="scss">
.stay-list-comp {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .load-more-trigger {
    height: 20px;
  }
}
</style>
