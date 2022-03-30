<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <sidebar-component></sidebar-component>
      <navbar-component></navbar-component>
      <div class="main-panel">
        <div class="content-wrapper">
           <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card position-relative">
                <div class="card-body">
                    <div class="row">
													<div class="col">
														<div class=" text-xs font-weight-bold text-primary text-uppercase ">Member</div>
														<!-- <div class="h6 mb-0 font-weight-bold text-gray-800 mb-2" v-for="m in member.filter(item => {item.id_member == transaksi.id_member})" :key="m.id_member">{{ m.nama_member }}</div> -->
														<div class=" h6 mb-0 font-weight-bold text-gray-800 mb-2 ">{{ transaksi.nama_member }}</div>
														<div class=" text-xs font-weight-bold text-primary text-uppercase ">Tanggal Order</div>
														<div class=" h6 mb-0 font-weight-bold text-gray-800 mb-2 ">{{ transaksi.tanggal | moment("DD/MM/YYYY") }}</div>
														<div class=" text-xs font-weight-bold text-primary text-uppercase ">Batas Waktu</div>
														<div class=" h6 mb-0 font-weight-bold text-gray-800 mb-2 ">{{ transaksi.batas_waktu | moment("DD/MM/YYYY") }}</div>
													</div>
													<div class="col">
														<div class=" text-xs font-weight-bold text-primary text-uppercase ">Status Laundry</div>
														<div class=" h6 mb-0 font-weight-bold text-gray-800 mb-2 ">{{ transaksi.status }}</div>
														<div class=" text-xs font-weight-bold text-primary text-uppercase ">Tanggal Pembayaran</div>
														<div v-if="transaksi.tgl_bayar == null" class="h6 mb-0 font-weight-bold text-gray-800 mb-2">-</div>
														<div v-else class=" h6 mb-0 font-weight-bold text-gray-800 mb-2 ">{{ transaksi.tgl_bayar | moment("DD/MM/YYYY") }}</div>
														<div class=" text-xs font-weight-bold text-primary text-uppercase ">Status Pembayaran</div>
														<div v-if="transaksi.dibayar == 'belum_dibayar'" class=" h6 mb-0 font-weight-bold text-gray-800 mb-2 ">Belum dibayar</div>
														<div v-else class=" h6 mb-0 font-weight-bold text-gray-800 mb-2 ">Sudah dibayar</div>
													</div>
												</div>
												<div class="row mt-3">
													<div class="col">
														<button :disabled="disableStatus" type="button" class="btn btn-warning btn-rounded btn-fw" @click="ubahStatus(id_transaksi)">Ubah Status Laundry</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
                 <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card position-relative">
                <div class="card-body">
                  <p class="card-title">Detail Transaksi</p>
                  <div class="row">
                    <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-center">
                    <div>
										<button 
                   :disabled="disableStruk"
                    type="button" @click="generateReport" class="btn btn-sm btn-info btn-icon-split mb-3">
										<span class="icon text-white-50">
										<i class="fas fa-print"></i>
										</span>
										<span class="text">Cetak Struk</span>
										</button>
									</div>
									<div class="report">
										<VueHtml2pdf 
                    :show-layout="true" 
                    :float-layout="false" 
                    :enable-download="true" 
                    :preview-modal="true" 
                    :paginate-elements-by-height="1400" 
                    filename="struk transaksi" 
                    :pdf-quality="2" 
                    :manual-pagination="false" 
                    pdf-format="a4" 
                    pdf-orientation="portrait" 
                    pdf-content-width="800px" 
                    ref="html2Pdf">
										<section slot="pdf-content">
										<h1 class="text-center">STRUK TRANSAKSI</h1>
										<h3 class="text-center">Laundry Online</h3>
										<h5 class="text-center">Jl Danau Ranau G3A4 Sawojajar</h5>
										<br>
										<table class="table table-striped">
										<thead>
										<tr>
											<th>#</th>
											<th>Jenis</th>
											<th>Jumlah (kg / satuan)</th>
											<th>Subtotal</th>
										</tr>
										</thead>
										<tbody>
										<tr v-for="(d, index) in detail_transaksi" :key="d.id_detail_transaksi">
											<td>{{ index + 1 }}</td>
											<td>{{ d.jenis }}</td>
											<td>{{ d.qty }}</td>
											<td>Rp {{ d.subtotal }}</td>
										</tr>
										<tr v-if="total != ''">
											<td colspan="3" class="text-sm-end">Total</td>
											<td>
												<h6 class="font-weight-bold">Rp {{ total }}</h6>
											</td>
										</tr>
										</tbody>
										</table>
										</section>
										</VueHtml2pdf>
                    <br>
										<button :disabled="disableBayar" type="button" class="btn btn-success mr-3" @click="bayar">Bayar</button> &nbsp;
										<router-link v-if=" transaksi.status !='diambil' && transaksi.status !='selesai' && transaksi.dibayar !='dibayar' " :to="{ name: 'tambahdetail', params: { id: this.id_transaksi }, }" class="btn btn-primary ">Tambah Detail Transaksi</router-link>
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
<style scoped>
.report {
  width: 800px;
  margin: 10px auto 0 auto;
  /* background-color: white; */

}

