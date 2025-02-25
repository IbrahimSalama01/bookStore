import { ref  } from 'vue'
import { defineStore } from 'pinia'


export default  defineStore('auth', () => {
  
    const user_id = ref(0);
    const is_logged_in = ref(false);
  const login = async (username,pass)=>{
    let response =await fetch(`http://localhost:3000/users?username=${username}&password=${pass}`);
    let data = await response.json();
    
    if(data.length>0){
      user_id.value = data[0].id;
      is_logged_in.value = true;
    }
    
   // console.log(is_logged_in.value)
  }
  const logout =  ()=>{
    user_id.value = 0;
    is_logged_in.value = false;
  }

  return { is_logged_in, user_id, login, logout }
})
