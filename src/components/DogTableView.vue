<template>
  <div>
    <h3>강아지 목록</h3>
    <input type="text" v-model="userForm.userName" />
    <input type="text" v-model="userForm.userEmail" />
    <input type="text" v-model="date.year" />
    <table class="dog-list">
      <tr v-for="dog in dogs" :key="dog.seq">
        <td>{{ dog.seq }}</td>
        <td>
          <img :src="`https://images.dog.ceo/breeds${dog.url}`" class="pic" />
        </td>
        <td>
          <button class="del" @click="deleteDog(dog)">삭제</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import api from "../service/api";
export default {
  data() {
    return {
      userForm: {
        userName: "풍산개",
        userEmail: "dog@dog.com",
      },
      date: {
        year: 2022,
        month: 10,
        date: 22,
      },
      // dogType: "풍산개",
      dogs: [],
    };
  },
  mounted() {
    const now = new Date();
    this.date.year = now.getFullYear(); // 2022
    this.date.month = now.getMonth() + 1; // 만든 애가 이렇게 했음
    this.date.date = now.getDate(); //

    api.dog.loadBookmark().then((res) => {
      console.log("[???]", res);
      this.dogs = res.data;
    });
  },
  methods: {
    deleteDog(bookmark) {
      console.log("여기서 북마크 지움!", bookmark.seq);
      api.dog.unBookmark(bookmark.seq).then((res) => {
        console.log("[res]", res);
        if (res.data) {
          //
          const idx = this.dogs.findIndex((dog) => dog.seq === bookmark.seq);
          console.log("[pos]", idx);
          this.dogs.splice(idx, 1);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dog-list {
  .pic {
    width: 28px;
    height: auto;
  }
  .del {
    outline: none;
    border: 1px solid #ccc;
    background-color: inherit;
    font-size: 10px;
    cursor: pointer;
  }
}
</style>
