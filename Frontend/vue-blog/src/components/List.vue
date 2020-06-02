<template>
  <div class="list-wrapper" >
      <tr v-for="post in allPosts" :key="post.id">        
        <td>            
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>            
        </td>        
        <td>       
         <router-link tag="button" class="btn btn-small" :to="'/post/'+post.id">
            Open
          </router-link>
        </td>
      </tr>     
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {    
    computed: mapGetters(['allPosts']),
    methods: mapActions(['getPosts']),
    async mounted() {
    this.getPosts();
  }
}
</script>

<style>

</style>