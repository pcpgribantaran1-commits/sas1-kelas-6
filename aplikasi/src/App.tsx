import { useState, useEffect } from 'react'
import './App.css'

// ==========================================
// 1. TIPE DATA SOAL & STRUKTUR UJIAN
// ==========================================
type TipeSoal = 'pg' | 'pgk' | 'tabel' | 'jodoh' | 'isian' | 'uraian'

interface OpsiPG {
  kode: string
  teks: string
}

interface ItemJodohKiri {
  nomor: number
  teks: string
}

interface ItemJodohKanan {
  kode: string
  teks: string
}

interface DataSoal {
  nomor: number
  nomorAsli?: number
  tipe: TipeSoal
  bacaanGambar?: string
  bacaanJudul?: string
  bacaanTeks?: string[]
  pertanyaan: string
  petunjuk?: string
  opsi?: OpsiPG[]
  kolomTabel?: string[]
  barisTabel?: string[]
  kolomKiri?: ItemJodohKiri[]
  kolomKanan?: ItemJodohKanan[]
  kunciKodePg?: string
  kunciKodePgk?: string[]
  kunciTabel?: string[]
  kunciIsianList?: string[]
  kunciText?: string
  kunciTeksReviu?: string
}

interface RiwayatUjian {
  id: string
  waktu: string
  namaPeserta: string
  username: string
  namaLembaga: string
  mapel: string
  skor: number
  jawaban: Record<number, any>
  kirimStatus?: string
}

