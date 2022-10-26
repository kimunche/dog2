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
      <img
        class="main-img"
        :data-seq="images[imgIndex].seq"
        :src="host + images[imgIndex].url"
      />
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
import api from "../service/api";

export default {
  components: { ThumbnailView },
  data() {
    // 여기에 변수를 모아둠!!!
    return {
      host: "https://images.dog.ceo/breeds",
      // images: [
      //   {
      //     bookmark: false,
      //     url: "/breeds/terrier-patterdale/patterdale-terrier-287612805105275kBT.jpg",
      //   },
      //   { bookmark: false, url: "/stbernard/n02109525_13627.jpg" },
      //   { bookmark: true, url: "/african/n02116738_4382.jpg" },
      // ],
      images: [],
      imgIndex: 0,
    };
  },
  mounted() {
    // 얘는 컴포넌트가 처음 그려질때 딱 한번
    /*
    let pics = localStorage.getItem("pics");
    if (!pics) {
      pics = "[]";
    }
    console.log("[mounted]", pics);
    this.images = JSON.parse(pics);
    */
    this.fetchDogs();
  },
  methods: {
    // 변수들을 건드림 => 자동으로 화면이 업데이트 됨!
    showNextDog() {
      console.log("click 했다!!");
      this.imgIndex += 1;
      this.imgIndex = this.imgIndex % this.images.length; // 1 % 10 => 1
    },
    fetchDogs() {
      // api.dog.list().then((dogs) => {
      //   console.log(dogs);
      // });
      // backend 에서 개사진을 로드함
      fetch("http://localhost:8080/api/dogs")
        .then((res) => res.json())
        .then((pics) => {
          console.log("[dogs]", pics);
          // FIXME bookmark 속성이 없음!(서버에서 넣어줘야 함!)
          // FIXME 서버쪽에서 수정하면 아래 루프는 없애도 됩니다!
          // pics.forEach((pic) => {
          //   pic.bookmark = false;
          // });
          this.images.push(...pics); // spread operator라고 함!
          // pics.forEach((pic) => {
          //   this.image.push(pic);
          // });
        });
    },
    pushDog(pic) {
      fetch("http://localhost:8080/api/dog", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pic),
      });
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
            origin: "DOG_CEO",
          };
          this.pushDog(pic);
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
      // const seq = this.images[this.imgIndex].seq;
      // ref: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      const { seq } = this.images[this.imgIndex];
      console.log(seq);
      api.dog.deleteDog(seq).then((res) => {
        console.log("[DEL]", res);
        if (res.data === true) {
          // 잘 지웠음
          this.images.splice(this.imgIndex, 1);
          if (this.imgIndex == this.images.length) {
            this.imgIndex = this.images.length - 1;
          }
        } else {
          // 뭔가 잘못됐음!
          alert("못 지웠다!");
        }
      });
    },
    showDog(index) {
      console.log("보여줄 이미지", index);
      this.imgIndex = index;
    },
    toggleActive() {
      console.log("[toggle]");
      const activeImage = this.images[this.imgIndex];
      console.log(activeImage);
      if (activeImage.bookmark) {
        api.dog.unBookmark(activeImage.seq).then((res) => {
          console.log("[DEL]", res);
          if (res.data) {
            activeImage.bookmark = false;
          } else {
            alert("북마크 실패다!");
          }
        });
      } else {
        api.dog.addBookmark(activeImage.seq).then((res) => {
          console.log("[DEL]", res);
          if (res.data) {
            activeImage.bookmark = true;
          } else {
            alert("북마크 실패다!");
          }
        });
      }
      /*
      if (activeImage.bookmark == true) {
        activeImage.bookmark = false;
      } else {
        activeImage.bookmark = true;
      }
      */
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
