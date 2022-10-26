<template>
  <div class="tab-head">
    <div
      class="tab"
      :class="{ active: tab.active }"
      v-for="tab in tabModel"
      :key="tab.id"
    >
      {{ tab.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["tabModel"],
};
</script>

<style lang="scss" scoped>
.tab-head {
  display: flex;
  .tab {
    &.active {
      background-color: yellow;
    }
  }
}
</style>
