<template>
<div>
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet">
  <link
    href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
    rel="stylesheet"
  >
  <link href="../assets/demo/demo.css" rel="stylesheet">

  <div class>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md bg-default navbar-light">
      <div class="container">
        <a class="navbar-brand ml-2" href>
          <img src="logo.png" alt="Logo" style="width:60px;">
        </a>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <!-- Button entrar-->
            <li class="nav-item">
              <a href="#" class="btn bg-default" role="button" aria-pressed="true">Entrar</a>
            </li>
            <!-- /Button entrar-->
            <!-- Button Registrar-se-->
            <li class="nav-item">
              <a href="#" class="btn bg-default" role="button" aria-pressed="true">Registrar-se</a>
            </li>
            <!-- /Button Registrar-se-->
          </ul>
        </div>
      </div>
    </nav>
    <!-- /Navbar -->

    <div class="container">
      <div class="row mt-7">
        <div class="col-md-4 offset-md-4 form-div">
          <form action method="post">
            <!-- Mensagem de erro -->
            <div class="form-group">
              <div class="alert alert-danger">
                <span class="glyphicon glyphicon-info-sign text-center">Senha ou usuário inválidos</span>
              </div>
            </div>
            <!--Email-->
            <div class="form-group">
              <label for="input-email">Email</label>
              <input type="text" name="input-email" class="form-control form-control-lg" required>
            </div>
            <!--Senha-->
            <div class="form-group">
              <label for="input-senha">Senha</label>
              <input
                type="password"
                name="input-senha"
                class="form-control form-control-lg"
                required
              >
            </div>
            <!--Botão Entrar-->
            <div class="form-group">
              <button type="submit" name="btn-entrar" class="btn bg-default btn-block btn-lg">Entrar</button>
            </div>

            <!-- Texto você já possui conta e link -->
            <p class="text-center">
              Esqueceu sua
              <a href="#">senha</a> ?
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
export default {};
</script>
<style>
</style>
