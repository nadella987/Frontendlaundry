  <template>
     
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="ti-shield menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </router-link>
          </li>
          <li  v-if="isAdmin" class="nav-item">
            <router-link class="nav-link" to="/user">
              <i class="ti-user menu-icon"></i>
              <span class="menu-title">User</span>
            </router-link>
          </li>
          <li v-if="isAdmin || isKasir" class="nav-item">
                <router-link class="nav-link" to="/member">
                    <i class="ti-id-badge menu-icon"></i>
                    <span class="menu-title">Member</span>
                </router-link>                
            </li>
          <li  v-if="isAdmin" class="nav-item">
            <router-link class="nav-link" to="/outlet">
              <i class="ti-home menu-icon"></i>
              <span class="menu-title">Outlet</span>
            </router-link>
          </li>
          <li  v-if="isAdmin" class="nav-item">
            <router-link class="nav-link" to="/paket">
              <i class="ti-shopping-cart menu-icon"></i>
              <span class="menu-title">Paket Laundry</span>
            </router-link>
          </li>
          <li  v-if="isAdmin || isKasir" class="nav-item">
            <router-link class="nav-link" to="/transaksi">
              <i class="ti-wallet menu-icon"></i>
              <span class="menu-title">Transaksi</span>
            </router-link>
          </li>
          <li  class="nav-item">
            <router-link class="nav-link" to="/report">
              <i class="ti-receipt menu-icon"></i>
              <span class="menu-title">Report</span>
            </router-link>
          </li>
        </ul>
        
      </nav>
    
</template>
<script>
export default {
    data() {
        return {
            isAdmin : false,
            isKasir : false,
            isOwner : false
        }
    },
    created() {
        var data = JSON.parse(this.$store.state.datauser)
        var role = data.role
        if(role == 'admin') {
            this.isAdmin = true
        } else if (role == 'kasir') {
            this.isKasir = true
        } else {
            this.isOwner = true
        }
    },
    methods : {
        
    }
}
</script>