// ==========================================
// 2. BANK SOAL 1: BAHASA INDONESIA - SD SEDERAJAT (PAKET 1)
// ==========================================
const BANK_SOAL_BINDO_PAKET_1: Omit<DataSoal, 'nomor'>[] = [
  // 1
  {
    nomorAsli: 1,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-1.png',
    bacaanTeks: [
      'Reno menemukan sebuah dompet berisi uang tunai yang cukup banyak di lapangan sekolah. Meskipun Reno sangat membutuhkan uang untuk memperbaiki sepedanya yang rusak, ia segera menyerahkan dompet tersebut kepada guru piket agar diumumkan pemiliknya.'
    ],
    pertanyaan: 'Nilai moral utama yang ditunjukkan oleh sikap tokoh Reno adalah...',
    opsi: [
      { kode: 'A', teks: 'A. Kreativitas dalam menyelesaikan masalah tanpa bantuan orang lain' },
      { kode: 'B', teks: 'B. Kejujuran untuk mengembalikan barang yang bukan haknya' },
      { kode: 'C', teks: 'C. Ketekunan dalam merawat barang milik pribadi' },
      { kode: 'D', teks: 'D. Kedermawanan dalam membagikan rezeki kepada orang lain' }
    ],
    kunciKodePg: 'B',
    kunciText: 'B. Kejujuran untuk mengembalikan barang yang bukan haknya',
    kunciTeksReviu: 'B. Kejujuran untuk mengembalikan barang yang bukan haknya'
  },

  // 2
  {
    nomorAsli: 2,
    tipe: 'pgk',
    bacaanGambar: 'bindo6-soal-2.png',
    bacaanTeks: [
      'Hutan sedang mengalami musim kemarau panjang. Burung Jalak sengaja membawa gayung kecil berisi air dari tempat jauh untuk membasahi tenggorokan Kura-kura yang kelelahan. Kura-kura sangat berterima kasih atas bantuan tulus Burung Jalak.'
    ],
    pertanyaan: 'Berdasarkan cerita di atas, tentukan pernyataan yang sesuai dengan nilai sosial dan moral cerita!',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Burung Jalak menunjukkan sikap kepedulian sosial kepada sesama makhluk.' },
      { kode: 'B', teks: 'Kura-kura meminta imbalan sebelum menerima bantuan dari Burung Jalak.' },
      { kode: 'C', teks: 'Kebaikan tidak dinilai dari besarnya bantuan, melainkan dari ketulusan hati.' },
      { kode: 'D', teks: 'Tolong-menolong sebaiknya dilakukan jika menguntungkan diri sendiri.' }
    ],
    kunciKodePgk: ['A', 'C'],
    kunciText: 'Burung Jalak menunjukkan sikap kepedulian sosial kepada sesama makhluk; Kebaikan tidak dinilai dari besarnya bantuan, melainkan dari ketulusan hati',
    kunciTeksReviu: 'Burung Jalak menunjukkan sikap kepedulian sosial kepada sesama makhluk; Kebaikan tidak dinilai dari besarnya bantuan, melainkan dari ketulusan hati'
  },

  // 3
  {
    nomorAsli: 3,
    tipe: 'jodoh',
    pertanyaan: 'Jodohkan istilah nilai dalam cerita pada Kolom A dengan deskripsi penerapan yang tepat pada Kolom B!',
    petunjuk: 'Pilih huruf pasangan yang tepat di Kolom B untuk setiap nomor di Kolom A.',
    kolomKiri: [
      { nomor: 1, teks: 'Nilai Moral' },
      { nomor: 2, teks: 'Nilai Sosial' },
      { nomor: 3, teks: 'Nilai Budaya' }
    ],
    kolomKanan: [
      { kode: 'A', teks: 'Tindakan mengembalikan barang milik orang lain yang ditemukan di jalan' },
      { kode: 'B', teks: 'Kerja sama warga desa membersihkan saluran air secara gotong-royong' },
      { kode: 'C', teks: 'Tradisi meminang dan penggunaan pakaian adat saat upacara perkawinan' },
      { kode: 'D', teks: 'Membiarkan sampah menumpuk di depan rumah tanpa dibersihkan' }
    ],
    kunciTabel: ['A', 'B', 'C'],
    kunciText: '1 -> A, 2 -> B, 3 -> C',
    kunciTeksReviu: '1 -> A, 2 -> B, 3 -> C'
  },

  // 4
  {
    nomorAsli: 4,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-4.png',
    bacaanTeks: [
      'Pak Doni berjanji mendampingi Nisa belajar matematika malam ini. Namun, karena tergiur menonton bola di TV bersama teman-temannya, Pak Doni mengingkari janji hingga Nisa menangis kebingungan.'
    ],
    pertanyaan: 'Tentukan kebenaran dari pernyataan berikut berdasarkan cerita di atas!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan.',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Kesalahan Pak Doni memberikan pelajaran pentingnya komitmen dan menepati janji.',
      'Tindakan Pak Doni merupakan contoh penerapan nilai tanggung jawab orang tua.',
      'Nisa merasa kecewa karena janji pendampingan belajar tidak dipenuhi.'
    ],
    kunciTabel: ['Benar', 'Salah', 'Benar'],
    kunciText: '1: Benar, 2: Salah, 3: Benar',
    kunciTeksReviu: '1: Benar, 2: Salah, 3: Benar'
  },

  // 5
  {
    nomorAsli: 5,
    tipe: 'tabel',
    bacaanJudul: 'Hewan Pemakan Daun, Apa itu?',
    bacaanTeks: [
      'Hewan bisa dibagi menjadi tiga kelompok berdasarkan makanan mereka. Karnivora, hewan pemakan daging. Contoh hewan karnivora adalah singa. Selanjutnya herbivora, yaitu hewan pemakan tumbuhan. Sapi adalah contoh hewan herbivora. Terakhir, hewan omnivora, yaitu hewan pemakan daging dan tumbuhan, seperti beruang.',
      'Dari kelompok herbivora, ada hewan yang hanya makan daun saja. Mereka disebut folivora. Hewan folivora hanya makan daun untuk hidup. Namun, daun itu susah untuk dicerna, apalagi kalau sudah tua. Kadang-kadang daun juga mengandung zat yang bisa berbahaya.',
      'Agar bisa mencerna daun, tubuh hewan folivora punya cara khusus. Mereka punya usus yang panjang agar makanan bisa diproses lebih lama. Tubuh hewan folivora bekerja lebih lambat, jadi tidak terlalu banyak bergerak. Di dalam perut hewan folivora juga ada bakteri baik yang membantu mencerna daun. Beberapa hewan folivora lebih suka daun muda karena lebih lembut dan mudah dimakan.',
      'Ada beberapa contoh hewan folivora yang hidup di alam. Misalnya, panda yang makan daun bambu. Ada juga koala yang makan daun eukaliptus. Mereka tinggal di hutan dan sangat bergantung pada daun untuk makan. Karena itu, hutan tempat mereka tinggal harus dijaga supaya mereka bisa terus hidup.'
    ],
    pertanyaan: 'Berdasarkan teks di atas, hewan folivora memiliki beberapa ciri khusus. Tentukan sesuai atau tidak sesuai untuk setiap pernyataan ciri-ciri berikut!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan.',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Folivora merupakan hewan yang geraknya sangat aktif',
      'Folivora memiliki usus yang panjang',
      'Folivora hanya memakan daging'
    ],
    kunciTabel: ['Tidak Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: '1: Tidak Sesuai, 2: Sesuai, 3: Tidak Sesuai',
    kunciTeksReviu: '1: Tidak Sesuai, 2: Sesuai, 3: Tidak Sesuai'
  },

  // 6
  {
    nomorAsli: 6,
    tipe: 'tabel',
    bacaanJudul: 'Kepala Desa yang Sombong Menjadi Dermawan',
    bacaanTeks: [
      'Seorang pengemis datang ke rumah kepala desa untuk meminta makan dan sedikit uang. Bukannya memberi makan, sang kepala desa justru mengusir pengemis itu. Keesokan harinya, saat bangun tidur, kepala desa yang kikir itu merasakan tangannya lumpuh dan tidak dapat digerakkan. Ia pun membuat sayembara. Siapa pun yang dapat menyembuhkannya, akan diberi setengah dari kekayaannya. Pengemis yang kemarin diusirnya datang, "Hai, orang kaya! Ini adalah akibat dari sifat sombong dan kikirmu! Hanya ada tiga hal yang dapat menyembuhkanmu! Pertama, kau harus mengubah sifat sombong dan kikirmu. Kedua, bertapalah di sebuah batu cekung di Gunung Karang selama tujuh hari tujuh malam. Ketiga, jika kau sembuh, penuhilah janjimu. Bagikan setengah harta kekayaanmu kepada orang-orang tidak mampu!"',
      'Kepala desa yang kaya itu pun melakukan hal-hal yang disebutkan oleh pengemis. Ia pergi ke Gunung Karang dan melewati perjalanan yang melelahkan. Ia bertapa dan berdoa selama tujuh hari tujuh malam melewati berbagai cobaan. Pada hari ketujuh, tiba-tiba batu cekung itu menyemburkan sumber mata air panas. Sang kepala desa itu segera mandi. Secara ajaib, ia pun sembuh dari kelumpuhannya.',
      'Ia kembali ke desa dan memenuhi janjinya, mendermakan hartanya kepada orang-orang tidak mampu. Akhirnya, kepala desa yang kaya raya itu dikenal sebagai orang yang dermawan. Warga pun sangat menyayanginya.'
    ],
    pertanyaan: 'Apa nilai moral positif yang terkandung di dalam teks tersebut? Tentukan sesuai atau tidak sesuai untuk setiap pernyataan mengenai nilai moral berikut ini.',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan.',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Memberi lebih baik daripada menerima',
      'Memberikan sebagian dari harta kita, akan membawa kebahagiaan bagi orang yang memerlukannya',
      'Memberikan semua harta kekayaan, tidak akan menjadikan seseorang kesulitan keuangan'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: '1: Sesuai, 2: Sesuai, 3: Tidak Sesuai',
    kunciTeksReviu: '1: Sesuai, 2: Sesuai, 3: Tidak Sesuai'
  },

  // 7
  {
    nomorAsli: 7,
    tipe: 'pgk',
    bacaanJudul: 'Kepala Desa yang Sombong Menjadi Dermawan',
    bacaanTeks: [
      'Seorang pengemis datang ke rumah kepala desa untuk meminta makan dan sedikit uang. Bukannya memberi makan, sang kepala desa justru mengusir pengemis itu. Keesokan harinya, saat bangun tidur, kepala desa yang kikir itu merasakan tangannya lumpuh dan tidak dapat digerakkan. Ia pun membuat sayembara. Siapa pun yang dapat menyembuhkannya, akan diberi setengah dari kekayaannya. Pengemis yang kemarin diusirnya datang, "Hai, orang kaya! Ini adalah akibat dari sifat sombong dan kikirmu! Hanya ada tiga hal yang dapat menyembuhkanmu! Pertama, kau harus mengubah sifat sombong dan kikirmu. Kedua, bertapalah di sebuah batu cekung di Gunung Karang selama tujuh hari tujuh malam. Ketiga, jika kau sembuh, penuhilah janjimu. Bagikan setengah harta kekayaanmu kepada orang-orang tidak mampu!"',
      'Kepala desa yang kaya itu pun melakukan hal-hal yang disebutkan oleh pengemis. Ia pergi ke Gunung Karang dan melewati perjalanan yang melelahkan. Ia bertapa dan berdoa selama tujuh hari tujuh malam melewati berbagai cobaan. Pada hari ketujuh, tiba-tiba batu cekung itu menyemburkan sumber mata air panas. Sang kepala desa itu segera mandi. Secara ajaib, ia pun sembuh dari kelumpuhannya.',
      'Ia kembali ke desa dan memenuhi janjinya, mendermakan hartanya kepada orang-orang tidak mampu. Akhirnya, kepala desa yang kaya raya itu dikenal sebagai orang yang dermawan. Warga pun sangat menyayanginya.'
    ],
    pertanyaan: 'Apa makna kata "kikir" dalam teks tersebut?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Suka memberi dan murah hati' },
      { kode: 'B', teks: 'Sangat pelit' },
      { kode: 'C', teks: 'Tidak mau memberi atau mengeluarkan hartanya' }
    ],
    kunciKodePgk: ['B', 'C'],
    kunciText: 'Sangat pelit; Tidak mau memberi atau mengeluarkan hartanya',
    kunciTeksReviu: 'Sangat pelit; Tidak mau memberi atau mengeluarkan hartanya'
  },

  // 8
  {
    nomorAsli: 8,
    tipe: 'tabel',
    bacaanJudul: 'Kepala Desa yang Sombong Menjadi Dermawan',
    bacaanTeks: [
      'Seorang pengemis datang ke rumah kepala desa untuk meminta makan dan sedikit uang. Bukannya memberi makan, sang kepala desa justru mengusir pengemis itu. Keesokan harinya, saat bangun tidur, kepala desa yang kikir itu merasakan tangannya lumpuh dan tidak dapat digerakkan. Ia pun membuat sayembara. Siapa pun yang dapat menyembuhkannya, akan diberi setengah dari kekayaannya. Pengemis yang kemarin diusirnya datang, "Hai, orang kaya! Ini adalah akibat dari sifat sombong dan kikirmu! Hanya ada tiga hal yang dapat menyembuhkanmu! Pertama, kau harus mengubah sifat sombong dan kikirmu. Kedua, bertapalah di sebuah batu cekung di Gunung Karang selama tujuh hari tujuh malam. Ketiga, jika kau sembuh, penuhilah janjimu. Bagikan setengah harta kekayaanmu kepada orang-orang tidak mampu!"',
      'Kepala desa yang kaya itu pun melakukan hal-hal yang disebutkan oleh pengemis. Ia pergi ke Gunung Karang dan melewati perjalanan yang melelahkan. Ia bertapa dan berdoa selama tujuh hari tujuh malam melewati berbagai cobaan. Pada hari ketujuh, tiba-tiba batu cekung itu menyemburkan sumber mata air panas. Sang kepala desa itu segera mandi. Secara ajaib, ia pun sembuh dari kelumpuhannya.',
      'Ia kembali ke desa dan memenuhi janjinya, mendermakan hartanya kepada orang-orang tidak mampu. Akhirnya, kepala desa yang kaya raya itu dikenal sebagai orang yang dermawan. Warga pun sangat menyayanginya.'
    ],
    pertanyaan: 'Berdasarkan teks, apa tujuan kepala desa pergi ke Gunung Karang? Tentukan sesuai atau tidak sesuai untuk setiap pernyataan mengenai tujuan kepala desa berikut!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan.',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Menyembuhkan tangannya yang lumpuh',
      'Melaksanakan hal-hal yang diberikan oleh pengemis',
      'Berendam air panas untuk menyegarkan badannya'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: '1: Sesuai, 2: Sesuai, 3: Tidak Sesuai',
    kunciTeksReviu: '1: Sesuai, 2: Sesuai, 3: Tidak Sesuai'
  },

  // 9
  {
    nomorAsli: 9,
    tipe: 'tabel',
    bacaanJudul: 'Kepala Desa yang Sombong Menjadi Dermawan',
    bacaanTeks: [
      'Seorang pengemis datang ke rumah kepala desa untuk meminta makan dan sedikit uang. Bukannya memberi makan, sang kepala desa justru mengusir pengemis itu. Keesokan harinya, saat bangun tidur, kepala desa yang kikir itu merasakan tangannya lumpuh dan tidak dapat digerakkan. Ia pun membuat sayembara. Siapa pun yang dapat menyembuhkannya, akan diberi setengah dari kekayaannya. Pengemis yang kemarin diusirnya datang, "Hai, orang kaya! Ini adalah akibat dari sifat sombong dan kikirmu! Hanya ada tiga hal yang dapat menyembuhkanmu! Pertama, kau harus mengubah sifat sombong dan kikirmu. Kedua, bertapalah di sebuah batu cekung di Gunung Karang selama tujuh hari tujuh malam. Ketiga, jika kau sembuh, penuhilah janjimu. Bagikan setengah harta kekayaanmu kepada orang-orang tidak mampu!"',
      'Kepala desa yang kaya itu pun melakukan hal-hal yang disebutkan oleh pengemis. Ia pergi ke Gunung Karang dan melewati perjalanan yang melelahkan. Ia bertapa dan berdoa selama tujuh hari tujuh malam melewati berbagai cobaan. Pada hari ketujuh, tiba-tiba batu cekung itu menyemburkan sumber mata air panas. Sang kepala desa itu segera mandi. Secara ajaib, ia pun sembuh dari kelumpuhannya.',
      'Ia kembali ke desa dan memenuhi janjinya, mendermakan hartanya kepada orang-orang tidak mampu. Akhirnya, kepala desa yang kaya raya itu dikenal sebagai orang yang dermawan. Warga pun sangat menyayanginya.'
    ],
    pertanyaan: 'Apa perubahan karakter yang terjadi pada tokoh kepala desa? Tentukan sesuai atau tidak sesuai untuk setiap pernyataan perubahan karakter kepala desa berikut!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan.',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Sombong menjadi dermawan',
      'Kikir menjadi rendah hati',
      'Peduli sesama menjadi tidak peduli kepada orang miskin'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: '1: Sesuai, 2: Sesuai, 3: Tidak Sesuai',
    kunciTeksReviu: '1: Sesuai, 2: Sesuai, 3: Tidak Sesuai'
  },

  // 10
  {
    nomorAsli: 10,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-10.png',
    bacaanJudul: 'Surat Undangan — SD Harapan Bangsa',
    bacaanTeks: [
      'Nomor: 015/SD-HB/IX/2026 | Hal: Undangan Kegiatan Literasi',
      'Yth. Orang Tua/Wali Murid Kelas VI SD Harapan Bangsa. Dalam rangka meningkatkan minat baca siswa, SD Harapan Bangsa akan mengadakan Kegiatan Pekan Literasi pada hari Sabtu, 10 Oktober 2026, pukul 08.00-11.00 WIB di Aula SD Harapan Bangsa.',
      'Kepala SD Harapan Bangsa: Rina Wulandari, S.Pd.'
    ],
    pertanyaan: 'Tujuan utama surat tersebut adalah...',
    opsi: [
      { kode: 'A', teks: 'A. memberitahukan hasil kegiatan literasi' },
      { kode: 'B', teks: 'B. mengundang orang tua menghadiri kegiatan literasi' },
      { kode: 'C', teks: 'C. meminta orang tua mengisi formulir' },
      { kode: 'D', teks: 'D. menawarkan buku kepada orang tua' }
    ],
    kunciKodePg: 'B',
    kunciText: 'B. mengundang orang tua menghadiri kegiatan literasi',
    kunciTeksReviu: 'B. mengundang orang tua menghadiri kegiatan literasi'
  },

  // 11
  {
    nomorAsli: 11,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-10.png',
    bacaanJudul: 'Surat Undangan — SD Harapan Bangsa',
    bacaanTeks: [
      'Nomor: 015/SD-HB/IX/2026 | Hal: Undangan Kegiatan Literasi',
      'Yth. Orang Tua/Wali Murid Kelas VI SD Harapan Bangsa. Dalam rangka meningkatkan minat baca siswa, SD Harapan Bangsa akan mengadakan Kegiatan Pekan Literasi pada hari Sabtu, 10 Oktober 2026, pukul 08.00-11.00 WIB di Aula SD Harapan Bangsa.',
      'Kepala SD Harapan Bangsa: Rina Wulandari, S.Pd.'
    ],
    pertanyaan: 'Berdasarkan teks tersebut, tentukan sesuai atau tidak sesuai untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan.',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Surat ditujukan kepada orang tua/wali murid kelas VI.',
      'Kegiatan dilaksanakan pada pukul 09.00-12.00 WIB.',
      'Surat menggunakan bahasa yang santun.',
      'Tujuan kegiatan adalah meningkatkan minat baca siswa.',
      'Kegiatan dilaksanakan di perpustakaan sekolah.',
      'Surat mencantumkan waktu dan tempat kegiatan.'
    ],
    kunciTabel: ['Sesuai', 'Tidak Sesuai', 'Sesuai', 'Sesuai', 'Tidak Sesuai', 'Sesuai'],
    kunciText: '1: Sesuai, 2: Tidak Sesuai, 3: Sesuai, 4: Sesuai, 5: Tidak Sesuai, 6: Sesuai',
    kunciTeksReviu: '1: Sesuai, 2: Tidak Sesuai, 3: Sesuai, 4: Sesuai, 5: Tidak Sesuai, 6: Sesuai'
  },

  // 12
  {
    nomorAsli: 12,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-12.png',
    bacaanJudul: 'Formulir Pendaftaran Klub Jurnalistik',
    bacaanTeks: [
      'Nama lengkap: Dimas Pratama',
      'Tempat, tanggal lahir: Sidoarjo, 15 Mei 2014',
      'Kelas: VI B',
      'Alamat: Jl. Anggrek No. 15, Sidoarjo',
      'Nomor telepon orang tua: 0812-3456-7890',
      'Hobi: Membaca dan menulis',
      'Alasan mengikuti klub: Ingin belajar menulis berita dan membuat laporan kegiatan sekolah.'
    ],
    pertanyaan: 'Nama peserta yang mengisi formulir adalah ....',
    kunciIsianList: ['dimas pratama', 'dimas'],
    kunciText: 'Dimas Pratama',
    kunciTeksReviu: 'Dimas Pratama'
  },

  // 13
  {
    nomorAsli: 13,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-12.png',
    bacaanJudul: 'Formulir Pendaftaran Klub Jurnalistik',
    bacaanTeks: [
      'Nama lengkap: Dimas Pratama',
      'Tempat, tanggal lahir: Sidoarjo, 15 Mei 2014',
      'Kelas: VI B',
      'Alamat: Jl. Anggrek No. 15, Sidoarjo',
      'Nomor telepon orang tua: 0812-3456-7890',
      'Hobi: Membaca dan menulis',
      'Alasan mengikuti klub: Ingin belajar menulis berita dan membuat laporan kegiatan sekolah.'
    ],
    pertanyaan: 'Berdasarkan formulir pendaftaran klub jurnalistik tersebut, tentukan benar atau salah untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan.',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Formulir digunakan untuk mengumpulkan informasi tertentu dari seseorang.',
      'Dimas berada di kelas VIA.',
      'Dimas memiliki hobi membaca dan menulis.',
      'Dimas mengikuti klub jurnalistik karena ingin belajar memasak.',
      'Formulir harus diisi berdasarkan informasi yang benar.',
      'Nomor telepon dapat menjadi informasi untuk menghubungi peserta.'
    ],
    kunciTabel: ['Benar', 'Salah', 'Benar', 'Salah', 'Benar', 'Benar'],
    kunciText: '1: Benar, 2: Salah, 3: Benar, 4: Salah, 5: Benar, 6: Benar',
    kunciTeksReviu: '1: Benar, 2: Salah, 3: Benar, 4: Salah, 5: Benar, 6: Benar'
  },

  // 14
  {
    nomorAsli: 14,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-14.png',
    bacaanTeks: [
      'Kalimat A: "Bapak/Ibu wajib hadir dalam kegiatan tersebut. Kalau tidak datang, kegiatan akan terganggu."',
      'Kalimat B: "Kami mengharapkan kehadiran Bapak/Ibu untuk mendukung keberhasilan kegiatan tersebut."'
    ],
    pertanyaan: 'Kalimat manakah yang lebih tepat digunakan dalam surat resmi?',
    kunciIsianList: ['kalimat b', 'b'],
    kunciText: 'Kalimat B',
    kunciTeksReviu: 'Kalimat B'
  },

  // 15
  {
    nomorAsli: 15,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-15.png',
    bacaanTeks: [
      'Dalam sebuah cerita visual, Sinta mengikuti latihan tari tradisional di balai desa. Ia melihat beberapa temannya lebih tertarik memainkan telepon genggam daripada mempelajari tarian daerah. Sinta mengajak teman-temannya berlatih bersama dan menjelaskan bahwa tarian tradisional merupakan warisan budaya yang harus dijaga. Akhirnya, mereka sepakat mengikuti latihan untuk tampil dalam acara perayaan desa.'
    ],
    pertanyaan: 'Nilai budaya yang terdapat dalam cerita tersebut adalah...',
    opsi: [
      { kode: 'A', teks: 'A. Melestarikan kesenian tradisional.' },
      { kode: 'B', teks: 'B. Mengutamakan permainan modern.' },
      { kode: 'C', teks: 'C. Menghindari kegiatan masyarakat.' },
      { kode: 'D', teks: 'D. Mengabaikan tradisi daerah.' }
    ],
    kunciKodePg: 'A',
    kunciText: 'A. Melestarikan kesenian tradisional.',
    kunciTeksReviu: 'A. Melestarikan kesenian tradisional.'
  },

  // 16
  {
    nomorAsli: 16,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-16.png',
    bacaanTeks: [
      'Dalam sebuah gambar animasi, warga kampung melaksanakan kerja bakti pada hari Minggu. Mereka membersihkan selokan, menyapu jalan, dan mengumpulkan sampah. Meskipun pekerjaan cukup berat, mereka tetap bersemangat karena dilakukan bersama-sama. Lingkungan kampung menjadi bersih dan nyaman.'
    ],
    pertanyaan: 'Kegiatan kerja bakti dalam cerita mencerminkan sikap peduli terhadap...',
    kunciIsianList: ['lingkungan', 'kebersihan lingkungan', 'lingkungan sekitar', 'lingkungan kampung'],
    kunciText: 'Lingkungan / kebersihan lingkungan',
    kunciTeksReviu: 'Lingkungan / kebersihan lingkungan'
  },

  // 17
  {
    nomorAsli: 17,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-16.png',
    bacaanTeks: [
      'Dalam sebuah komik, Roni melihat Rohman terjatuh saat berjalan menuju kelas. Buku-buku Rohman berserakan di lantai. Roni segera membantu Rohman berdiri dan mengumpulkan buku-bukunya. Rohman berterima kasih kepada Roni karena telah membantunya.'
    ],
    pertanyaan: 'Berdasarkan bacaan tersebut, tentukan benar atau salah untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan.',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Rina menunjukkan sikap peduli dengan membantu Siti.',
      'Nilai moral dalam cerita tersebut adalah sikap tidak peduli terhadap teman.',
      'Pesan cerita tersebut adalah kita sebaiknya membantu orang yang mengalami kesulitan.',
      'Rohman berterima kasih kepada Roni.'
    ],
    kunciTabel: ['Salah', 'Salah', 'Benar', 'Benar'],
    kunciText: '1: Salah, 2: Salah, 3: Benar, 4: Benar',
    kunciTeksReviu: '1: Salah, 2: Salah, 3: Benar, 4: Benar'
  },

  // 18
  {
    nomorAsli: 18,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-18.png',
    bacaanTeks: [
      'Dalam sebuah komik, siswa kelas VI mendapat tugas membuat poster tentang persatuan. Kelompok mereka terdiri atas siswa dengan latar belakang budaya dan kemampuan yang berbeda. Ketika berdiskusi, beberapa siswa selalu memutuskan sendiri tanpa mendengarkan pendapat anggota lain. Mereka juga mengabaikan usulan seorang teman yang mengalami kesulitan berbicara. Ketua kelompok kemudian mengajak semua anggota menyampaikan pendapat secara bergiliran dan membagi tugas sesuai kemampuan masing-masing. Akhirnya, mereka menghasilkan poster yang baik.'
    ],
    pertanyaan: 'Berdasarkan keseluruhan cerita, kesimpulan yang paling tepat tentang nilai persatuan adalah...',
    opsi: [
      { kode: 'A', teks: 'A. persatuan berarti semua anggota harus memiliki pendapat yang sama' },
      { kode: 'B', teks: 'B. persatuan hanya dapat dicapai jika ketua menentukan semua keputusan' },
      { kode: 'C', teks: 'C. perbedaan kemampuan sebaiknya dihindari ketika bekerja dalam kelompok' },
      { kode: 'D', teks: 'D. persatuan terwujud ketika setiap anggota dihargai dan berkontribusi sesuai kemampuannya' }
    ],
    kunciKodePg: 'D',
    kunciText: 'D. persatuan terwujud ketika setiap anggota dihargai dan berkontribusi sesuai kemampuannya',
    kunciTeksReviu: 'D. persatuan terwujud ketika setiap anggota dihargai dan berkontribusi sesuai kemampuannya'
  },

  // 19
  {
    nomorAsli: 19,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-19.png',
    pertanyaan: 'Kata pramuka, kristal, traktor, blangko. Berdasarkan cara pelafalannya, kelompok kata tersebut mengandung gabungan konsonan yang disebut...',
    kunciIsianList: ['konsonan rangkap', 'kluster', 'konsonan rangkap (kluster)', 'gabungan konsonan'],
    kunciText: 'Konsonan rangkap / kluster',
    kunciTeksReviu: 'Konsonan rangkap / kluster'
  },

  // 20
  {
    nomorAsli: 20,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-20.png',
    bacaanJudul: 'Kegiatan Membaca di Perpustakaan',
    bacaanTeks: [
      'Hari ini, kelas enam berkunjung ke perpustakaan sekolah. Di sana mereka menemukan banyak buku cerita yang isinya menarik. Dinda memilih sebuah buku tentang sejarah proklamasi kemerdekaan Indonesia. Sementara itu, Bagas asyik membaca komik tentang sastra budaya Nusantara.',
      'Di sudut ruangan tampak Bu Astuti sedang membimbing seorang anak yang sedang belajar membaca. Anak itu sedang mengeja sebuah kata pada kartu kata yang dipegangnya. Bu Astuti menjelaskan dengan sabar bahwa dalam Bahasa Indonesia ada gabungan dua huruf mati yang dibacakan bersamaan dalam satu kata, yang dikenal sebagai konsonan rangkap (kluster). Dinda dan Bagas pun ikut mendengarkan penjelasan tersebut dengan saksama.'
    ],
    pertanyaan: 'Berdasarkan bacaan tersebut, tentukan pernyataan di bawah ini sesuai atau tidak sesuai!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan.',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Kata proklamasi dalam teks di atas mengandung konsonan rangkap yang terletak di awal kata pada suku kata pertama.',
      'Kata sastra mengandung konsonan rangkap pada suku kata terakhirnya yaitu tr.',
      'Kata kartu merupakan contoh kata yang memiliki konsonan rangkap yaitu rt.',
      'Kata Astuti termasuk kata yang memiliki konsonan rangkap karena kedua hurufnya terpisah oleh suku kata saat diucapkan.',
      'Syarat utama konsonan rangkap (kluster) adalah kedua huruf konsonan berada dalam satu suku kata yang sama saat diucapkan.'
    ],
    kunciTabel: ['Sesuai', 'Tidak Sesuai', 'Tidak Sesuai', 'Tidak Sesuai', 'Sesuai'],
    kunciText: '1: Sesuai, 2: Tidak Sesuai, 3: Tidak Sesuai, 4: Tidak Sesuai, 5: Sesuai',
    kunciTeksReviu: '1: Sesuai, 2: Tidak Sesuai, 3: Tidak Sesuai, 4: Tidak Sesuai, 5: Sesuai'
  },

  // 21
  {
    nomorAsli: 21,
    tipe: 'pgk',
    bacaanJudul: 'Syarat menjadi Dokter Kecil',
    bacaanTeks: [
      'Hari ini, Nyoman merasa senang. Guru kelas mengumumkan syarat untuk menjadi dokter kecil di sekolah. Setiap calon dokter kecil harus berbadan sehat dan rajin. Tugas utama mereka adalah membantu menjaga kesehatan lingkungan sekolah. Pengumuman itu dibaca secara khusus di depan kelas. Nyoman langsung mendaftarkan diri karena ia ingin belajar cara merawat teman yang sakit.'
    ],
    pertanyaan: 'Manakah kata-kata dari teks di atas yang memiliki arti tersurat di dalam bacaan yang mengandung konsonan rangkap?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'a. Nyoman' },
      { kode: 'B', teks: 'b. dokter' },
      { kode: 'C', teks: 'c. khusus' },
      { kode: 'D', teks: 'd. daftar' }
    ],
    kunciKodePgk: ['B', 'D'],
    kunciText: 'b. dokter; d. daftar',
    kunciTeksReviu: 'b. dokter; d. daftar'
  },

  // 22
  {
    nomorAsli: 22,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-22.png',
    pertanyaan: 'Berilah tanda centang pada kolom Benar atau Salah berdasarkan pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan.',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Perbedaan utama antara digraf dan kluster adalah pada cara pelafalannya digraf menghasilkan satu bunyi baru, sedangkan kluster tetap memunculkan bunyi asli kedua hurufnya.',
      'Gabungan huruf ng pada kata "ngarai" dan gabungan huruf ny pada kata "nyanyi" termasuk ke dalam jenis konsonan rangkap digraf.',
      'Kata kertas merupakan kata yang memiliki konsonan rangkap karena huruf r dan t ditulis secara berdampingan.',
      'Kata khawatir dan syarat mengandung konsonan rangkap yang letak posisinya berada di tengah-tengah kata.',
      'Pemenggalan suku kata yang tepat untuk kata blender adalah blen-der sehingga gabungan huruf bl disebut sebagai konsonan rangkap kluster.'
    ],
    kunciTabel: ['Benar', 'Benar', 'Salah', 'Salah', 'Benar'],
    kunciText: '1: Benar, 2: Benar, 3: Salah, 4: Salah, 5: Benar',
    kunciTeksReviu: '1: Benar, 2: Benar, 3: Salah, 4: Salah, 5: Benar'
  },

  // 23
  {
    nomorAsli: 23,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-23.png',
    bacaanTeks: [
      'Andi ingin mengirimkan surat kepada wali kelasnya untuk memohon izin karena ia harus mengikuti kompetisi matematika tingkat nasional.'
    ],
    pertanyaan: 'Manakah kalimat pembuka yang paling santun dan sesuai dengan kaidah surat resmi untuk situasi tersebut?',
    opsi: [
      { kode: 'A', teks: 'A. Halo Bu Guru, saya mau kasih tahu kalau besok saya mau ikut lomba matematika di Jakarta.' },
      { kode: 'B', teks: 'B. Dengan hormat, melalui surat ini saya ingin memohon izin tidak dapat mengikuti pelajaran pada tanggal 15 Oktober 2023.' },
      { kode: 'C', teks: 'C. Bu, maaf ya saya besok tidak masuk sekolah karena ada urusan penting yang tidak bisa ditinggalkan.' },
      { kode: 'D', teks: 'D. Kepada wali kelas 6, saya Andi ingin minta izin karena besok saya harus pergi lomba matematika.' }
    ],
    kunciKodePg: 'B',
    kunciText: 'B. Dengan hormat, melalui surat ini saya ingin memohon izin tidak dapat mengikuti pelajaran pada tanggal 15 Oktober 2023.',
    kunciTeksReviu: 'B. Dengan hormat, melalui surat ini saya ingin memohon izin tidak dapat mengikuti pelajaran pada tanggal 15 Oktober 2023.'
  },

  // 24
  {
    nomorAsli: 24,
    tipe: 'pgk',
    bacaanGambar: 'bindo6-soal-24.png',
    bacaanTeks: [
      'Perhatikan ilustrasi formulir pendaftaran yang sedang diisi oleh seorang siswa.'
    ],
    pertanyaan: 'Berdasarkan prinsip ketelitian dan kejujuran dalam mengisi data, pilih DUA kesalahan yang terdapat pada pengisian formulir tersebut!',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Penulisan tanggal lahir tidak logis (30 Februari).' },
      { kode: 'B', teks: 'B. Nama yang ditulis hanya nama panggilan, bukan nama lengkap sesuai akta.' },
      { kode: 'C', teks: 'C. Alamat rumah tidak dilengkapi dengan nomor telepon.' },
      { kode: 'D', teks: 'D. Kolom tanda tangan diletakkan di bagian paling atas formulir.' }
    ],
    kunciKodePgk: ['A', 'B'],
    kunciText: 'A. Penulisan tanggal lahir tidak logis (30 Februari); B. Nama yang ditulis hanya nama panggilan, bukan nama lengkap sesuai akta',
    kunciTeksReviu: 'A. Penulisan tanggal lahir tidak logis (30 Februari); B. Nama yang ditulis hanya nama panggilan, bukan nama lengkap sesuai akta'
  },

  // 25
  {
    nomorAsli: 25,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-25.png',
    bacaanTeks: [
      'Kepada: wali.kelas@sekolah.sch.id',
      'Subjek: IZIN MENGIKUTI LOMBA',
      'SELAMAT PAGI BU, SAYA IZIN TIDAK MASUK KARENA MENGIKUTI KOMPETISI MATEMATIKA TINGKAT NASIONAL.'
    ],
    pertanyaan: 'Dalam etika berkomunikasi digital (Netiquette), menuliskan seluruh pesan atau subjek dalam surat elektronik (email) menggunakan HURUF KAPITAL SEMUA dianggap sebagai tindakan yang tidak sopan karena setara dengan berteriak kepada penerima pesan.',
    opsi: [
      { kode: 'A', teks: 'A. Benar' },
      { kode: 'B', teks: 'B. Salah' }
    ],
    kunciKodePg: 'A',
    kunciText: 'A. Benar',
    kunciTeksReviu: 'A. Benar'
  },

  // 26
  {
    nomorAsli: 26,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-26.png',
    bacaanTeks: [
      'PROFIL SISWA — Nama: Budi | Alamat: Jl. Pintar No. 1 | Hobi: Membaca buku cerita dan menggambar | Prestasi: Juara 2 Lomba Menulis Cerpen.',
      'GRAFIK PRESTASI & HOBI: Hobi Membaca (85), Hobi Menggambar (75), Prestasi (90), Aktivitas Kelas (80).'
    ],
    pertanyaan: 'Perhatikan infografis Kurikulum Vitae (CV) milik Budi. Jika Budi ingin mendaftarkan diri sebagai anggota "Klub Literasi Sekolah" yang syarat utamanya adalah gemar membaca, bagian kategori manakah pada CV tersebut yang menjadi bukti kuat bahwa Budi layak diterima?',
    kunciIsianList: ['hobi', 'hobi membaca', 'hobi (membaca buku cerita)', 'grafik hobi membaca'],
    kunciText: 'Hobi (Membaca buku cerita)',
    kunciTeksReviu: 'Hobi (Membaca buku cerita)'
  },

  // 27
  {
    nomorAsli: 27,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-27.png',
    bacaanTeks: [
      'Dengan hormat, sehubungan dengan akan diadakannya peringatan Hari Ulang Tahun Republik Indonesia yang ke-81, kami mengundang Bapak/Ibu untuk menghadiri rapat persiapan yang akan dilaksanakan pada...'
    ],
    pertanyaan: 'Kutipan tersebut merupakan bagian dari jenis surat...',
    opsi: [
      { kode: 'A', teks: 'A. Surat pribadi' },
      { kode: 'B', teks: 'B. Surat undangan resmi' },
      { kode: 'C', teks: 'C. Surat dinas perorangan' },
      { kode: 'D', teks: 'D. Surat pembaca' }
    ],
    kunciKodePg: 'B',
    kunciText: 'B. Surat undangan resmi',
    kunciTeksReviu: 'B. Surat undangan resmi'
  },

  // 28
  {
    nomorAsli: 28,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-28.png',
    bacaanTeks: [
      'Surat resmi (undangan rapat sekolah dari kepala sekolah) menggunakan bahasa baku, ragam resmi, serta dilengkapi dengan kop surat, nomor surat, lampiran, dan perihal.'
    ],
    pertanyaan: 'Tuliskan huruf B jika pernyataan tersebut benar, atau huruf S jika pernyataan tersebut salah!',
    kunciIsianList: ['b', 'benar'],
    kunciText: 'B (Benar)',
    kunciTeksReviu: 'B (Benar)'
  },

  // 29
  {
    nomorAsli: 29,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-29.png',
    bacaanTeks: [
      'Bandung, 12 November 2026 — Untuk Sahabatku, Rani di Yogyakarta. Halo, Rani! Bagaimana kabarmu di Yogyakarta? Semoga kamu dan keluargamu selalu sehat ya. Aku dan keluarga di Bandung juga sehat. Rani, aku ingin mengabarkan bahwa pada liburan semester depan, keluargaku berencana pergi liburan ke Yogyakarta. Ayah berencana mengajakku berkunjung ke keraton dan Malioboro. Aku sangat tidak sabar ingin bertemu denganmu dan bermain bersama lagi seperti dulu. Jangan lupa balas suratku segera, ya! Kabari aku apakah kamu ada acara liburan atau bisa menemaniku nanti. Sahabatmu, Sinta.'
    ],
    pertanyaan: 'Tentukan apakah pernyataan berikut sesuai atau tidak sesuai dengan isi surat!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan.',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Surat tersebut merupakan surat pribadi karena ditujukan kepada sahabat, yaitu Rani.',
      'Sinta berencana mengunjungi Keraton dan Malioboro bersama keluarganya saat liburan semester depan.',
      'Surat tersebut ditulis oleh Rani yang tinggal di Yogyakarta kepada Sinta di Bandung.'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: '1: Sesuai, 2: Sesuai, 3: Tidak Sesuai',
    kunciTeksReviu: '1: Sesuai, 2: Sesuai, 3: Tidak Sesuai'
  },

  // 30
  {
    nomorAsli: 30,
    tipe: 'pgk',
    bacaanGambar: 'bindo6-soal-29.png',
    bacaanTeks: [
      'Bandung, 12 November 2026 — Untuk Sahabatku, Rani di Yogyakarta. Halo, Rani! Bagaimana kabarmu di Yogyakarta? Semoga kamu dan keluargamu selalu sehat ya. Aku dan keluarga di Bandung juga sehat. Rani, aku ingin mengabarkan bahwa pada liburan semester depan, keluargaku berencana pergi liburan ke Yogyakarta. Ayah berencana mengajakku berkunjung ke keraton dan Malioboro. Aku sangat tidak sabar ingin bertemu denganmu dan bermain bersama lagi seperti dulu. Jangan lupa balas suratku segera, ya! Kabari aku apakah kamu ada acara liburan atau bisa menemaniku nanti. Sahabatmu, Sinta.'
    ],
    pertanyaan: 'Informasi apa saja yang sesuai dengan isi surat Sinta? Pilihlah dua jawaban yang benar!',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Sinta tinggal di Bandung dan menulis surat kepada sahabatnya yang bernama Rani.' },
      { kode: 'B', teks: 'B. Sinta berencana mengunjungi Keraton dan Malioboro bersama keluarganya saat liburan semester depan.' },
      { kode: 'C', teks: 'C. Rani mengajak Sinta berlibur ke Bandung pada liburan semester depan.' },
      { kode: 'D', teks: 'D. Sinta dan keluarganya sedang sakit sehingga tidak dapat berlibur ke Yogyakarta.' }
    ],
    kunciKodePgk: ['A', 'B'],
    kunciText: 'A. Sinta tinggal di Bandung dan menulis surat kepada sahabatnya yang bernama Rani; B. Sinta berencana mengunjungi Keraton dan Malioboro bersama keluarganya saat liburan semester depan',
    kunciTeksReviu: 'A. Sinta tinggal di Bandung dan menulis surat kepada sahabatnya yang bernama Rani; B. Sinta berencana mengunjungi Keraton dan Malioboro bersama keluarganya saat liburan semester depan'
  }
]

