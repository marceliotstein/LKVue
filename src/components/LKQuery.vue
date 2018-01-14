<template>
  <div class="query-results">
    <LKBurger/>
    <div class="results-inner">
      <h1>{{ msg }}</h1>
      <h2>La Commedia E Finita</h2>
        <div v-if="processedStories">
          <ul class="results-ul">
            <li v-for="story in processedStories">
              <div class="storyline">
                <div>
                  <span class="story-title">{{ story.attributes.title }}</span> &mdash;
                  <span class="story-author">{{ story.relationships.uid.data.id }}</span> &mdash;
                </div>
                <div>
                  <span class="story-datetime">{{ new Date(story.attributes.created * 1000) }}</span> &mdash;
                  <span class="story-alias">{{ story.attributes.path.alias }}</span>
                  <span class="story-promote">{{ story.attributes.promote }}</span>
                </div>
                <div class="story-dek">
                  {{ story.attributes.field_dek.value }}
                </div>
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
      errors: [],
      results: {}
    }
  },
  created() {
    this.getStories();
  }, 
  methods: {
    getStories() {
      axios.get('http://whatvoir.marceliotstein.net/jsonapi/node/story?sort=-created&fields[node--story]=type,uid,title,body,author,created,promote,uid,path,field_dek')
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
      let storyArray = this.results["data"];
      return storyArray;
    }
  }
};
</script>

<style scoped>
.storyline {
  border-top-width: 3px;
  border-top-style: dashed;
  border-top-color: black;
}

.story-dek {
  padding-bottom:10px;
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
