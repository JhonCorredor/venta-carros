<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro Bodegas</div>
        </div>

        <!-- Entrada de datos -->
        <div class="form-group">
            <label class="form-label mt-1">Nombre</label>
            <input type="hidden" v-model="id">
            <input type="text" class="form-control" v-model="nombre" placeholder="Ingresar nombre de la bodega">

            <label class="form-label mt-1">Direccion</label>
            <input type="text" class="form-control" v-model="direccion" placeholder="Ingresar la direccion">


            <label class="form-label mt-1">Ciudad</label>
            <select class="form-select" v-model="ciudadId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listCities" :key="item.id" :value="item.id">{{ item.nombre }}</option>
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
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.direccion }}</td>
                        <td>{{ item.ciudadId.nombre }}</td>
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
    name: 'WarehouseView',
    data() {
        return {
            id: 0,
            codigo: '',
            nombre: '',
            direccion: '',
            ciudadId: '',
            estado: '',
            listData: [],
            listCities: []
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/inventory/warehouse').then(result => {
                this.listData = result.data
            })
            axios.get('http://132.145.204.101:8009/api/parameter/cities').then(result => {
                this.listCities = result.data
            })
        },
        findByid: function (id) {
            // metodo para consutlar por el ig del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/inventory/warehouse/' + id).then(result => {
                this.id = result.data.id;
                this.nombre = result.data.nombre;
                this.direccion = result.data.direccion;
                this.ciudadId = result.data.ciudadId.id;
                this.estado = (result.data.estado == true ? 1 : 0);
            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            axios.delete('http://132.145.204.101:8009/api/inventory/warehouse/' + id).then(() => {
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
                nombre: this.nombre,
                direccion: this.direccion,
                ciudadId: {
                    id: this.ciudadId
                },
                estado: parseInt(this.estado)
            };
            axios.post('http://132.145.204.101:8009/api/inventory/warehouse', data).then(result => {
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
                nombre: this.nombre,
                direccion: this.direccion,
                ciudadId: {
                    id: this.ciudadId
                },
                estado: parseInt(this.estado)
            };
            axios.put('http://132.145.204.101:8009/api/inventory/warehouse/' + this.id, data).then(result => {
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
                this.nombre = '',
                this.direccion = '',
                this.ciudadId = '',
                this.estado = '',
                this.listCities = [],
                this.listData = []
        }
    }
}

</script>