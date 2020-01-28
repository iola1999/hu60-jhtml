<template>
  <div id="Login">
    <van-cell-group>
      <van-field
        readonly
        clickable
        label="登录类型"
        :value="loginData.typeName + ' ▼'"
        @click="showLoginTypePicker = true"
      />
      <van-popup v-model="showLoginTypePicker" position="bottom">
        <van-picker
          :columns="loginTypeColumns"
          @cancel="showLoginTypePicker = false"
          @change="onPickChange"
        />
      </van-popup>
      <van-field
        v-model="loginData.name"
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="loginData.pass"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <van-button class="login-btn" type="primary" block @click="login"
      >登录</van-button
    >
  </div>
</template>

<script>
import * as Hu60Api from '@/api/hu60Api';
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        typeName: '用户名',
        type: 1, // onPickConfirm 里设置为index+1
        name: '',
        pass: '',
        go: '登录',
      },
      showLoginTypePicker: false,
      loginTypeColumns: ['用户名', '邮箱', '手机号'],
    };
  },
  methods: {
    onPickChange(_picker, value, index) {
      this.loginData.typeName = value;
      this.loginData.type = index + 1;
    },
    login() {
      Hu60Api.login(this.loginData).then((response) => {
        if (response.data.success) {
          this.$notify({
            type: 'success',
            message: '登录成功',
          });
          this.$emit('login-success');
        } else {
          this.$notify({
            type: 'danger',
            message: '登录失败：' + response.data.notice,
          });
        }
      });
    },
  },
  created() {},
  watch: {},
};
</script>

<style scoped lang="scss">
#Login {
  margin-top: 16px;

  .login-btn {
    margin-top: 4px;
  }
}
</style>
