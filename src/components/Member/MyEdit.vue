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
                  <h4 class="card-title">Edit Data Member</h4>
                  <p class="card-description">
                    masukkan data yang ingin diubah
                  </p>
                   <form @submit.prevent="edit">
                    <div class="form-group">
                      <label for="exampleInputName1">Nama member</label>
                      <input type="text" class="form-control" id="exampleInputName1" placeholder="Masukkan nama member" v-model="member.nama_member">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputName1">Alamat member</label>
                      <input type="text" class="form-control" id="exampleInputName1" placeholder="Masukkan Alamat " v-model="member.alamat">
                    </div>
                    <div class="form-group">
                      <label for="exampleSelectGender">Jenis kelamin</label>
                        <select class="form-control" v-model="member.jenis_kelamin">
                          <option >Laki laki</option>
                          <option>Perempuan</option>
                        </select>
                      </div>
                      <div class="form-group">
                      <label for="exampleInputName1">No telp</label>
                      <input type="text" class="form-control" id="exampleInputName1" placeholder="Masukkan nomer telp" v-model="member.no_telp">
                    </div>
                    
                    <button type="submit" class="btn btn-primary me-2">Submit</button>
                    
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
            member : {}
        }
    },
    created() {
        var data = JSON.parse(this.$store.state.datauser)
        var role = data.role
        if(role == 'owner')
        {
            this.$swal("Anda tidak dapat mengakses halaman ini")
            this.$router.push('/') 
        }
        this.axios.get(`/member/${this.$route.params.id}`, { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
             .then((res) => {
                 this.member = res.data
             })
    },
    methods : {
        edit() {
            this.axios.put(`/member/${this.$route.params.id}`, this.member, { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                  .then( (res) => {
                      if(res.data.success) {
                          this.$swal("sukses",res.data.message, "success")
                          this.$router.push('/member');
                      }
                      else{
                              this.$router.push('/member');
                          }
                  })
                  .catch( err => console.log(err))
        }
    } 
}
</script>