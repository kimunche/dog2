<template>
  <div class="modal-wrapper">
    <div class="dimmer" @click="closeModal"></div>
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      console.log("close");
      // this.modalVisible = false;
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 5s ease;
}
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
    cursor: pointer;
  }
  .modal {
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
