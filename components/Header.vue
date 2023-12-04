<script setup lang="ts">
const searchInput = ref("");
const emit = defineEmits();
const handleSubmit = () => {
  const filter = searchInput.value;
  emit("filterByName", filter);
};

const showAllCourses = () => {
  emit("filterByName", "");
};

const filterByType = (value: string) => {
  emit("filterByType", value);
};

const filterByModality = (value: string) => {
  emit("filterByModality", value);
};
</script>

<template>
  <div class="nav-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/">
          <img
            src="~/assets/img/logo-grupo.png"
            alt="Logo grupo integrado"
            class="logo"
          />
        </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <form class="d-flex" @submit.prevent="handleSubmit">
            <input
              v-model="searchInput"
              class="form-control me-2"
              type="search"
              placeholder="Digite o nome do curso"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Procurar
            </button>
          </form>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <a class="nav-item" href="/"> Home </a>
            <HeaderMenuItem
              @click="showAllCourses()"
              :title="'Todos os cursos'"
            />
            <HeaderMenuItem
              @click="filterByType('Graduação')"
              :title="'Graduação'"
            />
            <HeaderMenuItem
              @click="filterByType('Pós-graduação')"
              :title="'Pós-graduação'"
            />
            <HeaderMenuItem @click="filterByModality('EAD')" :title="'EAD'" />
            <HeaderMenuItem
              @click="filterByModality('Presencial')"
              :title="'Presencial'"
            />
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="sass">
.nav-container
  display: flex
  width: 100%
  justify-content: center
  align-items: center

.form-control
  &:focus
    outline: none

.d-flex
  padding: 1rem 0

.logo
  width: 8rem

.navbar
  width: 100%
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.45)

.container-fluid
  width: 90%

.d-flex
  justify-content: space-between

.navbar-nav
  justify-content: flex-end
  justify-content: flex-start
  gap: 1rem
  margin-left: 1rem

.btn-outline-success
  background-color: #173154
  color: #FFFFFF
  border: none
  &:hover
    background-color: #ec952d
    color: #FFFFFF

.nav-item-text
  text-decoration: none
  color: #173154
  &:hover
    color: #ec952d

.navbar-collapse
  flex-grow: 0
  width: 100%

@media screen and (min-width: 992px)
  .d-flex
    width: 40%
    padding: 0
    position: relative

  .navbar-nav
    width: 60%
    height: auto
    justify-content: flex-end

  .nav-item
    width: auto
    border: none
    padding: 0
</style>
