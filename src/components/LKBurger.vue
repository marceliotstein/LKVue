/*
 * LKBurger.vue - Vue component implements CSS-only hamburger menu
 * based on https://github.com/lmgonzalves/morphing-hamburger-menu
 */
<template>
  <div class="burger-container">
    <input ref="toggleburger" id="toggle" type="checkbox">

    <label class="toggle-container" for="toggle">
      <span class="button button-toggle"></span>
    </label>

    <nav class="nav">
      <router-link v-on:click.native="collapse()" to="/" class="nav-item">Home</router-link>
      <router-link v-on:click.native="collapse()" to="/xyz" class="nav-item">Search</router-link>
      <router-link v-on:click.native="collapse()" to="/xyz" class="nav-item">Archives</router-link>
      <router-link v-on:click.native="collapse()" to="/xyz" class="nav-item">About This Site</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'LKBurger',
  methods: {
    collapse: function (event) {
      this.$refs.toggleburger.checked = false;
    }
  }
}
</script>

<style lang="scss" scoped>
$items: 6;
$transition-duration: 0.5s;
$transition-delay: 0.05s;

/* Basic styles */

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
}

a {
  text-decoration: none;
}

.burger-container {
  position: relative;
  margin: 0px;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
}


/* Toggle functionality */

// To hide the checkbox
#toggle {
  position: absolute;
  left: -100%;
  top: -100%;
}

// Styles for the 'open' state, if the checkbox is checked
#toggle:checked {
  // Any element you need to change the style if menu is open goes here, using the sibling selector (~) as follows

  // Making the "X" icon using `:before` and `:after` pseudo-elements
  & ~ .toggle-container .button-toggle {

    &:before {
      transform: translateY(-50%) rotate(45deg) scale(1);
    }

    &:after {
      transform: translateY(-50%) rotate(-45deg) scale(1);
    }
  }

  // Open nav
  & ~ .nav {
    margin-bottom: 40px;
    pointer-events: auto;
    transform: translate(30px, 30px);

    // Restoring nav items from "lines" in the menu icon
    .nav-item {
      color: black;
      letter-spacing: 0;
      height: 30px;
      line-height: 30px;
      border-bottom-width: 2px;
      border-bottom-color: darkslategray;
      border-bottom-style: dotted;
      margin-top: 0;
      opacity: 1;
      transform: scaleY(1);
      transition: $transition-duration, opacity 0.1s;

      // Setting delays for the nav items in open transition
      @for $i from 1 through $items {
        &:nth-child(#{$i}) {
          $delay: ($items - $i) * $transition-delay;
          transition-delay: $delay;
          &:before {
            transition-delay: $delay;
          }
        }
      }

      &:nth-child(6) {
        border-bottom-width: 0px;
      }

      // Hiding the lines
      &:before {
        opacity: 0;
      }
    }
  }
}

/* Toggle button */

.button-toggle {
  position: absolute;
  display: inline-block;
  width: 85px;
  height: 85px;
  margin: 0px;
  background-color: white;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  transition: $transition-duration + 0.1;

  // Making the "X" icon using `:before` and `:after` pseudo-elements
  // Initially hidden because `scale(0)` transformation

  &:before, &:after {
    position: absolute;
    content: '';
    top: 20%;
    left: 0;
    width: 50%;
    height: 4px;
    background-color: darkslategray;
    border-radius: 5px;
    transition: $transition-duration;
  }

  &:before {
    transform: translateY(-50%) rotate(45deg) scale(0);
  }

  &:after {
    transform: translateY(-50%) rotate(-45deg) scale(0);
  }
}

/* Menu */

.nav {
  display: inline-block;
  margin: 5px 0px 0px 10px;
  pointer-events: none;
  transition: $transition-duration;
}

// Showing nav items as lines, making up the hamburger menu icon
.nav-item {
  position: relative;
  display: inline-block;
  float: right;
  clear: both;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
  letter-spacing: -6.2px;
  height: 11px;
  text-transform: uppercase;
  white-space: nowrap;
  transform: scaleY(0.2);
  transition: $transition-duration, opacity 1s;

  // Setting delays for the nav items in close transition
  @for $i from 1 through $items {
    &:nth-child(#{$i}) {
      $delay: ($i - 1) * $transition-delay;
      transition-delay: $delay;
      &:before {
        transition-delay: $delay;
      }
    }
  }

  // Adjusting width for the first line
  &:nth-child(1) {
    letter-spacing: -8px;
    opacity: .8;
  }

  // Adjusting width for the second line
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(6) {
    letter-spacing: -8px;
    opacity: .8;
  }

  /*
  // Adjusting from the fourth element onwards
  &:nth-child(n + 4) {
    letter-spacing: -8px;
    opacity: .8;
  }
  */

  // Getting the lines for the hamburger menu icon
  &:before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: black;
    transform: translateY(-50%) scaleY(5);
    transition: $transition-duration;
  }
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: white;
}
</style>
