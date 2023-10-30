import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

export const usersList = () => {
    const isLoading = ref(false);
    const store = useStore();
    const limits = ref(10);
    onMounted(async () => {
        store.state.userPageNo= 1;
        isLoading.value = true;
        await store.dispatch("fetchUsers", {
            userPageNo: store.state.userPageNo,
            limits: limits,
        });
        isLoading.value = false;
    });
    const usersListData = computed(() => {
        return store.getters.getUsers;
    });
    const getNextUsers = async () => {
        isLoading.value = true;
        try {
            await store.dispatch("incrementUserPageNo");
            await store.dispatch("fetchUsers", {
                userPageNo: store.state.userPageNo,
                limits: limits,
            });
            isLoading.value = false;
        } catch (error) {
            console.log(error);
            isLoading.value = false;
        }
    };
    const getPreviousUsers = async () => {
        isLoading.value = true;
        try {
            if(store.state.userPageNo>1){
            await store.dispatch("decreaseUserPageNo");
            await store.dispatch("fetchUsers", {
                userPageNo: store.state.userPageNo,
                limits: limits,
            });}
            isLoading.value = false;
        } catch (error) {
            console.log(error);
            isLoading.value = false;
        }
    };

    return {
        usersListData,
        getNextUsers,
        getPreviousUsers,
        isLoading,
        limits,
    };
};
