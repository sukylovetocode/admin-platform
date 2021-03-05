<template>
    <el-row>
        <el-col :lg="12" :sm="24" class="register_left">
            <div class="register_content">
                <h3 class="register_logo"><i class="el-icon-eleme"></i>商标</h3>
                <h2>现在注册</h2>
                <p>输入你的信息以注册新账号</p>
                <el-form
                    :model="registerForm"
                    :rules="rules"
                    ref="registerForm"
                >
                    <el-form-item prop="mail">
                        <label class="register_label">你的邮箱</label>
                        <el-input
                            v-model="registerForm.mail"
                            class="register_input"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="user">
                        <label class="register_label">你的用户名</label>
                        <el-input
                            v-model="registerForm.user"
                            class="register_input"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <label class="register_label">你的密码</label>
                        <el-input
                            v-model="registerForm.pwd"
                            class="register_input"
                            type="password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmpwd">
                        <label class="register_label">确认密码</label>
                        <el-input
                            v-model="registerForm.confirmpwd"
                            class="register_input"
                            type="password"
                        ></el-input>
                    </el-form-item>

                    <el-button
                        type="primary"
                        class="register_submit"
                        @click="handleRegister"
                        >注册</el-button
                    >
                </el-form>
                <p>
                    已有账号<el-button
                        type="text"
                        class="register_register"
                        @click="handleLogin"
                        >登录</el-button
                    >
                </p>
            </div>
        </el-col>
        <el-col :lg="12" :sm="24" class="register_right"
            ><div class="register_bg">
                <img
                    class="register_pic"
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
        this.samePwd = (rule, value, callback) => {
            if (this.registerForm.pwd !== this.registerForm.confirmpwd) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        this.rules = {
            user: [{ required: true, message: '用户名不能为空' }],
            pwd: [{ required: true, message: '密码不能为空' }],
            confirmpwd: [
                { required: true, message: '确认密码不能为空' },
                { validator: this.samePwd, trigger: 'blur' },
            ],
            mail: [
                { required: true, message: '邮箱不能为空' },
                {
                    /* eslint-disable-next-line no-useless-escape */
                    pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                    message: '你的邮箱格式不正确',
                },
            ],
        };
        return {
            registerForm: {
                pwd: '',
                mail: '',
                user: '',
                confirmpwd: '',
            },
        };
    },
    methods: {
        handleRegister() {
            this.$refs.registerForm.validate((valid) => {
                console.log(valid);
            });
        },
        handleLogin() {
            this.$router.push('/login');
        },
    },
};
</script>

<style lang="css">
.register_left {
    padding: 20px;
    line-height: 30px;
    height: 100vh;
    position: relative;
}
.register_content {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    width: 50%;
}
.register_logo {
    color: #409eff;
    font-size: 30px;
    margin-bottom: 10px;
}
.register_logo i {
    padding-right: 5px;
}
.register_label {
    font-size: 14px;
    color: #909399;
}
.register_input {
    width: 100%;
    display: block;
}
.register_keep {
    display: block;
    margin: 10px 0;
}
.register_submit {
    width: 100%;
}
.register_register {
    margin: 5px;
}
.register_bg {
    background: #409eff;
    height: 100vh;
    position: relative;
}
.register_pic {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
}
@media screen and (max-width: 400px) {
    .register_right {
        display: none;
    }
    .register_content {
        width: 80%;
    }
}
</style>
