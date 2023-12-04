<template>
  <div class="register-bg">
    <RegisterFirstStep
      v-if="registerStep === '1'"
      @toStep2="toStep2"
      @newUser="handleNewUser"
      @showRegister="closeModal"
    />
    <RegisterSecondStep
      v-if="registerStep === '2'"
      :userData="userData"
      @toStep3="toStep3"
      @newUser="handleNewUser"
      @showRegister="closeModal"
    />
    <RegisterThirdStep
      v-else-if="registerStep === '3'"
      :userData="userData"
      @showRegister="closeModal"
    />
    <Upload />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits();
const userData = ref({});
const registerStep = ref("1");

const toStep2 = () => {
  registerStep.value = "2";
};

const toStep3 = () => {
  registerStep.value = "3";
};

const handleNewUser = (newUser: any) => {
  userData.value = newUser;
};

const closeModal = () => {
  emit("showRegister", false);
};
</script>

<style lang="sass">
.register-bg
  display: flex
  position: fixed
  top: 0
  left: 0
  height: 100vh
  width: 100vw
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 5
  justify-content: center
  align-items: center
</style>
