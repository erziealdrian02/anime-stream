Feature('Homepage');

Scenario(
  'menampilkan daftar anime dan membuka halaman ongoing',
  async ({ I }) => {
    I.amOnPage('/');

    // Tunggu teks 'Popular Anime' muncul, maksimal 5 detik
    I.waitForText('Popular Anime', 5);
    I.see('Popular Anime');

    // Tunggu Ongoing Section
    I.waitForText('On Going', 5);
    I.see('On Going');

    // Klik tombol "Lihat semua" di Ongoing
    I.click('[data-testid="see-all-ongoing"]');

    // Pastikan sudah berpindah ke halaman ongoing
    I.waitInUrl('/ongoing', 5); // atau I.seeInCurrentUrl('/ongoing')
    I.see('Daftar Anime Ongoing'); // pastikan sesuai dengan konten di halaman ongoing
  }
);
