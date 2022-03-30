<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <sidebar-component></sidebar-component>
      <navbar-component></navbar-component>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin">
              <div class="d-flex justify-content-between align-items-center">
                    <div class="container-fluid">
                        <!-- Page Heading -->
                        <h1 class="h3 mb-4 text-gray-800">Data User</h1>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card shadow mb-4">                                
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <router-link to="/user/tambah" class="btn btn-info btn-icon-split">
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
                                                    <th>Role</th>
                                                    <th>Outlet</th>
                                                    <th>Aksi</th>
                                         
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="(u, index) in users" :key="u.id">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ u.name }}</td>
                                                    <td>{{ u.role }}</td>
                                                    <td>{{ u.nama_outlet }}</td>
                                                    <td>
                                                       <button type="button" class="btn btn-warning btn-rounded btn-icon">
                                                           <router-link :to="{ name : 'edituser' , params :{ id : u.id}}">
                                                             <i class="ti-pencil"></i>
                                                             </router-link>
                                                        </button>
                                                        
                                                        <button type="button" @click="hapus(u.id)" class="btn btn-danger btn-rounded btn-icon"><i class="ti-trash"></i></button>
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
        </div>
      </div>
    </div>
  </div>
  
 
</template>

<script>
export default {
    data() {
        return {
            users : {}
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
        
        this.axios.get('/user', { headers : { 'Authorization' : 'Bearer ' + this.$store.state.token} })
                  .then(res => {
                      this.users = res.data
                  })
                  .catch(err => console.log(err))
    },
    methods : {
        hapus(id) {
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
                        .delete(`/user/${id}`, {
                        headers: { Authorization: "Bearer " + this.$store.state.token },
                        })
                        .then((res) => {
                        if(res.data.success) {
                        this.$swal("Sukses", res.data.message, "success")
                        let i = this.users.map((item) => item.id).indexOf(id);
                        this.users.splice(i, 1);
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
