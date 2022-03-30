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
                        <div class="row">
              <div class="col-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Edit Data User</h4>
                  <p class="card-description">
                    masukkan data yang ingin diubah
                  </p>
                <form @submit.prevent="edit">
                                        <div class="form-group">
                                            <label>Nama</label>
                                            <input type="text" class="form-control" v-model="users.name">
                                        </div>
                                        <div class="form-group">
                                            <label>Username</label>
                                            <input type="text" class="form-control" v-model="users.username">
                                        </div>                                        
                                        <!-- <div class="form-group">
                                            <label>Password</label>
                                            <input type="password" class="form-control" v-model="users.password">                                            
                                        </div> -->
                                        <div class="form-group">
                                            <label>Role</label>
                                            <select class="form-control" v-model="users.role">
                                                <option value="admin">Admin</option>
                                                <option value="kasir">Kasir</option>
                                                <option value="owner">Owner</option>
                                            </select>                                            
                                        </div>
                                        <div class="form-group">
                                            <label>Outlet</label>
                                            <select class="form-control" v-model="users.id_outlet">
                                                <option v-for="(o, index) in outlet" :key="index" :value="o.id">{{ o.nama_outlet }}</option>
                                            </select>                                            
                                        </div>
                                        <button type="submit" class="btn btn-success btn-block">Simpan</button>
                                    </form>
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
            users : {},
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
        
        this.axios.get(`/user/${this.$route.params.id}`, { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                  .then(res => {
                    
                      this.users = res.data
                  })
                  .catch(err => console.log(err))
        this.axios.get('/outlet', { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                  .then(res => {
                      this.outlet = res.data
                  })
                  .catch(err => console.log(err))
    },
    methods : {
        edit() {
            this.axios.put(`/user/${this.$route.params.id}`, this.users, { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                      .then((res) => {
                        if(res.data.success) {
                          this.$swal("Sukses",res.data.message,"success")
                          this.$router.push('/user');
                        }
                      })
                      
                      .catch( err => console.log(err))
        }
    } 
}
</script>