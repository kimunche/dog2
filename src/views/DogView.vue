<template>
  <div class="imgview">
    <div>
      <h1>{{ this.images.length }}</h1>
    </div>
    <ThumbnailView
      :domain="host"
      :imgs="images"
      @show-img="showDog"
    ></ThumbnailView>
    <div v-if="images.length == 0" class="empty">No Images</div>
    <div v-else class="preview">
      <img class="main-img" :src="host + images[imgIndex].url" />
      <span
        class="icon material-symbols-outlined"
        v-bind:class="{ asdoaskdfkkd: images[imgIndex].bookmark }"
        @click="toggleActive"
      >
        favorite
      </span>
    </div>
    <div class="ctrl">
      <button @click="showNextDog()">refresh</button>
      <button @click="addDog()">ADD</button>
      <button @click="deleteDog()">DELETE</button>
    </div>
  </div>
</template>

<script>
import ThumbnailView from "./ThumbnailView.vue";

export default {
  components: { ThumbnailView },
  data() {
    // 여기에 변수를 모아둠!!!
    return {
      host: "https://images.dog.ceo/breeds",
      images: [
        {
          bookmark: false,
          url: "/terrier-patterdale/patterdale-terrier-287612805105275kBT.jpg",
        },
        { bookmark: false, url: "/stbernard/n02109525_13627.jpg" },
        { bookmark: true, url: "/african/n02116738_4382.jpg" },
      ],
      imgIndex: 0,
    };
  },
  mounted() {
    // 얘는 컴포넌트가 처음 그려질때 딱 한번
    const pics = localStorage.getItem("pics");
    console.log("[mounted]", pics);
    this.images = JSON.parse(pics);
  },
  methods: {
    // 변수들을 건드림 => 자동으로 화면이 업데이트 됨!
    showNextDog() {
      console.log("click 했다!!");
      this.imgIndex += 1;
      this.imgIndex = this.imgIndex % this.images.length; // 1 % 10 => 1
    },
    addDog() {
      console.log("사진추가");
      // 1. fetch API - https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
      fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json())
        .then((data) => {
          console.log("[응답]", data);
          const fullUrl = data.message; // "http://///"
          // Object literal 이라고 합니다.
          // FIXME 이렇게 하면 나중에 관리가 함듭니다(단점) -> 자스에서도 CLASS를 많이 씀.
          const pic = {
            bookmark: false,
            url: fullUrl.substring(this.host.length),
          };
          /**
           * Map<String, Object> pic= new Hashmap();
           * pic.put("bookmark", false);
           * pic.put("url", full.....);
           *
           */
          this.images.push(pic);

          // 일단 여기다 코드를 발라넣음!
          localStorage.setItem("pics", JSON.stringify(this.images));
          if (this.imgIndex < 0) {
            this.imgIndex = 0;
          }
        });
    },
    deleteDog() {
      this.images.splice(this.imgIndex, 1);
      if (this.imgIndex == this.images.length) {
        this.imgIndex = this.images.length - 1;
      }
    },
    showDog(index) {
      console.log("보여줄 이미지", index);
      this.imgIndex = index;
    },
    toggleActive() {
      console.log("[toggle]");
      const activeImage = this.images[this.imgIndex];
      console.log(activeImage);
      if (activeImage.bookmark == true) {
        activeImage.bookmark = false;
      } else {
        activeImage.bookmark = true;
      }
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
