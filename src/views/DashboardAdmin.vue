<template>
  <Navbar />

  <section class="admin-page">
    <div class="header">
      <h1>Dashboard Admin</h1>

      <p>Kelola seluruh aktivitas SportSpace</p>
    </div>

    <!-- STATISTIK -->

    <div class="stats">
      <div class="stat-card">
        <h2>{{ lapangan.length }}</h2>

        <p>Total Lapangan</p>
      </div>

      <div class="stat-card">
        <h2>{{ reservasi.length }}</h2>

        <p>Total Reservasi</p>
      </div>

      <div class="stat-card">
        <h2>{{ reservasiDisetujui }}</h2>

        <p>Disetujui</p>
      </div>

      <div class="stat-card">
        <h2>{{ reservasiSelesai }}</h2>

        <p>Selesai</p>
      </div>

      <div class="stat-card">
        <h2>
          {{ users.length }}
        </h2>

        <p>Total User</p>
      </div>

      <div class="stat-card pendapatan">
        <h2>Rp{{ totalPendapatan.toLocaleString("id-ID") }}</h2>

        <p>Total Pendapatan</p>
      </div>
    </div>

    <!-- TAMBAH LAPANGAN -->

    <div class="card">
      <h2>Tambah Lapangan</h2>

      <form @submit.prevent="tambahLapangan">
        <div class="grid">
          <input v-model="nama" placeholder="Nama Lapangan" required />

          <input v-model="jenis" placeholder="Jenis Lapangan" required />

          <input v-model="harga" type="number" placeholder="Harga" required />
        </div>

        <button type="submit">
          {{ editId ? "Update Lapangan" : "Tambah Lapangan" }}
        </button>

        <button
          v-if="editId"
          type="button"
          class="batal"
          @click="
            editId = null;
            nama = '';
            jenis = '';
            harga = '';
          "
        >
          Batal Edit
        </button>
      </form>
    </div>

    <!-- DATA LAPANGAN -->

    <div class="card">
      <h2>Data Lapangan</h2>

      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jenis</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in lapangan" :key="item.id">
            <td>{{ item.nama }}</td>

            <td>{{ item.jenis }}</td>

            <td>Rp{{ Number(item.harga).toLocaleString("id-ID") }}</td>

            <td>
              <button type="button" class="edit" @click="editLapangan(item)">
                Edit
              </button>

              <button
                type="button"
                class="hapus"
                @click="hapusLapangan(item.id)"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- DATA RESERVASI -->

    <div class="card">
      <h2>Data Reservasi</h2>

      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tanggal</th>
            <th>Jam</th>
            <th>Durasi</th>
            <th>Total Bayar</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in reservasi" :key="item.id">
            <td>{{ item.nama }}</td>

            <td>{{ item.tanggal }}</td>

            <td>{{ item.jam }}</td>

            <td>{{ item.durasi || "-" }} Jam</td>

            <td>
              Rp{{ Number(item.totalHarga || 0).toLocaleString("id-ID") }}
            </td>

            <td>
              <select @change="ubahStatus(item.id, $event)">
                <option value="Menunggu" :selected="item.status === 'Menunggu'">
                  Menunggu
                </option>

                <option
                  value="Disetujui"
                  :selected="item.status === 'Disetujui'"
                >
                  Disetujui
                </option>

                <option value="Selesai" :selected="item.status === 'Selesai'">
                  Selesai
                </option>
              </select>
            </td>
            <td>
              <button
                type="button"
                class="hapus"
                @click="hapusReservasi(item.id)"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import api from "../services/api";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const lapangan = ref([]);
const reservasi = ref([]);
const users = ref([]);
const editId = ref(null);

const nama = ref("");
const jenis = ref("");
const harga = ref("");

const reservasiDisetujui = computed(
  () => reservasi.value.filter((item) => item.status === "Disetujui").length,
);

const reservasiSelesai = computed(
  () => reservasi.value.filter((item) => item.status === "Selesai").length,
);

const totalPendapatan = computed(() =>
  reservasi.value.reduce((total, item) => total + (item.totalHarga || 0), 0),
);

