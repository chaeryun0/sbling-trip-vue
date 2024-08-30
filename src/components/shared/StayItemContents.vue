<template>
  <div class="stay-item-contents-comp">
    <div class="top">
      <h3>{{ stay.stayName }}</h3>
      <span class="address">{{ stay.formattedAddress }}</span>
      <div class="star-rating-wrapper">
        <img class="star-icon" src="/public/assets/icon/icon-star.svg" alt="별점 아이콘">
        <strong>{{ stay.reviewScoreAverage }}</strong>
        <span>{{ `(${stay.reviewCount})` }}</span>
      </div>
    </div>
    <div class="bottom">
      <strong class="price">{{ `${delimiter(stay.minimumRoomPrice)}원` }}</strong>
      <span>/ 1박</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import delimiter from '@utils/delimiter';

const props = defineProps({
  stay: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

.stay-item-contents-comp {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  gap: 15px;
  padding: 10px 5px;
  @include truncate;

  .top {
    width: calc(100% - 20%);
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }

  h3 {
    margin-bottom: 4px;
    font-weight: 700;
    @include t5;
    color: var(--gray800);
    @include truncate;
  }

  .address {
    margin-bottom: 4px;
    @include t8;
    line-height: normal;
    letter-spacing: -0.6px;
    font-weight: 600;
    color: var(--gray600);
  }

  .star-rating-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 3px;

    .star-icon {
      width: 20px;
      height: 20px;
    }

    strong,
    span {
      font-weight: 700;
      color: var(--gray800);
      @include t7;
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    height: 100%;

    .price {
      @include t5;
      line-height: normal;
      letter-spacing: 0px;
      font-weight: 700;
      color: var(--gray800);
    }

    span {
      @include t7;
      font-weight: 500;
      padding-left: 8px;
      color: var(--gray700);
    }
  }
}
</style>
