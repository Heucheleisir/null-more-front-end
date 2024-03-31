<template>
    <div class="login-container">
        <div class="login-active-container">
            <div class="login-block">
                <div class="form-surround-NM">
                    <span class="form-surround-NM-N-block">N</span>
                    <span class="form-surround-NM-M-block">M</span>
                </div>
                <el-form v-model="loginForm" label-width="0" class="form-block">
                    <div class="form-title-block">
                        Login
                    </div>
                    <el-form-item prop="username">
                        <bubble-button :button-name="'用户名'" :change-type="'hover'" class="form-button-item-block">
                            <div class="form-item-block">
                                <el-input v-model="loginForm.username" :placeholder="'请输入用户名'"></el-input>
                            </div>
                        </bubble-button>
                    </el-form-item>
                    <el-form-item prop="password">
                        <bubble-button :button-name="'密码'" :change-type="'hover'" class="form-button-item-block">
                            <div class="form-item-block">
                                <el-input v-model="loginForm.password" :placeholder="'请输入密码'"></el-input>
                            </div>
                        </bubble-button>
                    </el-form-item>
                    <div class="form-submit-block">

                        <bubble-button ref="loginButton" :change-type="'click'" class="form-button-submit-block">
                            <template v-slot:button>
                                <div @click="handleLoginClick" class="form-button-submit-button">
                                    →
                                </div>
                            </template>
                        </bubble-button>
                    </div>
                </el-form>
            </div>
        </div>
        <!-- <img style="position: absolute;width: 100%;height: 100%;" src="//picsum.photos/1920/1080"> -->
    </div>
</template>

<script setup lang="ts">
import bubbleButton from '@/components/animation/bubble-button.vue';
import { reactive, ref } from 'vue';
import { userLogin } from '@/api/oauth/index'
import router from '@/router';
const loginButton = ref()
const loginForm = reactive({
    username: '',
    password: ''
})
async function handleLoginClick() {
    loginButton?.value?.handleChangeStatus(true)
    const resLogin = await userLogin(loginForm)
    const token = resLogin?.data?.token
    token && localStorage.setItem('token', token)
    token && router.push({ path: '/testDemo' })
}
</script>

<style lang="scss" scoped>
.login-container {
    background: #333333;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    .login-active-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(320px + 8rem);
        min-height: 8rem;

        .login-block {
            transform: translate(50%, 50%);
            transition: 1s;
            position: relative;
            width: 320px;
            height: auto;
            transition: 1s;

            .form-block {
                transform: translate(-50%, -50%) scale(0);
                transition: 1s;
                width: 100%;
                height: 100%;
                padding: 2rem 0;
                border-radius: 1rem;
                /* 设置背景颜色并设置透明度 */
                background-color: rgba(255, 255, 255, 0);
                /* 应用模糊效果，模糊程度为 10 像素 */
                backdrop-filter: blur(.25rem);
                /* 设置透明的边框 */
                border-top: 2px solid rgba(255, 255, 255, 0.5);
                border-left: 2px solid rgba(255, 255, 255, 0.5);
                /* 添加阴影效果，偏移量为 0，模糊半径为 10 僩，颜色为半透明黑色 */
                box-shadow: 0 0 1rem rgba(0, 0, 0, 0.8);

                :deep(.el-input__wrapper) {
                    background: none;
                    box-shadow: none;

                    .el-input__inner {
                        color: white;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
                    }
                }

                .form-item-block {
                    width: 100%;
                }

                .form-title-block {
                    padding: 0 2rem;
                    margin-bottom: .5rem;
                    font-size: 2rem;
                    color: #E6E6E6;
                }

                .form-submit-block {
                    margin-top: 2rem;
                    width: 100%;
                    text-align: center;
                    font-size: 1.5rem;
                }

                .form-button-item-block {
                    width: 100%;
                    padding: .5rem 2rem;
                    text-align: center;
                    box-sizing: border-box;

                    .el-form-item {
                        margin-bottom: 0;
                    }
                }

                .form-button-submit-block {
                    width: 100%;
                    height: 8rem;

                    :deep(.main-button-container) {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .form-button-submit-button {
                        cursor: pointer;
                        user-select: none;
                        border: .1rem solid white;
                        color: #FFF;
                        width: 4rem;
                        height: 4rem;
                        border-radius: 3rem;
                        background: var(--el-color-primary);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .form-button-submit-button:active {
                        border-color: var(--el-color-primary-light-3);
                        background: var(--el-color-primary-light-3);
                    }
                }
            }

            .form-surround-NM {
                box-sizing: border-box;
                position: absolute;
                width: 8rem;
                height: 8rem;
                border-radius: 4rem;
                background: rgba($color: #FFF, $alpha: .2);
                border-left: .25rem solid #E6E6E6;
                border-right: .25rem solid #E6E6E6;
                top: -4rem;
                left: -4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                color: #FFF;
                transition: 1s;

                .form-surround-NM-N-block {
                    transition: 1s;
                }

                .form-surround-NM-M-block {
                    transition: 1s;
                }
            }
        }
    }

    .login-active-container:hover {
        .login-block {
            transform: translate(0%);

            .form-block {
                transform: translate(0%, 0%) scale(1);
            }

            .form-surround-NM {
                transform: rotate(180deg);

                .form-surround-NM-N-block {
                    transform: translateX(1rem)
                }

                .form-surround-NM-M-block {
                    transform: scale(0);
                }
            }
        }
    }
}
</style>