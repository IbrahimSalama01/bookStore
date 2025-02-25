<script setup>
import useAuthsStore from '@/stores/auth';
import {formatcurrency} from '@/utils/helpers';
const props = defineProps(['book']);
const authsStore = useAuthsStore();


</script>
<template>
    <div class="card shadow-lg border-0 rounded-4 h-100 ">
        <div class="card-header  d-flex justify-content-center py-3" :class="{'less':book.number_of_pages<200, 'more':book.number_of_pages>200}" >
            <img :src="book.Image" :alt="book.Name" class="img-fluid rounded-3" style="max-height: 220px; object-fit: contain;" />
        </div> <!-- end of card-header -->
        
        <div class="card-body text-center   ">
            <h5 class="card-title fw-bold mb-3 ">{{ book.Name }}</h5>
            <div class="row g-2 align-items-stretch">
                <div class="col-6">
                    <span class="d-flex align-items-center justify-content-center p-2 bg-success text-white rounded-2 h-100 ">
                    Category: {{ book.Category }}
                    </span>
                </div>
                <div class="col-6">
                    <span class="d-flex align-items-center justify-content-center p-2 bg-primary text-white rounded-2 h-100">
                    Author: {{ book.author }}
                    </span>
                </div>
                <div class="col-6">
                    <span class="d-flex align-items-center justify-content-center p-2 bg-success text-white rounded-2 h-100">
                    Pages: {{ book.number_of_pages }}
                    </span>
                </div>
                <div class="col-6">
                    <span class="d-flex align-items-center justify-content-center p-2 bg-primary text-white rounded-2 h-100">
                    Price: {{ formatcurrency(book.price) }}
                    </span>
                </div>
                <div class="col-12">
                    <span class="d-flex align-items-center justify-content-center p-2 bg-warning text-white rounded-2 h-100">
                    ISBN: {{ book.ISBN }}
                    </span>
                </div>
            </div>
        </div> <!-- end of card-body -->

  <div class="card-footer bg-light d-flex justify-content-end p-3">
    <button class="btn btn-outline-danger px-4 py-2"  
        :disabled="!authsStore.is_logged_in"
        @click="$emit('add-to-favorites', book)"> 
      <i class="fa fa-heart"></i> Add to Favorites
    </button>
  </div> <!-- end of card-footer -->
</div> <!-- end of card -->
</template>
<style scoped>
.less{
    background-color: antiquewhite;
}
.more{
    background-color: white;
}
</style>