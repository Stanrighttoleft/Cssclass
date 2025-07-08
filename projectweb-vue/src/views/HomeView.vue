<script>
export default{
  data:function (){
    return{
      name:'',
      age:'',
      list:[
        {name:'Billy', age:25}
      ]
    };
  },
  methods:{
    add(){
      this.list.push({
        name:this.name,
        age:this.age
      });
    },
    remove(index){
      this.list.splice(index,1);
    }
  }

}
</script>



<template>
  <main>
    <div>
      name: <input type="text" v-model="name">
      age: <input type="text" v-model="age">
      <button v-on:click="add">add</button>
      <br><br>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          name:{{ item.name }}
          age:{{ item.age }}
          <button v-on:click="remove(index)">delete</button>

        </li>
      </ul>
    </div>
    
  </main>
</template>
