import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

export const usersList = () => {
    const isLoading = ref(false);
    const store = useStore();
    const limits = ref(10);
    onMounted(async () => {
        isLoading.value = true;
        await store.dispatch("fetchUsers", {
            userPageNo: store.state.userPageNo,
            limits: limits.value,
        });
        isLoading.value = false;
    });
    const usersListData = computed(() => {
        return store.getters.getUsers;
    });
    const getNextUsers = async () => {
        if (usersListData.value.length >= limits.value) {
            try {
                isLoading.value = true;
                await store.dispatch("incrementUserPageNo");
                store.commit("clearUsers");
                await store.dispatch("fetchUsers", {
                    userPageNo: store.state.userPageNo,
                    limits: limits.value,
                });
                isLoading.value = false;
            } catch (error) {
                console.log(error);
                isLoading.value = false;
            }
        } else {
            isLoading.value = false;
        }
    };
    const getPreviousUsers = async () => {
        try {
            isLoading.value = true;
            if (store.state.userPageNo > 1) {
                await store.dispatch("decreaseUserPageNo");
                await store.dispatch("fetchUsers", {
                    userPageNo: store.state.userPageNo,
                    limits: limits.value,
                });
                isLoading.value = false;
            }
        } catch (error) {
            console.log(error);
            isLoading.value = false;
        }
    };
    const onLimitChange = async (limit) => {
        limits.value = limit;
        try {
            isLoading.value = true;
            await store.dispatch("fetchUsers", {
                userPageNo: store.state.userPageNo,
                limits: limit,
            });
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
        onLimitChange,
    };
};
