import user from '@/module-frame/store/user';

export default {
    install(module, store) {
        if (store !== undefined) {
            store.registerModule('user', user)
        }
    }
}