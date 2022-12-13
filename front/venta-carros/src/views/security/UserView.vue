<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro usuarios</div>
        </div>

        <!-- Entrada de datos -->
        <div class="form-group">
            <label class="form-label mt-1">Usuario</label>
            <input type="hidden" v-model="id">
            <input type="text" class="form-control" v-model="usuario" placeholder="Ingresar el usuario">

            <label class="form-label mt-1">Contraseña</label>
            <input type="text" class="form-control" v-model="contrasenia" placeholder="Ingresar la contraseña">


            <label class="form-label mt-1">Personas</label>
            <select class="form-select" v-model="personaId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listPerson" :key="item.id" :value="item.id">{{ item.primerNombre }}</option>
            </select>

            <label class="form-label mt-1">Estado</label>
            <select class="form-select" v-model="estado">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>
        </div>

        <!-- Acciones del formulario -->
        <div>
            <br>
            <button type="button" class="btn btn-success" @click="dataAdd();">Agregar</button>
            <button type="button" class="btn btn-warning" @click="dataUpdate();">Modificar</button>
        </div>

        <!-- Acciones del formulario -->
        <div>
            <br>
            <table class="display table table-hover">
                <thead>
                    <tr class="table-info">
                        <th>Usuario</th>
                        <th>Contraseña</th>
                        <th>Persona</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.usuario }}</td>
                        <td>{{ item.contrasenia }}</td>
                        <td>{{ item.personaId.primerNombre }}</td>
                        <td>{{ item.estado == true ? 'Activo' : 'Inactivo' }}</td>
                        <td><button @click="findByid(item.id)">➤</button></td>
                        <td><button @click="deleteById(item.id)">➤</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import { onMounted, inject } from 'vue'
import Swal from 'sweetalert2'

export default {
    name: 'UserView',

    data() {
        return {
            id: 0,
            usuario: '',
            contrasenia: '',
            personaId: '',
            estado: '',
            listData: [],
            listPerson: [],
            listValidarCliente: [],
            listValidarUserRole: []
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/user').then(result => {
                this.listData = result.data
            });
            axios.get('http://132.145.204.101:8009/api/person').then(result => {
                this.listPerson = result.data
            });
            axios.get('http://132.145.204.101:8009/api/client').then(result => {
                this.listValidarCliente = result.data
            });
            axios.get('http://132.145.204.101:8009/api/userRole').then(result => {
                this.listValidarUserRole = result.data
            });
        },
        findByid: function (id) {
            // metodo para consutlar por el ig del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/user/' + id).then(result => {
                this.id = result.data.id;
                this.usuario = result.data.usuario;
                this.contrasenia = result.data.contrasenia;
                this.personaId = result.data.personaId.id;
                this.estado = (result.data.estado == true ? 1 : 0);
            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            var bandera = this.validarReferencia(id);
            if (bandera == true) {

                Swal.fire({
                    title: 'Esta usted seguro de eliminar?',
                    text: "No pordrá revertir los cambios!",
                    icon: 'Advertencia',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete('http://132.145.204.101:8009/api/user/' + id).then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: "'El registro se eliminó de forma correcta.'",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.loadData();
                        })
                    }
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error, registro está asociado un cliente o permisos al rol.'
                })
            }
        },
        dataAdd: function () {
            let data = {
                usuario: this.usuario,
                contrasenia: this.contrasenia,
                personaId: {
                    id: this.personaId
                },
                estado: parseInt(this.estado)
            };
            axios.post('http://132.145.204.101:8009/api/user', data).then(result => {
                if (result.data) {
                    Swal.fire({
                        icon: 'success',
                        title: "'El registro se guardó de forma correcta.'",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.loadData();
                    this.clearList();
                }
            });

        },
        dataUpdate: function () {
            let data = {
                id: this.id,
                usuario: this.usuario,
                contrasenia: this.contrasenia,
                personaId: {
                    id: this.personaId
                },
                estado: parseInt(this.estado)
            };

            Swal.fire({
                title: '¿Esta seguro de realizar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `No guardar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.put('http://132.145.204.101:8009/api/user/' + this.id, data).then(result => {
                        if (result.data) {
                            Swal.fire({
                                icon: 'success',
                                title: "'El registro se guardó de forma correcta.'",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.loadData();
                            this.clearList();
                        }
                    });
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        },
        validarReferencia: function (id) {
            var bandera = true;
            var banderaCliente = true;
            var banderaUsuarioRol = true;

            this.listValidarCliente.forEach((item, index) => {
                if (item.usuarioId.id == id) {
                    banderaCliente = false
                }
                console.log(index)
            })

            this.listValidarUserRole.forEach((item, index) => {
                if (item.usuarioId.id == id) {
                    banderaUsuarioRol = false
                }
                console.log(index)
            })

            if (banderaCliente != true || banderaUsuarioRol != true) {
                bandera = false;
            }
            return bandera;

        },
        clearList: function () {
            this.id = 0,
                this.usuario = '',
                this.contrasenia = '',
                this.personaId = '',
                this.estado = '',
                this.listPerson = [],
                this.listData = []
        }
    }
}

</script>