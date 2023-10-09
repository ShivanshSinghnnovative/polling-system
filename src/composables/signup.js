import { reactive, ref, computed } from 'vue';
import { useRouter } from "vue-router"


export const loginApi = (store) => {
    const router = useRouter()
    const loginError = computed(() => {
        return store.state.loginError
    })

    const loginUser = reactive({
        email: '',
        password: '',
    })

    const loginAccount = async () => {
        try {
            await store.dispatch('login', {
                email: loginUser.email,
                password: loginUser.password,
            })
            if (!loginError.value) {
                router.push('/polling')
            }
        }
        catch (error) {
            console.log('error ')
        }
    }

    return {
        loginAccount,
        loginUser,
        loginError
    }

}

export const signupApi = (store) => {
    const router = useRouter()

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

    const userExit = ref('')
    const signError = computed(() => {
        return store.state.signupError
    })

    const signErr = computed(() => {
        return store.state.signErr
    })
    const createAccount = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        if (!passwordRegex.test(signUser.password)) {
            passwordCheck.value = "Password must contain at least one digit, one lowercase letter, and one uppercase letter"
        }
        if ((!emailRegex.test(signUser.email)) && signUser.email.trim().length > 8) {
            emailCheck.value = "email is invalid "
        }
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
                    if (!signError.value && !signErr.value) {
                        isSubmitted.value = true
                    }
                    else {
                        userExit.value = "Email already exist. Try something else"
                    }
                } catch (error) {
                    console.log('error ')
                } finally {
                    isLoading.value = false
                }
            }
            else {
                signUpErr.value = "Password must contain at least one digit, one lowercase letter, and one uppercase letter"
            }
        }
        else {
            signUpErr.value = 'Firstname length should be greater than 5'
        }

    }

    const go = () => {
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
        go,
        signError,
        signErr,
        userExit,
        togglePassword,
        hidePassword
    }
}

