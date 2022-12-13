<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro Marcas</div>
        </div>

        <!-- Entrada de datos -->
        <div class="form-group">
            <label class="form-label mt-1">Nombre</label>
            <input type="text" class="form-control" v-model="nombre" placeholder="Ingresar el nombre">

            <label class="form-label mt-1">Descripción</label>
            <input type="text" class="form-control" v-model="descripcion"
                placeholder="Ingresar una descripción">

            <label class="form-label mt-1">Estado</label>
            <select class="form-select" v-model="estado">
                <option disabled :selected="true" value="">--Seleccione--</option>
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
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.descripcion }}</td>
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
    name: 'BrandView',

    data() {
        return {
            id: 0,
            nombre: '',
            descripcion: '',
            estado: '',
            listData: []

        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/inventory/brand').then(result => {
                this.listData = result.data
            })

        },
        findByid: function (id) {
            // metodo para consutlar por el id del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/inventory/brand/' + id).then(result => {
                this.id = result.data.id;
                this.nombre = result.data.nombre;
                this.descripcion = result.data.descripcion;
                this.estado = (result.data.estado == true ? 1 : 0);
            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            axios.delete('http://132.145.204.101:8009/api/inventory/brand/' + id).then(() => {
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
                descripcion: this.descripcion,
                estado: parseInt(this.estado)
            };
            axios.post('http://132.145.204.101:8009/api/inventory/brand/', data).then(result => {
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
                descripcion: this.descripcion,
                estado: parseInt(this.estado)

            };
            axios.put('http://132.145.204.101:8009/api/inventory/brand/' + this.id, data).then(result => {
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
                this.descripcion = '',
                this.estado = '',
                this.listData = []
        }
    }
}

</script>