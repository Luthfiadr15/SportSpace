<template>
  <Navbar />

  <!-- HERO -->
  <section class="hero">
    <div class="hero-left">
      <span class="badge"> Premium Sport Reservation Platform </span>

      <h1>Reservasi Lapangan Olahraga dalam Satu Platform</h1>

      <p>
        Mini Soccer, Futsal, Badminton, dan Basket dengan sistem reservasi yang
        cepat, aman, dan modern.
      </p>

      <div class="buttons">
        <button class="primary" @click="cekLogin">Reservasi Sekarang</button>
        <router-link to="/lapangan">
          <button class="secondary">Lihat Lapangan</button>
        </router-link>
      </div>
    </div>

    <div class="hero-right">
      <img src="../assets/hero.png" alt="SportSpace" />
    </div>
  </section>

  <!-- KATEGORI -->
  <section class="kategori">
    <div class="section-title">
      <h2>Kategori Olahraga</h2>
      <p>Pilih lapangan sesuai kebutuhan Anda</p>
    </div>

    <div class="cards">
      <div class="card">
        <h3>Mini Soccer</h3>
        <span>5 Lapangan</span>
      </div>

      <div class="card">
        <h3>Futsal</h3>
        <span>8 Lapangan</span>
      </div>

      <div class="card">
        <h3>Badminton</h3>
        <span>12 Lapangan</span>
      </div>

      <div class="card">
        <h3>Basket</h3>
        <span>4 Lapangan</span>
      </div>
    </div>
  </section>

  <!-- STATISTIK -->
  <section class="stats">
    <div class="stat">
      <h2>150+</h2>
      <p>Reservasi</p>
    </div>

    <div class="stat">
      <h2>20+</h2>
      <p>Lapangan</p>
    </div>

    <div class="stat">
      <h2>500+</h2>
      <p>Pelanggan</p>
    </div>

    <div class="stat">
      <h2>98%</h2>
      <p>Kepuasan</p>
    </div>
  </section>
  <!-- OLAHRAGA FAVORIT -->

  <section class="sports">
    <div class="section-title">
      <h2>Olahraga Favorit</h2>

      <p>Tersedia berbagai pilihan lapangan premium</p>
    </div>

    <div class="sports-grid">
      <div class="sport-item">⚽ Mini Soccer</div>

      <div class="sport-item">🥅 Futsal</div>

      <div class="sport-item">🏸 Badminton</div>

      <div class="sport-item">🎾 Padel</div>

      <div class="sport-item">🏐 Voli</div>
    </div>
  </section>

  <!-- KEUNGGULAN -->
  <section class="fitur">
    <div class="section-title">
      <h2>Mengapa Memilih SportSpace</h2>
      <p>Dirancang untuk pengalaman reservasi terbaik</p>
    </div>

    <div class="fitur-grid">
      <div class="fitur-card">
        <h3>Booking Online</h3>
        <p>Reservasi lapangan kapan saja tanpa harus datang langsung.</p>
      </div>

      <div class="fitur-card">
        <h3>Jadwal Real-Time</h3>
        <p>Melihat ketersediaan lapangan secara langsung.</p>
      </div>

      <div class="fitur-card">
        <h3>Banyak Pilihan</h3>
        <p>Tersedia berbagai jenis lapangan olahraga.</p>
      </div>

      <div class="fitur-card">
        <h3>Mudah Digunakan</h3>
        <p>Antarmuka sederhana dan nyaman digunakan.</p>
      </div>
    </div>
  </section>

  <!-- TESTIMONI -->

  <section class="testimoni">
    <div class="section-title">
      <h2>Apa Kata Mereka?</h2>

      <p>Pengalaman pelanggan SportSpace</p>
    </div>

    <div class="testimoni-grid">
      <div class="testimoni-card">
        <p>"Booking sangat mudah dan lapangan selalu terawat."</p>

        <h4>— Ronaldo</h4>
      </div>

      <div class="testimoni-card">
        <p>"Sistem reservasi terbaik yang pernah saya gunakan."</p>

        <h4>— Messi</h4>
      </div>

      <div class="testimoni-card">
        <p>"Tampilan modern dan sangat membantu."</p>

        <h4>— Luthfi</h4>
      </div>
    </div>
  </section>

  <!-- CTA -->

  <section class="cta">
    <h2>Siap Bermain Hari Ini?</h2>

    <p>Reservasi lapangan favorit Anda sekarang juga.</p>

    <button class="cta-btn" @click="cekLogin">Reservasi Sekarang</button>
  </section>

  <!-- FOOTER -->
  <footer>
    <h2>SportSpace</h2>

    <p>Sistem Reservasi Sport Center Berbasis Web</p>

    <span> © 2026 SportSpace. All Rights Reserved. </span>
  </footer>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const cekLogin = () => {
  const user = localStorage.getItem("user");

  if (user) {
    router.push("/booking");
  } else {
    alert("Silakan login terlebih dahulu");

    router.push("/login");
  }
};
</script>

