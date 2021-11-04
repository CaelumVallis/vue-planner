<template>
  <div class="card user-profile-container p-2">
    <div class="row mb-2">
        <div class="col">
          <img :src="'https://picsum.photos/200'" class="imgPreview"/>
        </div>
      <div class="col-8">
        <h3 class="text-truncate">{{userInfo.username}}</h3>
        <h4 class="text-truncate">{{userInfo.email}}</h4>
      </div>
    </div>
      <div class="d-flex align-items-baseline">
        <h4>Current lvl:</h4>
        <span class="px-2">{{rank.currentRank.title}}</span>
      </div><div class="d-flex align-items-baseline">
        <h4>Next lvl:</h4>
        <span class="px-2">{{rank.nextRank.title}}</span>
      </div>
      <h4>Points to next lvl: {{pointsToNextLvl}}</h4>
    <div class="progress">
      <div class="progress-bar progress-bar-striped bg-success"
           role="progressbar"
           :style="`width: ${progressBarWidth}%`"
           :aria-valuenow="userInfo.totalPoints"
           :aria-valuemin="rank.currentRank.points"
           :aria-valuemax="rank.nextRank.points">
           {{userInfo.totalPoints}}
      </div>
    </div>
  </div>
</template>

<script>
  import { rankNames } from "../../assets/constants";

  export default {
    name: 'UserProfile',
    computed: {
      userInfo() {
        return this.$store.getters.currentUser;
      },
      rank() {
        const currentRank = rankNames.reduce((acc, item) => {
          return this.userInfo.totalPoints >= item.points ? item : acc;
        });
        const nextRank = rankNames.find((item) => {
          return currentRank.level + 1 === item.level;
        }) || currentRank;
        return { currentRank, nextRank };
      },
      progressBarWidth() {
        const pointsPerPercent = (this.rank.nextRank.points - this.rank.currentRank.points) / 100;
        const pointsForThisLevel = this.userInfo.totalPoints - this.rank.currentRank.points;
        return pointsPerPercent ? pointsForThisLevel / pointsPerPercent : 100;
      },
      pointsToNextLvl() {
        const result = this.rank.nextRank.points - this.userInfo.totalPoints;
        return result > 0 ? result : 0;
      }
    },
    created() {
      if(this.$store.getters.currentUser.uid) this.$store.dispatch('fetchUser');
    },
  }
</script>

<style scoped>
    h1, h2, h3, h4, h5 {
      line-height: 1.3;
    }

  .imgPreview {
    border-radius: 50%;
    max-height: 100%;
    max-width: 100%;
    height: auto;
    width: auto;
  }

  .progress {
    height: 2rem;
  }
</style>