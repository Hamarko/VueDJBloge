<template>
  <div class="row"> 
    <div class="col s12 m4 l3">
       <h3>Create Post</h3>
       <form @submit.prevent="submit">
         <div class="row">
           <div class="input-field">
              <input id="title" type="text"  class="validate" v-model="title" required>
              <label for="title">Title</label>
           </div>
         </div>
         <div class="row">
           <div class="input-field">                           
              <textarea id="textarea1" class="materialize-textarea"  v-model="post" required></textarea>
              <label for="textarea1">Post</label>              
           </div>
         </div>
        <button class="btn" type="submit">Create Post</button>         
       </form>
    </div>
    <div class="col s12 m8 l9">
      <List/>
    </div>      
  </div>    
</template>

<script>
import List from '@/components/List'
import {mapActions} from 'vuex'
export default {
  data(){
    return{
      title: "",
      post:""
    };
  },
  methods:{
    ...mapActions(["createPost"]),
    submit(){
      let Post = {
        title: this.title,
        body: this.post
      };
      this.createPost(Post);
    }
  },
  name: 'Blog',
  components: {List}
}
</script>
