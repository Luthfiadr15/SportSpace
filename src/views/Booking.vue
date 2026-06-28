<template>
  <Navbar />

  <section class="booking-page">
    <div class="booking-wrapper">
      <!-- LEFT -->

      <div class="booking-left">
        <span class="badge"> SportSpace Premium Booking </span>

        <h1>Reservasi Lapangan Impian Anda</h1>

        <p>
          Booking Mini Soccer, Futsal, Badminton, Padel, dan Voli dengan proses
          cepat, aman, dan profesional.
        </p>

        <div class="sport-cards">
          <div class="sport-card">
            <span>⚽</span>
            <div>
              <h4>Mini Soccer</h4>
              <p>Rp150.000 / jam</p>
            </div>
          </div>

          <div class="sport-card">
            <span>🥅</span>
            <div>
              <h4>Futsal</h4>
              <p>Rp120.000 / jam</p>
            </div>
          </div>

          <div class="sport-card">
            <span>🏸</span>
            <div>
              <h4>Badminton</h4>
              <p>Rp50.000 / jam</p>
            </div>
          </div>

          <div class="sport-card">
            <span>🎾</span>
            <div>
              <h4>Padel</h4>
              <p>Rp250.000 / jam</p>
            </div>
          </div>

          <div class="sport-card">
            <span>🏐</span>
            <div>
              <h4>Voli</h4>
              <p>Rp100.000 / jam</p>
            </div>
          </div>
        </div>

        <div class="info-card">
          <h3>Fasilitas Premium</h3>

          <ul>
            <li>⚡ Pencahayaan LED Modern</li>
            <li>🚗 Area Parkir Luas</li>
            <li>🚿 Ruang Ganti & Kamar Mandi</li>
            <li>🛋️ Ruang Tunggu Nyaman</li>
            <li>📶 WiFi Gratis</li>
          </ul>
        </div>
      </div>

      <!-- RIGHT -->

      <div class="booking-card">
        <h2>Form Reservasi</h2>

        <form @submit.prevent="simpanReservasi">
          <div class="form-group">
            <label>Nama Pemesan</label>

            <input
              v-model="nama"
              type="text"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div class="form-group">
            <label>Pilih Lapangan</label>

            <select v-model="lapanganId" required>
              <option value="">Pilih Lapangan</option>

              <option v-for="item in lapangan" :key="item.id" :value="item.id">
                {{ item.nama }}
              </option>
            </select>
          </div>

          <div class="row">
            <div class="form-group">
              <label>Tanggal Bermain</label>

              <input v-model="tanggal" type="date" required />
            </div>

            <div class="form-group">
              <label>Jam Bermain</label>

              <input v-model="jam" type="time" required />
            </div>
          </div>

          <div class="form-group">
            <label>Durasi Bermain</label>

            <select v-model="durasi">
              <option value="1">1 Jam</option>
              <option value="2">2 Jam</option>
              <option value="3">3 Jam</option>
              <option value="4">4 Jam</option>
              <option value="5">5 Jam</option>
            </select>
          </div>

          <div class="form-group">
            <label>Catatan Tambahan</label>

            <textarea
              v-model="catatan"
              rows="4"
              placeholder="Tambahkan catatan jika diperlukan"
            ></textarea>
          </div>

          <div class="summary">
            <h3>Ringkasan Reservasi</h3>

            <div class="summary-item">
              <span>Nama</span>
              <strong>{{ nama || "-" }}</strong>
            </div>

            <div class="summary-item">
              <span>Lapangan</span>
              <strong>
                {{ lapanganTerpilih?.nama || "-" }}
              </strong>
            </div>

            <div class="summary-item">
              <span>Tanggal</span>
              <strong>{{ tanggal || "-" }}</strong>
            </div>

            <div class="summary-item">
              <span>Jam</span>
              <strong>{{ jam || "-" }}</strong>
            </div>

            <div class="summary-item">
              <span>Durasi</span>
              <strong>{{ durasi }} Jam</strong>
            </div>

            <div class="summary-item">
              <span>Harga / Jam</span>
              <strong> Rp{{ hargaPerJam.toLocaleString("id-ID") }} </strong>
            </div>

            <div class="summary-item total">
              <span>Total Bayar</span>

              <strong> Rp{{ totalHarga.toLocaleString("id-ID") }} </strong>
            </div>
          </div>
          <div class="form-group">
            <label>Metode Pembayaran</label>

            <select v-model="metodePembayaran" required>
              <option value="">Pilih Pembayaran</option>

              <option value="QRIS">QRIS</option>
            </select>
          </div>

          <div v-if="metodePembayaran === 'QRIS'" class="qris-box">
            <h3>Scan QR Berikut</h3>

            <img src="../assets/qris.jpg" alt="QRIS" class="qris-image" />
          </div>

          <button type="submit">Reservasi Sekarang</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import Navbar from "../components/Navbar.vue";
import api from "../services/api";

import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const nama = ref("");
const lapanganId = ref("");
const tanggal = ref("");
const jam = ref("");
const durasi = ref(1);
const catatan = ref("");
const metodePembayaran = ref("");

const lapangan = ref([]);
const router = useRouter();

