import { Component, Vue } from 'vue-property-decorator';
import { loginReq } from '../../api/user';

@Component
export default class LoginPage extends Vue {
    public user_name: string = ''
    public password: number = 123

    public login() {
        loginReq({ user_name: this.user_name, password: this.password }).then((res) => {
            console.log(res)
            if (res.data.code === 0) {
                this.$router.push('/home')
            } else {
                console.log(res.data.msg)
            }
        })
    }
    protected render() {
        return (
            <div class='login-page'>
                <input v-model={this.user_name}></input>
                <input v-model={this.password} type="password" style="margin-left: 20px;"></input>
                <button on-click={this.login} style="margin-left: 20px;">登录</button>
            </div>
        )
    }
}
