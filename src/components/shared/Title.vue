<template>
  <div class="title-comp" :class="className">
    <h2 v-if="title">{{ title }}</h2>
    <h3 v-if="subTitle">{{ subTitle }}</h3>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: false,
  },
  className: {
    type: String,
    required: false,
  }
})
</script>


<style scoped lang="scss">
@import 'src/styles/mixins';

.title-comp {
  margin-top: 40px;
  margin-bottom: 20px;

  h2 {
    font-weight: 600;
    @include t2;
  }

  h3 {
    @include t5;
  }
}
</style>