import {inject, provide, ref} from "vue";

const USER_CONTEXT = Symbol();

export function useUserProvider(initial = {userId: null, token: null}) {
    const user = ref(initial);
    const setUser = (payload) => user.value = payload;

    provide(USER_CONTEXT, {user, setUser});
}

export function useUserContext() {
    const context = inject(USER_CONTEXT);

    if (!context) {
        throw new Error('useUserContext must be used with useUserProvider');
    }

    return context;
}
