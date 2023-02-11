<template>
  <div class="home">
    <div class="flexible">
      <div class="one box"><DogTableView /></div>
      <div class="two box">2</div>
      <div class="three box">3</div>
      <div class="four box">4</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import DogTableView from "@/components/DogTableView.vue";
export default {
  name: "HomeView",
  components: {
    // HelloWorld,
    DogTableView,
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
}
.flexible {
  height: 100%;
  background-color: beige;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: repeat(2, 1fr);
  .one {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
  .two {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    background-color: brown;
  }
  .three {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    background-color: darkgreen;
  }
  .four {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
    background-color: aqua;
  }
}
@media screen and (max-width: 460px) {
  .flexible {
    display: flex;
    flex-direction: column;
    .box {
      flex: 1 1 25%;
    }
  }
}
</style>
