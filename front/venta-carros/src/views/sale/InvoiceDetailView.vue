<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro Detalles Facturas</div>
        </div>
        <!--ENTRADA DE DATOS-->

        <div class="form-group">
           
            <label class="form-label mt-1">Valor Bruto</label>
            <input type="text" class="form-control" v-model="valorBruto" placeholder="Ingresar Valor Bruto:">

            <label class="form-label mt-1">Valor Neto</label>
            <input type="text" class="form-control" v-model="valorNeto" placeholder="Ingresar Valor Neto:">

            <label class="form-label mt-1">Iva</label>
            <input type="text" class="form-control" v-model="iva" placeholder="Ingresar Iva:">

            <label class="form-label mt-1">Descuento</label>
            <input type="text" class="form-control" v-model="descuento" placeholder="Ingresar Descuento:">

            <label class="form-label mt-1">Cantidad</label>
            <input type="text" class="form-control" v-model="cantidad" placeholder="Ingresar el Cantidad:">

            <label class="form-label mt-1">Factura</label>
            <select class="form-select" v-model="facturasId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listInvoice" :key="item.id" :value="item.id">{{item.numeroFactura}}</option>               
            </select>
        
            <label class="form-label mt-1">Producto</label>
            <select class="form-select" v-model="productoId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listProduct" :key="item.id" :value="item.id">{{item.nombre}}</option>               
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
                        <th>Valor Bruto</th>
                        <th>Valor Neto</th>
                        <th>Iva</th>
                        <th>Descuento</th>
                        <th>Cantidad</th>
                        <th>Factura</th>
                        <th>Producto</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.valorBruto }}</td>
                        <td>{{ item.valorNeto }}</td>
                        <td>{{ item.iva }}</td>
                        <td>{{ item.descuento }}</td>
                        <td>{{ item.cantidad}} </td>
                        <td>{{ item.facturasId.numeroFactura}} </td>
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
    name: 'InvoiceView',
    data() {
        return {
            id: 0,
            valorBruto: '',
            valorNeto: '',
            iva: '',
            descuento: '',
            cantidad: '',
            facturasId: '',
            productoId: '',
            listData: [],
            listInvoice:[],
            listProduct:[]
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/inventory/invoiceDetail').then(result => {
                this.listData = result.data
            })
            axios.get('http://132.145.204.101:8009/api/inventory/invoice').then(result => {
                this.listInvoice = result.data
            })
            axios.get('http://132.145.204.101:8009/api/inventory/product').then(result => {
                this.listProduct = result.data
            })
        },
        findById: function (id) {
            // metodo para consultar por el id del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/inventory/invoiceDetail/' + id).then(result => {
                this.id = result.data.id;
                this.valorBruto = result.data.valorBruto;
                this.valorNeto = result.data.valorNeto;
                this.iva = result.data.iva;
                this.descuento = result.data.descuento;
                this.cantidad = result.data.cantidad; 
                this.facturasId = result.data.facturasId.id;
                this.productoId = result.data.productoId.id
            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            axios.delete('http://132.145.204.101:8009/api/inventory/invoiceDetail/' + id).then(() => {
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
                valorBruto: this.valorBruto,
                valorNeto: this.valorNeto,
                iva: this.iva,
                descuento: this.descuento,
                cantidad: this.cantidad,
                facturasId: {
                    id:this.facturasId
                },
                productoId: {
                    id:this.productoId
                },

            };
            axios.post('http://132.145.204.101:8009/api/inventory/invoiceDetail', data).then(result => {
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
                valorBruto: this.valorBruto,
                valorNeto: this.valorNeto,
                iva: this.iva,
                descuento: this.descuento,
                cantidad: this.cantidad,
                facturasId: {
                    id:this.facturasId
                },
                productoId: {
                    id:this.productoId
                }

            };
            axios.put('http://132.145.204.101:8009/api/inventory/invoiceDetail/' + this.id, data).then(result => {
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
            this.valorBruto = '',
            this.valorNeto = '',
            this.iva = '',
            this.descuento = '',
            this.cantidad='',
            this.facturasId='',
            this.productoId='',
            this.listData = [],
            this.listInvoice=[],
            this.listProduct=[]
        }
    }
}

</script>
 