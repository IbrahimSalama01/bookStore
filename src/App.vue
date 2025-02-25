<script setup>
import { RouterLink, RouterView } from 'vue-router'
import bookList from './components/bookList.vue'
import navbar from '@/components/navbar.vue'
import myfooter from '@/components/myfooter.vue'
import { ref, onMounted } from 'vue'
import usebooksStore from '@/stores/books';
const books = ref([])
const booksStore = usebooksStore();
onMounted( async() => {
    await booksStore.getBooks();
});

</script>

<template>
  <div class=" container-fluid">
  <navbar/>
  
  <div  class=" d-flex flex-row  mt-2 gap-3 justify-content-start ">
    <div class="" style="min-width: 250px;" >
      <bookList :books="books"/>
    </div>
    <div class="flex-grow-1">
      <RouterView />
    </div>
  </div>  

  <myfooter/>
  
</div>
</template>

<style scoped>


.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
