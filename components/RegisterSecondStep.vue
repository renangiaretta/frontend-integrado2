<template>
  <div class="register-second-container">
    <button class="close-btn" @click="closeRegister">X</button>
    <form class="register-second-form" @submit.prevent="handleSubmit">
      <h2 class="register-second-title">Inscrição (2/3)</h2>
      <div class="register-second-wrapper">
        <label class="register-second-label" for="cep">CEP</label>
        <div class="register-second-input-wrapper">
          <input
            v-maska:[cepMask]
            class="register-second-input"
            v-model="formData.cep"
            type="text"
            id="cep"
            name="cep"
            placeholder="Digite seu CEP"
          />
          <span
            class="register-second-error"
            v-for="error in v$.cep.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
          <span v-if="invalidCep" class="register-second-error">
            CEP inválido
          </span>
        </div>
      </div>
      <div class="register-second-wrapper">
        <label class="register-second-label" for="city">Cidade (*Preenchimento automático)</label>
        <div class="register-second-input-wrapper">
          <input
            class="register-second-input blocked"
            v-model="formData.city"
            type="text"
            id="city"
            name="city"
            placeholder="Cidade"
            readonly
          />
        </div>
        <div class="register-second-wrapper">
          <label class="register-second-label" for="state">Estado (*Preenchimento automático)</label>
          <div class="register-second-input-wrapper">
            <input
              class="register-second-input blocked"
              v-model="formData.state"
              type="text"
              id="state"
              name="state"
              placeholder="Estado"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="register-second-wrapper">
        <label class="register-second-label" for="cpf">CPF</label>
        <div class="register-second-input-wrapper">
          <input
            class="register-second-input"
            v-model="formData.cpf"
            v-maska:[cpfMask]
            type="text"
            id="cpf"
            name="cpf"
            placeholder="Digite seu CPF"
          />
          <span
            class="register-second-error"
            v-for="error in v$.cpf.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
          <span v-if="cpfAlreadyRegistered" class="register-first-error">
            CPF já registrado
          </span>
        </div>
      </div>
      <div class="register-second-wrapper">
        <label class="register-second-label" for="birthdate"
          >Data de nascimento</label
        >
        <div class="register-second-input-wrapper">
          <input
            class="register-second-input"
            v-model="formData.birthdate"
            v-maska:[birthdateMask]
            type="text"
            id="birthdate"
            name="birthdate"
            placeholder="Digite seu telefone"
          />
          <span
            class="register-second-error"
            v-for="error in v$.birthdate.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </span>
        </div>
      </div>
      <button class="register-second-btn" type="submit">Prosseguir</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";
import { vMaska } from "maska";
import axios from "axios";

const emit = defineEmits();
const props = defineProps(["userData"]);
const invalidCep = ref(false);
const cpfAlreadyRegistered = ref(false);

const formData = reactive({
  cep: "",
  cpf: "",
  birthdate: "",
  city: "",
  state: "",
  courses: [],
});

const cepMask = reactive({
  mask: "#####-###",
  eager: true,
});

const cpfMask = reactive({
  mask: "###.###.###-##",
  eager: true,
});

const birthdateMask = reactive({
  mask: "##/##/####",
  eager: true,
});

