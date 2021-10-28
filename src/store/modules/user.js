export default {
    state: {
        user: {
            name: 'not set',
            age: 100,
            avatar: 'https://vistapointe.net/images/mr-bean-2.jpg',
            currentLevel: 'not set',
            nextLevel: 'not set',
            currentPoints: 100,
            pointsToNextLevel: 1000
        }
    },

    getters: {
        user(store) {
            return store.user;
        }
    },

    actions: {
        fetchUser() {
            if (localStorage.getItem('user')) {
                this.commit('setUser', JSON.parse(localStorage.getItem('user')));
            }
        }
    },

    mutations: {
        setUser(store, user) {
            store.user = user || {};
        }
    }
}