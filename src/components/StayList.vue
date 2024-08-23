<template>
  <div class="stay-list-comp">
    <Title title="전체 숙소" />
    <ul>
      <StayItem v-for="stay in stays" :key="stay.staySeq" :stay="stay" />
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import StayItem from './StayItem.vue'
import Title from './shared/Title.vue';

const props = defineProps({
  stays: {
    type: Array,
    required: true,
  }
})
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

  .stay-list-comp {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
  
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>
