<template>
  <div id="room">
    666
  </div>
</template>

<script>
  import * as Hu60Api from "@/api/hu60Api";

  export default {
    name: "Room",
    data() {
      return {
        name: '',
        list: []
      }
    },
    methods: {
      getData(page) {
        var name = this.name;
        Hu60Api.room(name, page).then((response) => {
          if (response.status === 200) {
            this.list = response.data.chatList;
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