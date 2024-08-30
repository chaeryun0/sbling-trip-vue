<template>
  <li
    role="tab"
    tabindex="0"
    :aria-selected="active ? 'true' : 'false'"
    :class="{ active: active }"
    @click="handleClick"
  >
    {{ label }}
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  type: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['handle-tab-click']);

const handleClick = () => {
  emit('handle-tab-click', props.type);
};
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

  li {
    height: 35px;
    max-width: 210px;
    padding: 10px 16px;

    flex: 0 0 auto;
    align-items: center;
    display: block;

    border-radius: 999px;
    border-width: 1.5px;
    border: 1px solid var(--gray80);

    @include t7;
    line-height: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  li:first-child:focus,
  li:first-child:active {
    background-color: var(--blue400);
    color: var(--white);
  }

  .active {
    background-color: var(--blue400);
    color: var(--white);
  }
</style>
