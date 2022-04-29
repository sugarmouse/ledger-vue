<template>
  <nav>
    <router-link to="/home" class="item" active-class="selected">
      <Icon name="home"/>
      <div class="font">
        记账
      </div>
    </router-link>
    <router-link to="/detail" class="item" active-class="selected">
      <Icon name="detail"/>
      <div class="font">
        明细
      </div>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="details"/>
      <div class="font">
        统计
      </div>
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  display: flex;
  flex-direction: row;
  font-size: 12px;

  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      color: $darker-font;
      width: 32px;
      height: 32px;
    }

    .font {
      color: $basic-font;
    }
  }

  > .item.selected {
    .icon {
      color: $lighter-font;
    }
  }
}
</style>