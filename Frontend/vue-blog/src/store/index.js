import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    posts: JSON.parse(localStorage.getItem('posts') || '[]')
  },
  mutations: {
    //Обновления локального хранилищя, при получении полного списка постов
    updatePosts(state, posts) {             
      state.posts = posts;
      localStorage.setItem('posts', JSON.stringify(state.posts))           
    },
    //Добавление в локальное хранилище нового поста
    createPost(state, newPost){        
        state.posts.push(newPost)
    },
    //Обновление поста в локальном хранилище 
    putPost(state,newPost){      
      const id = state.posts.findIndex(i=> i.id === newPost.id);       
      state.posts[id] = newPost;     
      localStorage.setItem('posts', JSON.stringify(state.posts))
    },
    //Удаление с локально хранилищя поста
    deletePostId(state,id){          
      const posts = state.posts.filter(i => i.id !== id);          
      state.posts = posts;
      localStorage.setItem('posts', JSON.stringify(state.posts));
    }
  },
  actions: {
    //Получении полного списка постов с сервера (GET)
    getPosts(ctx, limit = 3) {
      const url = "http://127.0.0.1:8000/api/v1/posts/all/";

      Axios.get(url).then((res) => {
        ctx.commit('updatePosts', res['data']);
      }).catch(() => {

      })

      // const res = await Axios.get(url);              
      // const posts = res['data'];
      // ctx.commit('updatePosts', posts);
    },
    //Создание нового поста на сервере (POST)
    async createPost(context, newPost ){        
        const url = "http://127.0.0.1:8000/api/v1/posts/create/";
        let {data} = await Axios.post(url,newPost);
        context.commit('createPost', newPost);                          
    },
    //Обновление поста на сервере (POST)
    async putPost(ctx, upPost) {
      const url = `http://127.0.0.1:8000/api/v1/posts/update/${upPost.id}/`;
      let {data} = await Axios.put(url,upPost);       
      ctx.commit('putPost', upPost);
    },
    //Удаление поста на сервере (DELETE)
    async deletePost(ctx, id){      
      const url = `http://127.0.0.1:8000/api/v1/posts/update/${id}/`;
      let {data} = await Axios.delete(url);
      ctx.commit('deletePostId', +id);
    }
  },
  getters: {
    // Передача постов с локального хранилище компонет
    allPosts: state => state.posts,
    // Передача конкретного поста компонет    
    postID: s => id => s.posts.find(i=> i.id===id)
  },
  modules: {
  }
})
