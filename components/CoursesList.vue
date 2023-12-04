<script setup lang="ts">

const props = defineProps(["filteredCourses", "filterName"]);
const emit = defineEmits();
const showRegister = () => {
  emit("showRegister", true)
}

</script>


<template>
  <div class="course-list-container">
    <div class="course-list-wrapper">
      <h1 class="course-list-title">{{ filterName ? filterName : 'Todos os cursos' }}</h1>
      <ul  v-if="filteredCourses && filteredCourses.length > 0">
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
          @showRegister="showRegister"
        />
      </ul>
      <p v-else>Curso não encontrado</p>
    </div>
  </div>
</template>


<style lang="sass">
.course-list-container
  background-color: #f0f0f0
  display: flex
  width: 100%
  padding: 0 1rem
  justify-content: center
  align-items: center
  flex-direction: column

.course-list-wrapper
    display: flex
    flex-direction: column
    width: 90%

.course-list-title
  padding: 1.5rem 0
  font-weight: 600
ul
  display: flex
  flex-wrap: wrap
  width: 100%
  align-items: center
  justify-content: center
  gap: 1rem
p
  margin-top: 1rem
  text-align: center
</style>
