<template>
  <div class="blog-list">
    <h1>{{ msg }}</h1>
    <h2>Un Lovaro in Corso</h2>
    <div class="blog-box" v-if="articleTitle">
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
  name: 'BlogList',
  data () {
    return {
      msg: 'VueLK: Testing for redesign of this long-running site ...',
      posts: [],
      errors: [],
      blogdata: {}
    }
  },
  created() {
    axios.get('http://whatvoir.marceliotstein.net/jsonapi/node/article/f0e9a678-fbba-450e-ba8e-da08bd4e527a')
    .then(response => {
      this.blogdata = response.data;
    })
    .catch(e => {
      this.errors.push(e)
    });
  },
  computed: {
    articleTitle: function() {
      if (this.blogdata["data"]) {
        if (this.blogdata["data"]["attributes"]) {
          if (this.blogdata["data"]["attributes"]["title"]) {
            return this.blogdata["data"]["attributes"]["title"];
          }
        }
      }  
      return "";
    },
    articleBody: function() {
      if (this.blogdata["data"]) {
        if (this.blogdata["data"]["attributes"]) {
          if (this.blogdata["data"]["attributes"]["field_body"]) {
            return this.blogdata["data"]["attributes"]["field_body"]["value"];
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

.blog-box {
  width: 70%;
  margin: 0 auto;
  border-width: 3px;
  border-style: dashed;
  border-color: purple;
  text-align: left;
  padding: 10px;
}

a {
  color: #42b983;
}
</style>
