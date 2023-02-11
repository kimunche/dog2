import api from "../../service/api";

export default {
  namespaced: true,
  state: {
    images: [],
    bookmarks: [],
  },
  getters: {
    value: (state) => {
      return state.value;
    },
  },
  mutations: {
    setPictures(state, pics) {
      // (3) 진짜 state 변경은 여기서!!!
      state.images = pics;
      const bookmarked = pics.filter((pic) => pic.bookmark === true);
      // console.log("[bmk]", bookmarked);
      state.bookmarks = bookmarked;
    },
    pushPicture(state, pic) {
      console.log(state, pic);
      state.images.push(pic);
    },
    deletePicture(state, picSeq) {
      const imgIndex = state.images.findIndex((pic) => pic.seq === picSeq);

      state.images.splice(imgIndex, 1);
      // if (this.imgIndex == this.images.length) {
      //   this.imgIndex = this.images.length - 1;
      // }
    },
    // setBookmark(state, bookmarked) {
    //   state.bookmarks = bookmarked;
    // },
    removeBookmark(state, pic) {
      // pic 을 찾아서 제거함
      console.log(pic);
      const idx = state.bookmarks.findIndex((bmk) => bmk.seq === pic.seq);
      state.bookmarks.splice(idx, 1);
    },
    addBookmark(state, pic) {
      console.log(pic);
      state.bookmarks.push(pic);
    },
  },
  actions: {
    // actions 에서 외부 요청(rest api call)을 처리합니다.
    fetchDogs(ctx) {
      console.log("[VUEX CALL] !!!!! ");
      // (2) 외부로 요청을 날림!!
      return fetch("http://localhost:8080/api/dogs")
        .then((res) => res.json())
        .then((pics) => {
          console.log("[dogs]", pics);
          // this.images.push(...pics); // spread operator라고 함!
          // this.updateValue()
          // (3) 업데이트를 호출함: commit
          ctx.commit("setPictures", pics);
          // const bookmarked = pics.filter((pic) => pic.bookmark === true);
          // console.log("[bmk]", bookmarked);
          // ctx.commit("setBookmark", bookmarked);
          return pics;
        });
    },
    addDog(ctx) {
      return fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json())
        .then((data) => {
          console.log("[응답]", data);
          const fullUrl = data.message; // "http://///"
          const host = "https://images.dog.ceo/breeds";
          const pic = {
            bookmark: false,
            url: fullUrl.substring(host.length),
            origin: "DOG_CEO",
          };
          // this.pushDog(pic);
          return pic;
          // ctx.commit("pushPicture", pic);
        })
        .then((pic) => {
          // keyword: javascript Promise 사용법
          console.log("위에서 반환한 pic을 then에 이어서 넘겨줌!!", pic);
          fetch("http://localhost:8080/api/dog", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pic),
          }).then(() => {
            ctx.commit("pushPicture", pic);
          });
        });
    },
    deleteDog(ctx, seq) {
      console.log("[vuex delete dog]", seq);
      api.dog.deleteDog(seq).then((res) => {
        console.log("[DEL]", res);
        if (res.data === true) {
          // 잘 지웠음
          ctx.commit("deletePicture", seq);
        }
      });
    },
    toggleActive(ctx, pic) {
      console.log("[here]", pic);
      // const pic = pic;
      if (pic.bookmark) {
        api.dog.unBookmark(pic.seq).then((res) => {
          console.log("[DEL]", res);
          if (res.data) {
            pic.bookmark = false;
            ctx.commit("removeBookmark", pic);
          } else {
            alert("북마크 실패다!");
          }
          // bookmark.
        });
      } else {
        api.dog.addBookmark(pic.seq).then((res) => {
          console.log("[DEL]", res);
          if (res.data) {
            pic.bookmark = true;
            ctx.commit("addBookmark", pic);
          } else {
            alert("북마크 실패다!");
          }
        });
      }
    },
  },
};
