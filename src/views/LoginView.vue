<template>
  <div id="loginForm">
    <h2>로그인</h2>
    <img class="loginPic" src="/image/pengsu.jpg" />
    <!-- <img class="loginPic" src="@/assets/logo.png" /> -->
    <div v-if="error" class="error">로그인 실패</div>
    <form @submit.prevent="doLogin">
      <div>
        <input type="text" placeholder="ID" v-model="form.userId" />
      </div>
      <div>
        <input
          type="password"
          name="loginPw"
          id="loginPw"
          v-model="form.pass"
        />
      </div>
      <button type="submit" @click="doClick">Login</button>
    </form>
    <!-- <div v-if="user" class="myinfo">
      <div><button @click="loadMyInfo">내정보</button></div>
    </div> -->
  </div>
</template>

<script>
import api from "@/service/api";
// import axios from "axios";

export default {
  data() {
    return {
      form: {
        userId: "",
        pass: "",
      },
      error: null,
      // user: null,
    };
  },
  methods: {
    doClick() {
      console.log("[click]");
    },
    doLogin() {
      // submit 이벤트의 기본 작동 방식을 하지 마세요.
      // e.preventDefault();
      console.log("[login]");
      // this.$store.dispatch('user/doLogin',this.form);
      api.user
        .login(this.form)
        .then((res) => {
          this.$store.commit("user/setUser", res.data);
          // this.$router.replace("/");
          this.$router.replace({ name: "home" });
          // this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err);
          this.error = err;
          // alert("로그인 실패");
        });
      /*
      axios
        .post(
          "http://localhost:8080/api/user/login",
          {
            userId: this.form.userId,
            pass: this.form.pass,
          },
          {
            withCredentials: true, // 쿠키라고 생각하시면 됨!
          }
        )
        .then((res) => {
          console.log(res.data);

          this.$store.commit("user/setUser", res.data);
        });
        */
    },
    // loadMyInfo() {
    //   console.log("[내 정보 읽어오기]");
    //   axios
    //     .get("http://localhost:8080/api/user/myInfo", { withCredentials: true })
    //     .then((res) => {
    //       console.log("[my info]", res.data);
    //     });
    // },
  },
  /**
   *  데이터가 변경될때마다 호출함.
   * 변경을 잡아내고 싶은 프로퍼티(data() { ...} )를 써줍니다.
   */
  watch: {
    "form.userId"() {
      this.error = null;
    },
    "form.pass"() {
      this.error = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  background-color: crimson;
  color: white;
}
</style>
