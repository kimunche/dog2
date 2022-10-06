<template>
  <div class="thumnails">
    <img
      :src="domain + pic.url"
      v-for="pic in imgs"
      :key="pic.url"
      @click="imageClicked(pic)"
    />
  </div>
</template>

<script>
export default {
  props: ["domain", "imgs"],
  methods: {
    imageClicked(path) {
      console.log("[이거 지움]", path);
      const index = this.imgs.findIndex(function (elem) {
        return elem === path;
      }); // 엄청 많이 씀!!
      // this.imgs.splice(index, 1); // 많이 쓰는 메소드
      //this.$emit("delete-img", index);
      this.$emit("show-img", index);
      // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    },
  },
};
</script>

<style scoped>
.thumnails img {
  width: 48px;
  height: auto;
}
</style>
