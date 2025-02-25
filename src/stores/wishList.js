import { ref, reactive ,computed } from 'vue'
import { defineStore } from 'pinia'
import usebooksStore from '@/stores/books';
import useAuthsStore from '@/stores/auth';



export default defineStore('cartItems', () => {
  const authsStore = useAuthsStore();
  const productsStore = usebooksStore();
  const items = ref([]);
  //const totalPrice = computed( () => items.value.reduce((total, item) => total + item.product.price * item.qty, 0));
  
  const getUserItems = async () => {
    if(! authsStore.is_logged_in) return;
    if(!items.value || items.value.length==0){
      let response = await fetch(`http://localhost:3000/users/${authsStore.user_id}`);
      items.value = (await response.json()).wishlist;
      
    } 
  }
  const addToWhishList = async (book) => {
    let response = await fetch(`http://localhost:3000/users/${authsStore.user_id}`);
    let whisheditems = (await response.json()).wishlist;

    if(whisheditems.find(x=>x.ISBN==book.ISBN))
    {
      items.value = whisheditems;
      return;
    }
    whisheditems.push({"ISBN":book.ISBN});   

    await fetch(`http://localhost:3000/users/${authsStore.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "wishlist": whisheditems }),
    });
    items.value = whisheditems;
    //await getUserItems();
  }
  const removeFromWhishList = async (ISBN) => {
    let response = await fetch(`http://localhost:3000/users/${authsStore.user_id}`);
    let whisheditems = (await response.json()).wishlist;

    if(!whisheditems.find(x=>x.ISBN==ISBN))
    {
      console.log("not found");
      items.value = whisheditems;
      return;
    }
  
    whisheditems.splice(whisheditems.findIndex(x=>x.ISBN==ISBN),1);   
   
    await fetch(`http://localhost:3000/users/${authsStore.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "wishlist": whisheditems }),
    });
    items.value = whisheditems;
  }
  return { getUserItems, addToWhishList, removeFromWhishList,items }

  
})
