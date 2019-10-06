<template>
<div class="container">
  <h1>Ola mundo!</h1>
    <router-link :to="{name: 'signup'}">
        <button class="btn btn-primary">Cadastrar</button>
    </router-link>
    <br>
    <br>
    <router-link :to="{name: 'signin'}">
        <button class="btn btn-primary">Entrar</button>
    </router-link>

</div>

</template>

<script>
export default {

}
</script>

<style>

</style>