<template>
  <div id="welcome">
    <h1>Список задач</h1>
    <p>Выберите одну для редактирования:</p>
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
          <div>Время потраченное на задачу: {{ task.actual_effort}} </div>
          <div>Общая оценка задачи: {{ task.estimated_effort}} </div>
          <div>Дата окончания задачи: {{ task.due_date}}  </div>
        </router-link>       
      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'

export default {

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

  #welcome {
    width: 80%;
    margin: auto;    
  }

  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }

  .tasks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .task {
    box-sizing: border-box;
    width: 33.33%;
    max-width: 380px;
    border: 1px solid #521751;
    border-radius: 5px;
    padding: 15px;
    margin: 20px;
    box-shadow: inset 0 0 7px 0px black;
    cursor: pointer;
  }

  .tags {
    list-style: none;
    display: flex;
    padding: 0;
  }
  
  .tag {
    padding: 10px 20px;
    margin:  0 15px 0 0;
    background-color: yellow;
    border-radius: 15px
  }

  .red {
    background-color: #ef131375;
  }

  @media screen and (max-width: 1577px) {
    .task {
      width: 50%;
      max-width: 380px;
    }
  }

  @media screen and (max-width: 1050px) {
    .task {
      width: 100%;
      max-width: 630px;
    }
  }
</style>