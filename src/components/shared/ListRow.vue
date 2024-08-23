<template>
  <component :is="tagType" :class="className">
    <slot name="leftContent"></slot>
    <slot name="mainContent"></slot>
    <slot name="rightContent"></slot>
  </component>
</template>

<script setup>
const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  tagType: {
    type: String,
    default: 'li',
    description: 'li 혹은 div 요소로 사용'
  },
})
</script>