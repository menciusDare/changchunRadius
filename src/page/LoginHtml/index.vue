<template>
  <div class="loginMain">
    <div class="rowFlex alignCenter">
<!--      <div class="logo"></div>-->
      <div class="logoName"> {{projectName}} </div>
    </div>
    <div class="logoPop">
      <div class="logoPopMain">
        <div class="logoPopText">用户登录</div>
        <div class="logoForm">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item
              prop="name"
              :rules="[
                { required: true, message: '请输入用户名/手机号'}
              ]">
              <i class="el-icon-user"></i>
              <el-input
                v-model="form.name"
                autocomplete="off"
                placeholder="用户名/手机号"></el-input>
            </el-form-item>
            <el-form-item
                prop="password"
                :rules="[
                { required: true, message: '请输入密码'}
              ]">
              <i class="el-icon-lock"></i>
              <el-input
                  v-model="form.password"
                  autocomplete="off"
                  placeholder="密码"
                  show-password></el-input>
            </el-form-item>
<!--            <div class="yanzheng">-->
<!--              点击按钮进行验证-->
<!--            </div>-->
            <div class="anniu rowSpace">
              <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="welecomText">
      <div>欢迎来到</div>
      <div> {{projectName}} </div>
    </div>
  </div>
</template>

<script>
import Config from '@/common/config'
import md5 from 'js-md5'
import C from '@/common/constants'
import {MessageFun} from '../../common/message'
import Storage from '../../common/storage'
import auth from '../../common/api/auth'
let timer = null
export default {
  name: 'index',
  data () {
    return {
      projectName: Config.PROJECT_NAME,
      form: {
        name: '',
        password: ''
      },
      dialogVisible: false,
      forgetPasswordRule: {
        pass: '',
        code: '',
        phone: '',
        userId: ''
      },
      isSend: false,
      waitingTime: 60,
      isWaiting: false,
      isUser: false,
      user: {}
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const { name, password } = this.form
          console.log(name, password, md5(password))
          this.$store
            .dispatch('SIGN_IN', {
              username: name,
              password: md5(md5(password)),
              grant_type: 'password',
              scope: 'read'
            })
            .then(resp => {
              // if (resp.code !== C.OK) return
              if (resp.code == C.OK) {
                MessageFun('success', '登录成功')
                console.log('登陆', Storage.get('KEY_SESSION'), this.$route.query.redirect)
                const path = this.$route.query.redirect
                  ? this.$route.query.redirect
                  : '/'
                this.$router.push(path)
              } else if (resp.code !== C.OK) {
                MessageFun('warning', resp.msg)
              }
              // this.$router.push({ path });
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/common.css";
.loginMain{
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/loginBgNew.jpg") no-repeat center;
  background-size: cover;
  padding: 5%;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 3%;
  .logo{
    width: 100px;
    height: 100px;
    background: url("../../assets/img/login/logo.png") no-repeat center;
    background-size: 100%;
  }
  .logoName{
    margin-left: 10px;
    font-size: 48px;
    font-weight: bold;
    color: #fff;
  }
  .logoPop{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .logoPopMain{
    width: 35%;
    height: 95%;
    background: rgba(245,245,245,.4);
    border-radius: 5px;
    padding: 3% 5%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .yanzheng{
      width: 100%;
      line-height: 50px;
      height: 50px;
      border: 1px solid #fff;
      font-size: 20px;
      text-align: center;
      background: rgba(0,0,0,.3);
      color: #fff;
    }
    .logoForm{
      .el-form-item__content{
        display: flex;
        align-items: center;
        margin-left: 0px !important;
        border: 1px solid #fff;
        font-size: 20px;
        background: rgba(0,0,0,.3);
      }
      .el-icon-user, .el-icon-lock{
        padding: 0 10px;
        color: #fff;
      }
      .el-input__inner{
        background: none;
        border: none;
        color: #fff;
        line-height: 50px;
        height: 50px;
        font-size: 20px;
      }
      .el-input__inner::placeholder{
        color: #fff;
        font-size: 20px;
      }
    }
    .logoPopText{
      text-align: center;
      font-size: 36px;
      color: #fff;
      font-weight: bold;
      //margin-bottom: 28%;
    }
    .anniu{
      width: 100%;
      margin-top: 30px;
      .el-button{
        width: 48%;
      }
    }
    .wangji{
      color: #fff;
      font-size: 18px;
      text-align: right;
      margin-top: 5%;
      font-weight: bold;
    }
  }
  .welecomText{
    position: absolute;
    left: 5%;
    bottom: 15%;
    font-size: 36px;
    font-weight: bold;
    color: #fff;
  }
}
@media screen and (max-width: 1500px) {
  .logoPopText{
    margin-bottom: 5%;
  }
}
.codeButton{
  width: 150px;
}
.codeInput{
  width: calc(100% - 300px);
}
</style>
