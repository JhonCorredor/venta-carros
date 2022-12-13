<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro Inventarios</div>
        </div>
        <!--ENTRADA DE DATOS-->

        <div class="form-group">
            <label class="form-label mt-1">Valor Compra</label>
            <input type="hidden" v-model="id">
            <input type="text" class="form-control" v-model="valorCompra" placeholder="Ingresar Valor Compra:">

            <label class="form-label mt-1">Valor Venta</label>
            <input type="text" class="form-control" v-model="valorVenta" placeholder="Ingresar Valor Venta:">

            <label class="form-label mt-1">Iva</label>
            <input type="text" class="form-control" v-model="iva" placeholder="Ingresar Iva:">

            <label class="form-label mt-1">Descuento</label>
            <input type="text" class="form-control" v-model="descuento" placeholder="Ingresar Descuento:">

            <label class="form-label mt-1">Cantidad Stock</label>
            <input type="text" class="form-control" v-model="cantidadStock" placeholder="Ingresar Cantidad Stock:">

            <label class="form-label mt-1">Cantidad Minima</label>
            <input type="text" class="form-control" v-model="cantidadMinima" placeholder="Ingresar Cantidad Minima:">

            <label class="form-label mt-1">Cantidad Maxima</label>
            <input type="text" class="form-control" v-model="cantidadMaxima" placeholder="Ingresar Cantidad Maxima:">

            <label class="form-label mt-1">Bodega</label>
            <select class="form-select" v-model="bodegaId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listWarehouse" :key="item.id" :value="item.id">{{ item.nombre }}</option>
            </select>

            <label class="form-label mt-1">Producto</label>
            <select class="form-select" v-model="productoId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listProduct" :key="item.id" :value="item.id">{{ item.nombre }}</option>
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
                        <th>Valor Compra</th>
                        <th>Valor Venta</th>
                        <th>Iva</th>
                        <th>Descuento</th>
                        <th>Cantidad Stock</th>
                        <th>Cantidad Minima</th>
                        <th>Cantidad Maxima</th>
                        <th>Bodega</th>
                        <th>Producto</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.valorCompra }}</td>
                        <td>{{ item.valorVenta }}</td>
                        <td>{{ item.iva }}</td>
                        <td>{{ item.descuento }}</td>
                        <td>{{ item.cantidadStock }}</td>
                        <td>{{ item.cantidadMinima }}</td>
                        <td>{{ item.cantidadMaxima }}</td>
                        <td>{{ item.bodegaId.nombre }}</td>
                        <td>{{ item.productoId.nombre }}</td>
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
    name: 'InventoryView',
    data() {
        return {
            id: 0,
            valorCompra: '',
            valorVenta: '',
            iva: '',
            descuento: '',
            cantidadStock: '',
            cantidadMinima: '',
            cantidadMaxima: '',
            bodegaId: '',
            productoId: '',
            listData: [],
            listWarehouse: [],
            listProduct: []

        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/inventory/inventory').then(result => {
                this.listData = result.data
            })
            axios.get('http://132.145.204.101:8009/api/inventory/warehouse').then(result => {
                this.listWarehouse = result.data
            })
            axios.get('http://132.145.204.101:8009/api/inventory/product').then(result => {
                this.listProduct = result.data
            })
        },
        findById: function (id) {
            // metodo para consultar por el id del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/inventory/inventory/' + id).then(result => {
                this.id = result.data.id;
                this.valorCompra = result.data.valorCompra;
                this.valorVenta = result.data.valorVenta;
                this.iva = result.data.iva;
                this.descuento = result.data.descuento;
                this.cantidadStock = result.data.cantidadStock;
                this.cantidadMinima = result.data.cantidadMinima;
                this.cantidadMaxima = result.data.cantidadMaxima;
                this.bodegaId = result.data.bodegaId.id;
                this.productoId = result.data.productoId.id;

            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            axios.delete('http://132.145.204.101:8009/api/inventory/inventory/' + id).then(() => {
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
                valorCompra: this.valorCompra,
                valorVenta: this.valorVenta,
                iva: this.iva,
                descuento: this.descuento,
                cantidadStock: this.cantidadStock,
                cantidadMinima: this.cantidadMinima,
                cantidadMaxima: this.cantidadMaxima,
                bodegaId: {
                    id: this.bodegaId
                },
                productoId: {
                    id: this.productoId
                }
            };
            axios.post('http://132.145.204.101:8009/api/inventory/inventory', data).then(result => {
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
                valorCompra: this.valorCompra,
                valorVenta: this.valorVenta,
                iva: this.iva,
                descuento: this.descuento,
                cantidadStock: this.cantidadStock,
                cantidadMinima: this.cantidadMinima,
                cantidadMaxima: this.cantidadMaxima,
                bodegaId: {
                    id: this.bodegaId
                },
                productoId: {
                    id: this.productoId
                }
            };
            axios.put('http://132.145.204.101:8009/api/inventory/inventory/' + this.id, data).then(result => {
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
                this.valorVompra = '',
                this.valorVenta = '',
                this.iva = '',
                this.descuento = '',
                this.cantidadStock = '',
                this.cantidadMinima = '',
                this.cantidadMaxima = '',
                this.bodegaId = '',
                this.productoId = '',
                this.listData = [],
                this.listWarehouse = [],
                this.listProduct = []
        }
    }
}

</script>
 