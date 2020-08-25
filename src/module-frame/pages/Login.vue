<template>
    <el-row type="flex" align="middle" justify="center" style="height: 100%">
        <el-row>
            <router-link to="/">
                <el-image :src="iwant" class="logo"/>
            </router-link>
            <div style="width: 980px;height: auto;margin: 100px auto;">
                <el-col :offset="2" :span="8">
                    <el-image :src="src_teamwork" style="height: 400px;width: 400px; "/>
                </el-col>
                <el-col :offset="4" :span="8" style="">
                    <el-form
                            :model="loginData"
                            :rules="rules"
                            ref="loginForm"
                            class="iw-drawform"
                    >
                        <el-form-item label="账号登录" prop="username">
                            <el-button type="text" class="pull-right" @click="loginByMsgHandler">
                                >>>手机动态码登录
                                <i class="el-icon-mobile-phone"/>
                            </el-button>
                            <el-input
                                    prefix-icon="icon-user"
                                    v-model="loginData.username"
                                    autocomplete="off"
                                    placeholder="用户名"
                            />
                        </el-form-item>
                        <el-form-item prop="password" required>
                            <el-input
                                    prefix-icon="el-icon-key"
                                    v-model="loginData.password"
                                    type="password"
                                    autocomplete="off"
                                    placeholder="密码"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    :loading="loading"
                                    size="medium"
                                    type="primary"
                                    @click="doLogin('loginForm')">
                                <span v-if="!loading">登 录</span>
                                <span v-else>登 录 中...</span>
                            </el-button>
                            <el-button size="medium" @click="resetForm('loginForm')">重置</el-button>
                        </el-form-item>
                        <el-form-item>
            <span class="iw-label">还没有账号？
            <router-link to="/register">
              <el-button type="text">
              点此注册
              <i class="icon-adduser"></i>
            </el-button>
            </router-link>
            </span>
                        </el-form-item>
                    </el-form>
                </el-col>
            </div>
        </el-row>
    </el-row>


</template>

<script>
    import cookie from "js-cookie"

    export default {
        data() {
            let validateUsername = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"))
                } else {
                    callback()
                }
            };

            let validatePassword = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"))
                } else {
                    callback()
                }
            };
            return {
                src_teamwork: require("@/assets/img/login.svg"),
                iwant: require("@/assets/img/iwant.png"),
                loading: false,
                loginData: {
                    username: "",
                    password: "",
                },
                rules: {
                    username: [
                        {validator: validateUsername, trigger: "blur"}
                    ],
                    password: [
                        {validator: validatePassword, trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            loginByMsgHandler() {
                this.$message.info("功能待开发")
            },
            doLogin(form) {
                let that = this;
                const user = {
                    username: this.loginData.username,
                    password: this.$md5(this.loginData.password)
                };
                that.$refs[form].validate((valid) => {
                    if (valid) {
                        that.loading = true;
                        that.$store.dispatch("Login", user).then((res) => {
                            if (res.success) {
                                that.loading = false;
                                that.$router.push({path: "/"});
                            }
                        }).catch(() => {
                            that.loading = false
                        })
                    } else {
                        console.log("error submit");
                        return false
                    }
                })
            },
            resetForm(form) {
                this.$refs[form].resetFields()
            },
            getCookie() {
                const username = cookie.get("username");
                this.loginData.username = undefined ? this.loginData.username : username;
            }
        }
    }
</script>

<style scoped>
    .iw-drawform {
        margin: 20px 30px;
    }

    .iw-label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>

