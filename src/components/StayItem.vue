<template>
  <li class="stay-item-comp">
    <ListRow :tagType="'div'" :class="'stay-item-inner'">
      <template #leftContent>
        <div class="left-content">
          <img :src="props.stay.roomImageUrlList[0]" :alt="`${props.stay.stayName} 이미지`" />
          <div class="wish-btn">
            <IconButton :label="props.stay.wishState ? '찜 취소' : '찜하기'"
              :iconSrc="props.stay.wishState ? '/public/assets/icon/icon-wish-fill.svg' : '/public/assets/icon/icon-wish.svg'"
              @click="toggleWish" />
          </div>
        </div>
      </template>
      <template #rightContent>
        <div class="right-content">
          <StayItemContents :stay="props.stay" />
        </div>
      </template>
    </ListRow>
  </li>
</template>

<script setup>
import ListRow from './shared/ListRow.vue'
import IconButton from './shared/IconButton.vue'
import StayItemContents from './shared/StayItemContents.vue';

/**
 * StayItem 컴포넌트 Props 정의
 * @property {Object} stay - 숙소 정보 객체
 */
const props = defineProps({
  stay: {
    type: Object,
    required: true,
  },
})

/** 
 * 찜하기 상태를 토글하는 함수
 */
const toggleWish = () => {
  props.stay.wishState = !props.stay.wishState
}
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
  }
}
</style>
