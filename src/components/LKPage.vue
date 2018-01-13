<template>
  <div class="blog-list">
    <div class="blog-inner">
      <LKBurger/>
      <h1>{{ msg }}</h1>
      <h2>Un Lovaro in Corso</h2>
      <div class="blog-box" v-if="articleTitle">
        <h1>{{articleTitle}}</h1>
        <p><span v-html="articleBody"></span></p>
      </div> 
      <ul v-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import LKBurger from '@/components/LKBurger.vue';

Vue.use(VueAxios, axios);

export default {
  name: 'LKPage',
  components: {
     LKBurger
  },
  data () {
    return {
      msg: 'VueLK: Testing for redesign of this long-running site ...',
      posts: [],
      errors: [],
      blogdata: {}
    }
  },
  created() {
    axios.get('http://whatvoir.marceliotstein.net/jsonapi/node/story/d4db88aa-4423-4360-8723-f790a0b49278')
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
          if (this.blogdata["data"]["attributes"]["body"]) {
            return this.blogdata["data"]["attributes"]["body"]["value"];
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

.blog-list {
  border-width: 1px;
  border-style: dotted;
  border-color: orange;
}

.blog-inner {
  margin-top: 100px;
}

.blog-box {
  width: 70%;
  margin: 0 auto;
  border-width: 3px;
  border-style: dashed;
  border-color: purple;
  text-align: left;
  padding: 10px;
  background-color: white;
  opacity: 50%;
}

a {
  color: #42b983;
}
</style>
