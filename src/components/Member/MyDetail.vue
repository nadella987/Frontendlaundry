<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <sidebar-component></sidebar-component>
      <navbar-component></navbar-component>
 <div class="main-panel">
        <div class="content-wrapper">
          
                  <div class="row">
                        <div class="col-md-6">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Detail Member</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        
                                        <div class="col-auto">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase">Nama</div>
                                            <div class="h6 mb-0 font-weight-bold text-gray-800 mb-2">{{ member.nama_member }}</div>
                                            <div class="text-xs font-weight-bold text-primary text-uppercase">Jenis Kelamin</div>
                                            <div class="h6 mb-0 font-weight-bold text-gray-800 mb-2">{{ member.jenis_kelamin }}</div>
                                            <div class="text-xs font-weight-bold text-primary text-uppercase">Alamat</div>
                                            <div class="h6 mb-0 font-weight-bold text-gray-800 mb-2">{{ member.alamat }}</div>
                                            <div class="text-xs font-weight-bold text-primary text-uppercase">No. Telepon</div>
                                            <div class="h6 mb-0 font-weight-bold text-gray-800 mb-2">{{ member.no_telp }}</div>
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
            id : this.$route.params.id,
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
        this.axios.get(`/member/${this.id}`, { headers : { 'Authorization' : 'Bearer ' + this.$store.state.token} })
             .then(res => {
                 this.member = res.data
             })
    }
}
</script>