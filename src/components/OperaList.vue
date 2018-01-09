<template>
  <div class="opera-list">
    <h1>{{ msg }}</h1>
    <h2>Un Lovaro in Corso</h2>
    <div class="opera-box" v-if="articleTitle">
      <p>{{articleTitle}}</p>
      <p v-html="articleBody"></p>
    </div> 
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export default {
  name: 'OperaList',
  data () {
    return {
      msg: 'Testing JSON API ...',
      posts: [],
      errors: [],
      operadata: {}
    }
  },
  created() {
    axios.get(`http://reservoir.marceliotstein.net/jsonapi/node/article/95a31824-e0cc-4cdb-aca3-75089a3122e0`)
    .then(response => {
      this.operadata = response.data;
      console.log("GRGG" + this.operadata["data"]["attributes"]["title"]);
    })
    .catch(e => {
      this.errors.push(e)
    });
  },
  computed: {
    articleTitle: function() {
      if (this.operadata["data"]) {
        if (this.operadata["data"]["attributes"]) {
          if (this.operadata["data"]["attributes"]["title"]) {
            return this.operadata["data"]["attributes"]["title"];
          }
        }
      }  
      return "";
    },
    articleBody: function() {
      if (this.operadata["data"]) {
        if (this.operadata["data"]["attributes"]) {
          if (this.operadata["data"]["attributes"]["field_body"]) {
            return this.operadata["data"]["attributes"]["field_body"]["value"];
          }
        }
      }  
      return "";
    },
  }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.opera-box {
  border-width: 3px;
  border-style: dashed;
  border-color: purple;
  text-align: left;
}

a {
  color: #42b983;
}
</style>
