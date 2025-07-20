<script setup lang="ts">
import { UiButton, UiFormGroup, UiInput } from '@shgk/vue-course-ui'
import { ref } from 'vue'
import MeetupsAuthForm from '../components/MeetupsAuthForm.vue'
import LayoutAuth from '../components/LayoutAuth.vue'
import { login } from '../api.ts'
import { useRoute, useRouter } from 'vue-router'

const email = ref('demo@email')
const password = ref('password')

const router = useRouter();
const route = useRoute();

async function onSubmit() {
  try {
    await login(email.value, password.value)
    
    // Авторизация прошла успешно
    if (route.query.from) {
      //Что-то здесь непонятное с типами. route.query.from должно быть строкой. Но IDE говорит что это LocationQueryValue[]
      //Так оно, похоже и есть, если в query написать что-то вроде ?from=x&from=y... 
      //Т.е нужно выяснять тип route.query.from, и если это Array, то брать, скажем первый элемент.
      //Но в целом это очень противоестественно. Потомуто просто привел тип чтобы успокоить IDE.
      router.push(String(route.query.from));
    } else {
      router.push({name: 'index'});  
    }

  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <LayoutAuth title="Вход">
    <MeetupsAuthForm @submit="onSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" large required />
      </UiFormGroup>

      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" large required />
      </UiFormGroup>

      <template #submit>
        <UiButton kind="primary" type="submit" wide size="large">Войти</UiButton>
      </template>

      <template #append>
        Нет аккаунта?
        <RouterLink :to="{name: 'register'}">Зарегистрируйтесь</RouterLink>
      </template>
    </MeetupsAuthForm>
  </LayoutAuth>
</template>
