<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { loginReq } from '../api/user';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  public mounted() {
    loginReq({ user_name: 'wpbest', password: 123 }).then((res) => {
      console.log(res)
    })
  }
}
</script>
