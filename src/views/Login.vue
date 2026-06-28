<template>
  <Navbar />

  <section class="login-page">
    <!-- LEFT -->

    <div class="login-left">
      <span class="badge"> SportSpace Premium </span>

      <h1>Selamat Datang Kembali</h1>

      <p>
        Masuk ke akun Anda untuk mengelola reservasi lapangan olahraga dengan
        pengalaman yang cepat, aman, dan modern.
      </p>

      <div class="features">
        <div class="feature">⚽ Booking Instan</div>

        <div class="feature">📅 Jadwal Real-Time</div>

        <div class="feature">🏆 Lapangan Premium</div>
      </div>
    </div>

    <!-- RIGHT -->

    <div class="login-card">
      <h2>Login Akun</h2>

      <p>Masukkan email dan password Anda.</p>

      <form @submit.prevent="login">
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

        <div class="options">
          <label class="remember">
            <input type="checkbox" />

            Ingat Saya
          </label>

          <button
            type="button"
            class="show-btn"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? "Sembunyikan" : "Lihat Password" }}
          </button>
        </div>

        <button type="submit" class="login-btn">Login</button>

        <div class="register-link">
          <span> Belum punya akun? </span>

          <router-link to="/register"> Daftar Sekarang </router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const router = useRouter();

const login = async () => {
  const response = await api.get("/users");

  const user = response.data.find(
    (item) => item.email === email.value && item.password === password.value,
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login berhasil");

    if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } else {
    alert("Email atau password salah");
  }
};
</script>

<style scoped>
.login-page {
  min-height: 90vh;

  display: grid;
  grid-template-columns: 1fr 1fr;

  background: linear-gradient(135deg, #eff6ff, #dbeafe);

  padding: 80px;
}

.login-left {
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

.login-left h1 {
  font-size: 64px;

  line-height: 1.1;

  color: #0f172a;

  margin-bottom: 25px;
}

.login-left p {
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

.login-card {
  width: 100%;
  max-width: 500px;

  margin: auto;

  background: rgba(255, 255, 255, 0.9);

  backdrop-filter: blur(20px);

  padding: 40px;

  border-radius: 30px;

  box-shadow: 0 25px 50px rgba(15, 23, 42, 0.12);
}

.login-card h2 {
  color: #0f172a;
  margin-bottom: 10px;
}

.login-card p {
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
}

input:focus {
  outline: none;

  border-color: #2563eb;

  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.options {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
}

.remember {
  display: flex;
  gap: 8px;

  align-items: center;

  font-size: 14px;
}

.show-btn {
  background: none;
  border: none;

  color: #2563eb;

  cursor: pointer;
}

.login-btn {
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

.login-btn:hover {
  transform: translateY(-2px);
}
.register-link {
  margin-top: 25px;

  text-align: center;

  color: #64748b;
}

.register-link a {
  margin-left: 6px;

  text-decoration: none;

  color: #2563eb;

  font-weight: 700;

  transition: 0.3s;
}

.register-link a:hover {
  color: #1d4ed8;
}
@media (max-width: 992px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-left {
    margin-bottom: 50px;
  }

  .login-left h1 {
    font-size: 46px;
  }
}
</style>
