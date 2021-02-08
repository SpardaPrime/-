<template>
  <div>
    <div class="head-coontact">
      <h1>Contact {{+userIndex+1}}</h1>
      <div class="btn-forward">
        <button
          title="позволяет сделать возврат исходных данных до редактирования(1 шаг)"
          :class="disabledBtn"
          class="btn-show-addContactModal"
          @click="forwardStep"
        >Шаг назад</button>
      </div>
    </div>

    <div ref="inpModal" class="add-pole-modal">
      <div>
        <div>
          <h3>Вы действительно хотите сохранить поле?</h3>
        </div>
        <div>
          <h3>поле: {{inpKey}}</h3>
        </div>
        <div>
          <h3>значение: {{inpValue}}</h3>
        </div>

        <div class="del-modal-action">
          <button @click="addNewPoleforUser">Да</button>
          <button @click="closeModalAddUser">Нет</button>
        </div>
      </div>
    </div>
    <div ref="inpDelModal" class="add-pole-modal">
      <div>
        <div>
          <h3>Удалить поле ?</h3>
        </div>
        <div>
          <h3>поле: {{delKey}}, значение: {{user[delKey]}}</h3>
        </div>
        <div class="del-modal-action">
          <button @click="delUserPole">Да</button>
          <button @click="closedelUserPole">Нет</button>
        </div>
      </div>
    </div>

    <div>
      <div class="contact-container">
        <div class="contact-lists" v-for="(val, key) in user" :key="key">
          <div>
            <h3>{{key}}</h3>
          </div>
          <div>
            <h4>{{val}}</h4>
          </div>
          <div class="contact-action" v-if="key=='Name'">
            <button @click="showChangeList">Редактировать</button>
          </div>
          <div class="contact-action" v-else-if="key=='Surname'">
            <button @click="showChangeList">Редактировать</button>
          </div>
          <div class="contact-action" v-else-if="key=='Number'">
            <button @click="showChangeList">Редактировать</button>
          </div>
          <div class="contact-action" v-else>
            <button @click="showChangeList">Редактировать</button>
            <button @click="deletePole(key)">Удалить</button>
          </div>

          <div class="contact-list-change">
            <div class="contact-list-input" v-if="key =='Name'">
              <label :for="'key'+ key">
                Поле
                <span class="add-pole-span">(Это поле нельзя изменить)</span>
              </label>
              <input :data-key="key" :id="'key'+ key" type="text" :value="key" disabled />
            </div>
            <div class="contact-list-input" v-else-if="key =='Surname'">
              <label :for="'key'+ key">
                Поле
                <span class="add-pole-span">(Это поле нельзя изменить)</span>
              </label>
              <input :data-key="key" :id="'key'+ key" type="text" :value="key" disabled />
            </div>
            <div class="contact-list-input" v-else-if="key =='Number'">
              <label :for="'key'+ key">
                Поле
                <span class="add-pole-span">(Это поле нельзя изменить)</span>
              </label>
              <input :data-key="key" :id="'key'+ key" type="text" :value="key" disabled />
            </div>
            <div class="contact-list-input" v-else>
              <label :for="'key'+ key">Поле</label>
              <input :data-key="key" :id="'key'+ key" type="text" :value="key" />
            </div>
            <div class="contact-list-input">
              <label :for="'val'+ val">Значение</label>
              <input :data-val="val" :id="'val'+ val" type="text" :value="val" />
            </div>
            <div class="contact-change-action">
              <button @click="enterChange">Сохранить</button>
              <button @click="exitChange">Отмена</button>
            </div>
            <div class="list-cancel-modal">
              <div>
                <p>Вы хотите отменить редактирование?</p>
              </div>
              <div>
                <button @click="btnTrueExitChange">Да</button>
                <button @click="btnFalseExitChange">Нет</button>
              </div>
            </div>
            <div class="list-cancel-modal">
              <div>
                <p>Вы подтверждаете редактирование?</p>
              </div>
              <div>
                <button @click="changeUser">Да</button>
                <button @click="cancelBtnChange">Нет</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="btn-show-addContactModal" @click="addNewPol">Добавить полe</button>

      <div class="add-new-pole">
        <div class="add-new-input">
          <label for="add-key">
            Поле
            <span class="add-pole-span">(должно быть уникальным)</span>
          </label>
          <input
            :data-key="inpKey"
            id="add-key"
            type="text"
            v-model="inpKey"
            placeholder="Введите поле"
          />
        </div>
        <div class="add-new-input">
          <label for="add-val">Значение</label>
          <input
            :data-val="inpValue"
            id="add-val"
            type="text"
            v-model="inpValue"
            placeholder="Введите значение"
          />
        </div>
        <div class="contact-change-action">
          <button @click="showAddModal">Сохранить</button>
          <button @click="closeAddModal">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: "",
      oldUser: "",
      users: "",
      userIndex: "",
      classNmaeShowMod: "contact-list-change-show",
      inpKey: "",
      inpValue: "",
      delKey: "",
      disabledBtn: "disabled"
    };
  },
  methods: {
    showChangeList(event) {
        //Добавление класса для отображения элемента
      let targ = event.target.parentNode.nextElementSibling;
      if (!targ) {
        return;
      }
      targ.classList.add(this.classNmaeShowMod);
    },
    exitChange(event) {
        //Добавление класса для отображения элемента
      let targ = event.target.parentNode.nextElementSibling;
      if (!targ) {
        return;
      }
      targ.classList.add(this.classNmaeShowMod);
    },
    btnTrueExitChange(event) {
        //Удаление класса для закрытия
      event.target.parentNode.parentNode.classList.remove(
        this.classNmaeShowMod
      );
      event.target.parentNode.parentNode.parentNode.classList.remove(
        this.classNmaeShowMod
      );
    },
    enterChange(event) {
        //Добавление класса для отображения элемента
      let targ = event.target.parentNode.nextElementSibling.nextElementSibling;
      targ.classList.add(this.classNmaeShowMod);
    },
    cancelBtnChange(event) {
        //Удаление класса для закрытия
      event.target.parentNode.parentNode.classList.remove(
        this.classNmaeShowMod
      );
    },
    btnFalseExitChange(event) {
        //Удаление класса для закрытия
      event.target.parentNode.parentNode.classList.remove(
        this.classNmaeShowMod
      );
    },
    changeUser(event) {
        //изменение полей пользователя
      let inputs = event.target.parentNode.parentNode.parentNode.querySelectorAll(
        "input"
      );
      let fstModal = event.target.parentNode.parentNode;
      let secModal = fstModal.parentNode;
      let inpKey = inputs[0].value;
      let inpDataKey = inputs[0].dataset.key;
      let inpVal = inputs[1].value;
      let inpDataVal = inputs[1].dataset.val;
      this.disabledBtn = "";
      this.oldUser = { ...this.user };
      let changeUser = {};
      for (let [key, value] of Object.entries(this.user)) {
        if (key == inpDataKey) {
          changeUser[inpKey] = inpVal;
        } else {
          changeUser[key] = value;
        }
      }
      this.user = changeUser;
      fstModal.classList.remove(this.classNmaeShowMod);
      secModal.classList.remove(this.classNmaeShowMod);

     
    },
    addNewPol(event) {
        //Переключение поля вкл.выкл
      event.target.nextElementSibling.classList.toggle(
        "contact-list-change-show"
      );
    },
    showAddModal() {
      if (!this.inpKey || !this.inpValue) {
        return;
      }
      let resolution = true;

      for (let key of Object.keys(this.user)) {
        if (key == this.inpKey) {
          resolution = false;
        }
      }
      if (!resolution) return;
      this.$refs.inpModal.classList.add("del-modal-on");
    },
    addNewPoleforUser() {
        //добавление нового поля к обьекту
      this.disabledBtn = "";
      this.oldUser = { ...this.user };
      this.user = { ...this.user, [this.inpKey]: this.inpValue };
      this.inpKey = "";
      this.inpValue = "";
      this.closeModalAddUser();
    },
    closeModalAddUser() {
        //закрытие модального окна
      this.$refs.inpModal.classList.remove("del-modal-on");
      this.inpKey = "";
      this.inpValue = "";
    },
    closeAddModal(event) {
        //закрытие модального окна
      event.target.parentNode.parentNode.classList.remove(
        "contact-list-change-show"
      );
    },
    deletePole(key) {
        //добавление класса для отображения элемента
      this.$refs.inpDelModal.classList.add("del-modal-on");
      this.delKey = key;
    },
    delUserPole() {
        //удаление поля пользователя
      this.disabledBtn = "";
      this.oldUser = { ...this.user };
      let user = { ...this.user };
      delete user[this.delKey];
      this.user = { ...user };
      this.delKey = "";
      this.closedelUserPole();
    },
    closedelUserPole() {
      this.$refs.inpDelModal.classList.remove("del-modal-on");
    },
    forwardStep() {
        //откат данных на шаг до изменений и блокировка кнопки
      if (!this.oldUser) return;
      this.user = { ...this.oldUser };
      this.oldUser = "";
      this.disabledBtn = "disabled";
    }
  },
  created() {
      //добавление данных и добавление заглавной буквы ключам
    let idx = this.$route.params["id"];
    
    let users = JSON.parse(window.localStorage.getItem("users"));
    let newUser = { ...users[idx] };
    let user = {};
    for (let [key, value] of Object.entries(newUser)) {
      key = key[0].toUpperCase() + key.slice(1);
      user[key] = value;
    }

    this.users = users;
    this.userIndex = idx;
    this.user = user;
  },
  computed: {},
  watch: {
    user: function() {
        //при изменении контакта пуш на локальное хранилище
      let user = { ...this.user };
      let users = JSON.parse(JSON.stringify(this.users));
      let i = +this.userIndex;
      let newUsers = [...users.slice(0, i), user, ...users.slice(i + 1)];
      window.localStorage.setItem("users", JSON.stringify(newUsers));
    }
  }
};
</script>