// ==========================================
// 3. BANK SOAL 2: MATEMATIKA - SD SEDERAJAT (PAKET 1)
// ==========================================
const BANK_SOAL_MATEMATIKA_PAKET_1: Omit<DataSoal, 'nomor'>[] = []

function siapkanPaketSoal(paket: Omit<DataSoal, 'nomor'>[]): DataSoal[] {
  return paket.map((item, idx) => ({
    ...item,
    nomor: idx + 1
  }))
}

const DAFTAR_MAPEL = [
  'Bahasa Indonesia - SD Sederajat (Paket 1)',
  'Matematika - SD Sederajat (Paket 1)'
]

const DAFTAR_SEKOLAH = [
  'SDN KEDUNGREJO 1',
  'SDN KEDUNGREJO 2',
  'SDN BANTARAN 1',
  'SDN BANTARAN 2',
  'SDN KARANGANYAR 1',
  'SDN KARANGANYAR 2',
  'SDN KROMONGAN 1',
  'SDN KROMONGAN 2',
  'SDN LEGUNDI 1',
  'SDN LEGUNDI 2',
  'SDN MANJARAN 1',
  'SDN MANJARAN 2',
  'SDN PATOKAN 1',
  'SDN PATOKAN 2',
  'SDN RESONGO 1',
  'SDN RESONGO 2',
  'SDN SUMBERLELE 1',
  'SDN SUMBERLELE 2',
  'SDN TEMPURAN 1',
  'SDN TEMPURAN 2',
  'SDN WATUPANJANG 1',
  'SDN WATUPANJANG 2',
  'SDN WONOREJO 1',
  'SDN WONOREJO 2'
]

