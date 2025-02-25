<template lang="">
    <div
        class="d-flex flex-row align-items-center p-3  justify-content-between navbar"
        id="nav"
      >
        <a class="d-flex flex-row align-items-center text-decoration-none cursor-hand"
         href="#" @click.prevent="$router.push('/')"
        >
            <img src="@/assets/logo.svg" alt="" class="img-fluid" width="50" height="50" />
          <span class="h2 mx-3 font-weight-bold text-white align-self-end">Book Store</span>
          <!-- <span class="h3 mx-3 text-white">products</span> -->
        </a>
        <div v-if="authsStore.is_logged_in" class="d-flex flex-row align-items-baseline">
          <span class="h5 mx-3 text-white">
            {{wishListItemstore.items.length}} 
            <span v-if="wishListItemstore.items.length==1">Book</span>
            <span v-else>Books</span> 
          </span>
          <span>
          <button v-if="$route.path=='/'" class="mx-1 btn btn-warning" @click="$router.push('/wishlist')">
            <span class="fa fa-heart"></span>
        </button>
        <button v-else class="mx-1 btn btn-primary" @click="$router.push('/')">
            <span class="fa fa-book"></span>
        </button>
        </span>
          <button class="mx-3 btn btn-danger" @click="authsStore.logout">Log out</button>
        </div>
        <div v-else>
            <button class="mx-3 btn btn-success" data-bs-toggle="modal" data-bs-target="#LoginModal">
            Log in 
          </button>
        </div>
        <div id="LoginModal" class="modal fade" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Login </h5>
                    </div> <!-- end of modal-header -->
                    <div class="modal-body">
                        <form >
                            <div class="mb-3 d-flex flex-column">
                                <label for="username" class="form-label align-self-start mx-2"> Username </label>
                                <input type="text" class="form-control" v-model="username" id="username" placeholder="Enter Username">
                                <label for="password" class="form-label align-self-start mx-2 mt-3"> Password </label>
                                <input type="password" class="form-control" v-model="pass" id="password" placeholder="Enter Password">
                            </div>
                        </form>
                    </div> <!-- end of modal-body -->
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-primary" @click="loginclicked"> Log in </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Close </button>
                    </div> <!-- end of modal-footer -->
                </div> <!-- end of modal-content -->
            </div> <!-- end of modal-dialog -->
        </div> <!-- end of modal -->
    </div>
    
</template>

<script setup>
import {ref, reactive} from 'vue';
import useAuthsStore from '@/stores/auth';
import useWishListItemsStore from '@/stores/wishList';
import usebooksStore from '@/stores/books';
import { formatcurrency } from '@/utils/helpers';

const authsStore = useAuthsStore();
const wishListItemstore = useWishListItemsStore();

const username = ref('');
const pass = ref('');

const  loginclicked = async ()=>{
    
    await authsStore.login(username.value,pass.value);

    if(authsStore.is_logged_in){
        let bsmodal = bootstrap.Modal.getInstance("#LoginModal") || new bootstrap.Modal(document.getElementById("LoginModal"));
        bsmodal.hide();
        await wishListItemstore.getUserItems();
        console.log(wishListItemstore.items);
        
    }

};
</script>
<style scoped>
.navbar{
    background-color: rgb(1, 25, 92);
}
    
</style>