const validateBirthdate = (dataString: string) => {
  const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const newBirthdateString = dataString.match(regexData);

  if (!newBirthdateString) {
    return false;
  }

  const [, dd, mm, aaaa] = newBirthdateString;
  const thisYear = new Date().getFullYear();
  if (!(parseInt(aaaa) >= 1920 && parseInt(aaaa) <= thisYear)) {
    return false;
  }
  const month = parseInt(mm);
  if (!(month >= 1 && month <= 12)) {
    return false;
  }
  const daysPerMonth = [0];
  for (let i = 1; i <= 12; i++) {
    daysPerMonth[i] =
      i === 2
        ? leapYear(parseInt(aaaa))
          ? 29
          : 28
        : [4, 6, 9, 11].includes(i)
        ? 30
        : 31;
  }
  const day = parseInt(dd);
  if (!(day >= 1 && day <= daysPerMonth[month])) {
    return false;
  }

  return true;
};
function leapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const verifyCep = async (cep: string) => {
  const numberCep = cep.replace("-", "");
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${numberCep}/json/`
    );
    console.log(response);
    response.data.localidade
      ? (formData.city = response.data.localidade)
      : null;
    response.data.uf ? (formData.state = response.data.uf) : null;
    response.data.erro === true
      ? (invalidCep.value = true)
      : (invalidCep.value = false);
    if (response.data.erro === true) {
      return true;
    } else {
      invalidCep.value = false;
    }
  } catch (error) {
    console.error(error);
    return true;
  }
};

function higherAge(dataString: string) {
  const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const numberBirthdate = dataString.match(regexData);

  if (!numberBirthdate) {
    return false;
  }

  const [, dd, mm, aaaa] = numberBirthdate;

  const birthdate = new Date(`${aaaa}-${mm}-${dd}`);
  const limitAge = new Date();
  limitAge.setFullYear(limitAge.getFullYear() - 18);

  return birthdate <= limitAge;
}

const rules = computed(() => {
  return {
    cep: {
      required: helpers.withMessage("Insira o CEP", required),
      minLength: helpers.withMessage("Insira um CEP válido", minLength(9)),
    },
    cpf: {
      required: helpers.withMessage("Insira um CPF", required),
      minLength: helpers.withMessage("Insira um CPF válido", minLength(14)),
    },
    birthdate: {
      required: helpers.withMessage("Insira a data de nascimento", required),
      validateBirthdate: helpers.withMessage(
        "Insira uma data válida",
        validateBirthdate
      ),
      higherAge: helpers.withMessage(
        "Necessário ter ao menos 18 anos.",
        higherAge
      ),
    },
  };
});

const dateStringToDate = (dataString: string) => {
  const [dd, mm, aaaa] = dataString.split("/");
  const formatedDate = `${aaaa}-${mm}-${dd}T00:00:00.000Z`;
  console.log(formatedDate);
  return formatedDate;
};

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  const invalidCep = await verifyCep(formData.cep);
  if (!invalidCep && result) {
    try {
      const stringToDate = dateStringToDate(formData.birthdate);
      const { data, status, error } = await useFetch(
        "http://localhost:8000/users/" + props.userData.id,
        {
          method: "PATCH",
          body: { ...formData, birthdate: stringToDate },
          onRequestError: (error) => console.error(error),
          onResponseError: (response) => {
            response.response._data.message === "CPF já cadastrado."
              ? (cpfAlreadyRegistered.value = true)
              : (cpfAlreadyRegistered.value = false);
          },
        }
      );
      if (status.value === "success") {
        emit("toStep3", "3");
        emit("userData", data.value);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const closeRegister = () => {
  emit("showRegister", false);
};
</script>

<style lang="sass">
.register-second-container
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
.register-second-form
  display: flex
  height: 100%
  flex-direction: column
  justify-content: space-between
  padding: 1rem 2rem
  gap: 0.5rem
  border: 2px solid rgba(0, 0, 0, 0.1)
  border-radius: 8px
.register-second-title
  font-weight: 600
  text-align: center
.register-second-wrapper
  display: flex
  flex-direction: column
  gap: 0.2rem
.register-second-label
  font-weight: 600
.register-second-input-wrapper
  display: flex
  flex-direction: column
.register-second-input
  border: none
  background-color: rgba(0, 0, 0, 0.05)
  padding: 0.3rem 1rem
  border-radius: 5px
.blocked
  background-color: rgba(0, 0, 0, 0.18)
  &:focus
    outline: none

.register-second-error
  color: red
  font-size: 0.8rem
.register-second-btn
  padding: 0.5rem 1rem
  border: none
  background-color: #ABFD0E
  border-radius: 6px
  font-weight: 600

@media screen and (min-width: 720px)
  .register-second-container
    width: 40%
  .register-second-form
    width: 100%
</style>
