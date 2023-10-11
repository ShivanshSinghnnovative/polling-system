import {reactive} from 'vue'
import { useStore } from 'vuex';
const store = useStore();
export const addPolling = () => {
    const addPollSyntax = reactive({
        title: "",
        option: "",
    });
     const addPoll = async () =>{
        try
        {
            await store.dispatch("addpoll", {
                title:addPollSyntax.title,
                option:addPollSyntax.option
            });
        }catch(error){
            console.log(error)
        }

     }
     return {
        addPoll
     }
}