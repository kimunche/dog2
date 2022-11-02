<template>
  <div class="wrapper">
    <div class="left-menu">
      <div class="user-info">
        <span class="material-symbols-outlined"> account_circle </span>
        <h5>jane@gmail.com</h5>
      </div>
      <div class="menu-list">
        <router-link class="menu" to="/" tag="div"
          ><span class="material-symbols-outlined"> apps </span
          ><span class="text">HOME</span></router-link
        >
        <router-link class="menu" to="/dogs" tag="div"
          ><span class="material-symbols-outlined"> pets </span
          ><span class="text">Dog</span></router-link
        >
        <router-link class="menu" to="/bookmark" tag="div">
          <span class="material-symbols-outlined"> bookmarks </span
          ><span class="text">Bookmark</span>
        </router-link>
      </div>
    </div>
    <div class="main-area">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
  .left-menu {
    flex-grow: 0;
    width: 200px;
    transition: width 0.2s cubic-bezier(0.06, 0.61, 0.99, 0.43); // width , 2초동안
    background-color: aquamarine;
    .user-info {
      height: 80px;
      background-color: #81ccfa;
      display: flex;
      align-items: center;
      padding: 0 12px;
      transition: height 0.2s cubic-bezier(0.06, 0.61, 0.99, 0.43);
      .material-symbols-outlined {
        font-size: 18px;
      }
      h5 {
        padding-left: 12px;
      }
    }
    .menu-list {
      .menu {
        display: flex;
        padding: 8px 12px;
        align-items: center;
        cursor: pointer;
        .material-symbols-outlined {
          font-size: 18px;
        }
        .text {
          padding-left: 12px;
          font-size: 14px;
        }
        // margin: 4px 10px;
        // background-color: cadetblue;
      }
      .menu:hover {
        background-color: aqua;
      }
    }
  }
  .main-area {
    flex-grow: 1;
  }
  @media screen and (max-width: 460px) {
    .left-menu {
      width: 44px;
      .menu-list {
        .menu {
          .text {
            display: none;
          }
        }
      }
      .user-info {
        h5 {
          display: none;
        }
        height: 44px;
      }
    }
  }
}
</style>
