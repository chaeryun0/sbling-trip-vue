<template>
  <header>
    <nav>
      <h1>
        <RouterLink
          to="/"
          aria-label="Sbling Trip 홈페이지"
          role="link"
          @click="scrollToTop"
        >
          <img
            src="/assets/logo.png"
            alt="Sbling Trip"
            class="logo"
          />
        </RouterLink>
      </h1>
      <div class="nav-item">
        <div v-if="isLoginOrSignupPage" class="user">
          <button
            type="button"
            aria-label="로그아웃 버튼"
            class="user-log-btn"
          >
            로그아웃
          </button>
        </div>
        <div v-else class="user">
          <RouterLink to="/login">
            <button
              type="button"
              aria-label="로그인/회원가입 버튼"
              class="user-log-btn"
            >
              로그인 / 회원가입
            </button>
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();

const isLoginOrSignupPage = computed(() =>
  ['/login', '/signup'].includes(route.path)
);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped lang="scss">
@import 'src/styles/mixins';

header {
  position: sticky;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 10;
  background-color: var(--white);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);

  nav {
    margin: 0px auto;
    width: calc(100% - 10%);
    display: flex;
    align-items: center;
    height: 80px;
    padding: 10px 0;

    .logo {
      vertical-align: middle;
      width: 120px;
    }
  }

  .nav-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
    gap: 8px;
    height: 100%;

    .user {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-log-btn {
      border-radius: 8px;
      color: var(--white);
      background-color: var(--blue400);
      @include StyledButton(small, null, null);

      &:hover {
        background-color: var(--blue500);
      }
    }
  }
}
</style>
