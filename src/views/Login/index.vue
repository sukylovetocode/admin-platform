<template>
    <el-row>
        <el-col :lg="12" :sm="24" class="login_left">
            <div class="login_content">
                <h3 class="login_logo">
                    <i class="el-icon-eleme"></i>{{ $t('login.logo') }}
                </h3>
                <h2>{{ $t('login.title') }}</h2>
                <p>{{ $t('login.sub') }}</p>
                <el-form ref="loginForm" :model="loginForm" :rules="rules">
                    <el-form-item prop="user">
                        <label class="login_label">你的用户名</label>
                        <el-input
                            v-model="loginForm.user"
                            class="login_input"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <label class="login_label">你的密码</label>
                        <el-input
                            v-model="loginForm.pwd"
                            class="login_input"
                            type="password"
                        ></el-input>
                    </el-form-item>
                    <el-button
                        type="primary"
                        class="login_submit"
                        @click="handleLogin"
                        >登录</el-button
                    >
                </el-form>
                <p>
                    没有账号<el-button
                        type="text"
                        class="login_register"
                        @click="handleRegister"
                        >注册</el-button
                    >
                </p>
                <el-button type="text">第三方登录</el-button>
            </div>
        </el-col>
        <el-col :lg="12" :sm="24" class="login_right"
            ><div class="login_bg">
                <img
                    class="login_pic"
                    src="@/assets/login-right.png"
                    alt=""
                /></div
        ></el-col>
    </el-row>
</template>

<script>
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

export default {
    data() {
        this.rules = {
            user: [{ required: true, message: '用户名不能为空' }],
            pwd: [{ required: true, message: '密码不能为空' }],
        };
        return {
            loginForm: {
                pwd: '',
                user: '',
            },
        };
    },
    methods: {
        loginSuccess() {
            var that = this;
            gsap.fromTo(
                '.login_right',
                {
                    width: '50%',
                    opacity: '100%',
                },
                {
                    width: 0,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'expo.out',
                }
            );
            gsap.fromTo(
                '.login_left',
                {
                    width: '50%',
                    opacity: '100%',
                },
                {
                    width: '100%',
                    opacity: 0,
                    duration: 1.5,
                    onComplete: function() {
                        that.$router.push(
                            '/features/lottie' || this.$route.params.redirect
                        );
                    },
                    ease: 'expo.out',
                }
            );
        },
        handleLogin() {
            // 自定义校验
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    // 假如要保持登录就需要保存cookies
                    this.$store
                        .dispatch('user/login', this.loginForm)
                        .then((res) => {
                            if (res.status === 200) {
                                this.loginSuccess();
                            }
                        });
                } else {
                    this.$message('你的登录框没有填写完整');
                }
            });
        },
        handleRegister() {
            this.$router.push('/register');
        },
    },
};
</script>

<style lang="css">
.login_left {
    padding: 20px;
    line-height: 30px;
    height: 100vh;
    position: relative;
}
.login_content {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    width: 50%;
}
.login_logo {
    color: #409eff;
    font-size: 30px;
    margin-bottom: 10px;
}
.login_logo i {
    padding-right: 5px;
}
.login_label {
    font-size: 14px;
    color: #909399;
}
.login_input {
    width: 100%;
    display: block;
}
.login_keep {
    display: block;
    margin: 10px 0;
}
.login_submit {
    width: 100%;
}
.login_register {
    margin: 5px;
}
.login_bg {
    background: #409eff;
    height: 100vh;
    position: relative;
}
.login_pic {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
}
@media screen and (max-width: 400px) {
    .login_right {
        display: none;
    }
    .login_content {
        width: 80%;
    }
}
</style>
