<template>
  <div id="rectangle-container">
    <div class="rectangle" v-for="room in rooms" :key="room.room_id">
      <div class="rectangle-header">Комната No {{ room.room_id }}</div>
      <div class="rectangle-body">
        <p>Создатель: {{ room.creator_username || 'Не назначен' }}</p>
        <p>Игрок: {{ room.player_username || 'Ожидается' }}</p>
      </div>
      <button v-if="!room.player_username" @click="this.joinRoom(room.room_id)" class="grButton">PLAY</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      rooms: [],
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      axios.get('http://192.168.1.70:3000/get_rooms')
          .then(response => {
            this.rooms = response.data.rooms; // Предположим, что это массив объектов комнат
          })
          .catch(error => {
            console.error("Ошибка при получении данных комнат", error);
          });
    },
    joinRoom(room_id) {
      const player_username = localStorage.getItem('user-name'); // Замените на действительное имя пользователя
      axios.post('http://192.168.1.70:3000/join_room', { room_id, player_username })
          .then(response => {
            console.log(response.data.message); // Обработка успешного присоединения
            this.getRooms(); // Обновите список комнат после присоединения
          })
          .catch(error => {
            console.error("Ошибка при присоединении к комнате", error);
          });
    }
  },
};
</script>



<style scoped>
#rectangle-container {
  display: flex;
  flex-wrap: wrap;
  padding-left: 70px; /* Отступ от левого края для всего контейнера */
  transition: margin-left 0.5s, filter 0.5s;
  z-index: 10;
}

.rectangle {
  margin: 10px; /* Отступ между прямоугольниками */
  width: calc(33.333% - 20px); /* Ширина каждого прямоугольника */
  height: 200px; /* Удвоенная высота каждого прямоугольника */
  background-color: #D9D9D9;
}

.rectangle-header {
  background-color: #595959; /* Темно-серый фон */
  color: white; /* Белый текст */
  padding: 10px; /* Отступы вокруг текста */
  width: 100%; /* Ширина заголовка равна ширине прямоугольника */
}

.rectangle-body {
  padding: 10px;
  height: calc(100% - 80px);
  color: #333; /* Цвет текста для тела прямоугольника */
}

.grButton {
  width: 100%;
  bottom: 0;
  padding: 10px 20px;
  background-color: #00d100;
  border: 0 solid #6cf96c;
  cursor: pointer;
}

.grButton:hover {
  background-color: lightgreen;
}

#sidebar.expanded ~ #rectangle-container {
  filter: blur(4px);
}

</style>