const lapanganTerpilih = computed(() => {
  return lapangan.value.find((item) => item.id == lapanganId.value);
});

const hargaPerJam = computed(() => {
  return lapanganTerpilih.value ? Number(lapanganTerpilih.value.harga) : 0;
});

const totalHarga = computed(() => {
  return hargaPerJam.value * Number(durasi.value);
});

const getLapangan = async () => {
  try {
    const response = await api.get("/lapangan");

    lapangan.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const simpanReservasi = async () => {
  try {
    await api.post("/reservasi", {
      metodePembayaran:
  metodePembayaran.value,
      nama: nama.value,

      lapanganId: lapanganId.value,

      tanggal: tanggal.value,

      jam: jam.value,

      durasi: durasi.value,

      totalHarga: totalHarga.value,

      catatan: catatan.value,

      status: "Menunggu",
    });

    alert(
      `🎉 Reservasi Berhasil!

Nama : ${nama.value}

Lapangan :
${lapanganTerpilih.value?.nama}

Tanggal :
${tanggal.value}

Jam :
${jam.value}

Durasi :
${durasi.value} Jam

Total Pembayaran :

Rp${totalHarga.value.toLocaleString("id-ID")}`,
    );

    nama.value = "";
    lapanganId.value = "";
    tanggal.value = "";
    jam.value = "";
    durasi.value = 1;
    catatan.value = "";
    metodePembayaran.value = "";
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  const user = localStorage.getItem("user");

  if (!user) {
    alert("Silakan login terlebih dahulu");

    router.push("/login");

    return;
  }

  getLapangan();
});
</script>

<style scoped>
.booking-page {
  min-height: 100vh;

  background: linear-gradient(135deg, #f8fafc, #dbeafe, #eef2ff);

  padding: 80px;
}

.booking-wrapper {
  max-width: 1400px;

  margin: auto;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 50px;
}

.booking-left {
  display: flex;

  flex-direction: column;

  gap: 25px;

  justify-content: center;
}

.badge {
  width: max-content;

  padding: 12px 20px;

  border-radius: 999px;

  background: #dbeafe;

  color: #2563eb;

  font-weight: 700;
}

.booking-left h1 {
  font-size: 64px;

  line-height: 1.1;

  color: #0f172a;
}

.booking-left p {
  color: #64748b;

  line-height: 1.8;

  font-size: 17px;
}

.sport-cards {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;
}

.sport-card {
  background: white;

  padding: 20px;

  border-radius: 18px;

  display: flex;

  align-items: center;

  gap: 15px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.sport-card span {
  font-size: 32px;
}

.sport-card h4 {
  color: #0f172a;

  margin-bottom: 5px;
}

.sport-card p {
  color: #64748b;

  font-size: 14px;
}

.info-card {
  background: white;

  border-radius: 24px;

  padding: 30px;

  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
}

.info-card h3 {
  margin-bottom: 20px;

  color: #0f172a;
}

.info-card ul {
  list-style: none;
}

.info-card li {
  padding: 10px 0;

  color: #475569;
}

.booking-card {
  background: rgba(255, 255, 255, 0.9);

  backdrop-filter: blur(14px);

  border-radius: 28px;

  padding: 40px;

  box-shadow: 0 25px 50px rgba(15, 23, 42, 0.08);
}

.booking-card h2 {
  margin-bottom: 30px;

  color: #0f172a;
}

.form-group {
  display: flex;

  flex-direction: column;

  margin-bottom: 20px;
}

label {
  margin-bottom: 8px;

  font-weight: 600;

  color: #0f172a;
}

input,
select,
textarea {
  border: 1px solid #cbd5e1;

  padding: 16px;

  border-radius: 16px;

  background: white;

  font-size: 15px;

  transition: 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;

  border-color: #2563eb;

  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.row {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;
}

.summary {
  margin-top: 25px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  padding: 25px;

  border-radius: 18px;
}

.summary h3 {
  margin-bottom: 15px;

  color: #0f172a;
}

.summary-item {
  display: flex;

  justify-content: space-between;

  margin-bottom: 12px;

  color: #475569;
}

.total {
  margin-top: 15px;

  padding-top: 15px;

  border-top: 1px solid #e2e8f0;

  color: #2563eb;

  font-size: 20px;

  font-weight: 700;
}

button {
  width: 100%;

  margin-top: 20px;

  border: none;

  background: linear-gradient(135deg, #2563eb, #1d4ed8);

  color: white;

  padding: 18px;

  border-radius: 16px;

  font-size: 16px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.3s;
}

button:hover {
  transform: translateY(-2px);

  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.3);
}

@media (max-width: 992px) {
  .booking-wrapper {
    grid-template-columns: 1fr;
  }

  .booking-left h1 {
    font-size: 46px;
  }

  .row {
    grid-template-columns: 1fr;
  }

  .sport-cards {
    grid-template-columns: 1fr;
  }

  .qris-box{

    margin-top:20px;

    text-align:center;

    padding:20px;

    background:#f8fafc;

    border-radius:16px;
}

.qris-image{

    width:250px;

    border-radius:16px;

    margin-top:15px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.08);
}
}
</style>
