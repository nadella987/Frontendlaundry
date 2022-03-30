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
                  <h4 class="card-title">Tambah Data Transaksi</h4>
                  <p class="card-description">
                   masukkan data transaksi yang ingin ditambah
                  </p>
                    <form @submit.prevent="tambah">
                                        <div class="form-group">
                                            <label>Jenis Paket</label>
                                            <select class="form-control" v-model="detail_transaksi.id_paket">
                                                <option v-for="(p, index) in paket" :key="index" :value="p.id_paket">{{ p.jenis }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Jumlah (kg / satuan)</label>
                                            <input type="text" class="form-control" v-model="detail_transaksi.qty">
                                        </div>
                                        <input type="hidden" v-model="detail_transaksi.id_transaksi">
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
            id_transaksi : this.$route.params.id,
            paket : {},
            detail_transaksi : {}
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
        
        this.axios.get('/paket', { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
             .then( (res) => {
                    this.paket = res.data.data
                    this.detail_transaksi.id_transaksi = this.id_transaksi
             })
             .catch(err => console.log(err))
    },    
    methods : {
        tambah() {
            this.axios.post('/transaksi/detail/tambah', this.detail_transaksi, { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} })
                      .then( () => {
                          this.$router.push({ name : 'detailtransaksi', params : this.id_transaksi});
                      })
                      .catch( err => console.log(err))
        }
    } 
}
</script>