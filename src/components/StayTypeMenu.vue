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

const orderedStayTypes = ['Hotel', 'Motel', 'Pension', 'GuestHouse'];

const props = defineProps({
  activeTab: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['handle-tab-click']);

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
