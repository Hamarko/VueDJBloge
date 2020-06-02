<template>
 <div class="row"> 
    <div class="col s6 offset-s3">
       <h1>{{post.title}}</h1>
       <form @submit.prevent="submit">         
         <div class="row">
           <div class="input-field">
              <textarea style="min-height: 150px" id="textarea1" class="materialize-textarea"  v-model="body" required></textarea>
              <label class="active" for="textarea1">Post</label> 
           </div>
         </div>
        <button class="btn"  type="submit" style="margin-right: 1rem;">Update Task</button>
        <button class="btn red"  type="button" @click="deleteP">Delete</button>         
       </form>
    </div>       
  </div> 
</template>

<script>
import { mapActions } from 'vuex';
export default {  
  data(){
    return{
      title: '',
      body:''    
    };
  },
  mounted(){
      this.title = this.post.title;      
      this.body = this.post.body;
    }, 
  computed: {      
    post(){             
      return this.$store.getters.postID(+this.$route.params.id)            
    }
  },
  methods:{
    ...mapActions(["putPost",'deletePost']),   
    submit(){      
      let Post = {
        id: this.post.id, 
        title: this.title,
        body: this.body             
      };            
      this.putPost(Post);
      this.$router.push('/')               
    },
    deleteP(){
      console.log(this.$route.params.id)      
      this.deletePost(this.$route.params.id),
      this.$router.push('/')
    }
  },

}
</script>

<style>

</style>