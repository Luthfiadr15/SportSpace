<template>
  <header class="navbar">

    <div class="logo">
      SportSpace
    </div>

    <nav>

      <router-link to="/">
        Home
      </router-link>

      <router-link to="/lapangan">
        Lapangan
      </router-link>

      <router-link
        v-if="user && user.role === 'user'"
        to="/booking"
      >
        Booking
      </router-link>

      <router-link
        v-if="user && user.role === 'user'"
        to="/riwayat"
      >
        Riwayat
      </router-link>

      <router-link
        v-if="user && user.role === 'admin'"
        to="/admin"
      >
        Dashboard
      </router-link>

    </nav>

    <div class="actions">

  <template v-if="!user">

    <router-link
      to="/login"
      class="login"
    >
      Login
    </router-link>

    <router-link
      to="/register"
      class="register"
    >
      Register
    </router-link>

  </template>

  <template v-else>

    <span
  v-if="user"
  class="username"
>
  Halo, {{ user.nama }}
</span>

    <router-link
      v-if="user.role==='admin'"
      to="/admin"
      class="dashboard-btn"
    >
      Dashboard
    </router-link>

    <button
      class="logout-btn"
      @click="logout"
    >
      Logout
    </button>

  </template>

</div>

  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref(null);

onMounted(() => {

  const data =
    localStorage.getItem("user");

  if(data){

    user.value =
      JSON.parse(data);

  }

});

const logout = () => {

  localStorage.removeItem("user");

  user.value = null;

  alert("Logout berhasil");

  router.push("/login");

};
</script>

<style scoped>

.navbar{

    height:90px;

    padding:0 80px;

    display:flex;
    justify-content:space-between;
    align-items:center;

    background:white;

    border-bottom:
    1px solid #e5e7eb;
}

.logo{

    font-size:32px;

    font-weight:800;

    color:#0f172a;

    letter-spacing:-1px;
}

nav{

    display:flex;

    gap:35px;
}

nav a{

    text-decoration:none;

    color:#475569;

    font-weight:500;

    transition:.3s;
}

nav a:hover{

    color:#2563eb;
}

.router-link-active{

    color:#2563eb;

    font-weight:700;
}

.actions{

    display:flex;

    gap:12px;
}

.login{

    text-decoration:none;

    color:#0f172a;

    font-weight:600;

    display:flex;
    align-items:center;
}

.register{

    background:#0f172a;

    color:white;

    text-decoration:none;

    padding:12px 22px;

    border-radius:12px;

    font-weight:600;
}

.username{

    font-weight:700;

    color:#0f172a;
}

.dashboard-btn{

    text-decoration:none;

    background:#2563eb;

    color:white;

    padding:12px 20px;

    border-radius:12px;
}
.logout-btn{
    border:none;

    background:#dc2626;

    color:white;

    padding:12px 22px;

    border-radius:12px;

    cursor:pointer;

    font-weight:600;
}

.logout-btn:hover{

    background:#b91c1c;
}

@media(max-width:768px){

    .navbar{

        flex-direction:column;

        height:auto;

        padding:20px;
    }

    nav{

        margin:20px 0;

        flex-wrap:wrap;

        justify-content:center;
    }

    .actions{

        flex-wrap:wrap;

        justify-content:center;
    }

}

</style>