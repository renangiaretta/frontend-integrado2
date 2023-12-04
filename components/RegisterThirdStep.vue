<template>
  <div class="register-third-container">
    <button class="close-btn" @click="closeRegister">X</button>
    <form class="register-third-form" @submit.prevent="finishRegister">
      <h2 class="register-third-title">Inscrição (3/3)</h2>
      <label class="register-third-label" for="upload"
        >Upload de documento</label
      >
      <input
        v-if="uploaded === false"
        class="register-third-input"
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        @change="uploadFile"
      />
      <div
        v-if="uploading"
        class="spinner-border text-primary"
        role="status"
      ></div>
      <div class="register-third-img-container" v-if="imageUrl">
        <nuxt-img
          class="register-third-img"
          :src="imageUrl[0]"
          alt="Imagem Enviada"
        />
      </div>
      <button class="register-third-btn" type="submit" :disabled="!uploaded">
        Enviar
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const props = defineProps(["userData"]);

const { $toast } = useNuxtApp();

const showToast = () => {
  $toast.success("Inscrição realizada com sucesso!");
};

interface FormDataObject {
  images: File | null;
}
const formData: Ref<FormDataObject> = ref({
  images: null,
});
const imageUrl: Ref<string[] | null> = ref(null);
const emit = defineEmits();
const closeRegister = () => {
  emit("showRegister", false);
};

const showSuccessNotification = ref(false);
const uploaded = ref(false);
const uploading = ref(false);

const uploadFile = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    formData.value.images = input.files[0];
  }
  if (formData.value.images) {
    const formDataToSend = new FormData();
    formDataToSend.append("images", formData.value.images);

    try {
      uploading.value = true;
      const response = await axios.post(
        "http://localhost:8000/upload",
        formDataToSend
      );
      imageUrl.value = response.data;
      uploaded.value = true;
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    } finally {
      uploading.value = false;
    }
  } else {
    console.error("Nenhum arquivo selecionado");
  }
};

const finishRegister = async () => {
  try {
    const response = await axios.patch(
      "http://localhost:8000/users/" + props.userData.id,
      {
        document: [imageUrl.value![0]],
        courses: [],
      }
    );
    showSuccessNotification.value = true;
    showToast();
    emit("showRegister", false);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="sass">
.register-third-container
  display: flex
  background-color: #FFFFFF
  width: 80%
  height: 95%
  padding: 2.5rem
  justify-content: center
  align-items: center
  position: relative
  border-radius: 8px
  z-index: 20
.close-btn
  display: flex
  position: absolute
  top: 0.5rem
  right: 0.5rem
  justify-content: center
  align-items: center
  padding: 0.2rem 0.5rem
  border: 2px solid rgba(0, 0, 0, 0.2)
  background-color: inherit
  color: rgba(0, 0, 0, 0.4)
  border-radius: 8px
  font-size: 0.7rem
.register-third-form
  display: flex
  flex-direction: column
  padding: 3rem 2rem
  gap: 1.5rem
  border: 2px solid rgba(0, 0, 0, 0.1)
  border-radius: 8px
  height: 100%
.register-third-title
  font-weight: 600
  text-align: center
.register-third-label
  font-weight: 600
.register-third-input
  border: none
  background-color: rgba(0, 0, 0, 0.05)
  padding: 0.5rem 1rem
  border-radius: 5px
.register-third-img-container
  display: flex
  width: 100%
  height: 60%
.register-third-img
  display: flex
  width: 100%
  height: 100%
.register-third-btn
  padding: 0.5rem 1rem
  border: none
  background-color: #ABFD0E
  border-radius: 6px
  font-weight: 600
.show-success
  display: flex
  justify-content: center
  align-items: center
  padding: 2rem
  border: 2px solid green

@media screen and (min-width: 720px)
  .register-third-container
    width: 40%
  .register-third-form
    width: 100%
</style>
