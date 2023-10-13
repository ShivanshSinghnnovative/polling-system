import { reactive, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export const showPollApi = () => {
  const store = useStore();
  onMounted(async () => {
    await store.dispatch("getPolls");
  });
  const pollsData = computed(() => {
    return store.getters.getPoll;
  });
  // console.log(store)
  return {
    polls: pollsData,
  };
};
export const addPolling = () => {
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

  const deleteOption = (key) => {
    newPoll.options = newPoll.options.filter((item) => {
      return key !== item;
    });
    i--;
  };
  const updateOption = (key) => {
    option.value = key;
    newPoll.options = newPoll.options.filter((item) => {
      return key !== item;
    });
    i--;
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
