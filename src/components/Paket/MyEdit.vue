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
                  <h4 class="card-title">Edit Data Outlet</h4>
                  <p class="card-description">
                    masukkan data yang mau di edit
                  </p>
                   <form @submit.prevent="edit">
                                        <div class="form-group">
                                            <label>Jenis Paket</label>
                                            <input type="text" class="form-control" v-model="paket.jenis" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label>Harga (Rp) </label>
                                            <input type="text" class="form-control" v-model="paket.harga">
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
            paket : {
                jenis : '',
                harga : '',
            }
        }
    },
    created() {
        this.axios
      .get(`http://127.0.0.1:8000/api/paket/${this.$route.params.id}`, {
        headers: { 'Authorization' : `Bearer ` + this.$store.state.token },
      })
      .then((res) => {
        this.paket = res.data;
      });
    },
    methods : {
        edit() {
            this.axios.put(`/paket/${this.$route.params.id}`, this.paket, { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                      .then((res) => {
                          if(res.data.success) {
                          this.$swal("sukses",res.data.message, "success")
                          this.$router.push('/paket');
                      }
                      else{
                              this.$router.push('/paket');
                          }
                  })
        }
    }
}
</script>