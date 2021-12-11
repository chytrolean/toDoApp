const app = Vue.createApp({
    data() {
      return {
        nuItem:'',
        list: [{
          'goal': 'nauč se vue',
        }]
      }
    },
    methods:{
    Add(){
      if(!this.nuItem)return
        this.list.push({
          title: this.nuItem,
          done: false,
          isRemoved: false
        })
        this.nuItem = '' 
     },
     finish(item,index){
       const id = this.list[index]._id
       console.log(item.done)
       item.done = !item.done
      axios
        .put(`/api/goals/${id}`, {done: item.done})
        .then(response => response.data)
     },
    remove(item,index){
      const id = this.list[index]._id
      item.isRemoved = !item.isRemoved
      setTimeout(() => {
        this.list.splice(index,1)
       console.log(id)
        axios.delete(`/api/goals/${id}`)
        .then(response => this.list = response.data)
      }, 2000);
       
        }
    },
    mounted(){
      axios
        .get('/api/goals')
        .then(response => this.list = response.data)
    },
  })
  app.mount('#app')