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
                  <h1 class="card-title">Data Member</h1>
                 
                  <div class="table-responsive">
                      <div class="form-group">
										<div class="input-group">
											<input type="text" class="form-control" name="search" v-model="search" placeholder="Search Name" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
											<div class="input-group-append">
												<button class="btn btn-sm btn-primary" v-on:click="cari_data()" type="button">Search</button>
											</div>
										</div>
									</div>
                                            <router-link to="/member/tambah" class="btn btn-info btn-icon-split">
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
                            <th>Jenis Kelamin</th>
                            <th>No Telp</th>
                            <th>Aksi</th>
                                    
                        </tr>
                      </thead>
                      <tbody>
                       <tr v-for="(m, index) in member" :key="m.id_member">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ m.nama_member }}</td>
                                                    <td>{{ m.alamat }}</td>
                                                    <td>{{ m.jenis_kelamin }}</td>
                                                    <td>{{ m.no_telp }}</td>
                                                    <td>
                                                        <button type="button" class="btn btn-success btn-rounded btn-icon">
                                                            <router-link :to="{ name : 'detailmember' , params :{ id : m.id_member } }">
                                                                <i class="ti-eye"></i>
                                                            </router-link>
                                                        </button>
                                                        <button type="button" class="btn btn-warning btn-rounded btn-icon">
                                                           <router-link :to="{ name : 'editmember' , params :{ id : m.id_member}}">
                                                             <i class="ti-pencil"></i>
                                                             </router-link>
                                                        </button>
                                                        
                                                        <button type="button" @click="hapus(m.id_member)" class="btn btn-danger btn-rounded btn-icon"><i class="ti-trash"></i></button>
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
        
        this.axios.get('/member', { headers : { 'Authorization' : 'Bearer ' + this.$store.state.token} })
                  .then( res => {
                    this.member = res.data
                  })
    },
    methods : {
        dt_member: function(){
			this.axios.get("/get_member",{
				headers: {Authorization: `Bearer` + this.$store.state.token},
			})
			.then((res)=>{
				this.member = res.data
			})
		},
		cari_data: function(){
			var data_cari ="";
			if(this.search ==""){
				data_cari ="";
			}else{
				data_cari = "/"+ this.search;
			}
			this.axios.get("/get_member" + data_cari,{
				headers:	{Authorization:`Bearer` + this.$store.state.token}
			})
			.then((res)=>{
				this.member = res.data
			})
		},
        hapus(id_member) {
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
                        .delete(`/member/${id_member}`, {
                        headers: { Authorization: "Bearer " + this.$store.state.token },
                        })
                        .then((res) => {
                        if(res.data.success) {
                        this.$swal("Sukses", res.data.message, "success")
                        let i = this.member.map((item) => item.id_member).indexOf(id_member);
                        this.member.splice(i, 1);
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
    
},
 mounted() {
     this.dt_member();
 },
 };
</script>