section {
  background-color: white;
  
}

table {
  border-collapse: collapse;
  width: 100%;
  
}
h1,
h5 {
  text-align: center;
}
th,
td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
tr:hover {
  background-color: rgb(244, 246, 252);
}
</style>
<script>
export default {
  data() {
    return {
      id_transaksi: this.$route.params.id,
      // id_member : '',
      transaksi: {},
      detail_transaksi: {},
      total: "",
    };
  },
  created() {
     var dataa = JSON.parse(this.$store.state.dataoutlet)
    this.users = dataa

    var data = JSON.parse(this.$store.state.datauser);
    var role = data.role;
    if (role == "owner") {
      this.$swal("Anda tidak dapat mengakses halaman ini");
      this.$router.push("/");
    }

    this.axios
      .get(`/transaksi/${this.id_transaksi}`, {
        headers: { Authorization: `Bearer ` + this.$store.state.token },
      })
      .then((res) => {
        this.transaksi = res.data;
      })
      .catch((err) => console.log(err));
    this.axios
      .get(`/transaksi/detail/${this.id_transaksi}`, {
        headers: { Authorization: `Bearer ` + this.$store.state.token },
      })
      .then((res) => {
        this.detail_transaksi = res.data;
      })
      .catch((err) => console.log(err));
    this.axios
      .get(`/transaksi/total/${this.id_transaksi}`, {
        headers: { Authorization: `Bearer ` + this.$store.state.token },
      })
      .then((res) => {
        this.total = res.data.total;
      });
  },
  computed: {
    disableBayar() {
      if (
        this.transaksi.status == "baru" ||
        this.transaksi.status == "proses" ||
        this.transaksi.status == "diambil"
      ) {
        return true;
      } else {
        return false;
      }
    },
    disableStatus() {
      if (
        this.transaksi.status == "selesai" ||
        this.transaksi.status == "diambil" ||
        this.detail_transaksi.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    disableStruk() {
      if (this.transaksi.status == "baru") {
        return true;
      }else{
        return false;
      }
    },
    //getMember(){
    //   if(this.trams)
    // }
  },
  methods: {
    ubahStatus() {
      if (this.transaksi.status == "baru") {
        this.transaksi.status = "proses";
      } else {
        this.transaksi.status = "selesai";
      }
      this.axios
        .post(`/transaksi/status/${this.id_transaksi}`, this.transaksi, {
          headers: { Authorization: `Bearer ` + this.$store.state.token },
        })
        .then(() => {
          this.$router.go(1);
        })
        .catch((err) => console.log(err));
    },
    bayar() {
      this.axios
        .post(`/transaksi/bayar/${this.id_transaksi}`, this.transaksi, {
          headers: { Authorization: `Bearer ` + this.$store.state.token },
        })
        .then(() => {
          this.$router.go();
        })
        .catch((err) => console.log(err));
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>