<style scoped>
.hero {
  max-width: 1400px;
  margin: auto;

  min-height: 85vh;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 70px;
  align-items: center;

  padding: 80px;
}

.badge {
  display: inline-block;

  background: #dbeafe;
  color: #2563eb;

  padding: 10px 18px;

  border-radius: 999px;

  font-size: 14px;
  font-weight: 600;

  margin-bottom: 25px;
}

.hero-left h1 {
  font-size: 72px;
  line-height: 1.1;

  max-width: 700px;

  color: #0f172a;

  margin-bottom: 25px;
}

.hero-left p {
  max-width: 600px;

  font-size: 18px;
  line-height: 1.8;

  color: #64748b;

  margin-bottom: 35px;
}

.buttons {
  display: flex;
  gap: 15px;
}

.primary {
  background: #0f172a;
  color: white;

  border: none;

  padding: 16px 28px;

  border-radius: 12px;

  cursor: pointer;
}

.secondary {
  background: white;

  border: 1px solid #cbd5e1;

  padding: 16px 28px;

  border-radius: 12px;

  cursor: pointer;
}

.hero-right img {
  width: 100%;

  border-radius: 28px;

  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.18);

  transition: 0.4s;
}

.hero-right img:hover {
  transform: translateY(-8px);
}

.kategori,
.fitur {
  padding: 100px 80px;
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
}

.section-title h2 {
  font-size: 42px;
  color: #0f172a;

  margin-bottom: 10px;
}

.section-title p {
  color: #64748b;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.card {
  background: white;

  padding: 35px;

  border-radius: 20px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  text-align: center;
}

.card h3 {
  color: #0f172a;
  margin-bottom: 10px;
}

.card span {
  color: #64748b;
}

.stats {
  background: #0f172a;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  text-align: center;

  padding: 80px;
}

.stat h2 {
  color: white;
  font-size: 48px;
}

.stat p {
  color: #cbd5e1;
}

.fitur-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.fitur-card {
  background: white;

  padding: 35px;

  border-radius: 20px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.fitur-card h3 {
  color: #0f172a;
  margin-bottom: 10px;
}

.fitur-card p {
  color: #64748b;
  line-height: 1.7;
}

footer {
  background: #0f172a;

  text-align: center;

  padding: 60px 20px;
}

footer h2 {
  color: white;
  margin-bottom: 15px;
}

footer p {
  color: #cbd5e1;
  margin-bottom: 20px;
}

footer span {
  color: #94a3b8;
}

.sports {
  padding: 100px 80px;

  background: #f8fafc;
}

.sports-grid {
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  gap: 20px;
}

.sport-item {
  background: white;

  padding: 30px;

  text-align: center;

  border-radius: 20px;

  font-weight: 600;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  transition: 0.3s;
}

.sport-item:hover {
  transform: translateY(-6px);

  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
}

.testimoni {
  padding: 100px 80px;
}

.testimoni-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 25px;
}

.testimoni-card {
  background: white;

  padding: 35px;

  border-radius: 20px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.testimoni-card p {
  color: #64748b;

  line-height: 1.8;

  margin-bottom: 20px;
}

.testimoni-card h4 {
  color: #2563eb;
}

.cta {
  margin: 80px;

  padding: 80px;

  border-radius: 30px;

  text-align: center;

  background: linear-gradient(135deg, #0f172a, #1e3a8a);
}

.cta h2 {
  color: white;

  font-size: 48px;

  margin-bottom: 15px;
}

.cta p {
  color: #cbd5e1;

  margin-bottom: 30px;
}

.cta-btn {
  background: white;

  color: #0f172a;

  border: none;

  padding: 18px 35px;

  border-radius: 14px;

  font-weight: 700;

  cursor: pointer;
}

@media (max-width: 992px) {
  .sports-grid {
    grid-template-columns: 1fr 1fr;
  }

  .testimoni-grid {
    grid-template-columns: 1fr;
  }

  .cta {
    margin: 30px;
    padding: 40px;
  }
  .hero {
    grid-template-columns: 1fr;
  }

  .cards {
    grid-template-columns: 1fr 1fr;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .fitur-grid {
    grid-template-columns: 1fr;
  }
}
</style>
