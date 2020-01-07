<template>
  <div id="chat">
    <van-list @load="getData()">
      <van-cell
          v-for="chat in list"
          :key="chat.id"
          size="large"
          :value="chat.name"
          is-link
          to="chat/room"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
  import * as Hu60Api from "@/api/hu60Api";

  export default {
    name: "Chat",
    data() {
      return {
        list: []
      }
    },
    methods: {
      getData(page) {
        Hu60Api.chatList(page).then((response) => {
          if (response.status === 200) {
            this.list = response.data.chatRomList;
          } else {
            this.$toast("加载失败");
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>