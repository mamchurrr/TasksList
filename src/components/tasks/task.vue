<template>
    <div id="task">
        <h1 @click="changeName=!changeName" v-if="!changeName"> {{ task.name }} </h1>
        <div class="changer" v-else >
            <input  type="text" v-model="task.name" @blur="saveChanges" @keyup.enter="saveChanges">
        </div> 
        <p> {{ task.description }} </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            changeName: false,
        }
    },
    computed: {
        ...mapGetters(['task'])
    },    
    methods: {
        saveChanges: function() {
            this.changeName = !this.changeName;
            this.$store.dispatch('updateTask', this.$route.params.taskId);            
        }
    },
    created(){
        this.$store.dispatch('setTask', {
                // path: this.$route.path,
                // params: this.$route.params.taskId
                });
    }
}
</script>

<style scoped>
    #task {
        width: 80%;
        margin: auto;    
    }

    h1, p, .changer {
        text-align: center;
    }

    h1:hover {
        border: 1px solid gray;
        border-radius: 15px;
        width: 50%;
        margin: 20px auto;
    }

    .changer {
        margin: 20px;
    }

    .changer input {
        font-size: 2em;
        font-weight: bold;
        margin-right: 20px;
        padding: 2px 13px;
        border-radius: 15px;
        border: none;
        text-align:  center;
    }

    .changer button {
        font-size: 2em;
        color: #fff;
        background-color: #665599;
        padding: 2px 13px;
        border-radius: 5px;
    }
</style>
