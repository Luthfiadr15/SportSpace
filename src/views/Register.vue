<template>
  <Navbar />

  <section class="register-page">
    <!-- LEFT -->

    <div class="register-left">
      <span class="badge"> SportSpace Premium </span>

      <h1>Buat Akun Baru</h1>

      <p>
        Bergabunglah dengan SportSpace dan nikmati pengalaman reservasi lapangan
        olahraga yang cepat, modern, dan profesional.
      </p>

      <div class="features">
        <div class="feature">⚽ Reservasi Mudah</div>

        <div class="feature">📅 Jadwal Real-Time</div>

        <div class="feature">🏆 Lapangan Premium</div>
      </div>
    </div>

    <!-- RIGHT -->

    <div class="register-card">
      <h2>Daftar Akun</h2>

      <p>Lengkapi data berikut untuk membuat akun.</p>

      <form @submit.prevent="register">
        <div class="form-group">
          <label>Nama Lengkap</label>

          <input
            v-model="nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>

          <input
            v-model="email"
            type="email"
            placeholder="Masukkan email"
            required
          />
        </div>

        <div class="form-group">
          <label>Password</label>

          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan password"
            required
          />
        </div>

        <div class="form-group">
          <label>Konfirmasi Password</label>

          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Konfirmasi password"
            required
          />
        </div>

        <button
          type="button"
          class="show-btn"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? "Sembunyikan Password" : "Lihat Password" }}
        </button>

        <button type="submit" class="register-btn">Daftar Sekarang</button>

        <div class="login-link">
          <span> Sudah punya akun? </span>

          <router-link to="/login"> Login </router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import api from "../services/api";
import { ref } from "vue";

const nama = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const showPassword = ref(false);

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Konfirmasi password tidak cocok");

    return;
  }

  await api.post("/users", {
    nama: nama.value,
    email: email.value,
    password: password.value,
    role: "user",
  });

  alert("Registrasi berhasil");

  nama.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
};
</script>

<style scoped>
.register-page {
  min-height: 90vh;

  display: grid;
  grid-template-columns: 1fr 1fr;

  background: linear-gradient(135deg, #eff6ff, #dbeafe);

  padding: 80px;
}

.register-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.badge {
  width: max-content;

  background: #dbeafe;
  color: #2563eb;

  padding: 10px 18px;

  border-radius: 999px;

  font-size: 14px;
  font-weight: 600;

  margin-bottom: 25px;
}

.register-left h1 {
  font-size: 64px;

  line-height: 1.1;

  color: #0f172a;

  margin-bottom: 25px;
}

.register-left p {
  max-width: 500px;

  color: #64748b;

  line-height: 1.8;

  margin-bottom: 35px;
}

.features {
  display: flex;
  flex-direction: column;

  gap: 15px;
}

.feature {
  background: white;

  width: max-content;

  padding: 14px 20px;

  border-radius: 14px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
}

.register-card {
  width: 100%;
  max-width: 520px;

  margin: auto;

  background: rgba(255, 255, 255, 0.9);

  backdrop-filter: blur(20px);

  padding: 40px;

  border-radius: 30px;

  box-shadow: 0 25px 50px rgba(15, 23, 42, 0.12);
}

.register-card h2 {
  color: #0f172a;

  margin-bottom: 10px;
}

.register-card p {
  color: #64748b;

  margin-bottom: 30px;
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

input {
  padding: 16px;

  border-radius: 14px;

  border: 1px solid #cbd5e1;

  font-size: 15px;

  transition: 0.3s;
}

input:focus {
  outline: none;

  border-color: #2563eb;

  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.show-btn {
  width: 100%;

  margin-bottom: 15px;

  border: none;

  background: #e0e7ff;

  color: #1d4ed8;

  padding: 14px;

  border-radius: 14px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;
}

.show-btn:hover {
  background: #c7d2fe;
}

.register-btn {
  width: 100%;

  border: none;

  background: linear-gradient(135deg, #2563eb, #1d4ed8);

  color: white;

  padding: 16px;

  border-radius: 14px;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;
}

.register-btn:hover {
  transform: translateY(-2px);
}

.login-link {
  margin-top: 25px;

  text-align: center;

  color: #64748b;
}

.login-link a {
  margin-left: 6px;

  text-decoration: none;

  color: #2563eb;

  font-weight: 700;
}

.login-link a:hover {
  color: #1d4ed8;
}

@media (max-width: 992px) {
  .register-page {
    grid-template-columns: 1fr;

    padding: 40px 20px;
  }

  .register-left {
    margin-bottom: 50px;
  }

  .register-left h1 {
    font-size: 46px;
  }

  .register-card {
    max-width: 100%;
  }
}
</style>
