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
            <div class="story-terms" v-html="story.topics"></div>
            <div class="story-terms" v-html="story.topics3"></div>
            <div class="story-terms" v-html="story.topics4"></div>
            <div class="story-terms" v-html="story.topics5"></div>
            <div class="story-terms" v-html="story.topics6"></div>
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
      axios.get('http://whatvoir.marceliotstein.net/jsonapi/node/story?sort=-created&fields[node--story]=type,uid,title,body,author,created,promote,uid,path,field_dek,taxonomy_vocabulary_1,taxonomy_vocabulary_3,taxonomy_vocabulary_4,taxonomy_vocabulary_5,taxonomy_vocabulary_6&page[limit]=25')
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
      let results = this.results["data"];
      let processed = new Array();
      if (results) {
        for (var i=0; i<results.length; i++) {
          var newStory = new Object();

          // format date
          let storyDatetime = new Date(results[i].attributes.created * 1000);

          newStory.id = results[i].id;
          newStory.title = results[i].attributes.title;
          newStory.author =  results[i].relationships.uid.data.id;
          newStory.datetime = moment(storyDatetime).format('MMMM D YYYY, h:mm a');
          newStory.alias = results[i].attributes.path.alias;
          newStory.promote = results[i].attributes.promote;
          newStory.dek = results[i].attributes.field_dek.value;

          // process taxonomy terms
          // vocabulary 1 - topics
          let numTopics = results[i].relationships.taxonomy_vocabulary_1.data.length;
          newStory.topics = "";
          newStory.topics3 = "";
          newStory.topics4 = "";
          newStory.topics5 = "";
          newStory.topics6 = "";

          for (var j=0; j<numTopics; j++) {
            newStory.topics += "<div class=\"tax-term\">TOPIC: " + results[i].relationships.taxonomy_vocabulary_1.data[j].id + "</div>";
          }

          // process taxonomy terms
          // vocabulary 3 -
          let numTopics3 = results[i].relationships.taxonomy_vocabulary_3.data.length;
          newStory.topics3 = "";
          for (var j=0; j<numTopics3; j++) {
            newStory.topics3 += "<div class=\"tax-term\">3: " + results[i].relationships.taxonomy_vocabulary_3.data[j].id + "</div>";
          }

          // process taxonomy terms
          // vocabulary 4 -
          let numTopics4 = results[i].relationships.taxonomy_vocabulary_4.data.length;
          newStory.topics4 = "";
          for (var j=0; j<numTopics4; j++) {
            newStory.topics4 += "<div class=\"tax-term\">4: " + results[i].relationships.taxonomy_vocabulary_4.data[j].id + "</div>";
          }

          // process taxonomy terms
          // vocabulary 5 -
          let numTopics5 = results[i].relationships.taxonomy_vocabulary_5.data.length;
          newStory.topics5 = "";
          for (var j=0; j<numTopics5; j++) {
            newStory.topics5 += "<div class=\"tax-term\">5: " + results[i].relationships.taxonomy_vocabulary_5.data[j].id + "</div>";
          }

          // process taxonomy terms
          // vocabulary 6 -
          let numTopics6 = results[i].relationships.taxonomy_vocabulary_6.data.length;
          newStory.topics6 = "";
          for (var j=0; j<numTopics6; j++) {
            newStory.topics6 += "<div class=\"tax-term\">6: " + results[i].relationships.taxonomy_vocabulary_6.data[j].id + "</div>";
          }

          processed.push(newStory);
        }
      }
      return processed;
    }
  }
};
</script>

<style scoped>
.story-terms {
  padding: 20px;
}

.tax-term {
  font-size: .8em;
  font-style: small-caps;
  text-transform: uppercase;
}

.storylist {
  margin-top: 20px;
  border-width: 5px;
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
