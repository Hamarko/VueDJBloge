<template>
  <nav>
    <div class="nav-wrapper">    
      <router-link to="/"  class="brand-logo">Blog</router-link> 
      <ul class="right hide-on-med-and-down">
        <router-link 
          tag="li"
          to="/graf"
          exact
          active-class="active"
        >
          <a href="#">Graf</a>        
        </router-link>  
      </ul>   
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>