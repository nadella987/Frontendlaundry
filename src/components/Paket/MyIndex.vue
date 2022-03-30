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
                  <h1 class="card-title">Data Paket</h1>
                 
                  <div class="table-responsive">
                        <table class="table table-striped">
                                        
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Jenis</th>
                                                    <th>Harga</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               <tr v-for="(p, index) in paket" :key="p.id_paket">
                                                   <td>{{ index + 1 }}</td>
                                                   <td>{{ p.jenis }}</td>
                                                   <td>{{ "Rp " + p.harga }}</td>
                                                   <td>
                                                      
                                                       <button type="button" class="btn btn-warning btn-rounded btn-icon">
                                                            <router-link :to="{name : 'editpaket' ,params :{id :  p.id_paket }}">
                                                        <i class="ti-pencil"></i>
                                                        </router-link>
                                                        </button>
                                                      
                                                        <!-- <button type="button" @click="hapus(p.id_paket)" class="btn btn-danger btn-rounded btn-icon"><i class="ti-trash"></i></button> -->
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
            paket : {}
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
        
        this.axios.get('/paket', { headers : { 'Authorization' : 'Bearer ' + this.$store.state.token} })
                  .then( res => {
                      this.paket = res.data.data
                  })
                  .catch(err => console.log(err))
    },
    methods : {
        hapus(id_paket) {
            this.axios.delete(`/paket/${id_paket}`, { headers : { 'Authorization' : 'Bearer ' + this.$store.state.token} })
                      .then( () => {
                          let i = this.paket.map(item => item.id_paket).indexOf(id_paket);
                          this.paket.splice(i, 1);
                      });
        }
    }
}
</script>