function resolveAssetUrl(path?: string): string {
  if (!path) return ''
  const clean = path.replace(/^\.?\//, '')
  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${clean}`
}

function normalisasiTeks(teks: string): string {
  return teks.trim().toLowerCase().replace(/\s+/g, ' ')
}

function hitungSkor(soalList: DataSoal[], jawaban: Record<number, any>): number {
  if (!soalList.length) return 0
  let totalPoin = 0

  soalList.forEach(soal => {
    const jwb = jawaban[soal.nomor]
    if (jwb === undefined || jwb === null) return

    if (soal.tipe === 'pg') {
      if (soal.kunciKodePg && String(jwb) === soal.kunciKodePg) {
        totalPoin += 1
      }
    } else if (soal.tipe === 'pgk') {
      if (soal.kunciKodePgk && Array.isArray(jwb)) {
        const kunciSorted = [...soal.kunciKodePgk].sort()
        const jwbSorted = [...new Set(jwb.map(String))].sort()
        if (
          kunciSorted.length > 0 &&
          kunciSorted.length === jwbSorted.length &&
          kunciSorted.every((val, idx) => val === jwbSorted[idx])
        ) {
          totalPoin += 1
        }
      }
    } else if (soal.tipe === 'tabel' || soal.tipe === 'jodoh') {
      if (soal.kunciTabel && typeof jwb === 'object') {
        let benarSemua = soal.kunciTabel.length > 0
        soal.kunciTabel.forEach((kunciVal, idx) => {
          if (String(jwb[idx + 1] || '') !== kunciVal) {
            benarSemua = false
          }
        })
        if (benarSemua) totalPoin += 1
      }
    } else if (soal.tipe === 'isian') {
      const bersih = normalisasiTeks(String(jwb))
      if (bersih && soal.kunciIsianList && soal.kunciIsianList.some(k => normalisasiTeks(k) === bersih)) {
        totalPoin += 1
      }
    }
  })

  return Math.round((totalPoin / soalList.length) * 100)
}

const KEY_RIWAYAT = 'sas1_kelas6_riwayat_ujian_v1'
const KEY_SOAL_CUSTOM = 'sas1_kelas6_bank_soal_custom_v1'
const KEY_INFO_UJIAN = 'sas1_kelas6_info_ujian_v1'

export function App() {
  const [halaman, setHalaman] = useState<'login' | 'konfirmasi' | 'ujian' | 'selesai' | 'reviu' | 'admin'>('login')

  const [infoUjian, setInfoUjian] = useState({
    namaUjian: 'SUMATIF AKHIR SEMESTER 1 (SAS 1) — KELAS VI (ENAM)',
    pelaksana: 'SD NEGERI KEDUNGREJO 1 — KEC. BANTARAN',
    tahunAjaran: 'TAHUN AJARAN 2026 / 2027'
  })

  const [namaPeserta, setNamaPeserta] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [namaLembaga, setNamaLembaga] = useState(DAFTAR_SEKOLAH[0])
  const [mapel, setMapel] = useState(DAFTAR_MAPEL[0])
  const [pesanError, setPesanError] = useState('')

  const [bankBindo, setBankBindo] = useState<DataSoal[]>(() => siapkanPaketSoal(BANK_SOAL_BINDO_PAKET_1))
  const [bankMatematika, setBankMatematika] = useState<DataSoal[]>(() => siapkanPaketSoal(BANK_SOAL_MATEMATIKA_PAKET_1))

  const soalList = mapel.toLowerCase().includes('matematika') ? bankMatematika : bankBindo
  const isBindo = mapel.toLowerCase().includes('bahasa indonesia')

  const [nomorAktif, setNomorAktif] = useState(1)
  const [jawaban, setJawaban] = useState<Record<number, any>>({})
  const [raguRagu, setRaguRagu] = useState<Record<number, boolean>>({})
  const [ukuranFont, setUkuranFont] = useState<number>(17)
  const [sisaDetik, setSisaDetik] = useState<number>(75 * 60)

  const [skorAkhir, setSkorAkhir] = useState<number>(0)
  const [statusKirim, setStatusKirim] = useState<string>('')
  const [riwayatList, setRiwayatList] = useState<RiwayatUjian[]>([])

  const [passwordAdmin, setPasswordAdmin] = useState('')
  const [terbukaAdmin, setTerbukaAdmin] = useState(false)
  const [tabAdmin, setTabAdmin] = useState<'rekap' | 'soal' | 'pengaturan'>('rekap')
  const [filterSekolahRekap, setFilterSekolahRekap] = useState<string>('SEMUA')
  const [filterMapelRekap, setFilterMapelRekap] = useState<string>('SEMUA')
  const [cariNamaRekap, setCariNamaRekap] = useState<string>('')

  const [soalBaruTipe, setSoalBaruTipe] = useState<TipeSoal>('pg')
  const [soalBaruMapel, setSoalBaruMapel] = useState<string>(DAFTAR_MAPEL[0])
  const [soalBaruPertanyaan, setSoalBaruPertanyaan] = useState('')
  const [soalBaruOpsiA, setSoalBaruOpsiA] = useState('')
  const [soalBaruOpsiB, setSoalBaruOpsiB] = useState('')
  const [soalBaruOpsiC, setSoalBaruOpsiC] = useState('')
  const [soalBaruOpsiD, setSoalBaruOpsiD] = useState('')
  const [soalBaruKunciPG, setSoalBaruKunciPG] = useState('A')
  const [soalBaruKunciIsian, setSoalBaruKunciIsian] = useState('')
  const [soalBaruBacaanJudul, setSoalBaruBacaanJudul] = useState('')
  const [soalBaruBacaanTeks, setSoalBaruBacaanTeks] = useState('')
  const [soalBaruGambar, setSoalBaruGambar] = useState('')

  useEffect(() => {
    try {
      const savedRiwayat = localStorage.getItem(KEY_RIWAYAT)
      if (savedRiwayat) {
        setRiwayatList(JSON.parse(savedRiwayat))
      }
      const savedSoal = localStorage.getItem(KEY_SOAL_CUSTOM)
      if (savedSoal) {
        const parsed = JSON.parse(savedSoal)
        if (Array.isArray(parsed.bindo) && parsed.bindo.length > 0) {
          setBankBindo(siapkanPaketSoal(parsed.bindo))
        }
        if (Array.isArray(parsed.mtk) && parsed.mtk.length > 0) {
          setBankMatematika(siapkanPaketSoal(parsed.mtk))
        }
      }
      const savedInfo = localStorage.getItem(KEY_INFO_UJIAN)
      if (savedInfo) {
        setInfoUjian(prev => ({ ...prev, ...JSON.parse(savedInfo) }))
      }
    } catch {
      // Abaikan jika penyimpanan browser dibatasi
    }
  }, [])

  useEffect(() => {
    if (halaman !== 'ujian') return
    const timer = setInterval(() => {
      setSisaDetik(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          selesaikanUjian(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [halaman, jawaban, soalList])

  const formatWaktu = (detik: number) => {
    const jam = Math.floor(detik / 3600)
    const menit = Math.floor((detik % 3600) / 60)
    const dtk = detik % 60
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${pad(jam)}:${pad(menit)}:${pad(dtk)}`
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!namaPeserta.trim()) {
      setPesanError('Nama Peserta wajib diisi.')
      return
    }
    if (!username.trim()) {
      setPesanError('Username wajib diisi.')
      return
    }
    if (!password.trim()) {
      setPesanError('Password wajib diisi.')
      return
    }
    setPesanError('')
    setHalaman('konfirmasi')
  }

  const mulaiUjian = () => {
    setNomorAktif(1)
    setJawaban({})
    setRaguRagu({})
    setSisaDetik(75 * 60)
    setStatusKirim('')
    setHalaman('ujian')
  }

  const soalAktif = soalList.find(s => s.nomor === nomorAktif) || soalList[0]

  const pilihJawaban = (no: number, nilai: any) => {
    setJawaban(prev => ({ ...prev, [no]: nilai }))
  }

  const pilihJawabanKompleks = (no: number, kode: string) => {
    setJawaban(prev => {
      const sekarang: string[] = Array.isArray(prev[no]) ? prev[no] : []
      if (sekarang.includes(kode)) {
        return { ...prev, [no]: sekarang.filter(item => item !== kode) }
      }
      return { ...prev, [no]: [...sekarang, kode] }
    })
  }

  const pilihBaris = (no: number, indeksBaris: number, nilaiKolom: string) => {
    setJawaban(prev => ({
      ...prev,
      [no]: {
        ...(prev[no] || {}),
        [indeksBaris]: nilaiKolom
      }
    }))
  }

  const toggleRagu = () => {
    setRaguRagu(prev => ({ ...prev, [nomorAktif]: !prev[nomorAktif] }))
  }

  const sudahDijawab = (no: number) => {
    const jwb = jawaban[no]
    if (jwb === undefined || jwb === null) return false
    if (typeof jwb === 'string') return jwb.trim().length > 0
    if (Array.isArray(jwb)) return jwb.length > 0
    if (typeof jwb === 'object') return Object.values(jwb).some(v => String(v || '').trim().length > 0)
    return false
  }

  const jumlahTerjawab = soalList.filter(s => sudahDijawab(s.nomor)).length

  const kirimNilaiKeGuru = async (dataNilai: RiwayatUjian) => {
    const URL_APPS_SCRIPT = ''
    if (!URL_APPS_SCRIPT) {
      return 'Tersimpan lokal (URL Apps Script Kelas VI belum dipasang)'
    }
    try {
      await fetch(URL_APPS_SCRIPT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(dataNilai)
      })
      return 'Terkirim ke rekap guru & tersimpan lokal'
    } catch {
      return 'Tersimpan lokal (gagal terhubung ke server)'
    }
  }

  const selesaikanUjian = async (otomatis = false) => {
    if (!otomatis) {
      const belum = soalList.length - jumlahTerjawab
      const konfirmasi = window.confirm(
        belum > 0
          ? `Masih ada ${belum} soal yang belum dijawab. Yakin ingin mengakhiri ujian?`
          : 'Yakin ingin mengakhiri dan mengumpulkan jawaban ujian?'
      )
      if (!konfirmasi) return
    }

    const nilai = hitungSkor(soalList, jawaban)
    setSkorAkhir(nilai)
    setHalaman('selesai')
    setStatusKirim('Menyimpan hasil ujian...')

    const record: RiwayatUjian = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      waktu: new Date().toLocaleString('id-ID'),
      namaPeserta: namaPeserta.trim(),
      username: username.trim(),
      namaLembaga,
      mapel,
      skor: nilai,
      jawaban
    }

    const status = await kirimNilaiKeGuru(record)
    const recordFinal = { ...record, kirimStatus: status }
    setStatusKirim(status)

    setRiwayatList(prev => {
      const updated = [recordFinal, ...prev]
      try {
        localStorage.setItem(KEY_RIWAYAT, JSON.stringify(updated))
      } catch {
        // Abaikan error penyimpanan
      }
      return updated
    })
  }

  const bukaPanelAdmin = () => {
    setPasswordAdmin('')
    setTerbukaAdmin(false)
    setHalaman('admin')
  }

  const verifikasiAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordAdmin === 'admin6' || passwordAdmin === 'guru6' || passwordAdmin === '123456') {
      setTerbukaAdmin(true)
    } else {
      alert('Password panel guru salah! Gunakan password guru/admin Kelas VI.')
    }
  }

  const simpanBankSoalCustom = (baruBindo: DataSoal[], baruMtk: DataSoal[]) => {
    const siapBindo = siapkanPaketSoal(baruBindo)
    const siapMtk = siapkanPaketSoal(baruMtk)
    setBankBindo(siapBindo)
    setBankMatematika(siapMtk)
    try {
      localStorage.setItem(
        KEY_SOAL_CUSTOM,
        JSON.stringify({ bindo: siapBindo, mtk: siapMtk })
      )
    } catch {
      // Abaikan error penyimpanan
    }
  }

  const tambahSoalBaru = (e: React.FormEvent) => {
    e.preventDefault()
    if (!soalBaruPertanyaan.trim()) {
      alert('Pertanyaan soal tidak boleh kosong.')
      return
    }

    const targetIsMtk = soalBaruMapel.toLowerCase().includes('matematika')
    const daftarTarget = targetIsMtk ? [...bankMatematika] : [...bankBindo]

    const itemBaru: Omit<DataSoal, 'nomor'> = {
      nomorAsli: daftarTarget.length + 1,
      tipe: soalBaruTipe,
      bacaanJudul: soalBaruBacaanJudul.trim() || undefined,
      bacaanTeks: soalBaruBacaanTeks.trim()
        ? soalBaruBacaanTeks.split('\n').map(b => b.trim()).filter(Boolean)
        : undefined,
      bacaanGambar: soalBaruGambar.trim() || undefined,
      pertanyaan: soalBaruPertanyaan.trim()
    }

    if (soalBaruTipe === 'pg') {
      itemBaru.opsi = [
        { kode: 'A', teks: soalBaruOpsiA.trim() || 'A. Pilihan A' },
        { kode: 'B', teks: soalBaruOpsiB.trim() || 'B. Pilihan B' },
        { kode: 'C', teks: soalBaruOpsiC.trim() || 'C. Pilihan C' },
        { kode: 'D', teks: soalBaruOpsiD.trim() || 'D. Pilihan D' }
      ]
      itemBaru.kunciKodePg = soalBaruKunciPG
      itemBaru.kunciText = soalBaruKunciPG
      itemBaru.kunciTeksReviu = soalBaruKunciPG
    } else if (soalBaruTipe === 'isian') {
      const daftarKunci = soalBaruKunciIsian
        .split('|')
        .map(k => k.trim())
        .filter(Boolean)
      itemBaru.kunciIsianList = daftarKunci.length ? daftarKunci : [soalBaruKunciIsian.trim()]
      itemBaru.kunciText = soalBaruKunciIsian.trim()
      itemBaru.kunciTeksReviu = soalBaruKunciIsian.trim()
    }

    const daftarUpdate = [...daftarTarget, { ...itemBaru, nomor: daftarTarget.length + 1 }]
    if (targetIsMtk) {
      simpanBankSoalCustom(bankBindo, daftarUpdate)
    } else {
      simpanBankSoalCustom(daftarUpdate, bankMatematika)
    }

    setSoalBaruPertanyaan('')
    setSoalBaruOpsiA('')
    setSoalBaruOpsiB('')
    setSoalBaruOpsiC('')
    setSoalBaruOpsiD('')
    setSoalBaruKunciIsian('')
    setSoalBaruBacaanJudul('')
    setSoalBaruBacaanTeks('')
    setSoalBaruGambar('')
    alert('Soal baru berhasil ditambahkan ke bank soal Kelas VI!')
  }

  const hapusSoal = (targetMapel: string, nomorSoal: number) => {
    const isMtk = targetMapel.toLowerCase().includes('matematika')
    if (isMtk) {
      const sisa = bankMatematika.filter(s => s.nomor !== nomorSoal)
      simpanBankSoalCustom(bankBindo, sisa)
    } else {
      const sisa = bankBindo.filter(s => s.nomor !== nomorSoal)
      simpanBankSoalCustom(sisa, bankMatematika)
    }
  }

  const resetKeBankSoalAwal = () => {
    if (!window.confirm('Kembalikan bank soal ke susunan awal bawaan kode?')) return
    const awalBindo = siapkanPaketSoal(BANK_SOAL_BINDO_PAKET_1)
    const awalMtk = siapkanPaketSoal(BANK_SOAL_MATEMATIKA_PAKET_1)
    setBankBindo(awalBindo)
    setBankMatematika(awalMtk)
    localStorage.removeItem(KEY_SOAL_CUSTOM)
    alert('Bank soal dikembalikan ke susunan awal.')
  }

  const simpanPengaturanUjian = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      localStorage.setItem(KEY_INFO_UJIAN, JSON.stringify(infoUjian))
      alert('Informasi ujian Kelas VI berhasil disimpan.')
    } catch {
      alert('Gagal menyimpan pengaturan.')
    }
  }

  const exportRekapCSV = () => {
    const barisFiltered = riwayatList.filter(r => {
      const cocokSekolah = filterSekolahRekap === 'SEMUA' || r.namaLembaga === filterSekolahRekap
      const cocokMapel = filterMapelRekap === 'SEMUA' || r.mapel === filterMapelRekap
      const cocokNama =
        !cariNamaRekap.trim() ||
        r.namaPeserta.toLowerCase().includes(cariNamaRekap.trim().toLowerCase()) ||
        r.username.toLowerCase().includes(cariNamaRekap.trim().toLowerCase())
      return cocokSekolah && cocokMapel && cocokNama
    })

    const header = ['No', 'Waktu', 'Nama Peserta', 'Username', 'Lembaga / SD', 'Mata Pelajaran', 'Skor']
    const rows = barisFiltered.map((r, idx) => [
      idx + 1,
      `"${r.waktu}"`,
      `"${r.namaPeserta.replace(/"/g, '""')}"`,
      `"${r.username.replace(/"/g, '""')}"`,
      `"${r.namaLembaga.replace(/"/g, '""')}"`,
      `"${r.mapel.replace(/"/g, '""')}"`,
      r.skor
    ])
    const csvContent = [header.join(','), ...rows.map(e => e.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `rekap-nilai-sas1-kelas-6.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const hapusSemuaRiwayat = () => {
    if (!window.confirm('Hapus seluruh riwayat nilai lokal di browser ini?')) return
    setRiwayatList([])
    localStorage.removeItem(KEY_RIWAYAT)
  }

  const riwayatTersaring = riwayatList.filter(r => {
    const cocokSekolah = filterSekolahRekap === 'SEMUA' || r.namaLembaga === filterSekolahRekap
    const cocokMapel = filterMapelRekap === 'SEMUA' || r.mapel === filterMapelRekap
    const cocokNama =
      !cariNamaRekap.trim() ||
      r.namaPeserta.toLowerCase().includes(cariNamaRekap.trim().toLowerCase()) ||
      r.username.toLowerCase().includes(cariNamaRekap.trim().toLowerCase())
    return cocokSekolah && cocokMapel && cocokNama
  })

  return (
    <div className="app-container">
      {/* ==========================================
          HEADER GLOBAL APLIKASI (KELAS VI / ENAM)
         ========================================== */}
      <header className="header-utama">
        <div className="header-kiri">
          <img
            src={resolveAssetUrl('logo-tutwuri.png')}
            alt="Logo Tut Wuri Handayani"
            className="logo-header"
            onError={e => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
          <div>
            <div className="badge-kelas-vi">KELAS VI (ENAM) • SD / MI</div>
            <h1 className="judul-header">{infoUjian.namaUjian}</h1>
            <p className="subjudul-header">
              {infoUjian.pelaksana} • {infoUjian.tahunAjaran}
            </p>
          </div>
        </div>

        <div className="header-kanan">
          {halaman !== 'login' && (
            <button
              type="button"
              className="btn-sekunder"
              onClick={() => setHalaman('login')}
            >
              Halaman Awal
            </button>
          )}
          <button
            type="button"
            className="btn-admin"
            onClick={bukaPanelAdmin}
          >
            Panel Guru
          </button>
        </div>
      </header>

      {/* ==========================================
          HALAMAN 1: LOGIN PESERTA
         ========================================== */}
      {halaman === 'login' && (
        <main className="kotak-tengah">
          <div className="kartu-form">
            <div className="label-jenjang">SIMULASI & UJIAN SAS 1 • KELAS VI (ENAM)</div>
            <h2>Masuk Peserta Ujian</h2>
            <p className="deskripsi-kartu">
              Silakan lengkapi data peserta dan pilih mata pelajaran untuk memulai ujian Kelas VI.
            </p>

            {pesanError && <div className="pesan-error">{pesanError}</div>}

            <form onSubmit={handleLogin} className="form-grid">
              <div className="form-grup">
                <label>Nama Lengkap Peserta</label>
                <input
                  type="text"
                  placeholder="Contoh: Ahmad Fauzi"
                  value={namaPeserta}
                  onChange={e => setNamaPeserta(e.target.value)}
                />
              </div>

              <div className="form-grup">
                <label>Username / NISN</label>
                <input
                  type="text"
                  placeholder="Contoh: 0014567890"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>

              <div className="form-grup">
                <label>Password / Token</label>
                <input
                  type="password"
                  placeholder="Masukkan password ujian"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="form-grup">
                <label>Asal Sekolah / Lembaga (24 SD)</label>
                <select value={namaLembaga} onChange={e => setNamaLembaga(e.target.value)}>
                  {DAFTAR_SEKOLAH.map(sd => (
                    <option key={sd} value={sd}>
                      {sd}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grup form-penuh">
                <label>Mata Pelajaran</label>
                <select value={mapel} onChange={e => setMapel(e.target.value)}>
                  {DAFTAR_MAPEL.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-utama form-penuh">
                Lanjutkan ke Konfirmasi Data
              </button>
            </form>
          </div>
        </main>
      )}

      {/* ==========================================
          HALAMAN 2: KONFIRMASI PESERTA
         ========================================== */}
      {halaman === 'konfirmasi' && (
        <main className="kotak-tengah">
          <div className="kartu-form">
            <div className="label-jenjang">KONFIRMASI PESERTA • KELAS VI (ENAM)</div>
            <h2>Periksa Kembali Data Anda</h2>
            <p className="deskripsi-kartu">
              Pastikan identitas peserta, asal lembaga, dan mata pelajaran sudah benar sebelum waktu ujian dimulai.
            </p>

            <div className="ringkasan-data">
              <div className="baris-data">
                <span>Jenjang / Kelas</span>
                <strong>Kelas VI (Enam)</strong>
              </div>
              <div className="baris-data">
                <span>Nama Peserta</span>
                <strong>{namaPeserta}</strong>
              </div>
              <div className="baris-data">
                <span>Username</span>
                <strong>{username}</strong>
              </div>
              <div className="baris-data">
                <span>Nama Lembaga</span>
                <strong>{namaLembaga}</strong>
              </div>
              <div className="baris-data">
                <span>Mata Pelajaran</span>
                <strong>{mapel}</strong>
              </div>
              <div className="baris-data">
                <span>Jumlah Soal</span>
                <strong>{soalList.length} Butir Soal</strong>
              </div>
              <div className="baris-data">
                <span>Alokasi Waktu</span>
                <strong>75 Menit</strong>
              </div>
            </div>

            {soalList.length === 0 && (
              <div className="pesan-error">
                Bank soal untuk mata pelajaran ini masih kosong. Silakan isi soal terlebih dahulu.
              </div>
            )}

            <div className="aksi-ganda">
              <button
                type="button"
                className="btn-sekunder"
                onClick={() => setHalaman('login')}
              >
                Kembali Ubah Data
              </button>
              <button
                type="button"
                className="btn-utama"
                disabled={soalList.length === 0}
                onClick={mulaiUjian}
              >
                Mulai Kerjakan Sekarang
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          HALAMAN 3: HALAMAN UJIAN
         ========================================== */}
      {halaman === 'ujian' && (
        <div className="layout-ujian">
          <section className="panel-utama-ujian">
            <div className="topbar-ujian">
              <div>
                <div className="ujian-mapel">{mapel}</div>
                <div className="info-peserta-kecil">
                  {namaPeserta} • {namaLembaga} (Kelas VI)
                </div>
              </div>

              <div className="kontrol-kanan-atas">
                <div className="kontrol-font">
                  <span>Ukuran Huruf:</span>
                  <button
                    type="button"
                    onClick={() => setUkuranFont(f => Math.max(14, f - 1))}
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    onClick={() => setUkuranFont(f => Math.min(24, f + 1))}
                  >
                    A+
                  </button>
                </div>
                <div className="timer-box">Sisa Waktu: {formatWaktu(sisaDetik)}</div>
              </div>
            </div>

            {soalAktif ? (
              <div
                className="area-soal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
                  gap: '24px',
                  alignItems: 'start',
                  fontSize: `${ukuranFont}px`
                }}
              >
                {/* KIRI: GAMBAR ILUSTRASI & DESKRIPSI/BACAAN DI BAWAH GAMBAR */}
                <div
                  className="bacaan-soal"
                  style={{
                    fontSize: `${ukuranFont}px`,
                    minHeight: '460px',
                    maxHeight: '540px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    padding: '12px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    background: '#ffffff'
                  }}
                >
                  {soalAktif.bacaanGambar && (
                    <img
                      key={`img-${mapel}-${soalAktif.nomor}-${soalAktif.bacaanGambar}`}
                      src={resolveAssetUrl(soalAktif.bacaanGambar)}
                      alt={`Ilustrasi Soal ${soalAktif.nomor}`}
                      loading="eager"
                      decoding="async"
                      fetchPriority={soalAktif.nomor === nomorAktif ? 'high' : 'auto'}
                      onError={e => {
                        const el = e.currentTarget as HTMLImageElement
                        const cleanName = soalAktif.bacaanGambar!.replace(/^\.?\//, '')
                        if (!el.dataset.triedFallback) {
                          el.dataset.triedFallback = '1'
                          el.src = `./${cleanName}`
                        } else {
                          el.style.display = 'none'
                        }
                      }}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '360px',
                        borderRadius: '8px',
                        objectFit: 'contain',
                        marginBottom: soalAktif.bacaanJudul || soalAktif.bacaanTeks ? '14px' : '0',
                        flexShrink: 0
                      }}
                    />
                  )}

                  {soalAktif.bacaanJudul && (
                    <h3
                      style={{
                        marginTop: 0,
                        marginBottom: '10px',
                        textAlign: 'center',
                        color: '#1e293b',
                        width: '100%',
                        fontSize: `${ukuranFont}px`,
                        fontWeight: 700
                      }}
                    >
                      {soalAktif.bacaanJudul}
                    </h3>
                  )}

                  {soalAktif.bacaanTeks && (
                    <div
                      style={{
                        textAlign: 'left',
                        lineHeight: 1.65,
                        width: '100%',
                        fontSize: `${ukuranFont}px`
                      }}
                    >
                      {soalAktif.bacaanTeks.map((paragraf, idx) => (
                        <p
                          key={idx}
                          style={{
                            margin: '0 0 10px 0',
                            fontSize: `${ukuranFont}px`,
                            textIndent: isBindo ? '1.5em' : '0'
                          }}
                        >
                          {paragraf}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* KANAN: PERTANYAAN & OPSI JAWABAN */}
                <div
                  className="pertanyaan-soal"
                  style={{
                    fontSize: `${ukuranFont}px`,
                    minHeight: '460px',
                    maxHeight: '540px',
                    overflowY: 'auto',
                    padding: '12px 16px',
                    boxSizing: 'border-box',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    background: '#ffffff'
                  }}
                >
                  <div className="nomor-badge" style={{ fontSize: `${ukuranFont}px` }}>
                    Soal Nomor {soalAktif.nomor} dari {soalList.length}
                  </div>

                  <p
                    className="teks-pertanyaan"
                    style={{
                      fontSize: `${ukuranFont}px`,
                      lineHeight: 1.6,
                      marginTop: 0,
                      marginBottom: '12px'
                    }}
                  >
                    {soalAktif.pertanyaan}
                  </p>

                  {soalAktif.tipe === 'pgk' && (
                    <p
                      className="petunjuk-soal"
                      style={{
                        color: '#2563eb',
                        fontWeight: 500,
                        fontSize: `${ukuranFont}px`,
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>🔗</span>{' '}
                      {soalAktif.petunjuk ||
                        'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.'}
                    </p>
                  )}

                  {soalAktif.petunjuk && soalAktif.tipe !== 'pgk' && (
                    <p
                      className="petunjuk-soal"
                      style={{
                        color: '#2563eb',
                        fontWeight: 500,
                        fontSize: `${ukuranFont}px`,
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>🔗</span> {soalAktif.petunjuk}
                    </p>
                  )}

                  {soalAktif.tipe === 'pg' &&
                    soalAktif.opsi?.map(item => (
                      <label
                        className="pilihan-jawaban"
                        key={item.kode}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          marginBottom: '10px',
                          fontSize: `${ukuranFont}px`
                        }}
                      >
                        <input
                          type="radio"
                          name={`soal-${soalAktif.nomor}`}
                          checked={jawaban[soalAktif.nomor] === item.kode}
                          onChange={() => pilihJawaban(soalAktif.nomor, item.kode)}
                        />
                        <span style={{ fontSize: `${ukuranFont}px` }}>{item.teks}</span>
                      </label>
                    ))}

                  {soalAktif.tipe === 'pgk' &&
                    soalAktif.opsi?.map(item => (
                      <label
                        className="pilihan-jawaban pilihan-kompleks"
                        key={item.kode}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          marginBottom: '10px',
                          fontSize: `${ukuranFont}px`
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={(jawaban[soalAktif.nomor] || []).includes(item.kode)}
                          onChange={() => pilihJawabanKompleks(soalAktif.nomor, item.kode)}
                        />
                        <span style={{ fontSize: `${ukuranFont}px` }}>{item.teks}</span>
                      </label>
                    ))}

                  {soalAktif.tipe === 'tabel' &&
                    soalAktif.kolomTabel &&
                    soalAktif.barisTabel && (
                      <div className="tabel-jawaban" style={{ fontSize: `${ukuranFont}px` }}>
                        <div className="tabel-header" style={{ fontSize: `${ukuranFont}px` }}>
                          <span>No.</span>
                          <span>Pernyataan</span>
                          <span>{soalAktif.kolomTabel[0]}</span>
                          <span>{soalAktif.kolomTabel[1]}</span>
                        </div>

                        {soalAktif.barisTabel.map((teks, i) => {
                          const kolom1 = soalAktif.kolomTabel![0]
                          const kolom2 = soalAktif.kolomTabel![1]

                          return (
                            <div
                              className="tabel-baris"
                              key={i}
                              style={{ fontSize: `${ukuranFont}px` }}
                            >
                              <span style={{ fontSize: `${ukuranFont}px` }}>{i + 1}</span>
                              <span style={{ fontSize: `${ukuranFont}px` }}>{teks}</span>
                              <label>
                                <input
                                  type="radio"
                                  name={`soal${soalAktif.nomor}-${i + 1}`}
                                  checked={jawaban[soalAktif.nomor]?.[i + 1] === kolom1}
                                  onChange={() => pilihBaris(soalAktif.nomor, i + 1, kolom1)}
                                />
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name={`soal${soalAktif.nomor}-${i + 1}`}
                                  checked={jawaban[soalAktif.nomor]?.[i + 1] === kolom2}
                                  onChange={() => pilihBaris(soalAktif.nomor, i + 1, kolom2)}
                                />
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    )}

                  {soalAktif.tipe === 'jodoh' &&
                    soalAktif.kolomKiri &&
                    soalAktif.kolomKanan && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                          marginTop: '10px',
                          fontSize: `${ukuranFont}px`
                        }}
                      >
                        <div
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            fontSize: `${ukuranFont}px`
                          }}
                        >
                          <strong style={{ color: '#1e293b', fontSize: `${ukuranFont}px` }}>
                            Pilihan Kolom B (Target Pasangan):
                          </strong>
                          <ul
                            style={{
                              margin: '8px 0 0 18px',
                              padding: 0,
                              lineHeight: 1.6,
                              fontSize: `${ukuranFont}px`
                            }}
                          >
                            {soalAktif.kolomKanan.map(kanan => (
                              <li
                                key={kanan.kode}
                                style={{ color: '#334155', fontSize: `${ukuranFont}px` }}
                              >
                                <strong>{kanan.kode}.</strong> {kanan.teks}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {soalAktif.kolomKiri.map(kiri => (
                            <div
                              key={kiri.nomor}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '12px',
                                padding: '12px 16px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                background: '#ffffff',
                                fontSize: `${ukuranFont}px`
                              }}
                            >
                              <span
                                style={{
                                  flex: 1,
                                  fontWeight: 500,
                                  color: '#1e293b',
                                  fontSize: `${ukuranFont}px`
                                }}
                              >
                                <strong>{kiri.nomor}.</strong> {kiri.teks}
                              </span>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span
                                  style={{
                                    fontSize: `${ukuranFont}px`,
                                    color: '#64748b',
                                    fontStyle: 'italic'
                                  }}
                                >
                                  Pasangan ➔
                                </span>
                                <select
                                  value={jawaban[soalAktif.nomor]?.[kiri.nomor] || ''}
                                  onChange={e =>
                                    pilihBaris(soalAktif.nomor, kiri.nomor, e.target.value)
                                  }
                                  style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '2px solid #3b82f6',
                                    background: '#eff6ff',
                                    color: '#1d4ed8',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    minWidth: '110px',
                                    fontSize: `${ukuranFont}px`
                                  }}
                                >
                                  <option value="">Pilih Huruf</option>
                                  {soalAktif.kolomKanan!.map(kanan => (
                                    <option key={kanan.kode} value={kanan.kode}>
                                      Huruf {kanan.kode}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {soalAktif.tipe === 'isian' && (
                    <input
                      className="isian-jawaban"
                      type="text"
                      style={{ fontSize: `${ukuranFont}px` }}
                      placeholder="Ketik jawaban di sini..."
                      value={jawaban[soalAktif.nomor] || ''}
                      onChange={e => pilihJawaban(soalAktif.nomor, e.target.value)}
                    />
                  )}

                  {soalAktif.tipe === 'uraian' && (
                    <textarea
                      className="isian-jawaban"
                      rows={5}
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        padding: '12px',
                        fontSize: `${ukuranFont}px`
                      }}
                      placeholder="Ketik jawaban di sini..."
                      value={jawaban[soalAktif.nomor] || ''}
                      onChange={e => pilihJawaban(soalAktif.nomor, e.target.value)}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="pesan-error">Soal tidak ditemukan.</div>
            )}

            <div className="navigasi-ujian">
              <button
                type="button"
                className="btn-sekunder"
                disabled={nomorAktif <= 1}
                onClick={() => setNomorAktif(n => Math.max(1, n - 1))}
              >
                ← Soal Sebelumnya
              </button>

              <button
                type="button"
                className={`btn-ragu ${raguRagu[nomorAktif] ? 'aktif' : ''}`}
                onClick={toggleRagu}
              >
                {raguRagu[nomorAktif] ? 'Ditandai Ragu-Ragu' : 'Tandai Ragu-Ragu'}
              </button>

              {nomorAktif < soalList.length ? (
                <button
                  type="button"
                  className="btn-utama"
                  onClick={() => setNomorAktif(n => Math.min(soalList.length, n + 1))}
                >
                  Soal Berikutnya →
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-selesai"
                  onClick={() => selesaikanUjian(false)}
                >
                  Selesai & Kumpulkan
                </button>
              )}
            </div>
          </section>

          <aside className="sidebar-nomor">
            <h3>Daftar Nomor Soal</h3>
            <p className="status-ringkas">
              Terjawab: <strong>{jumlahTerjawab}</strong> / {soalList.length}
            </p>

            <div className="grid-nomor">
              {soalList.map(item => {
                const terjawab = sudahDijawab(item.nomor)
                const isRagu = !!raguRagu[item.nomor]
                const isAktif = item.nomor === nomorAktif

                let kelasBtn = 'btn-no'
                if (isAktif) kelasBtn += ' aktif'
                if (isRagu) kelasBtn += ' ragu'
                else if (terjawab) kelasBtn += ' terjawab'

                return (
                  <button
                    type="button"
                    key={item.nomor}
                    className={kelasBtn}
                    onClick={() => setNomorAktif(item.nomor)}
                  >
                    {item.nomor}
                  </button>
                )
              })}
            </div>

            <div className="legenda-nomor">
              <div><span className="dot hijau" /> Sudah Dijawab</div>
              <div><span className="dot kuning" /> Ragu-Ragu</div>
              <div><span className="dot biru" /> Sedang Dibuka</div>
            </div>

            <button
              type="button"
              className="btn-selesai penuh"
              onClick={() => selesaikanUjian(false)}
            >
              Akhiri Ujian
            </button>
          </aside>
        </div>
      )}

      {/* ==========================================
          HALAMAN 4: SELESAI UJIAN
         ========================================== */}
      {halaman === 'selesai' && (
        <main className="kotak-tengah">
          <div className="kartu-form tengah-teks">
            <div className="label-jenjang">HASIL UJIAN • KELAS VI (ENAM)</div>
            <h2>Ujian Telah Selesai</h2>
            <p className="deskripsi-kartu">
              Terima kasih, <strong>{namaPeserta}</strong> ({namaLembaga}). Jawaban Anda telah diproses.
            </p>

            <div className="kotak-skor">
              <span>Nilai / Skor Akhir</span>
              <strong>{skorAkhir}</strong>
              <small>Mata Pelajaran: {mapel}</small>
            </div>

            {statusKirim && <div className="info-kirim">{statusKirim}</div>}

            <div className="aksi-ganda tengah-aksi">
              <button
                type="button"
                className="btn-utama"
                onClick={() => setHalaman('reviu')}
              >
                Lihat Reviu Jawaban
              </button>
              <button
                type="button"
                className="btn-sekunder"
                onClick={() => setHalaman('login')}
              >
                Kembali ke Awal
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          HALAMAN 5: REVIU JAWABAN PESERTA
         ========================================== */}
      {halaman === 'reviu' && (
        <main className="kotak-lebar">
          <div className="kartu-form">
            <div className="flex-antara">
              <div>
                <div className="label-jenjang">REVIU HASIL • KELAS VI (ENAM)</div>
                <h2>Reviu Jawaban: {namaPeserta}</h2>
                <p className="deskripsi-kartu">
                  {mapel} • Skor: <strong>{skorAkhir}</strong>
                </p>
              </div>
              <button
                type="button"
                className="btn-sekunder"
                onClick={() => setHalaman('selesai')}
              >
                Kembali ke Ringkasan
              </button>
            </div>

            <div className="daftar-reviu">
              {soalList.map(s => {
                const jwb = jawaban[s.nomor]
                let tampilanJawaban = 'Tidak dijawab'

                if (Array.isArray(jwb)) {
                  tampilanJawaban = jwb.length ? jwb.join(', ') : 'Tidak dijawab'
                } else if (typeof jwb === 'object' && jwb !== null) {
                  const entries = Object.entries(jwb)
                  tampilanJawaban = entries.length
                    ? entries.map(([k, v]) => `${k}: ${v}`).join(' | ')
                    : 'Tidak dijawab'
                } else if (typeof jwb === 'string' && jwb.trim()) {
                  tampilanJawaban = jwb
                }

                return (
                  <div className="item-reviu" key={s.nomor}>
                    <div className="reviu-header">
                      <strong>Soal No. {s.nomor}</strong>
                      <span className="badge-tipe">{s.tipe.toUpperCase()}</span>
                    </div>
                    <p className="reviu-pertanyaan">{s.pertanyaan}</p>
                    <div className="reviu-jawaban">
                      <div>
                        <span>Jawaban Anda:</span> <strong>{tampilanJawaban}</strong>
                      </div>
                      {(s.kunciTeksReviu || s.kunciText) && (
                        <div className="kunci-teks">
                          <span>Kunci:</span> <strong>{s.kunciTeksReviu || s.kunciText}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      )}

      {/* ==========================================
          HALAMAN 6: PANEL GURU / ADMIN KELAS VI
         ========================================== */}
      {halaman === 'admin' && (
        <main className="kotak-lebar">
          <div className="kartu-form">
            {!terbukaAdmin ? (
              <form onSubmit={verifikasiAdmin} className="form-login-admin">
                <div className="label-jenjang">PANEL GURU • KELAS VI (ENAM)</div>
                <h2>Masuk Panel Guru</h2>
                <p className="deskripsi-kartu">
                  Kelola rekap nilai, bank soal, dan identitas ujian khusus Kelas VI.
                </p>
                <div className="form-grup">
                  <label>Password Guru</label>
                  <input
                    type="password"
                    placeholder="Masukkan password guru"
                    value={passwordAdmin}
                    onChange={e => setPasswordAdmin(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-utama">
                  Buka Panel Guru
                </button>
              </form>
            ) : (
              <div>
                <div className="flex-antara">
                  <div>
                    <div className="label-jenjang">PANEL GURU • KELAS VI (ENAM)</div>
                    <h2>Dashboard Guru Kelas VI</h2>
                  </div>
                  <div className="tab-admin">
                    <button
                      type="button"
                      className={tabAdmin === 'rekap' ? 'btn-utama' : 'btn-sekunder'}
                      onClick={() => setTabAdmin('rekap')}
                    >
                      Rekap Nilai ({riwayatList.length})
                    </button>
                    <button
                      type="button"
                      className={tabAdmin === 'soal' ? 'btn-utama' : 'btn-sekunder'}
                      onClick={() => setTabAdmin('soal')}
                    >
                      Bank Soal ({bankBindo.length + bankMatematika.length})
                    </button>
                    <button
                      type="button"
                      className={tabAdmin === 'pengaturan' ? 'btn-utama' : 'btn-sekunder'}
                      onClick={() => setTabAdmin('pengaturan')}
                    >
                      Identitas Ujian
                    </button>
                  </div>
                </div>

                {tabAdmin === 'rekap' && (
                  <div className="bagian-admin">
                    <div className="filter-rekap">
                      <select
                        value={filterSekolahRekap}
                        onChange={e => setFilterSekolahRekap(e.target.value)}
                      >
                        <option value="SEMUA">Semua SD (24 Sekolah)</option>
                        {DAFTAR_SEKOLAH.map(sd => (
                          <option key={sd} value={sd}>
                            {sd}
                          </option>
                        ))}
                      </select>

                      <select
                        value={filterMapelRekap}
                        onChange={e => setFilterMapelRekap(e.target.value)}
                      >
                        <option value="SEMUA">Semua Mata Pelajaran</option>
                        {DAFTAR_MAPEL.map(m => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        placeholder="Cari nama / username..."
                        value={cariNamaRekap}
                        onChange={e => setCariNamaRekap(e.target.value)}
                      />

                      <button type="button" className="btn-utama" onClick={exportRekapCSV}>
                        Unduh CSV
                      </button>
                      <button type="button" className="btn-sekunder" onClick={hapusSemuaRiwayat}>
                        Reset Riwayat
                      </button>
                    </div>

                    <div className="table-responsive">
                      <table className="tabel-rekap">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Waktu</th>
                            <th>Nama Peserta</th>
                            <th>Lembaga / SD</th>
                            <th>Mata Pelajaran</th>
                            <th>Skor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {riwayatTersaring.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="tengah-teks">
                                Belum ada data nilai yang tercatat.
                              </td>
                            </tr>
                          ) : (
                            riwayatTersaring.map((r, idx) => (
                              <tr key={r.id}>
                                <td>{idx + 1}</td>
                                <td>{r.waktu}</td>
                                <td>{r.namaPeserta}</td>
                                <td>{r.namaLembaga}</td>
                                <td>{r.mapel}</td>
                                <td>
                                  <strong>{r.skor}</strong>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {tabAdmin === 'soal' && (
                  <div className="bagian-admin">
                    <div className="flex-antara">
                      <h3>Tambah Soal Baru Kelas VI</h3>
                      <button type="button" className="btn-sekunder" onClick={resetKeBankSoalAwal}>
                        Reset ke Bank Soal Awal
                      </button>
                    </div>

                    <form onSubmit={tambahSoalBaru} className="form-grid">
                      <div className="form-grup">
                        <label>Mata Pelajaran</label>
                        <select
                          value={soalBaruMapel}
                          onChange={e => setSoalBaruMapel(e.target.value)}
                        >
                          {DAFTAR_MAPEL.map(m => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-grup">
                        <label>Tipe Soal</label>
                        <select
                          value={soalBaruTipe}
                          onChange={e => setSoalBaruTipe(e.target.value as TipeSoal)}
                        >
                          <option value="pg">Pilihan Ganda (PG)</option>
                          <option value="pgk">Pilihan Ganda Kompleks (PGK)</option>
                          <option value="tabel">Tabel Benar/Salah atau Sesuai/Tidak Sesuai</option>
                          <option value="jodoh">Menjodohkan</option>
                          <option value="isian">Isian Singkat</option>
                          <option value="uraian">Uraian</option>
                        </select>
                      </div>

                      <div className="form-grup">
                        <label>Nama File Gambar (di folder public)</label>
                        <input
                          type="text"
                          placeholder="Contoh: bindo6-soal-1.png"
                          value={soalBaruGambar}
                          onChange={e => setSoalBaruGambar(e.target.value)}
                        />
                      </div>

                      <div className="form-grup">
                        <label>Judul Bacaan (Opsional)</label>
                        <input
                          type="text"
                          placeholder="Judul teks/bacaan"
                          value={soalBaruBacaanJudul}
                          onChange={e => setSoalBaruBacaanJudul(e.target.value)}
                        />
                      </div>

                      <div className="form-grup form-penuh">
                        <label>Teks / Deskripsi Bacaan (Pisahkan paragraf dengan Enter)</label>
                        <textarea
                          rows={3}
                          value={soalBaruBacaanTeks}
                          onChange={e => setSoalBaruBacaanTeks(e.target.value)}
                        />
                      </div>

                      <div className="form-grup form-penuh">
                        <label>Pertanyaan Soal</label>
                        <textarea
                          rows={2}
                          value={soalBaruPertanyaan}
                          onChange={e => setSoalBaruPertanyaan(e.target.value)}
                        />
                      </div>

                      {soalBaruTipe === 'pg' && (
                        <>
                          <div className="form-grup">
                            <label>Opsi A</label>
                            <input
                              type="text"
                              value={soalBaruOpsiA}
                              onChange={e => setSoalBaruOpsiA(e.target.value)}
                            />
                          </div>
                          <div className="form-grup">
                            <label>Opsi B</label>
                            <input
                              type="text"
                              value={soalBaruOpsiB}
                              onChange={e => setSoalBaruOpsiB(e.target.value)}
                            />
                          </div>
                          <div className="form-grup">
                            <label>Opsi C</label>
                            <input
                              type="text"
                              value={soalBaruOpsiC}
                              onChange={e => setSoalBaruOpsiC(e.target.value)}
                            />
                          </div>
                          <div className="form-grup">
                            <label>Opsi D</label>
                            <input
                              type="text"
                              value={soalBaruOpsiD}
                              onChange={e => setSoalBaruOpsiD(e.target.value)}
                            />
                          </div>
                          <div className="form-grup">
                            <label>Kunci Jawaban PG</label>
                            <select
                              value={soalBaruKunciPG}
                              onChange={e => setSoalBaruKunciPG(e.target.value)}
                            >
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                            </select>
                          </div>
                        </>
                      )}

                      {soalBaruTipe === 'isian' && (
                        <div className="form-grup form-penuh">
                          <label>Kunci Jawaban Isian (pisahkan alternatif dengan tanda |)</label>
                          <input
                            type="text"
                            placeholder="Contoh: lingkungan | kebersihan lingkungan"
                            value={soalBaruKunciIsian}
                            onChange={e => setSoalBaruKunciIsian(e.target.value)}
                          />
                        </div>
                      )}

                      <button type="submit" className="btn-utama form-penuh">
                        Simpan Soal Baru
                      </button>
                    </form>

                    <div className="daftar-kelola-soal">
                      <h4>
                        Bahasa Indonesia Paket 1 ({bankBindo.length} Soal) & Matematika Paket 1 (
                        {bankMatematika.length} Soal)
                      </h4>
                      {bankBindo.map(item => (
                        <div className="baris-kelola-soal" key={`bindo-${item.nomor}`}>
                          <span>
                            <strong>[Bindo #{item.nomor}]</strong> {item.pertanyaan}
                          </span>
                          <button
                            type="button"
                            className="btn-hapus-kecil"
                            onClick={() => hapusSoal(DAFTAR_MAPEL[0], item.nomor)}
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                      {bankMatematika.map(item => (
                        <div className="baris-kelola-soal" key={`mtk-${item.nomor}`}>
                          <span>
                            <strong>[Mtk #{item.nomor}]</strong> {item.pertanyaan}
                          </span>
                          <button
                            type="button"
                            className="btn-hapus-kecil"
                            onClick={() => hapusSoal(DAFTAR_MAPEL[1], item.nomor)}
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tabAdmin === 'pengaturan' && (
                  <form onSubmit={simpanPengaturanUjian} className="bagian-admin form-grid">
                    <div className="form-grup form-penuh">
                      <label>Nama Ujian</label>
                      <input
                        type="text"
                        value={infoUjian.namaUjian}
                        onChange={e => setInfoUjian({ ...infoUjian, namaUjian: e.target.value })}
                      />
                    </div>
                    <div className="form-grup">
                      <label>Instansi / Pelaksana</label>
                      <input
                        type="text"
                        value={infoUjian.pelaksana}
                        onChange={e => setInfoUjian({ ...infoUjian, pelaksana: e.target.value })}
                      />
                    </div>
                    <div className="form-grup">
                      <label>Tahun Ajaran</label>
                      <input
                        type="text"
                        value={infoUjian.tahunAjaran}
                        onChange={e =>
                          setInfoUjian({ ...infoUjian, tahunAjaran: e.target.value })
                        }
                      />
                    </div>
                    <button type="submit" className="btn-utama form-penuh">
                      Simpan Identitas Ujian
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  )
}

export default App