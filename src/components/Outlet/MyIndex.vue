<template>
<div class="container-fluid page-body-wrapper">
      <sidebar-component></sidebar-component>
      <navbar-component></navbar-component>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin">
             <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h1 class="card-title">Data Outlet</h1>
                 
                  <div class="table-responsive">
                      <div class="form-group">
							
									</div>
                                            <router-link to="/outlet/tambah" class="btn btn-info btn-icon-split">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-plus"></i>
                                                </span>
                                                <span class="text">Tambah</span>                                        
                                            </router-link>                     
                    <table class="table table-striped">
                      <thead>
                        <tr>
                                                    <th>No.</th>
                                                    <th>Nama</th>
                                                    <th>Alamat</th>
                                                    <th>Aksi</th>
                                                </tr>
                      </thead>
                    <tbody>
                                               <tr v-for="(o, index) in outlet" :key="o.id">
                                                   <td>{{ index + 1 }}</td>
                                                   <td>{{ o.nama_outlet }}</td>
                                                   <td>{{ o.alamat }}</td>
                                                   <td>
                                                       <button type="button" class="btn btn-warning btn-rounded btn-icon">
                                                        <router-link :to="{name : 'editoutlet' ,params :{id : o.id}}">
                                                        <i class="ti-pencil"></i>
                                                        </router-link>
                                                        </button>
                                                            <button type="button" @click="hapus(o.id)" class="btn btn-danger btn-rounded btn-icon">
                                                                                <i class="ti-trash"></i></button>
                                                    </td>
                                                    
                                               </tr>
                                            </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
</div>
 
</template>

<script>
export default {
    data() {
        return {
            outlet : {}
        }
    },
    created() {
        var data = JSON.parse(this.$store.state.datauser)
        var role = data.role
        if(role == 'kasir' || role == 'owner')
        {
            this.$swal("Anda tidak dapat mengakses halaman ini")
            this.$router.push('/') 
        }
        
        this.axios.get('/outlet', { headers : { 'Authorization' : 'Bearer ' + this.$store.state.token} })
                  .then( res => {
                      this.outlet = res.data
                  })
    },
    methods : {
        hapus(id_outlet) {
             this.$swal({
             title: "Hapus Data Member",
               text: "Apakah anda yakin menghapus data member ini?",
               icon: 'waning',
               showDenyButton: true,
               //showCancelButton: "false",
               confirmButtonText: "Ya",
               denyButtonText: "Tidak",

             }).then((result) => {
               console.log(result)
               if(result.isConfirmed){
                 this.axios
                        .delete(`/outlet/${id_outlet}`, {
                        headers: { Authorization: "Bearer " + this.$store.state.token },
                        })
                        .then((res) => {
                        if(res.data.success) {
                        this.$swal("Sukses", res.data.message, "success")
                        let i = this.outlet.map((item) => item.id_outlet).indexOf(id_outlet);
                        this.outlet.splice(i, 1);
                        this.getData()
                        
                        // this.$swal(res.data.message)
                        }
                    })
               } else {
                   this.$swal({
                       title: "Batal",
                       text : 'Data Member tidak jadi dihapus',
                       icon: 'error',
                       confirmButtonText: "OK"
                   })
               }
           })
        }
      
    }

}
        
</script>