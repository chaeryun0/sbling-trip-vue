<template>
  <div class="stay-type-menu">
    <ul role="tablist" class="tab-list">
      <StayTypeItem
        v-for="type in orderedStayTypes"
        :key="type"
        :type="StayType[type]"
        :label="labels[type]"
        :active="activeTab === StayType[type]"
        @handle-tab-click="handleTabClick"
      />
    </ul>
  </div>
</template>

<script setup>
import StayTypeItem from './StayTypeItem.vue';
import { StayType, labels }  from '@utils/stayTypes'

/** 
 * 컴포넌트에 사용될 숙소 타입 배열 정의
 * @constant {Array} orderedStayTypes
 */
const orderedStayTypes = ['Hotel', 'Motel', 'Pension', 'GuestHouse'];

/**
 * StayTypeMenu 컴포넌트 Props 정의
 * @property {Number} activeTab - 현재 활성화된 탭의 타입 ID
 */
const props = defineProps({
  activeTab: {
    type: Number,
    required: true,
  },
});

/**
 * handle-tab-click 이벤트를 부모 컴포넌트로 emit
 */
const emit = defineEmits(['handle-tab-click']);

/**
 * 탭 클릭 시 호출되는 함수
 * @param {Number} type - 클릭된 탭의 타입 ID
 */
const handleTabClick = (type) => {
  emit('handle-tab-click', type);
};
</script>

<style scoped lang="scss">

.stay-type-menu {
  display: flex;
  width: 100%;
  padding-bottom: 12px;

  .tab-list {
    display: flex;
    width: 100%;
    overscroll-behavior: none;
    gap: 6px 8px;
    flex-wrap: nowrap;
  }
}
</style>
