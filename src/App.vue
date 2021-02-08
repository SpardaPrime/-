<template>
  <div class="body">
    <div class="header">
      <h1>Книгa контактов</h1>
      <router-link active-class="active" exact class tag="a" to="/">
        <h2>Главная</h2>
      </router-link>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (!window.localStorage.getItem("users")) {
      let base = [
        {
          Name: "Данил",
          Surname: "Меншаков",
          Number: "38098376596",
          email: "sob@gmail.com"
        },
        {
          Name: "Иван",
          Surname: "Мерзов",
          Number: "380989666793",
          email: "der@gmail.com"
        },
        {
          Name: "Павел",
          Surname: "Екимов",
          Number: "380989666793",
          email: "qar@gmail.com"
        },
        {
          Name: "Владислав",
          Surname: "Войтех",
          Number: "38023489666793",
          email: "qwe@mail.com"
        }
      ];
      window.localStorage.setItem("users", JSON.stringify(base));
    }
  }
};
</script>

