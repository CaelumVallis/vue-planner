<template>
    <div class="card user-profile-container p-2">
        <div class="user-personal-data__container">
            <div class="user-personal-data__avatar-wrapper">
                <img :src="user.avatar" alt="user avatar" class="user-personal-data__avatar">
            </div>
            <div class="user-personal-data__text-content p-2">
                <div class="user-personal-data__name">
                    <h3>Name: {{ user.name }}</h3>
                </div>
                <div class="user-personal-data__age">
                    <h3>Age: {{ user.age }}</h3>
                </div>
            </div>
        </div>
        <div class="user-level-data__container pt-2">
            <div class="user-current-level">
                <h4>Current level: {{ user.currentLevel }}</h4>
            </div>
            <div class="user-next-level">
                <h4>Next level: {{ user.nextLevel }}</h4>
            </div>
            <div class="user-points-to-next-level">
                <h4>Points for level up left: {{ pointsForNextLevelLeft }}/{{ user.pointsToNextLevel }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userProfile',
        created() {
            if (!localStorage.getItem('user')) return;

            this.$store.dispatch('fetchUser');
        },
        computed: {
            user() {
                return this.$store.getters.user;
            },
            pointsForNextLevelLeft() {
                return this.$store.getters.user.pointsToNextLevel - this.$store.getters.user.currentPoints;
            }
        }
    }
</script>

<style scoped>
    .user-personal-data__container {
        display: flex;
    }
    .user-personal-data__avatar {
        max-width: 100px;
        height: auto;
    }
    .user-personal-data__text-content {

    }
</style>