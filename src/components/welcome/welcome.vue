<template>
  <div id="welcome">
    <h1> {{ NAME_LIST }} </h1>
    <p> {{ DESCRIPTION_LIST }} </p>
    <div class="tasks">
      <div class="task" v-for="task in tasks" :key="task.id" :class="{ 'red': task.is_high_priority }"> 
        <router-link tag="div" :to="{ name: 'task.show', params: { taskId: task.id }}" >
          <div class="name"> 
            <h3> {{ task.name }}  </h3>
            
          </div>
          <div>
            <ul class="tags" >
              <li v-for="tag in task.tags" :key="tag" class="tag"> {{ tag }} </li>
            </ul>         
          </div>
          <div> {{ ACTUAL_EFFORT }} {{ task.actual_effort }} </div>
          <div> {{ ESTIMATED_EFFORT }} {{ task.estimated_effort }} </div>
          <div> {{ DUE_DATE }} {{ task.due_date }}  </div>
        </router-link>       
      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
import { NAME_LIST, DESCRIPTION_LIST, ACTUAL_EFFORT, ESTIMATED_EFFORT, DUE_DATE } from '../../phrases/phrases.js';

export default {
  data() {
    return {
      NAME_LIST,
      DESCRIPTION_LIST,
      ACTUAL_EFFORT,
      ESTIMATED_EFFORT,
      DUE_DATE,
    }
  },

  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  created(){
    if(!this.$store.state.axios) {
      axios.get('https://axios-9d3d5.firebaseio.com/tasks.json')
      .then(res => {
        this.$store.commit('addTasks', res.data);               
      })
      .catch(error => console.log(error));
    } 
    this.$store.commit('changeTasks');   
  },
}
</script>

<style scoped>
  @import url('../../styles/welcome.css'); 
</style>