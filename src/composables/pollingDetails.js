import { reactive, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export const getAllPollsApi = () => {
  const isLoading = ref(false);
  const store = useStore();
  const pageNo = ref(1);
  const limit = ref(4);
  onMounted(async () => {
    store.commit('clearPolls')
    isLoading.value = true;
    await store.dispatch("getPolls", {
      pageNo: pageNo.value,
      limit: limit.value,
    });
    isLoading.value = false;
  });
  const pollsData = computed(() => {
    return store.getters.getAllPolls;
  });
  // console.log(store)
  const getMorePolls = async () => {
    isLoading.value = true;
    try {
      pageNo.value++;
      await store.dispatch("getPolls", {
        pageNo: pageNo.value,
        limit: limit.value,
      });
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isLoading.value = false;
    }
  };
  const openSinglePoll = async (id) => {
    try {
      await store.dispatch("updateTitle", {
        id: id
      })
    } catch (error) {
      console.log(error);
    }
  };
  const deletePoll = async (id) => {
    try {
      await store.dispatch("removePoll", {
        id: id,
      })
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return {
    polls: pollsData,
    getMorePolls,
    isLoading,
    deletePoll,
    openSinglePoll,
  };
};
export const createNewPollApi = () => {
  const store = useStore();
  const newPoll = reactive({
    title: "",
    options: [],
  });
  const router = useRouter();

  const optionTitle = reactive([]);
  let i = 0;
  const option = ref("");
  const addError = ref("");
  const addNewPoll = async () => {
    for (let j = 0; j < newPoll.options.length; j++) {
      optionTitle[j] = {
        optionTitle: newPoll.options[j],
      };
    }
    if (newPoll.title.trim().length > 9) {
      if (newPoll.options.length > 2) {
        try {
          await store.dispatch("addPoll", {
            title: newPoll.title,
            options: optionTitle,
          });
          router.push("/polling");
        } catch (error) {
          console.log(error);
        }

        addError.value = "";
      } else {
        addError.value = "please add atleast 3 options";
      }
    } else {
      addError.value = "Please add a title with atleast 9 characters";
    }
  };
  const addOptions = () => {
    if (option.value) {
      newPoll.options[i] = option.value;
      i++;
      option.value = "";
    }
    addError.value = "";
  };
  const deleteOption = (index) => {
    newPoll.options.splice(index, 1);
    i--
  };
  const updateOption = (key, index) => {
    option.value = key;
    newPoll.options.splice(index, 1);
    i--
  };
  return {
    addNewPoll,
    newPoll,
    addOptions,
    addError,
    option,
    deleteOption,
    updateOption,
  };
};
export const openSingleApi = () => {
  const isLoading = ref(false);
  const store = useStore();
  const router = useRouter();
  const titleError = ref("");
  const getPollById = async (id) => {
    isLoading.value = true;
    try {
      await store.dispatch("getPollById", {
        id: id
      })
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isLoading.value = false;
    }
  }
  const singlePoll = computed(() => {
    return store.getters.getSinglePoll;
  });
  const goBack = (() => {
    router.go(-1);
  });

  const updateTitle = async (updatedText, id) => {
    isLoading.value = true;
    if (updatedText.length > 9) {
      try {
        await store.dispatch('updatePollTitle', {
          title: updatedText,
          createdBy: 1,
          pollId: id
        })
        isLoading.value = false;
        router.push('/polling')
      }
      catch (error) {
        console.log(error)
        isLoading.value = false;
      }
    } else {
      titleError.value = "title must be at least 10 characters "
    }

  }
  return {
    getPollById, goBack, singlePoll, updateTitle, titleError, isLoading
  }
}
