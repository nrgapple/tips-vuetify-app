<template>
  <v-layout row wrap>
    <v-flex>
      <!-- header -->
      <h1 class="primary--text display-3 font-weight-medium my-3">TIPS</h1>
      <v-card>
        <v-card-text>
          <!--EDITOR-->
          <v-editor class="editor" 
            v-model="newTodo" 
            language="markdown"
            height="200"
          />
        </v-card-text>
          <v-card-actions>
            <v-btn @click="addTodo" text>Save</v-btn>
          </v-card-actions>
      </v-card>
      <!-- main -->
      <v-card class="mt-3" v-show="todos.length">
        <v-card-actions class="px-3" v-show="todos.length">
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-list class="pa-0">
          <template v-for="todo in todos">
            <v-divider :key="`${todo.uid}-divider`"></v-divider>
            <TodoItem
              :key="todo.uid"
              :todo="todo"
            />
          </template>
        </v-list>
      </v-card>
      <!-- footer -->
      <footer-info></footer-info>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem.vue'
import FooterInfo from '@/components/FooterInfo.vue'
import VEditor from 'monaco-editor-vue';

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  props: ['filter'],
  components: {
    TodoItem,
    FooterInfo,
    'v-editor': VEditor,
  },
  data () {
    return {
      newTodo: '',
      filters: filters,
      visibility: this.filter
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
  },
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted'
    ]),
    addTodo () {
      const text = this.newTodo
      if (text) {
        this.$store.dispatch('addTodo', text)
      }
      this.newTodo = ''
    }
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>

<style lang="stylus">
h1
  opacity: 0.3
.v-text-field .v-input__slot
  padding: 0 !important
</style>
