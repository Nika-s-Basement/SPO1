<template>
  <div id="sidebar" :class="{ 'loaded': isLoaded, 'expanded': isExpanded }">
    <button @click="toggleSidebar" :class="{'playCrossBtn': true, 'active': isExpanded}"></button>
    <div class="menu-icons">
      <div v-for="(icon, index) in icons" :key="index">
        <router-link v-if="!roomCreated || icon.label !== 'Создать комнату'" :to="icon.path" @click.native="icon.click ? icon.click() : null">
          <div class="menu-icon-label">{{ icon.label }}</div>
          <i :class="icon.class"></i>
        </router-link>
        <div v-show="roomCreated && icon.label === 'Создать комнату'" class="room-info">
          <div>{{ creatorName }}</div>
          <div>Ожидание игрока...</div>
          <div>Ожидание игрока...</div>
          <div>Ожидание игрока...</div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios'; // Убедитесь, что axios установлен

export default {
  data() {
    return {
      user: 'Авторизация',
      isAuthenticated: false,
      isExpanded: false,
      isLoaded: false,
      roomCreated: false,
      creatorName: '',
      icons: [
        {class: 'fi fi-sr-play', label: 'Запустить игру', path: '/Game'},
        {class: 'fi fi-sr-globe', label: 'Создать комнату', path: '', click: this.createRoom},
        {class: 'fi fi-sr-user-injured', label: this.whoAmI(), path: '/registration'},
        {class: 'fi fi-sr-settings', label: 'Настройки', path: ''},
      ],
    };
  },
  mounted() {
    this.loadData();
    this.checkAuth();
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
    },
    loadData() {
      this.isLoaded = true;
    },
    whoAmI() {
      this.checkAuth();
      return this.user;
    },
    checkAuth() {
      const token = localStorage.getItem('user-token');
      if (token) {
        this.user = localStorage.getItem('user-name') || 'Авторизация';
        this.isAuthenticated = true;
      } else {
        this.user = 'Авторизация';
        this.isAuthenticated = false;
      }
    },
    createRoom() {
      axios.post('http://192.168.1.70:3000/create_room', {/* данные, если нужны */})
          .then(response => {
            this.roomCreated = true;
            this.creatorName = localStorage.getItem('user-name');
          })
          .catch(error => {
            console.error("Ошибка при создании комнаты", error);
          });
    },
  },
};
</script>



<style scoped>
.user {
  position: relative;
}

.room-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.playCrossBtn {
  top: 0;
  left: 0;
  cursor: pointer;
  display: block;
  position: relative;
  border: none;
  background: transparent;
  width: 40px;
  height: 26px;
  margin: 10px;
}
.playCrossBtn::before,
.playCrossBtn::after {
  content: '';
  left: 0;
  position: absolute;
  display: block;
  width: 100%;
  height: 4px;
  border-radius: 10px;
  background: #C5C5C5;
}
.playCrossBtn::before {
  top: 0;
  box-shadow: 0 11px 0 #C5C5C5;
  transition: box-shadow .3s .15s, top .3s .15s, transform .3s;
}
.playCrossBtn::after {
  bottom: 0;
  transition: bottom .3s .15s, transform .3s;
}
.playCrossBtn.active::before {
  top: 11px;
  transform: rotate(45deg);
  box-shadow: 0 6px 0 rgba(0,0,0,0);
  transition: box-shadow .15s, top .3s, transform .3s .15s;
}
.playCrossBtn.active::after {
  bottom: 11px;
  transform: rotate(-45deg);
  transition: bottom .3s, transform .3s .15s;
}
</style>