const getLapangan = async () => {
  try {
    const response = await api.get("/lapangan");

    lapangan.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async () => {
  const response = await api.get("/users");

  users.value = response.data;
};

const getReservasi = async () => {
  try {
    const response = await api.get("/reservasi");

    reservasi.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const tambahLapangan = async () => {
  try {
    if (editId.value) {
      await api.patch(`/lapangan/${editId.value}`, {
        nama: nama.value,
        jenis: jenis.value,
        harga: Number(harga.value),
      });

      alert("Lapangan berhasil diupdate");
    } else {
      await api.post("/lapangan", {
        nama: nama.value,

        jenis: jenis.value,

        harga: Number(harga.value),

        status: "Tersedia",
      });

      alert("Lapangan berhasil ditambahkan");
    }

    editId.value = null;

    nama.value = "";
    jenis.value = "";
    harga.value = "";

    getLapangan();
  } catch (error) {
    console.error(error);
  }
};

const hapusLapangan = async (id) => {

  const yakin = confirm(
    "Yakin ingin menghapus lapangan ini?"
  );

  if (!yakin) return;

  try {

    await api.delete(
      `/lapangan/${id}`
    );

    getLapangan();

  } catch (error) {

    console.error(error);

  }

};

const hapusReservasi = async (id) => {
  const yakin = confirm("Yakin ingin menghapus reservasi ini?");

  if (!yakin) return;

  try {
    await api.delete(`/reservasi/${id}`);

    getReservasi();
  } catch (error) {
    console.error(error);
  }
};

const editLapangan = (item) => {
  editId.value = item.id;

  nama.value = item.nama;

  jenis.value = item.jenis;

  harga.value = item.harga;
};

const ubahStatus = async (id, event) => {
  try {
    await api.patch(`/reservasi/${id}`, {
      status: event.target.value,
    });

    getReservasi();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    !user ||
    user.role !== "admin"
  ) {

    alert(
      "Akses ditolak"
    );

    router.push("/");

    return;
  }

  getLapangan();
  getReservasi();
  getUsers();

});
</script>

<style scoped>
.admin-page {
  min-height: 100vh;

  padding: 60px;

  background: linear-gradient(135deg, #f8fafc, #e0e7ff, #dbeafe);
}

.header {
  text-align: center;

  margin-bottom: 40px;
}

.header h1 {
  font-size: 52px;

  color: #0f172a;

  margin-bottom: 10px;
}

.header p {
  color: #64748b;

  font-size: 16px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;

  padding: 30px;

  border-radius: 24px;

  text-align: center;

  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.08);

  transition: 0.3s;
}

.stat-card:hover {
  transform: translateY(-6px);
}

.stat-card h2 {
  color: #2563eb;

  font-size: 34px;

  margin-bottom: 10px;
}

.stat-card p {
  color: #64748b;
}

.pendapatan {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);

  color: white;
}

.pendapatan h2,
.pendapatan p {
  color: white;
}

.card {
  background: white;

  padding: 30px;

  border-radius: 24px;

  margin-bottom: 30px;

  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.06);
}

.card h2 {
  margin-bottom: 25px;

  color: #0f172a;
}

.grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 15px;
}

input {
  padding: 14px;

  border: 1px solid #cbd5e1;

  border-radius: 14px;
}

input:focus {
  outline: none;

  border-color: #2563eb;
}

button {
  border: none;

  padding: 12px 18px;

  border-radius: 12px;

  color: white;

  cursor: pointer;

  font-weight: 600;
}

button[type="submit"] {
  margin-top: 20px;

  background: #2563eb;
}

.edit {
  background: #f59e0b;

  margin-right: 10px;
}

.hapus {
  background: #dc2626;
}

.batal {
  background: #64748b;

  margin-left: 10px;
}

table {
  width: 100%;

  border-collapse: collapse;
}

th {
  background: #0f172a;

  color: white;

  padding: 16px;
}

td {
  padding: 16px;

  text-align: center;

  border-bottom: 1px solid #e2e8f0;
}

tr:hover {
  background: #f8fafc;
}

select {
  padding: 8px 12px;

  border-radius: 10px;

  border: 1px solid #cbd5e1;
}

@media (max-width: 1200px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .admin-page {
    padding: 25px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  table {
    display: block;

    overflow-x: auto;
  }
}
</style>
