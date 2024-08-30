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
/**
 * StayTypeItem 컴포넌트 Props 정의
 * @property {Number} type - 숙소 타입 ID (ex: Hotel, Motel)
 * @property {String} label - 숙소 타입을 나타내는 라벨
 * @property {Boolean} active - 해당 탭이 활성화된 상태인지 여부
 */
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

/**
 * handle-tab-click 이벤트를 부모 컴포넌트로 emit
 */
const emit = defineEmits(['handle-tab-click']);

/**
 * handle-tab-click 이벤트를 부모 컴포넌트로 emit
 */
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
