import { reactive, ref, computed } from 'vue';
import { useRouter } from "vue-router"
import { useStore } from 'vuex';

export const loginApi = () => {
    const store = useStore();
    const router = useRouter()
    const loginErr = computed(() => {
        return store.state.loginError
    })


    const loginUserDetails = reactive({
        email: '',
        password: '',
    })

    const loginAccount = async () => {
        try {
            await store.dispatch('login', {
                email: loginUserDetails.email,
                password: loginUserDetails.password,
            })
            if (!loginErr.value) {
                const userData = {
                    email: loginUserDetails.email,
                    password: loginUserDetails.password,
                };
                localStorage.setItem('user', JSON.stringify(userData));

                router.push('/polling')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return {
        loginAccount,
        loginUserDetails,
        loginErr
    }

}

export const signupApi = () => {
    const store = useStore();
    const router = useRouter()
    const roles = ref([]);

    const signUser = reactive({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: null,
    })
    const isLoading = ref(false)
    const isSubmitted = ref(false)
    const hidePassword = ref(false)
    const signUpErr = ref('')
    const passwordCheck = ref('')
    const emailCheck = ref('')

    const userExist = ref('')

    store.dispatch('fetchRoles').then(() => {
        roles.value = store.getters.getRoles;
    });

    const signErr = computed(() => {
        return store.state.signErr
    })
    const createAccount = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        if (!passwordRegex.test(signUser.password)) {
            passwordCheck.value = "Password must contain at least one digit, one lowercase letter, and one uppercase letter"
        }
        if ((emailRegex.test(signUser.email))) {

            if ((signUser.firstName.length > 4) && (signUser.lastName.length > 4)) {

                if ((passwordRegex.test(signUser.password))) {
                    isLoading.value = true
                    signUpErr.value = ''
                    passwordCheck.value = ''
                    emailCheck.value = ''
                    try {
                        await store.dispatch('signup', {
                            email: signUser.email,
                            password: signUser.password,
                            roleId: signUser.roleId,
                            firstName: signUser.firstName,
                            lastName: signUser.lastName
                        })
                        if (!signErr.value) {
                            isSubmitted.value = true
                        }
                        else {
                            userExist.value = "Email already exist. Try another email"
                        }
                    } catch (error) {
                        console.log(error)
                    } finally {
                        isLoading.value = false
                    }
                }
                else {
                    signUpErr.value = "password error"
                }
            }
            else {
                signUpErr.value = 'first name and last name error'
            }
        }
        else {
            emailCheck.value = "email is invalid "
        }

    }

    const sucessfullSignup = () => {
        isSubmitted.value = false
        router.push('/')
    }

    const togglePassword = () => {
        hidePassword.value = !hidePassword.value;
    }

    return {
        createAccount,
        signUser,
        signUpErr,
        isLoading,
        passwordCheck,
        emailCheck,
        isSubmitted,
        sucessfullSignup,
        signErr,
        userExist,
        togglePassword,
        hidePassword,
        roles
    }
}

