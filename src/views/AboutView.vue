<template>
  <div>
    <TabNav :tabModel="tabModel" />
    <div class="tab-body" v-if="!activeCustomer">
      <h3>리스트 목록 출력</h3>
      <div class="customers">
        <div
          class="customer"
          v-for="customer in customers"
          :key="customer.seq"
          @click="setActiveCustomer(customer)"
        >
          <div class="name">{{ customer.name }}</div>
        </div>
      </div>
    </div>
    <div class="tab-body" v-else>
      <h3>사용자 상세 탭</h3>
    </div>
  </div>
</template>

<script>
import TabNav from "@/components/tab/TabNav.vue";

// class TabModel {
//   constructor(models){

//   }
//   setActiveTab(index)
// }
export default {
  components: { TabNav },
  data() {
    return {
      tabModel: null,
      customers: [{ name: "a" }, { name: "b" }],
      activeCustomer: null,
    };
  },
  mounted() {
    this.tabModel = [
      {
        id: "list",
        text: "1번탭",
        active: true,
      },
      {
        id: "detail",
        text: "상세탭",
        active: false,
      },
    ];
  },
  methods: {
    setActiveCustomer(cust) {
      this.activeCustomer = cust;
      this.tabModel[0].active = false;
      this.tabModel[1].active = true;
    },
    showList() {
      this.activeCustomer = null;
      this.tabModel[0].active = true;
      this.tabModel[1].active = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
