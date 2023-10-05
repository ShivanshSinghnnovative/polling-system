import {reactive} from 'vue'
import { useStore } from 'vuex';
const store = useStore();

export const signupApi = () => {
 const signUser = reactive({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: null,
    })
  
const createAccount = () => {

    if (
        !signUser.firstName.trim() ||
        !signUser.lastName.trim() ||
        !signUser.email.trim() ||
        !signUser.password.trim() ||
        !signUser.roleId
      ) {
        console.log('Please fill in all required fields');
        return;
      }
  
      if (signUser.password.trim().length <= 8) {
        console.log('Password length should be greater than 8');
        return;
      }
  
      try {
        store.dispatch('signup', {
          email: signUser.email,
          password: signUser.password,
          roleId: signUser.roleId,
          firstName: signUser.firstName,
          lastName: signUser.lastName,
        });
      } catch (error) {
        console.error('Error ', error);
      }
       console.log(signUser);

}


return {
    createAccount,
    signUser,
    
}


}