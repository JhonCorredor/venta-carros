<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro roles</div>
        </div>

        <!-- Entrada de datos -->
        <div class="form-group">
            <label class="form-label mt-1">Código</label>
            <input type="hidden" v-model="id">
            <input type="text" class="form-control" v-model="codigo" placeholder="Ingresar Código">

            <label class="form-label mt-1">Nombre</label>
            <input type="text" class="form-control" v-model="nombre" placeholder="Ingresar Nombre">

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
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.codigo }}</td>
                        <td>{{ item.nombre }}</td>
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
    name: 'RoleView',

    data() {
        return {
            id: 0,
            codigo: '',
            nombre: '',
            estado: '',
            listData: [],
            listValidar: []
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/role').then(result => {
                this.listData = result.data
            })
            axios.get('http://132.145.204.101:8009/api/viewRole').then(result => {
                this.listValidar = result.data
            })
        },
        findByid: function (id) {
            // metodo para consutlar por el ig del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/role/' + id).then(result => {
                this.id = result.data.id;
                this.codigo = result.data.codigo;
                this.nombre = result.data.nombre;
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
                        axios.delete('http://132.145.204.101:8009/api/role/' + id).then(() => {
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
                    text: 'Error, registro tiene asociado un permiso al rol.'
                })
            }
        },
        dataAdd: function () {
            let data = {
                codigo: this.codigo,
                nombre: this.nombre,
                estado: parseInt(this.estado)
            };
            axios.post('http://132.145.204.101:8009/api/role', data).then(result => {
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
                codigo: this.codigo,
                nombre: this.nombre,
                estado: parseInt(this.estado)
            };
            axios.put('http://132.145.204.101:8009/api/role/' + this.id, data).then(result => {
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
        validarReferencia: function (id) {
            var bandera = true;

            this.listValidar.forEach((item, index) => {
                if (item.rolId.id == id) {
                    bandera = false
                }
                console.log(index)
            })
            return bandera;

        },
        clearList: function () {
            this.id = 0,
                this.codigo = '',
                this.nombre = '',
                this.estado = '',
                this.listData = []
        }
    }
}

</script>