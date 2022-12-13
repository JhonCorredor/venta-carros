<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro Productos</div>
        </div>
        
        <!--ENTRADA DE DATOS-->
        <div class="form-group">
            <label class="form-label mt-1">Nombre</label>
            <input type="hidden" v-model="id">
            <input type="text" class="form-control" v-model="nombre" placeholder="Ingresar Nombre:">

            <label class="form-label mt-1">Descripción</label>
            <input type="text" class="form-control" v-model="descripcion" placeholder="Ingresar Descripción:">

            <label class="form-label mt-1">Estado</label>
            <select class="form-select" v-model="estado">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>

            <label class="form-label mt-1">Marca</label>
            <select class="form-select" v-model="marcaId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listBrand" :key="item.id" :value="item.id">{{ item.nombre }}</option>
            </select>

            <label class="form-label mt-1">Categoria</label>
            <select class="form-select" v-model="categoriaId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listCategory" :key="item.id" :value="item.id">{{ item.nombre }}</option>
            </select>

            <label class="form-label mt-1">Unidad de Medida</label>
            <select class="form-select" v-model="unidadMedidaId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listUnitMeasure" :key="item.id" :value="item.id">{{ item.nombre }}</option>
            </select>

        </div>


        <!--ACCIONES DEL FORMULARIO-->

        <div>
            <br>
            <button type="button" class="btn btn-success" @click="dataAdd();">Agregar</button>
            <button type="button" class="btn btn-warning" @click="dataUpdate();">Modificar</button>
        </div>
        <div>
            <br>
            <table class="display table table-hover">
                <thead>
                    <tr class="table-info">
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Unidad de Medida</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.descripcion }}</td>
                        <td>{{ item.marcaId.nombre }}</td>
                        <td>{{ item.categoriaId.nombre }}</td>
                        <td>{{ item.unidadMedidaId.nombre }}</td>
                        <td>{{ item.estado == true ? 'Activo' : 'Inactivo' }} </td>
                        <td><button @click="findById(item.id)">➤</button></td>
                        <td><button @click="deleteById(item.id)">➤</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: 'ProductView',
    data() {
        return {
            id: 0,
            nombre: '',
            descripcion: '',
            estado: '',
            marcaId: '',
            categoriaId: '',
            unidadMedidaId: '',
            listData: [],
            listBrand: [],
            listCategory: [],
            listUnitMeasure: []

        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/inventory/product').then(result => {
                this.listData = result.data
            })
            axios.get('http://132.145.204.101:8009/api/inventory/brand').then(result => {
                this.listBrand = result.data
            })
            axios.get('http://132.145.204.101:8009/api/inventory/category').then(result => {
                this.listCategory = result.data
            })
            axios.get('http://132.145.204.101:8009/api/inventory/unitMeasure').then(result => {
                this.listUnitMeasure = result.data
            })
        },
        findById: function (id) {
            // metodo para consultar por el id del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/inventory/product/' + id).then(result => {
                this.id = result.data.id;
                this.nombre = result.data.nombre;
                this.descripcion = result.data.descripcion;
                this.marcaId = result.data.marcaId.id;
                this.categoriaId = result.data.categoriaId.id;
                this.unidadMedidaId = result.data.unidadMedidaId.id;
                this.estado = (result.data.estado == true ? 1 : 0);
            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            axios.delete('http://132.145.204.101:8009/api/inventory/product/' + id).then(() => {
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
            // metodo para agregar un registro 
            let data = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                marcaId: {
                    id: this.marcaId
                },
                categoriaId: {
                    id: this.categoriaId
                },
                unidadMedidaId: {
                    id: this.unidadMedidaId
                },
                estado: parseInt(this.estado)

            };
            axios.post('http://132.145.204.101:8009/api/inventory/product', data).then(result => {
                if (result.data) {
                    Swal.fire({
                        icon: 'success',
                        title: "'El registro se guardo de forma correcta.'",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.loadData();
                    this.clearList();
                }
            });

        },
        dataUpdate: function () {
            // metodo para editar un registro por ID
            let data = {
                id: this.id,
                nombre: this.nombre,
                descripcion: this.descripcion,
                marcaId: {
                    id: this.marcaId
                },
                categoriaId: {
                    id: this.categoriaId
                },
                unidadMedidaId: {
                    id: this.unidadMedidaId
                },
                estado: parseInt(this.estado),
            };
            axios.put('http://132.145.204.101:8009/api/inventory/product/' + this.id, data).then(result => {
                if (result.data) {
                    Swal.fire({
                        icon: 'success',
                        title: "'El registro se modifico de forma correcta.'",
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
                this.marcaId = '',
                this.categoriaId = '',
                this.unidadMedidaId = '',
                this.listData = [],
                this.listBrand = [],
                this.listCategory = [],
                this.listUnitMeasure = []
        }
    }
}

</script>
 