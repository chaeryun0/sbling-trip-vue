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

const props = defineProps({
  stays: {
    type: Array,
    required: true,
  }
})

const loadMoreTrigger = ref(null)
const observer = ref(null)

const emit = defineEmits(['load-more'])

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

onMounted(() => {
  setupIntersectionObserver()
})

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
