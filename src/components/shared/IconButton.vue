<template>
  <button type="button" @click="handleClick" :class="'btn'" :aria-label="`${label} 버튼`">
    <img :src="iconSrc" :alt="label" width="35" height="35" />
    <small :class="'label'">{{ label }}</small>
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])

const handleClick = event => {
  emit('click', event)
}
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  box-shadow: none;
}

.label {
  color: var(--gray800);
  font-weight: 600;
  @include t8;
}

small {
  display: none;
}
</style>