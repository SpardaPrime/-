<template>
  <div>
    <h1>PhoneBook</h1>
    <button class="btn-show-addContactModal" @click="showAddModal">Добавить контакт</button>
    <div class="modal-add-contact" :class="addModal">
      <div class="add-contact-container">
        <button @click="closeAddModal" class="btn-close-modal">X</button>
        <h3>Добавить контакт</h3>
        <div>
          <label for="name">Имя</label>
          <input id="name" type="text" v-model="contName" placeholder="Введите имя" />
          <p class="err-add-contact" ref="cleanInpName">Вы не заполнили поле имя</p>
        </div>
        <div>
          <label for="surname">Фамилия</label>
          <input id="surname" type="text" v-model="contSurname" placeholder="Введите фамилию" />
          <p class="err-add-contact" ref="cleanInpSurname">Вы не заполнили поле фамилия</p>
        </div>
        <div>
          <label for="number">Номер</label>
          <input id="number" type="text" v-model="contNumber" placeholder="Введите номер" />
          <p class="err-add-contact" ref="cleanInpNumber">Вы не заполнили поле номер</p>
        </div>
        <div class="del-modal-action">
          <button @click="addContact">Добавить</button>
          <button @click="clearInput">Очистить поля</button>
        </div>
      </div>
    </div>

    <div class="list-container" v-if="users.length">
      <div @click="cancelDel" class="del-modal" :class="delModal">
        <div>
          <div>
            <h3>Вы действительно хотите удалить контакт ?</h3>
          </div>
          <div>
            <h3>{{delInfo.Surname}}</h3>
            <h3>{{delInfo.Name}}</h3>
            <h3>{{delInfo.Number}}</h3>
          </div>
          <div class="del-modal-action">
            <button @click="delContact">Yes</button>
            <button @click="cancelDel">No</button>
          </div>
        </div>
      </div>
      <div class="list" v-for="(user, i) in users" :key="i">
        <div class="list-info">
          <div>
            <h4>Фамилия</h4>
            <h4>{{user.Surname}}</h4>
          </div>
          <div>
            <hr />
            <hr />
          </div>
          <div>
            <h4>Имя</h4>
            <h4>{{user.Name}}</h4>
          </div>
          <div>
            <hr />
            <hr />
          </div>
          <div>
            <h4>Номер телефона</h4>
            <h4>{{user.Number}}</h4>
          </div>
          <div>
            <hr />
            <hr />
          </div>
        </div>

        <div class="link-next-page">
          <router-link tag="a" :to="'/contact/'+i">Контактная информация</router-link>
        </div>
        <div class="options-cart">
          <button @click="actionDelModal(i)">Delete</button>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>No contacts</h2>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      delIdx: "",
      delModal: "",
      contName: "",
      contSurname: "",
      contNumber: "",
      addModal: ""
    };
  },
  methods: {
    actionDelModal(idx) {
        //Получение индекса контакта
      this.delIdx = idx;
      this.delModal = "del-modal-on";
    },
    delContact() {
        //Удаление контакта
      this.users = [
        ...this.users.slice(0, this.delIdx),
        ...this.users.slice(this.delIdx + 1)
      ];
      this.delIdx = "";
      this.delModal = "";
    },
    cancelDel() {
        //Очистка индекса контакта
      this.delIdx = "";
      this.delModal = "";
    },
    addContact() {
        //Создание нового контакта
      const refs = this.$refs;
      const del = function(str) {
        refs[str].style.display = "block";
      };

      if (!this.contName && !this.contSurname && !this.contNumber) {
          //проверка на соответствие полей
        del("cleanInpName");
        del("cleanInpSurname");
        del("cleanInpNumber");
        return;
      }
      if (!this.contName && !this.contSurname) {
          //проверка полей
        del("cleanInpName");
        del("cleanInpSurname");
        return;
      }
      if (!this.contSurname && !this.contNumber) {
          //проверка полей
        del("cleanInpSurname");
        del("cleanInpNumber");
        return;
      }
      if (!this.contName && !this.contNumber) {
          //проверка полей
        del("cleanInpName");
        del("cleanInpNumber");
        return;
      }
      if (!this.contName) {
          //проверка поля
        del("cleanInpName");
        return;
      }
      if (!this.contSurname) {
          //проверка поля
        del("cleanInpSurname");
        return;
      }
      if (!this.contNumber) {
          //проверка поля
        del("cleanInpNumber");
        return;
      }
      //Создание нового обьекта и пуш в массив обьектов, закртие модальных окон
      const contact = {
        Name: this.contName,
        Surname: this.contSurname,
        Number: this.contNumber
      };
      this.users.push(contact);
      this.clearInput();
      this.closeAddModal();
    },
    clearInput() {
        //очистка полей
      this.contName = "";
      this.contSurname = "";
      this.contNumber = "";
    },
    watchInput(targ) {
        //фильтрация полей
      if (targ === "contNumber") {
        this[targ] = this[targ].replace(/\D/g, "");
      } else {
        this[targ] = this[targ].replace(/\d/g, "");
      }
    },
    showAddModal() {
        //добавление класса
      this.addModal = "show-flex";
    },
    closeAddModal() {
        //очистка класса
      this.addModal = "";
    }
  },
  computed: {
    delInfo() {
      return { ...this.users[this.delIdx] };
    }
  },
  watch: {
    contName: function() {
        //проверка на заполненость полей
      this.watchInput("contName");
      this.$refs.cleanInpName.style.display = "none";
    },
    contSurname: function() {
        //проверка на заполненость полей
      this.watchInput("contSurname");
      this.$refs.cleanInpSurname.style.display = "none";
    },
    contNumber: function() {
        //проверка на заполненость полей
      this.watchInput("contNumber");
      this.$refs.cleanInpNumber.style.display = "none";
    },
    users: function() {
        //пуш на локальное хранилище
      localStorage.setItem("users", JSON.stringify(this.users));
    }
  },
  created() {
      //проверка данных и загрузка с локального хранилища
    if (localStorage.getItem("users")) {
      this.users = JSON.parse(window.localStorage.getItem("users"));
    }
  }
};
</script>