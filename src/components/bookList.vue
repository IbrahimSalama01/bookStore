<template lang="">
    <div>
        <ul  class="list-group px-0" >
            <li class="list-group-item text-center active ">Books</li>
            <li v-for="book in booksStore.books" class="list-group-item text-center py-3  " :title="book.author">{{book.Name}}</li>
        </ul>
    </div>
</template>
<script setup>
    import useBooksStore from '@/stores/books';
    const booksStore = useBooksStore();
</script>
<style lang="">
    
</style>