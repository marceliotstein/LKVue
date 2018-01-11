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
    <p>Lorem ipsum dolor amet mixtape synth kale chips prism yr, XOXO fingerstache. Butcher venmo lyft bicycle rights, ennui four dollar toast skateboard cornhole bushwick migas freegan chillwave. Aesthetic pickled microdosing, ugh cornhole gentrify kickstarter ramps taxidermy tumeric pop-up gochujang. Butcher banh mi seitan cliche. Etsy raclette kickstarter live-edge gentrify portland distillery cray 90's, palo santo post-ironic. Cornhole kinfolk etsy actually tousled YOLO edison bulb bespoke fingerstache cronut.

Craft beer twee listicle migas, sriracha literally umami. Gluten-free trust fund man braid forage, tacos hashtag tumeric humblebrag squid edison bulb biodiesel copper mug activated charcoal fashion axe. Flexitarian cloud bread woke health goth, edison bulb forage gentrify semiotics hoodie squid gluten-free disrupt jianbing. Helvetica selfies yr craft beer vaporware subway tile. Paleo raw denim bitters knausgaard chicharrones hexagon coloring book squid cloud bread chia. Craft beer iPhone food truck, glossier forage flexitarian truffaut. Flexitarian knausgaard butcher, sartorial bushwick subway tile +1 tacos prism shaman lyft.

Hell of beard mumblecore bushwick listicle copper mug pug chambray gentrify truffaut tofu brooklyn. Vexillologist sartorial vegan, pug dreamcatcher raw denim fixie. Truffaut 90's four dollar toast freegan marfa vape. Flannel vice small batch hashtag slow-carb polaroid readymade kinfolk freegan ethical vegan normcore pug banjo franzen. Mlkshk shaman succulents cold-pressed etsy poke schlitz drinking vinegar cliche street art.

Chillwave vaporware put a bird on it, taxidermy sustainable artisan +1 kitsch tumblr lo-fi cornhole readymade farm-to-table iceland. 90's small batch af raclette, yr schlitz health goth retro. Locavore pop-up taxidermy fingerstache actually, viral selfies artisan forage fixie narwhal gentrify pour-over. Sriracha palo santo whatever gastropub bushwick XOXO, pitchfork jianbing plaid. Fingerstache YOLO slow-carb normcore austin.

Four dollar toast locavore aesthetic narwhal cray. Subway tile butcher vice forage food truck lo-fi affogato schlitz banjo unicorn hella asymmetrical. Chartreuse poke biodiesel viral polaroid put a bird on it sriracha mlkshk, shabby chic normcore 8-bit vegan celiac. Chambray keffiyeh cliche readymade pitchfork skateboard.

Heirloom crucifix thundercats vape, bitters vexillologist knausgaard taxidermy. Af hammock gluten-free, locavore air plant whatever shabby chic pok pok 8-bit actually. Godard literally everyday carry pitchfork lyft pork belly poke kickstarter food truck. Plaid hoodie street art, blog offal squid chartreuse humblebrag gluten-free. YOLO helvetica hot chicken chambray, taiyaki hell of vice keytar.

Hell of blue bottle franzen everyday carry aesthetic banjo lyft meditation kinfolk truffaut single-origin coffee. Drinking vinegar farm-to-table sustainable tofu asymmetrical, poutine umami aesthetic four loko 3 wolf moon swag blog. Cliche deep v pok pok sustainable yr mumblecore typewriter biodiesel. Palo santo green juice ugh roof party, hoodie tilde banjo affogato crucifix meh cornhole paleo. Palo santo cloud bread succulents glossier, la croix mustache pug street art unicorn drinking vinegar migas tilde sartorial. Vexillologist wolf brunch slow-carb vape.

Literally cornhole keffiyeh next level mustache chia etsy. Slow-carb lumbersexual brooklyn fixie. Raw denim messenger bag hella aesthetic twee blog pinterest. Echo park everyday carry tote bag flexitarian, waistcoat austin pour-over shaman YOLO marfa iPhone retro narwhal paleo tbh. Kale chips pork belly celiac DIY.

Adaptogen keytar subway tile plaid before they sold out. Ramps echo park 3 wolf moon pop-up swag forage, squid kombucha intelligentsia ethical salvia aesthetic. Sustainable salvia waistcoat DIY, hell of neutra tousled vape bespoke meh organic af slow-carb succulents sartorial. Organic hoodie scenester listicle, lumbersexual mixtape meggings plaid migas viral helvetica vinyl slow-carb. Man braid leggings retro try-hard tattooed cray.

Ethical slow-carb shoreditch pitchfork cloud bread, quinoa food truck actually flexitarian tote bag neutra. Vegan photo booth hot chicken chillwave wolf retro tbh umami. Mlkshk celiac slow-carb glossier selfies, fixie intelligentsia literally schlitz four dollar toast lo-fi VHS tilde. Chicharrones tilde salvia, drinking vinegar marfa man bun tumeric narwhal small batch YOLO portland disrupt try-hard cronut subway tile. Glossier chia craft beer, heirloom blue bottle scenester microdosing plaid. Tattooed blue bottle farm-to-table thundercats migas art party hoodie franzen poke.</p>
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
