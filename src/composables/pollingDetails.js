import { reactive, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export const getAllPollsApi = () => {
  const isLoading = ref(false);
  const store = useStore();
  const limit = ref(4);
  const pollsData = computed(() => {
    return store.getters.getAllPolls;
  });
  onMounted(async () => {
    if (!pollsData.value.length) {
      isLoading.value = true;
      await store.dispatch("getPolls", {
        pageNo: store.state.pageNo,
        limit: limit.value,
      });
    }
    isLoading.value = false;
  });
  const getMorePolls = async () => {
    isLoading.value = true;
    try {
      await store.dispatch("incrementPageNo");
      await store.dispatch("getPolls", {
        pageNo: store.state.pageNo,
        limit: limit.value,
      });
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isLoading.value = false;
    }
  };
  const deletePoll = async (id) => {
    try {
      await store.dispatch("removePoll", {
        id: id,
      })
    } catch (error) {
      console.log(error);
    }
  }
  return {
    polls: pollsData,
    getMorePolls,
    isLoading,
    deletePoll,
    showMoreButtonDisable: computed(() => {
      return store.getters.getShowMore;
    })
  };
};
export const createUpdateandopenSinglePagePollApi = () => {
  const isLoading = ref(false);
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
  const updateTitle = async (updatedText, id) => {
    isLoading.value = true;
    if (updatedText.trim().length > 8) {
      try {
        await store.dispatch('updatePollTitle', {
          title: updatedText.trim(),
          createdBy: singlePoll.value.createdBy,
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
      addError.value = "title must be at least 9 characters "
      isLoading.value = false;
    }
  }
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
    if (option.value.trim() !== '') {
      newPoll.options[i] = option.value;
      i++;
      option.value = "";
    }
    addError.value = "";
  };
  const goBack = () => {
    router.go(-1);
  };
  const deleteOption = (index) => {
    newPoll.options.splice(index, 1);
    i--
  };
  const deleteExistingOption = async (index, id) => {
    newPoll.options.splice(index, 1);
    i--
    try {
      await store.dispatch("removeExistingOption", {
        id: id,
      })
    } catch (error) {
      console.log(error);
    }
  };
  const updateOption = (key, index) => {
    option.value = key;
    newPoll.options.splice(index, 1);
    i--
  };
  const updateExistingPollOption = (options) => {
    option.value = options;
  };
  const addOptionInExistingPoll = async (newOption, pollId) => {
    if (option.value.trim() !== '') {
      try {
        await store.dispatch('addOptionInExistingPoll', {
          pollId: pollId,
          pollNewOption: newOption
        })
        option.value = "";
        await getPollById(pollId)
        if (singlePoll.value) {
          newPoll.title = singlePoll.value.title
          newPoll.options = singlePoll.value.optionList
        }
      }
      catch (error) {
        console.log(error);
      }
    } else {
      addError.value = "enter minimum 1 character";
    }
  };
  const updateExistingOption = async (optionTitle, optionId, id) => {
    try {
      await store.dispatch('updatePollOption', {
        option: optionTitle,
        pollOptionId: optionId,
        pollId: id
      })
      option.value = "";
      if (option.value) {
        newPoll.options[i] = optionTitle;
        i++;
        option.value = "";
      }
      addError.value = "";
    }
    catch (error) {
      console.log(error);
    }
  };
  return {
    addNewPoll,
    newPoll,
    addOptions,
    addError,
    option,
    deleteOption,
    updateOption,
    goBack,
    getPollById,
    singlePoll,
    updateTitle,
    deleteExistingOption,
    updateExistingOption,
    updateExistingPollOption,
    addOptionInExistingPoll,
    isLoading
  };
};

export const voteCounting = () => {
  const store = useStore();
  const voteButton = async (pollOptionId, pollId) => {
    try {
      await store.dispatch("votepoll", {
        id: pollOptionId,
        pollId: pollId
      })
    } catch (error) {
      console.log(error);
    }
  }
  return {
    voteButton,
  }
}