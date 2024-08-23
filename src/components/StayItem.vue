<template>
  <li class="stay-item-comp">
    <div class="left-content">
      <img :src="props.stay.roomImageUrlList[0]" :alt="`${props.stay.stayName} 이미지`" />
      <div class="wish-btn">
      </div>
    </div>
    <div class="right-content">
      <div class="top">
        <h3>{{ props.stay.stayName }}</h3>
        <span class="address">{{ props.stay.address }}</span>
        <div class="star-rating-wrapper">
          <img class="star-icon" src="/public/assets/icon/icon-star.svg" alt="별점 아이콘">
          <strong>{{ props.stay.reviewScoreAverage }}</strong>
          <span>{{ `(${props.stay.reviewCount})` }}</span>
        </div>
      </div>
      <div class="bottom">
        <strong class="price">{{ `${props.stay.minimumRoomPrice}원` }}</strong>
        <span>/ 1박</span>
      </div>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  stay: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

.stay-item-comp {
  position: relative;
  display: flex;
  width: 50%;
  margin-bottom: 50px;

  .stay-item-inner {
    display: flex;
    height: 160px;
    overflow: hidden;
  }

  .left-content {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 40px;

    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 260px;
      height: 55px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      z-index: 1;
      background: linear-gradient(0deg, transparent, rgba(0, 0, 0, 0.3));
    }

    img {
      width: 260px;
      height: 160px;
      border-radius: 12px;
      border-radius: 8px;
    }

    .wish-btn {
      position: absolute;
      top: 8px;
      right: 14px;
      z-index: 2;
      width: 30px;
      height: 30px;
    }
  }

  .right-content {
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
}
</style>
