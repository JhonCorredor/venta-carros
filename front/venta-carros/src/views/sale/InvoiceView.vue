<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro Facturas</div>
        </div>
        <!--ENTRADA DE DATOS-->

        <div class="form-group">
            <label class="form-label mt-1">Número de Factura</label>
            <input type="text" class="form-control" v-model="numeroFactura" placeholder="Ingresar Número  de Factura:">

            <label class="form-label mt-1">Valor Bruto</label>
            <input type="text" class="form-control" v-model="valorBruto" placeholder="Ingresar Valor Bruto:">

            <label class="form-label mt-1">Valor Neto</label>
            <input type="text" class="form-control" v-model="valorNeto" placeholder="Ingresar Valor Neto:">

            <label class="form-label mt-1">Iva</label>
            <input type="text" class="form-control" v-model="iva" placeholder="Ingresar Iva:">

            <label class="form-label mt-1">Descuento</label>
            <input type="text" class="form-control" v-model="descuento" placeholder="Ingresar Descuento:">

            <label class="form-label mt-1">Estado de Pago</label>
            <select class="form-select" v-model="estadoPago">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>

            <label class="form-label mt-1">Estado</label>
            <select class="form-select" v-model="estado">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>



            <label class="form-label mt-1">Cliente</label>
            <select class="form-select" v-model="clienteId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listCustomer" :key="item.id" :value="item.id">{{ item.codigo }}</option>
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
                        <th>Número de Factura</th>
                        <th>Valor Bruto</th>
                        <th>Valor Neto</th>
                        <th>Iva</th>
                        <th>Descuento</th>
                        <th>Estado de Pago</th>
                        <th>Estado</th>
                        <th>Cliente</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.numeroFactura }}</td>
                        <td>{{ item.valorBruto }}</td>
                        <td>{{ item.valorNeto }}</td>
                        <td>{{ item.iva }}</td>
                        <td>{{ item.descuento }}</td>
                        <td>{{ item.clienteId.codigo }}</td>
                        <td>{{ item.estadoPago == true ? 'Activo' : 'Inactivo' }} </td>
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
    name: 'InvoiceView',
    data() {
        return {
            id: 0,
            numeroFactura: '',
            valorBruto: '',
            valorNeto: '',
            iva: '',
            descuento: '',
            estadoPago: '',
            estado: '',
            clienteId: '',
            listData: [],
            listCustomer: []
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/inventory/invoice').then(result => {
                this.listData = result.data
            })
            axios.get('http://132.145.204.101:8009/api/security/client').then(result => {
                this.listCustomer = result.data
            })
        },
        findById: function (id) {
            // metodo para consultar por el id del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/inventory/invoice/' + id).then(result => {
                this.id = result.data.id;
                this.numeroFactura = result.data.numeroFactura;
                this.valorBruto = result.data.valorBruto;
                this.valorNeto = result.data.valorNeto;
                this.iva = result.data.iva;
                this.descuento = result.data.descuento;
                this.estadoPago = (result.data.estado == true ? 1 : 0);
                this.estado = (result.data.estado == true ? 1 : 0);
                this.clienteId = result.data.clienteId.id;
            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            axios.delete('http://132.145.204.101:8009/api/inventory/invoice/' + id).then(() => {
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
                numeroFactura: this.numeroFactura,
                valorBruto: this.valorBruto,
                valorNeto: this.valorNeto,
                iva: this.iva,
                descuento: this.descuento,
                estadoPago: parseInt(this.estado),
                estado: parseInt(this.estado),
                clienteId: {
                    id: this.clienteId
                },

            };
            axios.post('http://132.145.204.101:8009/api/inventory/invoice', data).then(result => {
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
                numeroFactura: this.numeroFactura,
                valorBruto: this.valorBruto,
                valorNeto: this.valorNeto,
                iva: this.iva,
                descuento: this.descuento,
                estadoPago: parseInt(this.estado),
                estado: parseInt(this.estado),
                clienteId: {
                    id: this.clienteId
                },
            };
            axios.put('http://132.145.204.101:8009/api/inventory/invoice/' + this.id, data).then(result => {
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
                this.numeroFactura = '',
                this.valorBruto = '',
                this.valorNeto = '',
                this.iva = '',
                this.descuento = '',
                this.estadoPago = '',
                this.estado = '',
                this.clienteId = '',
                this.listData = [],
                this.listCustomer=[]
        }
    }
}

</script>
 