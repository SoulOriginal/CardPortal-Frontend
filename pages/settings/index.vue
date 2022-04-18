<template>
    <div class="settings__nawbar">
      <!-- <card :title="$t('settings')" class="settings-card">
        <ul class="nav flex-column nav-pills">
          <li v-for="tab in tabs" :key="tab.route" class="nav-item">
            <router-link :to="{ name: tab.route }" class="nav-link" active-class="active">
              <fa :icon="tab.icon" fixed-width />
              {{ tab.name }}
            </router-link>
          </li>
        </ul>
      </card> -->
 
    <div class="col-md-9 block">
      <transition name="fade" mode="out-in">
        <router-view id="home-app-bar" />
      </transition>
    </div>
  </div>
</template>

<script>
export default { 
      layout(app) {
         if(!app.store.state.auth.role || app.store.state.auth.role == null){
          return  'home'
      }
        if(app.store.state.auth.role !== '' || app.store.state.auth.role !== undefined){ 
             if(app.store.state.auth.role == 'seamen'){
               return 'seamen'
             }
             if(app.store.state.auth.role == 'employer'){
               return 'employer'
             }
       } else {
        return  'home'
       }
      },
  middleware: "auth",

  computed: {
    tabs() {
      return [
        {
          icon: "user",
          name: this.$t("profile"),
          route: "settings.profile",
        },
        {
          icon: "lock",
          name: this.$t("password"),
          route: "settings.password",
        },
      ];
    },
  },
};
</script>
 
<style scoped>
.settings-card .card-body {
  padding: 0;
}
.card.settings-card {
    max-width: 200px;
    display: flex;
    flex-direction: column;
}
.card-header {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
}
.block {
  min-height: calc(100vh - 147px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;
  margin: 0 auto;
  color: #FFFFFF;
}
.card {
  transition: all 0.3s;
  width: 100%;
  max-width: 665px;
  border-radius: 20px;
  padding: 40px;
  background-color: #131528 !important;
}
 @media (max-width:480px){
    .col-md-9{
        padding: 0;
    }
    .card{
        border-radius: 0px;
        padding: 10px;
          transition: all 0.3s;
    }
 }
  .v-overflow-btn .v-input__slot::before {
    border-color: grey !important;
  }
</style>
