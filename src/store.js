import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const STORAGE_KEY = 'vuetify-todos';

const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
};

const mutations = {
  addTodo(state, todo) {
    console.log('adding todo');
    state.todos.push(todo);
  },
  removeTodo(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },
  editTodo(state, { todo, text = todo.text }) {
    todo.text = text;
  },
};

const actions = {
  addTodo({ commit }, text) {
    commit('addTodo', {
      uid: Date.now(),
      text,
    });
  },
  removeTodo({ commit }, todo) {
    commit('removeTodo', todo);
  },
  editTodo({ commit }, { todo, value }) {
    commit('editTodo', { todo, text: value });
  },
};

const plugins = [(store) => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  });
}];

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins,
});
