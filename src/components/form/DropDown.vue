<template>
  <div class="dropdown">
    <div class="box" @click="showDropdown">
      <span class="current">{{ currentBreed }}</span
      ><span class="material-symbols-outlined" v-if="visible">
        arrow_drop_up
      </span>
      <span class="material-symbols-outlined" v-else> arrow_drop_down </span>
    </div>
    <div class="list" v-if="visible">
      <div class="elem" @click="selectCurrent('ALL')">전체</div>
      <div
        class="elem"
        v-for="breed in breeds"
        :key="breed"
        :class="{ active: breed === currentBreed }"
        @click="selectCurrent(breed)"
      >
        {{ breed }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breeds: ["terrier", "mix", "hound"],
      currentBreed: "전체",
      visible: false,
    };
  },
  methods: {
    showDropdown() {
      this.visible = true;
    },
    hideDropdown() {
      this.visible = false;
    },
    selectCurrent(breed) {
      this.currentBreed = breed;
      this.hideDropdown();
      if (this.currentBreed == "ALL") {
        this.currentBreed = "전체";
      } else {
        this.currentBreed = breed;
      }
      this.$emit("select", breed);
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  .box {
    display: inline-flex;
    align-items: center;
    .current {
      padding: 4px;
    }
  }
  .list {
    border: 1px solid;

    display: inline-flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 2px 2px 6px #0000004d;
    z-index: 10000000;
    .elem {
      padding: 6px;
      cursor: pointer;
      &.active {
        background-color: yellow;
      }
    }
  }
}
</style>
