<template>
  <Navbar />

  <section class="lapangan-page">

    <div class="header">
      <h1>Daftar Lapangan</h1>

      <p>
        Pilih lapangan olahraga yang tersedia
        sesuai kebutuhan Anda.
      </p>
    </div>

    <div class="lapangan-grid">

      <div
        class="lapangan-card"
        v-for="item in lapangan"
        :key="item.id"
      >

        <div class="content">

          <h3>{{ item.nama }}</h3>

          <p>{{ item.jenis }}</p>

          <span>
            Rp{{ item.harga.toLocaleString('id-ID') }}
            / jam
          </span>

          <small>
            {{ item.status }}
          </small>

          <router-link to="/booking">
            <button>
              Reservasi
            </button>
          </router-link>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import api from "../services/api";
import { ref, onMounted } from "vue";

const lapangan = ref([]);

const getLapangan = async () => {
  try {
    const response = await api.get("/lapangan");
    lapangan.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getLapangan();
});
</script>

<style scoped>

.lapangan-page{
    padding:80px;
}

.header{
    text-align:center;
    margin-bottom:50px;
}

.header h1{
    font-size:48px;
    color:#0f172a;
}

.header p{
    color:#64748b;
}

.lapangan-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:25px;
}

.lapangan-card{
    background:white;
    border-radius:20px;

    padding:30px;

    box-shadow:
    0 15px 35px rgba(0,0,0,.05);
}

.content h3{
    color:#0f172a;
    margin-bottom:10px;
}

.content p{
    color:#64748b;
    margin-bottom:15px;
}

.content span{
    display:block;
    margin-bottom:10px;

    font-weight:600;
    color:#2563eb;
}

small{
    color:green;
}

button{
    margin-top:20px;

    width:100%;

    border:none;

    background:#0f172a;
    color:white;

    padding:12px;

    border-radius:10px;

    cursor:pointer;
}

</style>