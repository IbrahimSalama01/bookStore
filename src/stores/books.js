import { ref } from 'vue'
import { defineStore } from 'pinia'


export default defineStore('books', () => {
  
  const books = ref([]);

  const getBooks = async () => {
    const response = await fetch('http://localhost:3000/books')
    books.value = await response.json()
  }


  return { getBooks,books }
})
