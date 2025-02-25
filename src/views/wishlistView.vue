<script setup>
import { ref, computed } from 'vue';
import useWishListItemsStore from '@/stores/wishList';
import useAuthsStore from '@/stores/auth';
import useBooksStore from '@/stores/books';
import { formatcurrency } from '@/utils/helpers';
const wishListItemstore = useWishListItemsStore();
const booksStore = useBooksStore();
const authsStore = useAuthsStore();

const wishlistBooks=computed(() => wishListItemstore.items.map(x=>booksStore.books.find(y=>y.ISBN==x.ISBN)));
//wishlistBooks.value=wishListItemstore.items.map(x=>booksStore.books.find(y=>y.ISBN==x.ISBN));
</script>
<template>
  <div class=" row justify-content-center">
    <div v-if="!authsStore.is_logged_in" class="col-12  mt-5">
      <h4 class="text-center text-danger">Please log in to access your wishlist</h4>
    </div>
    <div v-else-if="!wishListItemstore.items.length" class="col-12  mt-5">
      <h4 class="text-center text-warning">Your wishlist is empty </h4>
    </div>
    <div v-else class="col-12 col-xxl-11 ">
      <table class="table table-bordered table-striped justify-content-center ">
        <thead class="text-center align-middle h5">
          <tr >
            <th scope="col">Image</th>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody class="text-center align-middle table-group-divider">
          <tr v-for="book in wishlistBooks" :key="book.ISBN">
            <th scope="row"><img :src="book.Image" :alt="book.Name" class="img-fluid rounded-3" style="max-height: 50px; object-fit: contain;" /></th>
            <td>{{ book.Name }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.Category }}</td>
            <td>{{ formatcurrency(book.price) }}</td>
            <td><button class="btn btn-danger" @click="wishListItemstore.removeFromWhishList(book.ISBN)"><i class="fa fa-trash"></i></button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="6" class="text-center h5">Total: {{ wishListItemstore.items.length }} books</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style scoped>


</style>
