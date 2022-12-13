<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Tienda Virtual</a>
        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav me-auto">

            <!-- Módulo de seguridad -->
            <li class="nav-item dropdown">              
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
                aria-expanded="false">Seguridad</a>
              <div class="dropdown-menu">
                <div class="dropdown-divider"></div>
                <router-link to="/registro-personas" class="dropdown-item">Registro de Personas</router-link>
                <router-link to="/registro-usuarios" class="dropdown-item">Registro de Usuarios</router-link>
                <router-link to="/registro-clientes" class="dropdown-item">Registro de Clientes</router-link>
                <div class="dropdown-divider"></div>
                <router-link to="/registro-roles" class="dropdown-item">Registro de Roles del Sistema</router-link>
                <router-link to="/registro-vistas" class="dropdown-item">Registro de Vistas del Sistema</router-link>
                <div class="dropdown-divider"></div>
                <router-link to="/asignar-roles-usuarios" class="dropdown-item">Asignar Roles a los Usuario</router-link>
                <router-link to="/asignar-vistas-roles" class="dropdown-item">Asignar Vistas a los Roles</router-link>
              </div>              
            </li>

            <!-- Módulo de Parámetros -->
            <li class="nav-item dropdown">              
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
                aria-expanded="false">Parámetro</a>
              <div class="dropdown-menu">
                <div class="dropdown-divider"></div>
                <router-link to="/registro-continentes" class="dropdown-item">Registro de Continetes</router-link>
                <router-link to="/registro-paises" class="dropdown-item">Registro de Paises</router-link>
                <router-link to="/registro-departamentos" class="dropdown-item">Registro de Departamentos</router-link>
                <router-link to="/registro-ciudades" class="dropdown-item">Registro de Ciudades</router-link>
              </div>              
            </li>                     
          </ul>
          <form class="d-flex">
            <input class="form-control me-sm-2" type="text" placeholder="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
  <router-view />
</template>

<style>
.container {
  margin-top: 2%;
}
</style>
