<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <Header
        @filterByName="filterByName"
        @filterByType="filterByType"
        @filterByModality="filterByModality"
      />
      <BackgroundImage />
      <RegisterForm v-if="showRegister" @showRegister="setShowRegister" />
      <CoursesList
        class="bg"
        :filteredCourses="filteredCourses"
        @showRegister="setShowRegister"
        :filterName="filterName"
      />
    </NuxtLayout>
    <Footer />
  </div>
</template>

<script setup lang="ts">
interface Course {
  name: string;
  type: string;
  modality: string;
  image: string;
}

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
const scrollToCourses = () => {
  gsap.to(window, { duration: 0, scrollTo: ".bg", ease: "power3.inOut" });
};

const filterName = ref("Nossos Cursos");
const showRegister = ref(false);
const filteredCourses = ref<Array<Course>>([]);

const setFilterName = (name: string) => {
  filterName.value = name;
};

const { data: courses } = useFetch<Course[]>("http://localhost:8000/courses", {
  transform: (_courses) => _courses,
});

const normalizeString = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const filterByName = (name: string) => {
  scrollToCourses();
  setFilterName(name);
  const normalizedFilter = normalizeString(name.trim().toLowerCase());
  filteredCourses.value = (courses.value || []).filter((course) =>
    normalizeString(course.name.toLowerCase()).includes(normalizedFilter)
  );
};

const setShowRegister = (value: boolean) => {
  showRegister.value = value;
};

const filterByType = (type: string) => {
  scrollToCourses();
  setFilterName(type);
  filteredCourses.value = (courses.value || []).filter(
    (course) => course.type === type
  );
};

const filterByModality = (modality: string) => {
  scrollToCourses();
  setFilterName(modality);
  if (modality === "") {
    filteredCourses.value = courses.value || [];
  } else {
    filteredCourses.value = (courses.value || []).filter(
      (course) => course.modality === modality
    );
  }
};

onMounted(() => {
  filterByName("");
});
</script>
