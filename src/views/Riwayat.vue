<template>

  <Navbar />

  <section class="riwayat-page">

    <div class="header">

      <h1>Riwayat Reservasi</h1>

      <p>
        Lihat seluruh aktivitas reservasi olahraga Anda.
      </p>

    </div>

    <div class="reservasi-grid">

      <div
        v-for="item in reservasi"
        :key="item.id"
        class="reservasi-card"
      >

        <div class="card-top">

          <h3>
            {{ getNamaLapangan(item.lapanganId) }}
          </h3>

          <span
            :class="badgeClass(item.status)"
          >
            {{ item.status }}
          </span>

        </div>

        <div class="card-body">

          <div class="info">

            <span>👤 Nama</span>

            <strong>
              {{ item.nama }}
            </strong>

          </div>

          <div class="info">

            <span>📅 Tanggal</span>

            <strong>
              {{ item.tanggal }}
            </strong>

          </div>

          <div class="info">

            <span>⏰ Jam</span>

            <strong>
              {{ item.jam }}
            </strong>

          </div>

          <div class="info">

            <span>⌛ Durasi</span>

            <strong>
              {{ item.durasi || 1 }} Jam
            </strong>

          </div>

          <div class="info">

            <span>💰 Total Bayar</span>

            <strong class="harga">

              Rp{{
                Number(
                  item.totalHarga || 0
                ).toLocaleString("id-ID")
              }}

            </strong>

          </div>

        </div>

      </div>

    </div>

  </section>

</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import api from "../services/api";
import { ref, onMounted } from "vue";

const reservasi = ref([]);
const lapangan = ref([]);

const getReservasi = async () => {

  const response = await api.get("/reservasi");

  reservasi.value = response.data;
};

const getLapangan = async () => {

  const response = await api.get("/lapangan");

  lapangan.value = response.data;
};

const getNamaLapangan = (id) => {

  const data = lapangan.value.find(
    item => item.id == id
  );

  return data ? data.nama : "-";
};

const badgeClass = (status) => {

  if(status === "Disetujui"){
    return "badge approved";
  }

  if(status === "Selesai"){
    return "badge done";
  }

  return "badge waiting";
};

onMounted(() => {

  getReservasi();
  getLapangan();

});
</script>

<style scoped>

.riwayat-page{

    min-height:100vh;

    padding:60px;

    background:
    linear-gradient(
      135deg,
      #f8fafc,
      #e0e7ff
    );
}

.header{

    text-align:center;

    margin-bottom:40px;
}

.header h1{

    font-size:48px;

    color:#0f172a;
}

.header p{

    color:#64748b;
}

.reservasi-grid{

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(350px,1fr));

    gap:25px;
}

.reservasi-card{

    background:white;

    border-radius:24px;

    padding:25px;

    box-shadow:
    0 15px 35px rgba(0,0,0,.06);

    transition:.3s;
}

.reservasi-card:hover{

    transform:
    translateY(-6px);
}

.card-top{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:25px;
}

.card-top h3{

    color:#0f172a;
}

.card-body{

    display:flex;

    flex-direction:column;

    gap:15px;
}

.info{

    display:flex;

    justify-content:space-between;

    align-items:center;
}

.info span{

    color:#64748b;
}

.harga{

    color:#2563eb;

    font-size:18px;
}

.badge{

    padding:8px 14px;

    border-radius:999px;

    font-size:13px;

    font-weight:700;
}

.waiting{

    background:#fef3c7;

    color:#92400e;
}

.approved{

    background:#dcfce7;

    color:#166534;
}

.done{

    background:#dbeafe;

    color:#1d4ed8;
}

@media(max-width:768px){

    .riwayat-page{

        padding:25px;
    }

}

</style>