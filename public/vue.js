const app = Vue.createApp({
    data() {
      return {
        nuItem:'',
        isRemoved: false,
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
          done: false
        })
        this.nuItem = '' 
     },
     finish(item,index){
       const id = this.list[index]._id
       console.log(item.done)
       item.done = !item.done
      axios
        .put(`https://todoappeay.herokuapp.com/api/goals/${id}`, {done: item.done})
        .then(response => response.data)
     },
    remove(index){
      const id = this.list[index]._id
       this.list.splice(index,1)
       console.log(id)
        axios.delete(`https://todoappeay.herokuapp.com/api/goals/${id}`)
        .then(response => this.list = response.data)
        }
    },
    mounted(){
      axios
        .get('https://todoappeay.herokuapp.com/api/goals')
        .then(response => this.list = response.data)
    },
  })
  app.mount('#app')