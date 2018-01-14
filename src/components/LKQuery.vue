<template>
  <div class="query-results">
    <LKBurger/>
    <div class="results-inner">
      <h1>{{ msg }}</h1>
      <h2>La Commedia E Finita</h2>
        <div v-if="processedStories">
          <ul class="results-ul">
            <li v-for="item in processedStories">
              <div class="itemstuff">
                {{ item.id }}
              </div>
            </li>  
          </ul>
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
  name: 'LKQuery',
  components: {
     LKBurger
  },
  data () {
    return {
      msg: 'VueLK: Testing various JSON API filters and data sets.',
      posts: [],
      errors: [],
      results: {}
    }
  },
  created() {
    console.log("IN MOUNTED");
    this.getStories();
  }, 
  methods: {
    getStories() {
      console.log("IN GET STORIES");
      axios.get('http://whatvoir.marceliotstein.net/jsonapi/node/story?sort=-created')
      .then(response => {
        console.log("IN GET STORIES - RESPONSE FOUND");
        this.results = response.data;
      })
      .catch(e => {
        console.log("IN GET STORIES - ERROR");
        this.errors.push(e)
      });
    }
  },
  computed: {
    processedStories() {
      console.log("IN PROCESSED STORIES");
      let storyArray = this.results["data"];
      //let storyArray = [ {"id":"lemon"}, {"id":"mango"}, {"id":"papaya"} ];
      console.log(storyArray);
      return storyArray;
    }
  }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.query-results {
  border-width: 1px;
  border-style: dotted;
  border-color: orange;
}

.results-inner {
  margin-top: 100px;
}

.results-box {
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
