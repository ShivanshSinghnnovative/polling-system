import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
export const loginApi = () => {
    const isLoading = ref(false);
    const hidePassword = ref(false);
    const store = useStore();
    const router = useRouter();
    const loginErr = computed(() => {
        return store.state.loginError;
    });
    const loginUserDetails = reactive({
        email: "",
        password: "",
    });

    const loginAccount = async () => {
        isLoading.value = true;
        try {
            await store.dispatch("login", {
                email: loginUserDetails.email,
                password: loginUserDetails.password,
            });
            if (!loginErr.value) {
                router.push("/polling");
            }
            isLoading.value = false;
        } catch (error) {
            console.log(error);
            isLoading.value = false;
        }
    };
    const togglePassword = () => {
        hidePassword.value = !hidePassword.value;
    };
    return {
        loginAccount,
        loginUserDetails,
        loginErr,
        isLoading,
        togglePassword,
        hidePassword,
    };
};
export const signupApi = () => {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const signUser = reactive({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleId: null,
    });
    const isLoading = ref(false);
    const openSuccesModal = ref(false);
    const hidePassword = ref(false);
    const signUpErr = ref("");
    const passwordCheck = ref("");
    const emailCheck = ref("");
    const userExist = ref("");

    onMounted(async () => {
        await store.dispatch("fetchRoles");
    });

    const rolesData = computed(() => {
        return store.getters.getRoles;
    });

    const signErr = computed(() => {
        return store.state.signErr;
    });
    const createAccount = async () => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        if (!passwordRegex.test(signUser.password)) {
            passwordCheck.value =
                "Password must contain at least one digit, one lowercase letter, and one uppercase letter";
        }
        if (emailRegex.test(signUser.email)) {
            if (signUser.firstName.trim().length > 4 && signUser.lastName.trim().length > 4) {
                if (passwordRegex.test(signUser.password)) {
                    isLoading.value = true;
                    signUpErr.value = "";
                    passwordCheck.value = "";
                    emailCheck.value = "";
                    try {
                        await store.dispatch("signup", {
                            email: signUser.email,
                            password: signUser.password,
                            roleId: signUser.roleId,
                            firstName: signUser.firstName,
                            lastName: signUser.lastName,
                            routecheck: (route.name === 'register' ? 'true' : 'false')
                        });
                        if (!signErr.value) {
                            openSuccesModal.value = true;
                        } else {
                            userExist.value = "Email already exist. Try another email";
                        }
                        isLoading.value = false;
                    } catch (error) {
                        console.log(error);
                        isLoading.value = false;
                    }
                } else {
                    signUpErr.value = "password error";
                }
            } else {
                signUpErr.value = "first name and last name error";
            }
        } else {
            emailCheck.value = "email is invalid ";
        }
    };
    const sucessfullSignup = () => {
        openSuccesModal.value = false;
        router.push("/");
    };
    const togglePassword = () => {
        hidePassword.value = !hidePassword.value;
    };
    return {
        createAccount,
        signUser,
        signUpErr,
        isLoading,
        passwordCheck,
        emailCheck,
        openSuccesModal,
        sucessfullSignup,
        signErr,
        userExist,
        togglePassword,
        hidePassword,
        roles: rolesData,
    };
};
