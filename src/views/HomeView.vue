<script setup>
  import usebooksStore from '@/stores/books';
  import book from '@/components/book.vue';
  import useWishListItemsStore from '@/stores/wishList';
  
  const booksStore = usebooksStore();
  const wishListItemstore = useWishListItemsStore();
  const addToFavorites = (book) => {
    wishListItemstore.addToWhishList(book);
  };
  </script >

  <template>
    <main>
      <div class=" row g-3 w-100 align-items-stretch">
      <div v-for="book in booksStore.books" :key="book.id" class="col-6 col-lg-4 col-xxl-3 ">
        <book :book="book" @add-to-favorites="addToFavorites"></book>
      </div>
    </div>
    </main>
</template>
