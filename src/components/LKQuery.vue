/*
 * LKVue: display a list of stories
 */
<template>
  <div class="query-results">
    <LKBurger/>
    <div class="results-inner">
      <h1>{{ msg }}</h1>
      <h2>La Commedia E Finita</h2>
        <div class="storylist" v-if="processedStories">
          <div class="storybox" v-for="story in processedStories">
            <div>
              <span class="story-title">{{ story.title }}</span> &mdash;
              <span class="story-alias">{{ story.alias }}</span> 
              (<span class="story-promote">{{ story.promote }}</span>)
            </div>
            <div>
              by <span class="story-author">{{ story.id }}</span> 
              <span class="story-datetime">{{ story.datetime }}</span> &mdash;
            </div>
            <div class="story-dek">
              {{ story.dek }}
            </div>
          </div>
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
import moment from 'moment';
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
      errors: [],
      results: {},
      processedResults: {}
    }
  },
  created() {
    this.getStories();
  }, 
  methods: {
    getStories() {
      axios.get('http://whatvoir.marceliotstein.net/jsonapi/node/story?sort=-created&fields[node--story]=type,uid,title,body,author,created,promote,uid,path,field_dek&page[limit]=25')
      .then(response => {
        this.results = response.data;
      })
      .catch(e => {
        this.errors.push(e)
      });
    }
  },
  computed: {
    processedStories() {
      let inputArray = this.results["data"];
      let outputArray = new Array();
      if (inputArray) {
        for (var i=0; i<inputArray.length; i++) {
          var newStory = new Object();

          // format date
          let storyDatetime = new Date(inputArray[i].attributes.created * 1000);

          newStory.id = inputArray[i].id;
          newStory.title = inputArray[i].attributes.title;
          newStory.author =  inputArray[i].relationships.uid.data.id;
          newStory.datetime = moment(storyDatetime).format('MMMM D YYYY, h:mm a');
          newStory.alias = inputArray[i].attributes.path.alias;
          newStory.promote = inputArray[i].attributes.promote;
          newStory.dek = inputArray[i].attributes.field_dek.value;
          outputArray.push(newStory);
        }
      }
      return outputArray;
    }
  }
};
</script>

<style scoped>
.storylist {
  margin-top: 100px;
  border-width: 1px;
  border-style: groove;
  border-color: magenta;
}

.storybox {
  margin: 20px;
  padding: 20px;
  border-width: 3px;
  border-style: dashed;
  border-color: black;
}

.story-dek {
  padding-top: 10px;
  padding-bottom: 10px;
}

h1, h2 {
  font-weight: normal;
}

.query-results {
  border-width: 1px;
  border-style: dotted;
  border-color: orange;
}

.results-inner {
  margin-left: 40px;
  margin-right: 40px;
  background-color: white;
  opacity: 90%;
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
