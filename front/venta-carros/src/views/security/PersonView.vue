<template>
    <div class="container">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Registro personas</div>
        </div>

        <!-- Entrada de datos -->
        <div class="form-group">
            <label class="form-label mt-1">Tipo de documento</label>
            <select class="form-select" v-model="tipo_documento">
                <option disabled :selected="true" value="">--Seleccione--</option>
                <option value="1">Cedula de ciudadania</option>
                <option value="0">Tarjeta de identidad</option>
            </select>

            <label class="form-label mt-1">Numero de documento</label>
            <input type="text" class="form-control" v-model="documento" placeholder="Ingresar numero documento">

            <label class="form-label mt-1">Primer nombre</label>
            <input type="text" class="form-control" v-model="primerNombre" placeholder="Ingresar primer nombre">

            <label class="form-label mt-1">Segundo nombre</label>
            <input type="text" class="form-control" v-model="segundoNombre" placeholder="Ingresar el segundo nombre">

            <label class="form-label mt-1">Primer apellido</label>
            <input type="text" class="form-control" v-model="primerApellido" placeholder="Ingresar primer apellido">

            <label class="form-label mt-1">Segundo apellido</label>
            <input type="text" class="form-control" v-model="segundoApellido" placeholder="Ingresar segundo apellido">

            <label class="form-label mt-1">Correo electronico</label>
            <input type="text" class="form-control" v-model="correo" placeholder="Ingresar el correo">

            <label class="form-label mt-1">Celular</label>
            <input type="number" class="form-control" v-model="celular" placeholder="Ingresar el celular">

            <label class="form-label mt-1">Direccion</label>
            <input type="text" class="form-control" v-model="direccion" placeholder="Ingresar dirección">

            <label class="form-label mt-1">Barrio</label>
            <input type="text" class="form-control" v-model="barrio" placeholder="Ingresar barrio">

            <label class="form-label mt-1">Ciudades</label>
            <select class="form-select" v-model="ciudadId">
                <option disabled :selected="true" value="">-- Seleccione --</option>
                <option v-for="item in listCities" :key="item.id" :value="item.id">{{ item.nombre }}</option>
            </select>

            <label class="form-label mt-1">estado</label>
            <select class="form-select" v-model="estado">
                <option disabled :selected="true" value="">--Seleccione--</option>
                <option value="1">activo</option>
                <option value="0">inactivo</option>
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
                        <th>Tipo documento</th>
                        <th>documento</th>
                        <th>Primer nombre</th>
                        <th>Segundo nombre</th>
                        <th>primer apellido</th>
                        <th>Segundo apellido</th>
                        <th>Correo</th>
                        <th>Celular</th>
                        <th>Dirección</th>
                        <th>Barrio</th>
                        <th>Ciudad</th>
                        <th>estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData" :key="item.id">
                        <td>{{ item.tipo_documento == true ? 'TI' : 'CC' }}</td>
                        <td>{{ item.documento }}</td>
                        <td>{{ item.primerNombre }}</td>
                        <td>{{ item.segundoNombre }}</td>
                        <td>{{ item.primerApellido }}</td>
                        <td>{{ item.segundoApellido }}</td>
                        <td>{{ item.correo }}</td>
                        <td>{{ item.celular }}</td>
                        <td>{{ item.direccion }}</td>
                        <td>{{ item.barrio }}</td>
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
    name: 'PersonView',

    data() {
        return {
            id: 0,
            tipo_documento: '',
            documento: '',
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: '',
            correo: '',
            celular: '',
            direccion: '',
            barrio: '',
            estado: '',
            listData: [],
            listCities: [],
            listValidar: []

        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://132.145.204.101:8009/api/personas').then(result => {
                this.listData = result.data
            })
            axios.get('http://132.145.204.101:8009/api/parameter/cities').then(result => {
                this.listCities = result.data
            })
            axios.get('http://132.145.204.101:8009/api/user').then(result => {
                this.listValidar = result.data
            })

        },
        findByid: function (id) {
            // metodo para consutlar por el id del boton impreso en la vista
            axios.get('http://132.145.204.101:8009/api/person/' + id).then(result => {
                this.id = result.data.id;
                this.tipo_documento = (result.data.tipo_documento == true ? 1 : 0);
                this.documento = result.data.documento;
                this.primerNombre = result.data.primerNombre;
                this.segundoNombre = result.data.segundoNombre;
                this.primerApellido = result.data.primerApellido;
                this.segundoApellido = result.data.segundoApellido;
                this.correo = result.data.correo;
                this.celular = result.data.celular;
                this.direccion = result.data.direccion;
                this.barrio = result.data.barrio;
                this.ciudadId = result.data.ciudadId.id
                this.estado = (result.data.estado == true ? 1 : 0);
            })
        },
        deleteById: function (id) {
            // metodo para eliminar el registro por ID
            var bandera = this.validarReferencia(id);
            if (bandera == true) {
                axios.delete('http://132.145.204.101:8009/api/person/' + id).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: "'El registro se eliminó de forma correcta.'",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.loadData();
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error, registro está asociado a un usuario.'                    
                })
            }

        },
        dataAdd: function () {
            let data = {
                tipo_documento: this.tipo_documento,
                documento: this.documento,
                primerNombre: this.primerNombre,
                segundoNombre: this.segundoNombre,
                primerApellido: this.primerApellido,
                segundoApellido: this.segundoApellido,
                correo: this.correo,
                celular: this.celular,
                direccion: this.direccion,
                barrio: this.barrio,
                ciudadId: {
                    id: this.ciudadId
                },
                estado: parseInt(this.estado)
            };
            axios.post('http://132.145.204.101:8009/api/person/', data).then(result => {
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
                tipo_documento: this.tipo_documento,
                documento: this.documento,
                primerNombre: this.primerNombre,
                segundoNombre: this.segundoNombre,
                primerApellido: this.primerApellido,
                segundoApellido: this.segundoApellido,
                correo: this.correo,
                celular: this.celular,
                direccion: this.direccion,
                barrio: this.barrio,
                ciudadId: {
                    id: this.ciudadId
                },
                estado: parseInt(this.estado)

            };
            axios.put('http://132.145.204.101:8009/api/person/' + this.id, data).then(result => {
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
                if (item.personaId.id == id) {
                    bandera = false
                }
                console.log(index)
            })
            return bandera;

        },
        clearList: function () {
            this.id = 0,
                this.tipo_documento = '',
                this.documento = '',
                this.primerNombre = '',
                this.segundoNombre = '',
                this.primerApellido = '',
                this.segundoApellido = '',
                this.correo = '',
                this.celular = '',
                this.direccion = '',
                this.barrio = '',
                this.estado = '',
                this.listData = []
        }
    }
}

</script>
