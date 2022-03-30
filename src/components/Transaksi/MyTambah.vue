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
                      <label>Member</label>
                      <select
                        class="form-control"
                        v-model="transaksi.id_member"
                      >
                        <option
                          v-for="(m, index) in member"
                          :key="index"
                          :value="m.id_member"
                        >
                          {{ m.nama_member }}
                        </option>
                      </select>
                    </div>
                    <button type="submit" class="btn btn-success btn-block">
                      Simpan
                    </button>
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
      member: {},
      transaksi: {},
    };
  },
  created() {
    var data = JSON.parse(this.$store.state.datauser);
    var role = data.role;
    if (role == "owner") {
      this.$swal("Anda tidak dapat mengakses halaman ini");
      this.$router.push("/");
    }

    this.axios
      .get('/member', {
        headers: { Authorization: `Bearer ` + this.$store.state.token },
      })
      .then((res) => {
        this.member = res.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    tambah() {
      this.axios
        .post('/transaksi', this.transaksi, {
          headers: { Authorization: `Bearer ` + this.$store.state.token },
        })
        .then( (res) => {
                          if(res.data.success) {
                              this.$swal("Sukses",res.data.message,"success")
                              this.$router.push('/transaksi');
                          }
                          else{
                              this.$router.push('/transaksi');
                          }
                      })
        .catch((err) => console.log(err));
    },
  },
};
</script>