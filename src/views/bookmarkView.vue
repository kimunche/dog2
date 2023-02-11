<template>
  <div>
    <h3>북마크</h3>
    <div class="pics">
      <div
        @click="showModal(pic)"
        v-for="pic in pics"
        :key="pic.seq"
        class="dog"
        :style="`background-image: url('https://images.dog.ceo/breeds${pic.url}')`"
      >
        <span
          class="material-symbols-outlined btn-del"
          @click.stop="removeBookmark(pic)"
        >
          cancel
        </span>
      </div>
    </div>
    <!-- <div v-if="modalVisible" class="modal-wrapper">
      <div class="dimmer" @click="closeModal"></div>
      <div class="modal">
        <div class="preview">
          <img :src="`https://images.dog.ceo/breeds${activePic.url}`" />
        </div>
      </div>
    </div> -->
    <transition name="fade">
      <ModalView v-if="modalVisible" @close="closeModal">
        <div class="preview">
          <img :src="`https://images.dog.ceo/breeds${activePic.url}`" /></div
      ></ModalView>
    </transition>
  </div>
</template>

<script>
import ModalView from "@/components/ModalView.vue";

export default {
  components: {
    ModalView,
  },
  data() {
    return {
      // pics: null,
      activePic: null,
      modalVisible: false,
    };
  },
  computed: {
    pics() {
      return this.$store.state.picture.bookmarks;
    },
  },
  mounted() {
    console.log("[지금 컴포넌트가 준비됐음!]");
  },
  methods: {
    closeModal() {
      console.log("close");
      this.modalVisible = false;
    },
    showModal(pic) {
      this.activePic = pic;
      this.modalVisible = true;
    },
    removeBookmark(pic) {
      console.log(pic);
      this.$store.dispatch("picture/toggleActive", pic);
    },
  },
};
</script>

<style lang="scss" scoped>
$fn: cubic-bezier(0.06, 0.61, 0.99, 0.43);
$timing: 0.2s;

.pics {
  display: flex;
  flex-wrap: wrap;
  .dog {
    width: 200px;
    height: 200px;
    background-size: contain;
    margin: 2px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #eee;
    transition: height $timing $fn, width $timing $fn;
    position: relative;
    .btn-del {
      position: absolute;
      right: 8px;
      bottom: 8px;
      text-shadow: 2px 2px 4px #0000004d;
      background-color: white;
      border-radius: 24px;
      box-shadow: 2px 2px 4px #0000004d;
    }
  }
  @media screen and (max-width: 460px) {
    .dog {
      width: 80px;
      height: 80px;
    }
  }
  @media screen and (min-width: 461px) and (max-width: 760px) {
    .dog {
      width: 120px;
      height: 120px;
    }
  }
}

.preview {
  overflow: auto;
  width: 600px;
  height: 400px;
  img {
    width: 100%;
    height: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/*
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // inset: 0;
  .dimmer {
    background-color: rgba(0, 0, 0, 0.3019607843);
    position: absolute;
    inset: 0;
  }
  .modal {
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
*/
</style>
