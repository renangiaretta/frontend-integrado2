<script setup lang="ts">

const props = defineProps(["course"]);
const emit = defineEmits();
const handleClick = () => {
  emit("showRegister", true);
};

</script>


<template>
  <li @click="handleClick" class="course-card-container">
    <div class="course-card-img-wrapper">
      <nuxt-img
        v-if="course.image"
        :src="course.image"
        :alt="'imagem de capa de curso de ' + course.name"
        class="course-card-img"
      />
      <div class="course-card-name-wrapper">
        <span class="course-card-modality">{{ course.modality }}</span>
        <span class="course-card-type">{{ course.type }}</span>
        <h3 class="course-card-name">{{ course.name }}</h3>
        <div class="course-card-info-wrapper">
          <span class="course-card-duration"
            >{{ course.duration / 12 }} anos</span
          >
          <span class="course-card-installments"
            >{{ course.duration }}x R$
            {{ (course.price / course.duration).toFixed(2) }}</span
          >
        </div>
      </div>
    </div>
  </li>
</template>


<style lang="sass">
.course-card-container
    width: 17rem
    height: 23rem
    display: flex
    flex-direction: column
    cursor: pointer
    color: #FFFFFF
    transition: transform 0.2s ease-in-out
    overflow: hidden
    &:hover
        transform: scale(1.05)
        filter: brightness(1.2)

.course-card-img-wrapper
    position: relative
    display: flex
    width: 100%
    height: 100%
    overflow: hidden

.course-card-img
    display: flex
    width: 100%
    height: 100%
    border-radius: 6px
    &:hover
        filter: scale(1.2)

.course-card-name-wrapper
    position: absolute
    top: 0
    left: 0
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    padding: 1rem
    justify-content: flex-end
    background-color: rgba(0, 0, 0, 0.5)
    border-radius: 6px
    overflow: hidden

.course-card-info-wrapper
    display: flex
    width: 100%
    justify-content: space-between
    padding: 0.7rem 0

.course-card-modality
    position: absolute
    top: 0.5rem
    left: 0.5rem
    display: flex
    padding: 0.4rem
    border: 1px solid #FFFFFF
    justify-content: center

.course-card-duration
    display: flex
    justify-content: center
    align-items: center
    background-color: #ABFD0E
    color: #1a1a1a
    padding: 0.6rem
    font-weight: 600
    border-radius: 4px

.course-card-installments
    display: flex
    justify-content: center
    align-items: center
    background-color: #ABFD0E
    padding: 0.6rem
    font-weight: 600
    color: #1a1a1a
    border-radius: 4px
</style>
