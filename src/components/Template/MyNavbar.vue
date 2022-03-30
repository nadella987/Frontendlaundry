   <template>
     

    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo me-5" href="index.html"><img src="../../../public/images/logobaru-removebg-preview.png" alt="logo"/></a>
        <a class="navbar-brand brand-logo-mini" href="index.html"><img src="../../../public/images/logoku.png" alt="logo"/></a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span class="ti-view-list"></span>
        </button>
      
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item mt-1"><strong>{{ nama_outlet }} , {{ alamat }}</strong></li>
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <li class="nav-item">
        </li>
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
              <img src="../../../public/images/faces/face28.jpg" alt="profile"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <a class="dropdown-item" @click="logout">
                <i class="ti-power-off text-primary"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import axios from 'axios'
import store from '../../store/index.js'
import router from '../../router/index.js'
export default {
  data(){
    return {
      nama_outlet : ''
    }
  },
        created() {
        var data = JSON.parse(this.$store.state.dataoutlet)
        var namaoutlet = data.nama_outlet
        this.nama_outlet = namaoutlet
        var alamat = data.alamat
        this.alamat = alamat

        axios.get('/login/check', {headers : {'Authorization' : 'Bearer ' + store.state.token }})
            .then((res) => {
            if(!(res.data.success)) {
                store.commit('clearToken')
                store.commit('clearUser')
                router.push('/login')
            }
            })
    },    
    methods : {
        logout() {
            this.axios.post('/logout', { headers : { 'Authorization' : 'Bearer ' + this.$store.state.token} })
                      .then( () => {
                          this.$store.commit('clearToken');
                          this.$store.commit('clearUser');
                          this.$router.push('/login')
                      })
        }
    }
}
</script>
