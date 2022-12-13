<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Permisos Vistas Roles</div>
        </div>

        <!-- Entrada de datos -->
        <div class="form-group">
            <input type="hidden" v-model="id">

            <label class="form-label mt-1">Roles</label>
            <select class="form-select" v-model="rolId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listRole" :key="item.id" :value="item.id">{{ item.nombre }}</option>
            </select>

            <label class="form-label mt-1">Vistas</label>
            <select class="form-select" v-model="vistaId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listView" :key="item.id" :value="item.id">{{ item.nombre }}</option>
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
                        <th>Rol</th>
                        <th>Vista</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.rolId.nombre }}</td>
                        <td>{{ item.vistaId.nombre }}</td>
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
    name: 'RolePermissionView',

    data() {
        return {
            id: 0,
            rolId: '',
            vistaId: '',
            listData: [],
            listRole: [],
            listView: []
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/viewRole').then(result => {
                this.listData = result.data
            });

            axios.get('http://132.145.204.101:8009/api/role').then(result => {
                this.listRole = result.data
            });

            axios.get('http://132.145.204.101:8009/api/view').then(result => {
                this.listView = result.data
            })
        },
        findByid: function (id) {
            // metodo para consutlar por el ig del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/viewRole/' + id).then(result => {
                this.id = result.data.id;
                this.rolId = result.data.rolId.id;
                this.vistaId = result.data.vistaId.id;
                this.estado = (result.data.estado == true ? 1 : 0);
            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            axios.delete('http://132.145.204.101:8009/api/viewRole/' + id).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: "'El registro se eliminó de forma correcta.'",
                    showConfirmButton: false,
                    timer: 1500
                });
                this.loadData();
            })
        },
        dataAdd: function () {
            let data = {
                rolId: {
                    id: this.rolId
                },
                vistaId: {
                    id: this.vistaId
                }
            };
            axios.post('http://132.145.204.101:8009/api/viewRole', data).then(result => {
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
                rolId: {
                    id: this.rolId
                },
                vistaId: {
                    id: this.vistaId
                }
            };
            axios.put('http://132.145.204.101:8009/api/viewRole/' + this.id, data).then(result => {
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
        clearList: function () {
            this.id = 0,
                this.id = '',
                this.rolId = '',
                this.vistaId = '',
                this.listData = [],
                this.listRole = [],
                this.listView = []
        }
    }
}

</script>