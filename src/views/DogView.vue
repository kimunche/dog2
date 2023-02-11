<template>
  <div class="imgview">
    <div>
      <h1>{{ this.images.length }}</h1>
    </div>
    <div class="ctrl">
      <button @click="showNextDog()">refresh</button>
      <button @click="addDog()">ADD</button>
      <button @click="deleteDog()">DELETE</button>
      <DropDown @select="filterDogs" :list="['terrier', 'mix', 'hound']" />
    </div>
    <ThumbnailView
      :domain="host"
      :imgs="pics"
      @show-img="showDog"
    ></ThumbnailView>
    <div v-if="pics.length == 0" class="empty">No Images</div>
    <div v-else class="preview">
      <img
        class="main-img"
        :data-seq="pics[imgIndex].seq"
        :src="host + pics[imgIndex].url"
      />
      <span
        class="icon material-symbols-outlined"
        v-bind:class="{ asdoaskdfkkd: pics[imgIndex].bookmark }"
        @click="toggleActive"
      >
        favorite
      </span>
    </div>
  </div>
</template>

<script>
import ThumbnailView from "./ThumbnailView.vue";
import DropDown from "@/components/form/DropDown.vue";

export default {
  components: { ThumbnailView, DropDown },
  data() {
    // 여기에 변수를 모아둠!!!
    return {
      host: "https://images.dog.ceo/breeds",
      imgIndex: 0,
      loading: false,
      pics: [],
    };
  },
  computed: {
    images() {
      return this.$store.state.picture.images;
    },
  },
  mounted() {
    this.pics = this.images;
    // 얘는 컴포넌트가 처음 그려질때 딱 한번
    /*
    let pics = localStorage.getItem("pics");
    if (!pics) {
      pics = "[]";
    }
    console.log("[mounted]", pics);
    this.images = JSON.parse(pics);
    */
    // this.fetchDogs();
  },
  methods: {
    // 변수들을 건드림 => 자동으로 화면이 업데이트 됨!
    showNextDog() {
      console.log("click 했다!!");
      this.imgIndex += 1;
      this.imgIndex = this.imgIndex % this.images.length; // 1 % 10 => 1
    },
    fetchDogs() {
      this.$store.dispatch("picture/fetchDogs");
    },

    addDog() {
      console.log("사진추가");
      this.$store.dispatch("picture/addDog");
    },
    deleteDog() {
      // const seq = this.images[this.imgIndex].seq;
      // ref: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      const { seq } = this.images[this.imgIndex];
      console.log(seq);
      this.$store.dispatch("picture/deleteDog", seq);
    },
    showDog(index) {
      console.log("보여줄 이미지", index);
      this.imgIndex = index;
    },
    toggleActive() {
      console.log("[toggle]");
      const activeImage = this.images[this.imgIndex];
      this.$store.dispatch("picture/toggleActive", activeImage);
    },
    filterDogs(breedType) {
      // console.log("[dropwdown]", evt); // 'ALL'
      if (breedType === "ALL") {
        this.pics = this.images;
      } else {
        const leadingPath = "/" + breedType;
        const dogs = this.images.filter((dog) =>
          dog.url.startsWith(leadingPath)
        );
        console.log("[mix]", dogs);
        this.pics = dogs;
      }
    },
  },
  watch: {
    images(newValue, oldValue) {
      console.log("[detected!!!]", oldValue, newValue);
      this.pics = this.images;
    },
  },
};
</script>

<style lang="scss" scoped>
.imgview {
  .preview {
    position: relative;

    .main-img {
      height: 240px;
    }
    .icon {
      position: absolute;
      left: 8px;
      top: 8px;
      font-variation-settings: "FILL" 1;
      color: #ccc;
      text-shadow: 0px 0px 5px #000000;
    }
    .icon.asdoaskdfkkd {
      color: red;
    }
  }
}
h1 {
  font-size: 3px;
}
</style>
