<template>
  <v-card class="todo-item" :class="{ 'editing': editing }"
    raised>
    <template v-if="!editing">
      <v-card-text>
        <div v-html='compiledOutput' />
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="startEdit"
          color="black lighten-3"
          icon
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          @click="removeTodo(todo)"
          color="red lighten-3"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-text>
        <!--EDITOR-->
        <v-editor class="editor" 
          v-model="newTodo" 
          language="markdown"
          height="200"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="doneEdit"
          color="green lighten-3"
          icon
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
          @click="cancelEdit"
          color="red lighten-3"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import VEditor from 'monaco-editor-vue';
import VueSimpleMarkdown from 'vue-simple-markdown';
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
import marked from 'marked';

export default {
  props: ['todo'],
  components: {
    'v-editor': VEditor,
    'v-markdown-viewer': VueSimpleMarkdown,
  },
  data () {
    return {
      editing: false,
      'newTodo': String
    }
  },
  computed: {
    compiledOutput() {
      return marked(this.todo.text, {sanitize: true});
    }  
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          context.$refs.input.focus()
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'editTodo',
      'removeTodo',
      'toggleTodo'
    ]),
    doneEdit () {
      const value = this.newTodo
      const { todo } = this
      if (!value) {
        this.removeTodo(todo)
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit () {
      this.editing = false
    },
    startEdit () {
      this.newTodo = this.todo.text
      this.editing = true
    }
  }
}
</script>

<style lang="stylus">
.todo-item
  .v-list__tile
    height: auto
    padding-top: 12px
    padding-bottom: 12px
  &.editing .v-list__tile
    height: 48px
</style>
