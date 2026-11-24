import { useState, useEffect } from 'react'
import './App.css'

function buatToken() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

type Jawaban = {
  [key: number]: any
}

type TipeSoal = 'pg' | 'pgk' | 'tabel' | 'jodoh' | 'isian' | 'uraian'

interface DataSoal {
  nomorAsli: number
  nomor: number
  tipe: TipeSoal
  bacaanJudul?: string
  bacaanTeks?: string[]
  bacaanGambar?: string
  pertanyaan: string
  petunjuk?: string
  opsi?: { kode: string; teks: string }[]
  kolomTabel?: [string, string]
  barisTabel?: string[]
  kolomKiri?: { nomor: number; teks: string }[]
  kolomKanan?: { kode: string; teks: string }[]
  placeholderIsian?: string
  kunciText: string
  kunciTeksReviu?: string
  kunciKodePg?: string
  kunciKodePgk?: string[]
  kunciTabel?: string[]
  kunciIsianList?: string[]
}

// ============================================================================
// BACAAN PER KELOMPOK SOAL (BAHASA INDONESIA PAKET 1 - TIDAK DIUBAH)
// ============================================================================
const BACAAN_5_6 = {
  judul: 'Penyelamat Buku di Pojok Kelas',
  teks: [
    'Di sudut perpustakaan sekolah yang sepi, Bayu sedang duduk mengatur susunan buku yang berantakan. Jam istirahat baru saja dimulai, dan lapangan sekolah sudah ramai oleh suara teriakan anak-anak yang bermain bola. Bayu sebenarnya juga ingin bermain bola, tetapi ia melihat Pak Joni, petugas perpustakaan yang sudah tua, tampak kesulitan merapikan puluhan buku yang baru dikembalikan murid-murid.',
    'Tanpa diminta, Bayu menghampiri Pak Joni dan langsung membantu memilah buku berdasarkan jenisnya. Tangan Bayu cekatan mengembalikan buku-buku cerita ke rak yang tinggi, karena badannya memang paling tinggi di antara teman sekelasnya. Ketika menemukan beberapa halaman buku cerita yang sobek, Bayu tidak membiarkannya. Ia mengambil selotip dan merekatkannya kembali dengan sangat hati-hati agar tulisannya masih bisa dibaca.',
    '"Terima kasih, Bayu. Kamu selalu bisa diandalkan," kata Pak Joni sambil tersenyum hangat. Bayu hanya mengangguk sopan dan tersenyum, lalu kembali melanjutkan pekerjaannya hingga bel masuk berbunyi.'
  ]
}

const BACAAN_7_8 = {
  judul: 'Pena dan Buku Perjuangan Kartini',
  teks: [
    'Pada masa penjajahan, Raden Ajeng Kartini harus menjalani tradisi pingitan setelah lulus dari sekolah dasar (ELS). Ia tidak diperbolehkan melanjutkan pendidikan ke jenjang yang lebih tinggi dan harus tinggal di dalam rumah. Momen ini tentu sangat berat, tetapi Kartini tidak membiarkan pikirannya terkurung.',
    'Di dalam kamarnya, Kartini mengisi hari-harinya dengan membaca berbagai buku, koran, dan majalah berbahasa Belanda yang ia dapatkan. Melalui buku-buku tersebut, pikirannya bertualang melintasi benua. Ia melihat bagaimana wanita di Eropa bisa berpendidikan tinggi dan berwawasan luas. Semangat belajarnya semakin membara. Kartini kemudian mulai menulis surat-surat kepada teman-temannya di negeri Belanda untuk menceritakan kondisi wanita di Indonesia dan membagikan gagasan-gagasan tentang pentingnya pendidikan.',
    'Bagi Kartini, membaca dan menulis adalah "senjata" untuk menembus tembok pingitan. Melalui kegiatan membaca, ia memperluas wawasan dan menyerap ilmu pengetahuan. Melalui kegiatan menulis, ia menyuarakan perjuangan agar wanita Indonesia kelak bisa bersekolah, berani bermimpi, dan memiliki wawasan luas untuk memajukan bangsanya.'
  ]
}

const BACAAN_9_10 = {
  judul: 'Ragam Warna Kegemaran di Kelas Lima',
  teks: [
    'Di kelas V SD Nusantara, jam istirahat selalu diisi dengan cerita menarik antar murid tentang kegemaran mereka. Edo sangat menyukai kegiatan berkebun. Setiap akhir pekan, ia membantu ayahnya menanam cabai, tomat, dan berbagai tanaman hias di pekarangan rumah. Alasan Edo menyukai hobi ini adalah karena ia merasa senang melihat benih kecil tumbuh menjadi tanaman berbunga yang indah, sekaligus melatih kesabarannya.',
    'Berbeda dengan Edo, Siti memiliki hobi menggambar komik. Siti gemar mengamati kejadian unik di sekolah, lalu menuangkannya ke dalam sketsa gambar dengan karakter lucu. Siti memilih hobi menggambar karena baginya, gambar dan cerita dapat menjadi cara yang menyenangkan untuk mengekspresikan imajinasi serta menghibur teman-temannya yang sedang sedih.',
    'Sementara itu, Lani sangat menggemari hobi membaca buku pengetahuan dan melakukan eksperimen sains sederhana. Lani memilih hobi tersebut karena ia selalu penasaran dengan cara kerja hal-hal di sekitarnya. Dengan membaca dan mencoba eksperimen sendiri, Lani merasa seperti seorang peneliti muda yang menemukan rahasia alam.',
    'Meskipun ketiga murid ini memiliki hobi dan alasan yang berbeda-beda, mereka saling mendukung dan menghargai. Bagi mereka, hobi bukan sekadar mengisi waktu luang, melainkan sarana untuk mengembangkan potensi diri dan memperluas wawasan.'
  ]
}

const BACAAN_11_12 = {
  judul: 'Dari Ide Menjadi Buku',
  teks: [
    'Di sebuah sekolah, Dita memiliki ide untuk membuat buku cerita tentang lingkungan. Ia ingin mengajak anak-anak menjaga kebersihan melalui cerita yang menarik. Dita kemudian menuliskan tokoh, alur cerita, dan pesan yang ingin disampaikan. Setelah selesai, ia menyerahkan naskahnya kepada penerbit.',
    'Di penerbit, editor membaca naskah Dita. Editor memperbaiki ejaan, tanda baca, dan kalimat yang kurang jelas agar cerita mudah dipahami. Setelah naskah selesai disunting, ilustrator membuat gambar yang sesuai dengan isi cerita. Gambar tersebut membantu pembaca membayangkan tokoh dan peristiwa dalam cerita.',
    'Selanjutnya, penata letak mengatur posisi tulisan dan gambar agar halaman buku terlihat rapi. Setelah semua bagian diperiksa dan disetujui, naskah dikirim ke percetakan. Petugas percetakan mencetak halaman-halaman buku, menyusunnya, dan menjilidnya menjadi buku utuh.',
    'Buku cerita Dita akhirnya siap dibaca. Dita merasa senang karena banyak orang bekerja sama untuk mewujudkan idenya. Ia menyadari bahwa sebuah buku tidak hanya dihasilkan oleh penulis, tetapi juga oleh editor, ilustrator, penata letak, petugas percetakan, dan pihak lain yang membantu proses penerbitan.'
  ]
}

const BACAAN_14 = {
  judul: 'Hobi Memasak Rani',
  teks: [
    'Rani memiliki hobi memasak. Sejak kelas tiga SD, ia mulai belajar memasak bersama ibunya. Ia senang mencoba berbagai resep makanan sederhana. Menurut Rani, memasak merupakan kegiatan yang menyenangkan sekaligus bermanfaat karena dapat melatih kemandirian dan kreativitas.',
    'Pada hari Minggu, Rani ingin membuat nasi goreng spesial untuk ibunya. Sebelum mulai memasak, ia menyiapkan nasi putih, telur, bawang merah, bawang putih, dan kecap manis. Ia kemudian menggoreng telur terlebih dahulu, lalu memasak nasi bersama bumbu yang telah disiapkan.',
    'Setelah selesai, Rani menyajikan nasi goreng buatannya di meja makan. Ibunya merasa senang dan memuji usaha Rani. Rani pun bangga karena berhasil membuat makanan kesukaan ibunya sendiri.'
  ]
}

const BACAAN_15_19 = {
  judul: 'Aku dan Keunikanku',
  teks: [
    'Namaku Nabila Putri. Aku duduk di kelas V SD. Aku tinggal bersama kedua orang tuaku dan seorang adik laki-laki. Teman-temanku mengenalku sebagai anak yang ramah, sabar, dan senang membantu orang lain.',
    'Aku memiliki hobi membuat kerajinan tangan dari barang bekas. Setiap hari Minggu, aku biasanya mengumpulkan botol plastik, kardus, dan kertas yang sudah tidak terpakai. Benda-benda tersebut kemudian kuubah menjadi tempat pensil, hiasan meja, atau bingkai foto.',
    'Selain membuat kerajinan, aku juga senang membaca buku cerita. Menurutku, membaca dapat menambah pengetahuan dan memberikan banyak inspirasi. Aku bercita-cita menjadi seorang guru seni agar dapat mengajarkan keterampilan membuat karya kreatif kepada anak-anak.',
    'Aku menyadari bahwa setiap orang memiliki kelebihan dan kekurangan. Aku memang belum terlalu berani berbicara di depan banyak orang. Namun, aku terus berlatih agar lebih percaya diri. Bagiku, keunikan bukanlah alasan untuk merasa lebih baik daripada orang lain, melainkan sesuatu yang harus disyukuri dan dikembangkan.'
  ]
}

const BACAAN_20 = {
  judul: 'Empat Anak dengan Keunikan Berbeda',
  teks: [
    'Di kelas V SD Pelita Bangsa terdapat empat murid yang memiliki keunikan masing-masing.',
    'Andi dikenal sebagai anak yang percaya diri dan senang berbicara di depan kelas. Ia memiliki kemampuan bercerita dan sering menjadi pembawa acara ketika ada kegiatan sekolah.',
    'Maya adalah anak yang teliti dan sabar. Ia senang menggambar pemandangan dan membuat lukisan dengan berbagai warna. Hasil gambarnya sering dipajang di kelas.',
    'Fajar memiliki rasa ingin tahu yang tinggi. Ia senang melakukan percobaan sederhana dan membaca buku tentang ilmu pengetahuan. Ia bercita-cita menjadi seorang ilmuwan.',
    'Sementara itu, Lala merupakan anak yang ramah dan peduli terhadap sesama. Ia senang membantu teman yang mengalami kesulitan dan selalu berusaha menjaga hubungan baik dengan orang lain.'
  ]
}

const BACAAN_21_25 = {
  judul: 'Membaca, Jendela Dunia',
  teks: [
    'Ada pepatah yang mengatakan bahwa buku adalah jendela dunia. Dengan membaca buku, kita dapat mengetahui banyak hal tanpa harus pergi jauh. Kita bisa mengenal hewan di hutan Kalimantan, budaya suku di Papua, bahkan planet di luar angkasa.',
    'Membaca juga memberi banyak manfaat. Wawasan kita bertambah dan kosakata semakin kaya. Kemampuan berbicara dan menulis pun menjadi lebih baik. Orang yang gemar membaca biasanya lebih mudah menyampaikan gagasan dengan runtut.',
    'Agar bacaan mudah dipahami, kita perlu membaca dengan cermat. Mulailah dengan membaca judul, lalu baca isi bacaan secara perlahan. Tandai kata yang belum dipahami dan carilah artinya di kamus. Setelah itu, catat ide pokok setiap paragraf. Terakhir, ceritakan kembali isi bacaan dengan bahasa sendiri secara santun.'
  ]
}

const BACAAN_26_30 = {
  judul: 'Hobiku, Caraku Bercerita',
  teks: [
    'Namaku Rani. Hobiku adalah menggambar. Aku mulai menyukai menggambar sejak kelas satu, ketika ibu memberiku buku gambar dan pensil warna.',
    'Setiap sore, aku menggambar selama satu jam. Pertama, aku memikirkan gambar apa yang akan dibuat. Kedua, aku membuat sketsa dengan pensil. Ketiga, aku mewarnai gambar itu sampai rapi. Terakhir, aku menunjukkan hasilnya kepada ibu.',
    'Temanku, Bima, punya hobi yang berbeda. Ia suka bermain sepak bola. Awalnya aku malu ketika menceritakan hobiku di depan kelas. Namun, Bima bertepuk tangan dan berkata bahwa gambarku bagus. Aku pun menjadi percaya diri. Aku juga bangga mendengar cerita Bima tentang pertandingan sepak bolanya.'
  ]
}

// ============================================================================
// BANK SOAL 1: BAHASA INDONESIA - SD SEDERAJAT (PAKET 1) — TETAP UTUH
// ============================================================================
const BANK_SOAL_BINDO_PAKET_1: Omit<DataSoal, 'nomor'>[] = [
  {
    nomorAsli: 1,
    tipe: 'pg',
    bacaanGambar: './cerita-sungai-bersih.png',
    pertanyaan: 'Apa kemampuan yang ditunjukkan Lani dalam cerita?',
    opsi: [
      { kode: 'A', teks: 'Mengajak teman-temannya bekerja sama' },
      { kode: 'B', teks: 'Berlari paling cepat' },
      { kode: 'C', teks: 'Memanjat pohon paling tinggi' },
      { kode: 'D', teks: 'Berenang paling jauh' }
    ],
    kunciText: 'Kunci jawaban: Mengajak teman-temannya bekerja sama.',
    kunciTeksReviu: 'Mengajak teman-temannya bekerja sama'
  },
  {
    nomorAsli: 2,
    tipe: 'tabel',
    bacaanGambar: './cerita-sungai-bersih.png',
    pertanyaan: 'Apa contoh perilaku yang dapat ditemukan dalam kehidupan sehari-hari berdasarkan pesan dalam cerita?',
    petunjuk: 'Tentukan Sesuai atau Tidak Sesuai untuk setiap pernyataan berikut!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Menulis pengalaman setelah membaca buku dapat membantu kita mengingat informasi penting.',
      'Kita tidak perlu belajar karena pengetahuan hanya dapat diperoleh dari pengalaman bermain.',
      'Bekerja sama menjaga kebersihan seperti Lani dan teman-temannya merupakan perilaku baik.'
    ],
    kunciText: 'Kunci jawaban: Sesuai, Tidak Sesuai, Sesuai.',
    kunciTeksReviu: 'Sesuai, Tidak Sesuai, Sesuai'
  },
  {
    nomorAsli: 3,
    tipe: 'pgk',
    bacaanGambar: './cerita-sungai-bersih.png',
    pertanyaan: 'Apa saja kegiatan yang dapat menjadi hobi berdasarkan cerita tersebut?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Membaca buku tentang hewan dan lingkungan.' },
      { kode: 'B', teks: 'Menulis cerita tentang pengalaman menjaga kebersihan sungai.' },
      { kode: 'C', teks: 'Bekerja sama membersihkan lingkungan sebagai kegiatan yang disukai.' },
      { kode: 'D', teks: 'Membuang sampah ke sungai sebagai kegiatan kesukaan.' }
    ],
    kunciText: 'Kunci jawaban: Membaca buku, Menulis cerita, Bekerja sama.',
    kunciTeksReviu: 'Membaca buku, Menulis cerita, Bekerja sama'
  },
  {
    nomorAsli: 4,
    tipe: 'isian',
    bacaanGambar: './cerita-sungai-bersih.png',
    pertanyaan: 'Rusa, burung, tupai, dan teman-teman Lani bekerja sama membersihkan sungai. Hobi yang sesuai adalah ....',
    kunciText: 'Kunci jawaban: Menjaga kebersihan lingkungan.',
    kunciTeksReviu: 'Menjaga kebersihan lingkungan'
  },
  {
    nomorAsli: 5,
    tipe: 'pgk',
    bacaanJudul: BACAAN_5_6.judul,
    bacaanTeks: BACAAN_5_6.teks,
    pertanyaan: 'Berdasarkan cerita di atas, pernyataan yang menunjukkan ciri fisik dan bukti bahwa Bayu adalah anak yang peduli?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Bayu memiliki fisik paling tinggi di antara teman sekelasnya.' },
      { kode: 'B', teks: 'Bayu sangat suka bermain bola bersama teman-temannya di lapangan.' },
      { kode: 'C', teks: 'Bayu memperbaiki halaman buku yang sobek menggunakan selotip secara hati-hati.' },
      { kode: 'D', teks: 'Bayu adalah petugas resmi perpustakaan sekolah yang bertugas setiap hari.' }
    ],
    kunciText: 'Kunci jawaban: Fisik paling tinggi, Memperbaiki buku.',
    kunciTeksReviu: 'Fisik paling tinggi, Memperbaiki buku'
  },
  {
    nomorAsli: 6,
    tipe: 'isian',
    bacaanJudul: BACAAN_5_6.judul,
    bacaanTeks: BACAAN_5_6.teks,
    pertanyaan: 'Ciri fisik Bayu yang dimanfaatkan secara positif untuk membantu pekerjaan merapikan perpustakaan adalah tubuhnya yang ....',
    placeholderIsian: 'Lengkapi titik-titik di atas...',
    kunciText: 'Kunci jawaban: Paling tinggi di antara teman sekelasnya.',
    kunciTeksReviu: 'Paling tinggi'
  },
  {
    nomorAsli: 7,
    tipe: 'pg',
    bacaanJudul: BACAAN_7_8.judul,
    bacaanTeks: BACAAN_7_8.teks,
    pertanyaan: 'Mengapa kegiatan membaca buku di dalam kamar pingitan menjadi langkah awal perjuangan R.A. Kartini?',
    opsi: [
      { kode: 'A', teks: 'Karena membaca buku membuatnya bisa menghafal bahasa asing.' },
      { kode: 'B', teks: 'Karena membaca buku memberinya wawasan luas dan kesadaran bahwa wanita berhak berpendidikan.' },
      { kode: 'C', teks: 'Karena membaca buku adalah satu-satunya hiburan.' },
      { kode: 'D', teks: 'Karena dengan membaca buku, Kartini diizinkan keluar rumah.' }
    ],
    kunciText: 'Kunci jawaban: Karena membaca buku memberinya wawasan luas...',
    kunciTeksReviu: 'Karena membaca buku memberinya wawasan luas...'
  },
  {
    nomorAsli: 8,
    tipe: 'isian',
    bacaanJudul: BACAAN_7_8.judul,
    bacaanTeks: BACAAN_7_8.teks,
    pertanyaan: 'Alat/sarana yang digunakan R.A. Kartini sebagai "senjata" untuk memperluas wawasan adalah ... dan ....',
    placeholderIsian: 'Contoh: membaca dan menulis',
    kunciText: 'Kunci jawaban: Membaca dan menulis.',
    kunciTeksReviu: 'Membaca dan menulis'
  },
  {
    nomorAsli: 9,
    tipe: 'pg',
    bacaanJudul: BACAAN_9_10.judul,
    bacaanTeks: BACAAN_9_10.teks,
    pertanyaan: 'Mengapa Edo menganggap hobi berkebun memberikan dampak positif bagi pembentukan karakternya?',
    opsi: [
      { kode: 'A', teks: 'Karena berkebun membuatnya bisa menjual hasil panen.' },
      { kode: 'B', teks: 'Karena proses mengamati benih hingga tumbuh melatih kesabarannya.' },
      { kode: 'C', teks: 'Karena berkebun tidak memerlukan biaya mahal.' },
      { kode: 'D', teks: 'Karena berkebun membuatnya dipuji guru.' }
    ],
    kunciText: 'Kunci jawaban: Karena proses mengamati benih hingga tumbuh melatih kesabarannya.',
    kunciTeksReviu: 'Karena proses mengamati benih hingga tumbuh melatih kesabarannya.'
  },
  {
    nomorAsli: 10,
    tipe: 'jodoh',
    bacaanJudul: BACAAN_9_10.judul,
    bacaanTeks: BACAAN_9_10.teks,
    pertanyaan: 'Pasangkanlah nama tokoh pada Kolom A dengan hobi dan kegiatan utamanya pada Kolom B!',
    petunjuk: 'Hubungkan atau pilih pasangan huruf yang tepat untuk setiap tokoh!',
    kolomKiri: [
      { nomor: 1, teks: 'Edo' },
      { nomor: 2, teks: 'Siti' },
      { nomor: 3, teks: 'Lani' }
    ],
    kolomKanan: [
      { kode: 'A', teks: 'Membaca buku sains dan melakukan percobaan ilmiah.' },
      { kode: 'B', teks: 'Menanam dan merawat benih tanaman.' },
      { kode: 'C', teks: 'Membuat sketsa gambar cerita lucu.' }
    ],
    kunciText: 'Kunci jawaban: 1-B, 2-C, 3-A.',
    kunciTeksReviu: '1-B, 2-C, 3-A'
  },
  {
    nomorAsli: 11,
    tipe: 'pg',
    bacaanJudul: BACAAN_11_12.judul,
    bacaanTeks: BACAAN_11_12.teks,
    pertanyaan: 'Bagaimana urutan proses pembuatan buku yang tepat berdasarkan bacaan tersebut?',
    opsi: [
      { kode: 'A', teks: 'ilustrasi → ide → pencetakan → penulisan → penyuntingan' },
      { kode: 'B', teks: 'penulisan → pencetakan → ide → penjilidan → penyuntingan' },
      { kode: 'C', teks: 'ide → penulisan naskah → penyuntingan → ilustrasi dan penataan letak → pencetakan dan penjilidan' },
      { kode: 'D', teks: 'pencetakan → ilustrasi → penyuntingan → ide → penulisan naskah' }
    ],
    kunciText: 'Kunci jawaban: ide → penulisan naskah → penyuntingan → ilustrasi...',
    kunciTeksReviu: 'ide → penulisan naskah → penyuntingan → ilustrasi...'
  },
  {
    nomorAsli: 12,
    tipe: 'tabel',
    bacaanJudul: BACAAN_11_12.judul,
    bacaanTeks: BACAAN_11_12.teks,
    pertanyaan: 'Tentukan apakah pernyataan tersebut Benar atau Salah berdasarkan bacaan tersebut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Proses pembuatan buku dapat dimulai dari munculnya ide.',
      'Editor bertugas mencetak dan menjilid buku.',
      'Ilustrasi dapat membantu pembaca memahami isi cerita.'
    ],
    kunciText: 'Kunci jawaban: Benar, Salah, Benar.',
    kunciTeksReviu: 'Benar, Salah, Benar'
  },
  {
    nomorAsli: 13,
    tipe: 'pg',
    bacaanGambar: './komik-aldi.png',
    bacaanTeks: [
      'Aldi memiliki hobi membuat komik sederhana. Ia sering menggambar tokoh dan menulis cerita pendek pada waktu luang. Suatu hari, temannya mengatakan bahwa komik buatannya masih kurang menarik. Aldi sempat kecewa, tetapi kemudian ia meminta saran dari guru dan berlatih membuat gambar serta cerita yang lebih baik. Beberapa minggu kemudian, komik Aldi menjadi lebih menarik dan ia berani memajangnya di kelas.'
    ],
    pertanyaan: 'Berdasarkan cerita tersebut, tindakan Aldi menunjukkan bahwa ...',
    opsi: [
      { kode: 'A', teks: 'Hobi hanya bermanfaat jika hasilnya langsung sempurna' },
      { kode: 'B', teks: 'Kritik harus selalu dihindari' },
      { kode: 'C', teks: 'Ketekunan mengembangkan hobi dapat meningkatkan keterampilan dan rasa percaya diri' },
      { kode: 'D', teks: 'Seseorang sebaiknya berhenti melakukan hobi ketika mendapat kritik' }
    ],
    kunciText: 'Kunci jawaban: Ketekunan mengembangkan hobi dapat meningkatkan keterampilan dan rasa percaya diri.',
    kunciTeksReviu: 'Ketekunan mengembangkan hobi dapat meningkatkan keterampilan dan rasa percaya diri'
  },
  {
    nomorAsli: 14,
    tipe: 'tabel',
    bacaanJudul: BACAAN_14.judul,
    bacaanTeks: BACAAN_14.teks,
    pertanyaan: 'Berdasarkan teks tersebut, tentukan apakah setiap pernyataan Sesuai atau Tidak Sesuai!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Rani memiliki hobi memasak.',
      'Rani mulai belajar memasak sejak kelas tiga SD.',
      'Rani membuat nasi goreng spesial untuk ayahnya.'
    ],
    kunciText: 'Kunci jawaban: Sesuai, Sesuai, Tidak Sesuai.',
    kunciTeksReviu: 'Sesuai, Sesuai, Tidak Sesuai'
  },
  {
    nomorAsli: 15,
    tipe: 'pg',
    bacaanJudul: BACAAN_15_19.judul,
    bacaanTeks: BACAAN_15_19.teks,
    pertanyaan: 'Informasi manakah yang menunjukkan identitas diri Nabila?',
    opsi: [
      { kode: 'A', teks: 'Ramah, sabar, dan senang membantu.' },
      { kode: 'B', teks: 'Bernama Nabila Putri dan duduk di kelas V SD.' },
      { kode: 'C', teks: 'Senang membuat kerajinan tangan.' },
      { kode: 'D', teks: 'Bercita-cita menjadi guru seni.' }
    ],
    kunciText: 'Kunci jawaban: Bernama Nabila Putri dan duduk di kelas V SD.',
    kunciTeksReviu: 'Bernama Nabila Putri dan duduk di kelas V SD.'
  },
  {
    nomorAsli: 16,
    tipe: 'pg',
    bacaanJudul: BACAAN_15_19.judul,
    bacaanTeks: BACAAN_15_19.teks,
    pertanyaan: 'Mengapa Nabila mengumpulkan botol plastik dan kardus bekas?',
    opsi: [
      { kode: 'A', teks: 'Untuk dijual' },
      { kode: 'B', teks: 'Untuk bermain' },
      { kode: 'C', teks: 'Untuk diolah menjadi kerajinan yang bermanfaat' },
      { kode: 'D', teks: 'Tidak ada bahan lain' }
    ],
    kunciText: 'Kunci jawaban: Untuk diolah menjadi kerajinan yang bermanfaat.',
    kunciTeksReviu: 'Untuk diolah menjadi kerajinan yang bermanfaat'
  },
  {
    nomorAsli: 17,
    tipe: 'pgk',
    bacaanJudul: BACAAN_15_19.judul,
    bacaanTeks: BACAAN_15_19.teks,
    pertanyaan: 'Manakah informasi identitas dan gambaran diri Nabila?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Bernama Nabila Putri.' },
      { kode: 'B', teks: 'Duduk di kelas V SD.' },
      { kode: 'C', teks: 'Memiliki adik laki-laki.' },
      { kode: 'D', teks: 'Hobi membuat kerajinan.' }
    ],
    kunciText: 'Kunci jawaban: Nama, Kelas, Adik, Hobi.',
    kunciTeksReviu: 'Nama, Kelas, Adik, Hobi'
  },
  {
    nomorAsli: 18,
    tipe: 'pgk',
    bacaanJudul: BACAAN_15_19.judul,
    bacaanTeks: BACAAN_15_19.teks,
    pertanyaan: 'Manakah kegiatan yang menunjukkan minat dan kemampuan Nabila?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Membuat tempat pensil dari botol bekas.' },
      { kode: 'B', teks: 'Membaca buku cerita.' },
      { kode: 'C', teks: 'Membuat bingkai foto.' },
      { kode: 'D', teks: 'Menghindari kreativitas.' }
    ],
    kunciText: 'Kunci jawaban: Kerajinan botol, Membaca buku, Bingkai foto.',
    kunciTeksReviu: 'Kerajinan botol, Membaca buku, Bingkai foto'
  },
  {
    nomorAsli: 19,
    tipe: 'uraian',
    bacaanJudul: BACAAN_15_19.judul,
    bacaanTeks: BACAAN_15_19.teks,
    pertanyaan: 'Jelaskan tiga keunikan Nabila beserta buktinya!',
    placeholderIsian: 'Tuliskan 3 keunikan Nabila...',
    kunciText: 'Kunci jawaban: Kreatif membuat kerajinan, gemar membaca, ramah.',
    kunciTeksReviu: 'Kreatif membuat kerajinan, gemar membaca, ramah'
  },
  {
    nomorAsli: 20,
    tipe: 'jodoh',
    bacaanJudul: BACAAN_20.judul,
    bacaanTeks: BACAAN_20.teks,
    pertanyaan: 'Pasangkan nama tokoh dengan karakteristik yang tepat!',
    petunjuk: 'Pilih pasangan huruf yang tepat!',
    kolomKiri: [
      { nomor: 1, teks: 'Andi' },
      { nomor: 2, teks: 'Maya' },
      { nomor: 3, teks: 'Fajar' },
      { nomor: 4, teks: 'Lala' }
    ],
    kolomKanan: [
      { kode: 'A', teks: 'Ramah dan peduli.' },
      { kode: 'B', teks: 'Percaya diri.' },
      { kode: 'C', teks: 'Teliti dan sabar.' },
      { kode: 'D', teks: 'Suka percobaan.' }
    ],
    kunciText: 'Kunci jawaban: 1-B, 2-C, 3-D, 4-A.',
    kunciTeksReviu: '1-B, 2-C, 3-D, 4-A'
  },
  {
    nomorAsli: 21,
    tipe: 'pg',
    bacaanJudul: BACAAN_21_25.judul,
    bacaanTeks: BACAAN_21_25.teks,
    pertanyaan: 'Manakah ide pokok paragraf kedua?',
    opsi: [
      { kode: 'A', teks: 'Buku adalah jendela dunia' },
      { kode: 'B', teks: 'Membaca memberi banyak manfaat' },
      { kode: 'C', teks: 'Cara membaca cermat' },
      { kode: 'D', teks: 'Menulis lebih penting' }
    ],
    kunciText: 'Kunci jawaban: Membaca memberi banyak manfaat.',
    kunciTeksReviu: 'Membaca memberi banyak manfaat'
  },
  {
    nomorAsli: 22,
    tipe: 'tabel',
    bacaanJudul: BACAAN_21_25.judul,
    bacaanTeks: BACAAN_21_25.teks,
    pertanyaan: 'Tentukan apakah pernyataan berikut sesuai atau tidak sesuai!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Kita harus pergi jauh untuk mengenal Papua.',
      'Membaca memperkaya kosakata.',
      'Kata belum dipahami dicari di kamus.'
    ],
    kunciText: 'Kunci jawaban: Tidak Sesuai, Sesuai, Sesuai.',
    kunciTeksReviu: 'Tidak Sesuai, Sesuai, Sesuai'
  },
  {
    nomorAsli: 23,
    tipe: 'isian',
    bacaanJudul: BACAAN_21_25.judul,
    bacaanTeks: BACAAN_21_25.teks,
    pertanyaan: 'Di mana kita dapat mencari arti kata yang belum dipahami?',
    kunciText: 'Kunci jawaban: Kamus.',
    kunciTeksReviu: 'Kamus'
  },
  {
    nomorAsli: 24,
    tipe: 'pgk',
    bacaanJudul: BACAAN_21_25.judul,
    bacaanTeks: BACAAN_21_25.teks,
    pertanyaan: 'Manakah manfaat membaca buku yang disebutkan dalam teks?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Menambah wawasan.' },
      { kode: 'B', teks: 'Memperkaya kosakata.' },
      { kode: 'C', teks: 'Tidak perlu belajar.' },
      { kode: 'D', teks: 'Meningkatkan kemampuan berbicara.' }
    ],
    kunciText: 'Kunci jawaban: Menambah wawasan, Memperkaya kosakata, Meningkatkan bicara.',
    kunciTeksReviu: 'Menambah wawasan, Memperkaya kosakata, Meningkatkan bicara'
  },
  {
    nomorAsli: 25,
    tipe: 'pgk',
    bacaanJudul: BACAAN_21_25.judul,
    bacaanTeks: BACAAN_21_25.teks,
    pertanyaan: 'Langkah apa saja untuk memahami isi bacaan dengan baik?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Membaca judul sebelum isi.' },
      { kode: 'B', teks: 'Melewati kata sulit.' },
      { kode: 'C', teks: 'Mencatat ide pokok.' },
      { kode: 'D', teks: 'Menceritakan kembali.' }
    ],
    kunciText: 'Kunci jawaban: Membaca judul, Mencatat ide pokok, Menceritakan kembali.',
    kunciTeksReviu: 'Membaca judul, Mencatat ide pokok, Menceritakan kembali'
  },
  {
    nomorAsli: 26,
    tipe: 'pg',
    bacaanJudul: BACAAN_26_30.judul,
    bacaanTeks: BACAAN_26_30.teks,
    pertanyaan: 'Bagaimana urutan kegiatan Rani saat menggambar?',
    opsi: [
      { kode: 'A', teks: 'sketsa, memikirkan, mewarnai, menunjukkan' },
      { kode: 'B', teks: 'memikirkan, sketsa, mewarnai, menunjukkan' },
      { kode: 'C', teks: 'memikirkan, mewarnai, sketsa, menunjukkan' },
      { kode: 'D', teks: 'menunjukkan, memikirkan, sketsa, mewarnai' }
    ],
    kunciText: 'Kunci jawaban: memikirkan, sketsa, mewarnai, menunjukkan.',
    kunciTeksReviu: 'memikirkan, sketsa, mewarnai, menunjukkan'
  },
  {
    nomorAsli: 27,
    tipe: 'tabel',
    bacaanJudul: BACAAN_26_30.judul,
    bacaanTeks: BACAAN_26_30.teks,
    pertanyaan: 'Tentukan sesuai atau tidak sesuai dengan teks!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Rani suka menggambar sejak kelas satu.',
      'Bima dan Rani punya hobi sama.',
      'Rani menggambar setiap sore selama 1 jam.'
    ],
    kunciText: 'Kunci jawaban: Sesuai, Tidak Sesuai, Sesuai.',
    kunciTeksReviu: 'Sesuai, Tidak Sesuai, Sesuai'
  },
  {
    nomorAsli: 28,
    tipe: 'isian',
    bacaanJudul: BACAAN_26_30.judul,
    bacaanTeks: BACAAN_26_30.teks,
    pertanyaan: 'Rani berbicara dengan suara yang ... dan kalimat jelas.',
    kunciText: 'Kunci jawaban: Lantang / jelas.',
    kunciTeksReviu: 'Lantang / jelas'
  },
  {
    nomorAsli: 29,
    tipe: 'tabel',
    bacaanJudul: BACAAN_26_30.judul,
    bacaanTeks: BACAAN_26_30.teks,
    pertanyaan: 'Tentukan Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Bima menghargai hobi Rani.',
      'Hobi beda boleh mengejek.',
      'Rani lebih percaya diri.'
    ],
    kunciText: 'Kunci jawaban: Benar, Salah, Benar.',
    kunciTeksReviu: 'Benar, Salah, Benar'
  },
  {
    nomorAsli: 30,
    tipe: 'pgk',
    bacaanJudul: BACAAN_26_30.judul,
    bacaanTeks: BACAAN_26_30.teks,
    pertanyaan: 'Kegiatan apa yang menunjukkan kebiasaan Rani?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Menggambar setiap sore 1 jam.' },
      { kode: 'B', teks: 'Bermain bola.' },
      { kode: 'C', teks: 'Membuat sketsa.' },
      { kode: 'D', teks: 'Membeli buku.' }
    ],
    kunciText: 'Kunci jawaban: Menggambar sore, Membuat sketsa.',
    kunciTeksReviu: 'Menggambar sore, Membuat sketsa'
  }
]

// ============================================================================
// BANK SOAL 2: MATEMATIKA - SD SEDERAJAT (PAKET 1) — SESUAI PDF
// ============================================================================
const BANK_SOAL_MATEMATIKA_PAKET_1: Omit<DataSoal, 'nomor'>[] = [
  {
    nomorAsli: 1,
    tipe: 'pgk',
    bacaanJudul: 'Bilangan Cacah dan Nilai Tempat',
    bacaanTeks: [
      'Perhatikan bilangan cacah 57.631. Setiap angka pada bilangan tersebut memiliki nilai tempat dan nilai angka yang berbeda sesuai posisinya.'
    ],
    bacaanGambar: './mtk-soal-1.png',
    pertanyaan: 'Perhatikan bilangan berikut 57.631. Pernyataan dibawah ini yang benar adalah (Pilih dua jawaban atau lebih yang benar)!',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Angka 5 menempati nilai tempat puluh ribuan (bernilai 50.000)' },
      { kode: 'B', teks: 'Angka 7 menempati nilai tempat ratusan (bernilai 700)' },
      { kode: 'C', teks: 'Angka 3 menempati nilai tempat puluhan (bernilai 30)' },
      { kode: 'D', teks: 'Angka 1 menempati nilai tempat satuan (bernilai 1)' }
    ],
    kunciKodePgk: ['A', 'C', 'D'],
    kunciText: 'Kunci jawaban: A, C, D.',
    kunciTeksReviu: 'A, C, D'
  },
  {
    nomorAsli: 2,
    tipe: 'tabel',
    bacaanJudul: 'Kue Jajan Pasar Ibu Citra',
    bacaanTeks: [
      'Ibu Citra membuat kue jajan pasar untuk acara arisan. Ia membuat 54 kue lumpur dan 72 kue sus. Ibu Citra ingin menata kue-kue tersebut ke dalam beberapa piring secara merata. Setiap piring harus berisi kedua jenis kue dengan jumlah yang sama banyak. Sebelum ditata, ternyata ada 4 kue lumpur yang rusak sehingga tidak bisa disajikan.'
    ],
    bacaanGambar: './mtk-soal-2.png',
    pertanyaan: 'Berdasarkan cerita tersebut, tentukan apakah setiap pernyataan berikut Benar atau Salah!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Kue lumpur yang siap disajikan ada 50',
      'Masing-masing piring berisi 25 kue lumpur dan 36 kue sus',
      'Ibu Citra harus menyiapkan paling banyak 5 piring',
      'Faktor prima dari 72 = 2³ × 3²'
    ],
    kunciTabel: ['Benar', 'Benar', 'Salah', 'Benar'],
    kunciText: 'Kunci jawaban: Benar, Benar, Salah, Benar.',
    kunciTeksReviu: 'Benar, Benar, Salah, Benar'
  },
  {
    nomorAsli: 3,
    tipe: 'pg',
    bacaanJudul: 'Pengumuman Dinas Kabupaten Probolinggo',
    bacaanTeks: [
      'Dinas Kabupaten Probolinggo mengumumkan bahwa pada akhir tahun 2021, terdapat delapan belas ribu tujuh ratus empat puluh lima orang terkonfirmasi positif Covid-19.'
    ],
    bacaanGambar: './mtk-soal-3.png',
    pertanyaan: 'Banyak masyarakat Probolinggo yang terkonfirmasi positif Covid-19 pada akhir tahun 2021 yaitu ... orang.',
    opsi: [
      { kode: 'A', teks: '18.744' },
      { kode: 'B', teks: '18.745' },
      { kode: 'C', teks: '18.755' },
      { kode: 'D', teks: '18.464' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B.',
    kunciTeksReviu: 'B'
  },
  {
    nomorAsli: 4,
    tipe: 'isian',
    bacaanJudul: 'Brem Khas Kota Madiun',
    bacaanTeks: [
      'Brem merupakan makanan khas Kota Madiun yang dijual dengan harga empat puluh tiga ribu lima ratus rupiah.'
    ],
    bacaanGambar: './mtk-soal-4.png',
    pertanyaan: 'Angka empat pada harga Brem menempati tempat ... dan nilainya ....',
    placeholderIsian: 'Contoh: Puluh ribuan, 40.000',
    kunciIsianList: ['puluh ribuan, 40.000', 'puluh ribuan dan 40.000', 'puluh ribuan, 40000', '40.000'],
    kunciText: 'Kunci jawaban: Puluh ribuan, 40.000.',
    kunciTeksReviu: 'Puluh ribuan, 40.000'
  },
  {
    nomorAsli: 5,
    tipe: 'pg',
    bacaanJudul: 'Potongan Kertas Siti',
    bacaanTeks: [
      'Siti memiliki dua potong kertas berbentuk persegi panjang. Kertas pertama diwarnai 2/8 bagian dan kertas kedua diwarnai 3/8 bagian.'
    ],
    bacaanGambar: './mtk-soal-5.png',
    pertanyaan: 'Jika kedua bagian tersebut digabungkan, jumlah bagian kertas yang diwarnai adalah ....',
    opsi: [
      { kode: 'A', teks: '5/16' },
      { kode: 'B', teks: '5/8' },
      { kode: 'C', teks: '6/8' },
      { kode: 'D', teks: '1/8' }
    ],
    kunciKodePg: 'C',
    kunciText: 'Kunci jawaban: C.',
    kunciTeksReviu: 'C'
  },
  {
    nomorAsli: 6,
    tipe: 'isian',
    bacaanJudul: 'Pendapat Budi tentang Keliling Persegi',
    bacaanTeks: [
      'Budi mengatakan bahwa untuk mengetahui keliling persegi, cukup menghitung 7 + 7 = 14 cm karena persegi hanya memiliki satu ukuran sisi. Pernyataan: Pendapat Budi adalah benar.'
    ],
    bacaanGambar: './mtk-soal-6.png',
    pertanyaan: 'Menurut kalian bagaimana pernyataan Budi? Benar atau salah?',
    placeholderIsian: 'Tuliskan Benar atau Salah...',
    kunciIsianList: ['b', 'benar', 'salah'],
    kunciText: 'Kunci jawaban: B.',
    kunciTeksReviu: 'B'
  },
  {
    nomorAsli: 7,
    tipe: 'tabel',
    bacaanJudul: 'Perbandingan Bilangan Cacah',
    bacaanTeks: [
      'Perhatikan pasangan bilangan cacah berikut untuk menentukan kesesuaian tanda perbandingannya.'
    ],
    bacaanGambar: './mtk-soal-7.png',
    pertanyaan: 'Tentukan apakah perbandingan berikut sesuai atau tidak sesuai! Beri tanda centang pada kolom yang tepat.',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      '62.481 > 62.418',
      '9.999 > 10.000',
      '35.706 < 35.760'
    ],
    kunciTabel: ['Sesuai', 'Tidak Sesuai', 'Sesuai'],
    kunciText: 'Kunci jawaban: Benar.',
    kunciTeksReviu: 'Benar'
  },
  {
    nomorAsli: 8,
    tipe: 'pg',
    bacaanJudul: 'Luas Bangun Gabungan',
    bacaanTeks: [
      'Bangun tersebut terbentuk dari persegi panjang berukuran 8 cm × 5 cm dan persegi dengan panjang sisi 3 cm yang menempel pada salah satu sisi persegi panjang.'
    ],
    bacaanGambar: './mtk-soal-8.png',
    pertanyaan: 'Luas bangun gabungan itu adalah ....',
    opsi: [
      { kode: 'A', teks: '13 cm²' },
      { kode: 'B', teks: '43 cm²' },
      { kode: 'C', teks: '49 cm²' },
      { kode: 'D', teks: '120 cm²' }
    ],
    kunciKodePg: 'C',
    kunciText: 'Kunci jawaban: C.',
    kunciTeksReviu: 'C'
  },
  {
    nomorAsli: 9,
    tipe: 'tabel',
    bacaanJudul: 'Koleksi Buku Perpustakaan',
    bacaanTeks: [
      'Perpustakaan sekolah memiliki koleksi sebanyak 63.482 buku. Petugas perpustakaan mencatat jumlah tersebut berdasarkan nilai tempat agar mudah dibaca dan dipahami oleh para siswa.'
    ],
    bacaanGambar: './mtk-soal-9.png',
    pertanyaan: 'Berdasarkan cerita tersebut, tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Angka 6 pada bilangan 63.482',
      'Angka 4 menempati nilai tempat ratusan dan bernilai 400',
      'Bilangan 63.482 dapat diuraikan menjadi 60.000 + 3.000 + 400 + 80 + 2'
    ],
    kunciTabel: ['Salah', 'Benar', 'Benar'],
    kunciText: 'Kunci jawaban: S, B, B.',
    kunciTeksReviu: 'S, B, B'
  },
  {
    nomorAsli: 10,
    tipe: 'uraian',
    bacaanJudul: 'Membagi Buah ke dalam Kantong',
    bacaanTeks: [
      'Ibu memiliki 36 buah jeruk dan 48 buah apel. Buah-buahan tersebut akan dimasukkan ke dalam beberapa kantong untuk dibagikan kepada tetangga. Setiap kantong harus berisi jumlah jeruk yang sama dan jumlah apel yang sama. Tidak boleh ada buah yang tersisa, dan jumlah kantong yang dibuat harus sebanyak mungkin.'
    ],
    bacaanGambar: './mtk-soal-10.png',
    pertanyaan: 'Berapa jumlah kantong terbanyak yang dapat dibuat Ibu? Berapa buah jeruk dan apel yang terdapat dalam setiap kantong?',
    placeholderIsian: 'Tuliskan jawaban Anda...',
    kunciIsianList: ['12', '3', '4'],
    kunciText: 'Kunci jawaban: 12 kantong, jeruk perkantong ada 3 buah, apel perkantong ada 4 buah.',
    kunciTeksReviu: '12 kantong, jeruk perkantong ada 3 buah, apel perkantong ada 4 buah'
  },
  {
    nomorAsli: 11,
    tipe: 'isian',
    bacaanJudul: 'Kue Bolu Dinda',
    bacaanTeks: [
      'Pada hari Minggu, Dinda membantu Ibu membuat kue bolu. Kue tersebut dipotong menjadi 12 bagian sama besar. Ayah memakan 3 potong kue, sedangkan Dinda memakan 2 potong kue. Sisanya disimpan untuk dinikmati bersama pada sore hari.'
    ],
    bacaanGambar: './mtk-soal-11.png',
    pertanyaan: 'Berapa bagian kue yang dimakan Ayah dan Dinda jika dinyatakan dalam bentuk pecahan?',
    placeholderIsian: 'Contoh: 5/12',
    kunciIsianList: ['5/12', '5 per 12'],
    kunciText: 'Kunci jawaban: 5/12 (5 per 12).',
    kunciTeksReviu: '5/12 (5 per 12)'
  },
  {
    nomorAsli: 12,
    tipe: 'pg',
    bacaanJudul: 'Data Jumlah Penduduk Kecamatan',
    bacaanTeks: [
      'Data jumlah penduduk (jiwa): Tongas = 14.640; Sumberasih = 37.797; Wonomerto = 19.924; Bantaran = 38.145.',
      'Pernyataan: (1) Kecamatan Sumberasih memiliki jumlah penduduk paling banyak; (2) Kecamatan Tongas memiliki jumlah penduduk paling sedikit; (3) Kecamatan Tongas dan Wonomerto memiliki jumlah penduduk di bawah 20.000 jiwa; (4) Penduduk di Kecamatan Bantaran lebih sedikit dari Sumberasih.'
    ],
    bacaanGambar: './mtk-soal-12.png',
    pertanyaan: 'Pernyataan yang benar ditunjukkan oleh nomor ....',
    opsi: [
      { kode: 'A', teks: '(1), (2), dan (3) benar' },
      { kode: 'B', teks: '(1) dan (3) benar' },
      { kode: 'C', teks: '(2) dan (3) benar' },
      { kode: 'D', teks: 'Semuanya benar' }
    ],
    kunciKodePg: 'C',
    kunciText: 'Kunci jawaban: C.',
    kunciTeksReviu: 'C'
  },
  {
    nomorAsli: 13,
    tipe: 'pg',
    bacaanJudul: 'Membaca Nilai Tempat pada Tabel',
    bacaanTeks: [
      'Perhatikan tabel nilai tempat (Puluh Ribuan, Ribuan, Ratusan, Puluhan, Satuan) beserta keterangan simbolnya pada ilustrasi berikut.'
    ],
    bacaanGambar: './mtk-soal-13.png',
    pertanyaan: 'Bilangan yang sesuai berdasarkan tabel di atas adalah ....',
    opsi: [
      { kode: 'A', teks: '42.559' },
      { kode: 'B', teks: '43.599' },
      { kode: 'C', teks: '44.559' },
      { kode: 'D', teks: '44.599' }
    ],
    kunciKodePg: 'C',
    kunciText: 'Kunci jawaban: C.',
    kunciTeksReviu: 'C'
  },
  {
    nomorAsli: 14,
    tipe: 'tabel',
    bacaanJudul: 'Menentukan Nilai Tempat Bilangan',
    bacaanTeks: [
      'Perhatikan tabel pernyataan mengenai nilai tempat angka pada beberapa bilangan cacah.'
    ],
    bacaanGambar: './mtk-soal-14.png',
    pertanyaan: 'Tentukan sesuai atau tidak sesuai tentang pernyataan berikut dengan memberi tanda centang. Kalian dapat memilih lebih dari satu jawaban.',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Nilai tempat ratusan dari bilangan 42.051 berangka 0',
      'Nilai tempat puluhan dari bilangan 28.471 berangka 7',
      'Nilai tempat puluh ribuan dari bilangan 36.490 berangka 6',
      'Nilai tempat satuan dari bilangan 13.027 berangka 2',
      'Nilai tempat puluhan dari bilangan 60.317 berangka 3'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak Sesuai', 'Tidak Sesuai', 'Tidak Sesuai'],
    kunciText: 'Kunci jawaban: Sesuai - Sesuai - Tidak Sesuai - Tidak Sesuai - Tidak sesuai.',
    kunciTeksReviu: 'Sesuai - Sesuai - Tidak Sesuai - Tidak Sesuai - Tidak sesuai'
  },
  {
    nomorAsli: 15,
    tipe: 'pg',
    bacaanJudul: 'Berbagi Buah Abraham',
    bacaanTeks: [
      'Abraham memiliki 15 apel dan 20 jeruk. Dia akan memberikan buahnya kepada beberapa teman-temannya. Setiap teman mendapatkan kedua jenis buah tersebut. Setiap jenis buah yang didapatkan setiap anak sama banyak.'
    ],
    bacaanGambar: './mtk-soal-15.png',
    pertanyaan: 'Banyak teman Abraham yang mendapatkan buah adalah ... anak.',
    opsi: [
      { kode: 'A', teks: '2' },
      { kode: 'B', teks: '3' },
      { kode: 'C', teks: '4' },
      { kode: 'D', teks: '5' }
    ],
    kunciKodePg: 'D',
    kunciText: 'Kunci jawaban: D.',
    kunciTeksReviu: 'D'
  },
  {
    nomorAsli: 16,
    tipe: 'pg',
    bacaanJudul: 'Jadwal Les Piano Kanaya dan Ulfa',
    bacaanTeks: [
      'Kanaya dan Ulfa menyukai piano, sehingga orang tuanya mendaftarkan ke tempat les piano untuk mengasah kemampuan mereka. Kanaya les piano setiap 4 hari sekali dan Ulfa les piano setiap 6 hari sekali. Jika pada hari Minggu mereka les piano bersama.'
    ],
    bacaanGambar: './mtk-soal-16.png',
    pertanyaan: 'Maka mereka akan les piano bersama-sama lagi untuk yang kedua kalinya pada hari ....',
    opsi: [
      { kode: 'A', teks: 'Minggu' },
      { kode: 'B', teks: 'Sabtu' },
      { kode: 'C', teks: 'Senin' },
      { kode: 'D', teks: 'Jumat' }
    ],
    kunciKodePg: 'D',
    kunciText: 'Kunci jawaban: D.',
    kunciTeksReviu: 'D'
  },
  {
    nomorAsli: 17,
    tipe: 'tabel',
    bacaanJudul: 'Jadwal Menerbangkan Drone',
    bacaanTeks: [
      'Kak Adit dan Kak Anis masing-masing memiliki drone. Drone adalah pesawat tanpa awak yang terbang dengan kendali jarak jauh menggunakan remot. Mereka menggunakannya untuk merekam video pemandangan alam sekitar. Kak Adit menggunakan drone setiap seminggu sekali. Kak Anis menggunakan drone setiap 5 hari sekali. Pada 14 April ini, mereka menggunakan drone bersamaan.'
    ],
    bacaanGambar: './mtk-soal-17.png',
    pertanyaan: 'Tentukan sesuai tidak sesuai tentang pernyataan berikut ini.',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Mereka menggunakan drone setiap 115 hari sekali',
      'Penggunaan drone bersama lagi paling cepat pada 18 Mei',
      'Penggunaan drone bersama lagi paling cepat pada 19 Mei',
      'Mereka akan menggunakan drone bersama lagi pada 23 Juni',
      'Mereka akan menggunakan drone bersama lagi pada 28 Juli'
    ],
    kunciTabel: ['Tidak Sesuai', 'Tidak Sesuai', 'Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: 'Kunci jawaban: Tidak Sesuai - Tidak Sesuai - Sesuai - Sesuai - Tidak Sesuai.',
    kunciTeksReviu: 'Tidak Sesuai - Tidak Sesuai - Sesuai - Sesuai - Tidak Sesuai'
  },
  {
    nomorAsli: 18,
    tipe: 'tabel',
    bacaanJudul: 'Kelereng Warna-warni Fauzan',
    bacaanTeks: [
      'Fauzan memiliki kelereng 96 butir. Kelereng hijau ada 24 butir, merah 36 butir, selebihnya putih. Fauzan memasukkan kelerengnya dalam toples. Setiap toples berisi sama banyak dan kombinasi warnanya. Toples yang disediakan sebanyak-banyaknya.'
    ],
    bacaanGambar: './mtk-soal-18.png',
    pertanyaan: 'Berdasarkan ilustrasi tersebut, tentukan benar atau salah untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Banyak toples yang dibutuhkan seluruhnya ada 12 buah',
      'Banyak kelereng putih setiap toples ada 3 buah',
      'Banyak kelereng dalam setiap toples ada 9 buah'
    ],
    kunciTabel: ['Benar', 'Benar', 'Salah'],
    kunciText: 'Kunci jawaban: Benar - Benar - Salah.',
    kunciTeksReviu: 'Benar - Benar - Salah'
  },
  {
    nomorAsli: 19,
    tipe: 'tabel',
    bacaanJudul: 'Hasil Perahan Susu Sapi Pak Malik',
    bacaanTeks: [
      'Pak Malik memerah susu sapi perahnya setiap hari. Pada hari pertama, diperoleh sebanyak 12 1/8 liter. Pada hari kedua, diperoleh sebanyak 12 3/8 liter. Pada hari ketiga, diperoleh sebanyak 13 2/5 liter. Pada hari keempat, diperoleh sebanyak 12 7/10 liter. Pada hari kelima, diperoleh sebanyak 11 1/4 liter.'
    ],
    bacaanGambar: './mtk-soal-19.png',
    pertanyaan: 'Tentukan sesuai atau tidak sesuai tentang pernyataan berikut!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Jumlah susu hari pertama dan kedua adalah 24 1/2',
      'Jumlah susu hari kedua dan ketiga adalah 25 1/3',
      'Jumlah susu hari ketiga dan keempat adalah 25 9/10',
      'Jumlah susu hari keempat dan kelima adalah 23 19/20',
      'Jumlah susu hari pertama dan kelima adalah 23 3/8'
    ],
    kunciTabel: ['Sesuai', 'Tidak Sesuai', 'Tidak Sesuai', 'Sesuai', 'Sesuai'],
    kunciText: 'Kunci jawaban: Sesuai - Tidak Sesuai - Tidak Sesuai - Sesuai - Sesuai.',
    kunciTeksReviu: 'Sesuai - Tidak Sesuai - Tidak Sesuai - Sesuai - Sesuai'
  },
  {
    nomorAsli: 20,
    tipe: 'tabel',
    bacaanJudul: 'Operasi Penjumlahan Pecahan dalam Cerita',
    bacaanTeks: [
      'Bacalah setiap cerita penjumlahan pecahan dengan cermat dan periksa ketepatan hasilnya.'
    ],
    bacaanGambar: './mtk-soal-20.png',
    pertanyaan: 'Bacalah setiap cerita dengan cermat, kemudian tentukan apakah pernyataan dan hasil penjumlahannya benar atau salah dengan memberi tanda centang.',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Ibu menggunakan 2/8 kg gula untuk membuat kue dan 3/8 kg gula untuk membuat roti. Total gula yang digunakan adalah 5/8.',
      'Pak Tani menggunakan dua bilah bambu dengan panjang berbeda sebagai alat ukur. Bilah pertama panjangnya 1/2 meter dan bilah kedua panjangnya 1/4 meter. Jika kedua bilah bambu disambung menjadi satu garis lurus, panjang total sambungannya adalah 2/6 meter.',
      'Siti menyiapkan dua cetakan agar-agar berbentuk balok berukuran sama. Cetakan pertama diisi agar-agar hijau setinggi 3/5 bagian, dan cetakan kedua diisi agar-agar merah setinggi 1/10 bagian. Jika seluruh agar-agar tersebut disatukan ke dalam satu wadah besar berukuran sama, tinggi bagian agar-agar menjadi 4/5 bagian dari wadah.',
      'Dalam kegiatan meronce manik-manik, Lani menggunakan seutas tali. Ia memasukkan manik-manik biru sepanjang 1/3 bagian tali dan manik-manik kuning sepanjang 1/2 bagian tali. Jika kedua bagian manik-manik tersebut dideretkan berdampingan pada tali, total panjang bagian tali yang terisi manik-manik adalah 5/6 bagian.',
      'Beni mengisi dua buah gelas ukur dengan air. Gelas pertama berisi 3/4 liter air dan gelas kedua berisi 1/8 liter air. Ketika air dari kedua gelas tersebut dituangkan ke dalam botol besar, total volume air di dalam botol menjadi 4/12.'
    ],
    kunciTabel: ['Benar', 'Salah', 'Salah', 'Benar', 'Salah'],
    kunciText: 'Kunci jawaban: Benar - Salah - Salah - Benar - Salah.',
    kunciTeksReviu: 'Benar - Salah - Salah - Benar - Salah'
  },
  {
    nomorAsli: 21,
    tipe: 'pg',
    bacaanJudul: 'Persegi Panjang Tersusun Petak Satuan',
    bacaanTeks: [
      'Sebuah persegi panjang tersusun dari 5 petak × 4 petak. Satu petak satuan memiliki luas 1 cm². Tiga petak dipindahkan dari bagian dalam bangun lalu ditempelkan di sisi luar bangun (tanpa tumpang tindih) sehingga membentuk bangun baru.'
    ],
    bacaanGambar: './mtk-soal-21.png',
    pertanyaan: 'Pernyataan yang tepat tentang luas bangun baru adalah ....',
    opsi: [
      { kode: 'A', teks: 'Tetap 20 cm² karena banyak petak yang menyusun bangun tidak berubah.' },
      { kode: 'B', teks: 'Menjadi 17 cm² karena ada tiga petak yang dipindahkan.' },
      { kode: 'C', teks: 'Menjadi 23 cm² karena ada tiga petak yang ditambahkan.' },
      { kode: 'D', teks: 'Tidak dapat ditentukan karena bentuknya berubah.' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A.',
    kunciTeksReviu: 'A'
  },
  {
    nomorAsli: 22,
    tipe: 'tabel',
    bacaanJudul: 'Perbandingan Luas Kartu A dan Kartu B',
    bacaanTeks: [
      'Kartu A berbentuk persegi panjang dengan ukuran 6 petak × 2 petak. Kartu B berbentuk persegi dengan ukuran 3 petak × 4 petak. Petak satuan kedua kartu sama besar.'
    ],
    bacaanGambar: './mtk-soal-22.png',
    pertanyaan: 'Tentukan apakah setiap pernyataan berikut SESUAI atau TIDAK SESUAI dengan stimulus! (Beri tanda centang pada kolom yang tepat)',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Luas kartu A sama dengan luas kartu B, yaitu 12 petak satuan.',
      'Kartu B lebih luas karena bentuknya lebih mendekati persegi.',
      'Jika setiap petak satuan memiliki luas 2 cm², luas kartu A adalah 24 cm².'
    ],
    kunciTabel: ['Sesuai', 'Tidak Sesuai', 'Sesuai'],
    kunciText: 'Kunci jawaban: S, TS, S.',
    kunciTeksReviu: 'S, TS, S'
  },
  {
    nomorAsli: 23,
    tipe: 'isian',
    bacaanJudul: 'Ubin Lantai Ruangan',
    bacaanTeks: [
      'Lantai sebuah ruangan berbentuk persegi panjang ditutup ubin berukuran 1 m². Ubin tersusun 8 baris dan 5 kolom. Sebanyak 12 ubin bagian tengah ditutup karpet.'
    ],
    bacaanGambar: './mtk-soal-23.png',
    pertanyaan: 'Luas lantai yang tidak tertutup karpet adalah ... m².',
    placeholderIsian: 'Tuliskan angkanya saja, contoh: 28',
    kunciIsianList: ['28', '28 m2', '28 m²'],
    kunciText: 'Kunci jawaban: 28.',
    kunciTeksReviu: '28'
  },
  {
    nomorAsli: 24,
    tipe: 'pg',
    bacaanJudul: 'Belanjaan Ardian di Pasar Bantaran',
    bacaanTeks: [
      'Ardian diminta ibu untuk pergi berbelanja ke pasar Bantaran. Ardian membeli beberapa barang di antaranya ada Gula, Bawang putih, Bawang Merah, dan Beras. Ardian membeli gula sebanyak 2 3/4 kg, Bawang Putih sebanyak 3 5/6 kg, Bawang Merah sebanyak 5 1/2 kg dan Beras sebanyak 5 2/4 kg. Kemudian Ardian mengelompokkan ke empat barang tersebut menjadi 2 bagian di antaranya Bawang Putih dengan bawang merah dimasukkan ke dalam wadah yang sama supaya mudah membawanya.'
    ],
    bacaanGambar: './mtk-soal-24.png',
    pertanyaan: 'Kemungkinan yang akan terjadi dari cerita di atas adalah ....',
    opsi: [
      { kode: 'A', teks: 'Berat gula dan beras sama dengan berat bawang putih dan bawang merah.' },
      { kode: 'B', teks: 'Berat gula dan beras lebih ringan dari pada berat bawang putih dan bawang merah.' },
      { kode: 'C', teks: 'Berat beras jika dijumlah dengan berat bawang merah adalah 8 3/6 kg' },
      { kode: 'D', teks: 'Berat bawang merah jika dijumlah dengan berat beras adalah 10 3/4 kg.' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B.',
    kunciTeksReviu: 'B'
  },
  {
    nomorAsli: 25,
    tipe: 'tabel',
    bacaanJudul: 'Perbandingan Berat Belanjaan Ardian',
    bacaanTeks: [
      'Ardian diminta ibu untuk pergi berbelanja ke pasar Bantaran. Ardian membeli beberapa barang di antaranya ada Gula, Bawang putih, Bawang Merah, dan Beras. Ardian membeli gula sebanyak 2 3/4 kg, Bawang Putih sebanyak 3 5/6 kg, Bawang Merah sebanyak 5 1/2 kg, dan Beras sebanyak 5 2/4 kg. Kemudian Ardian mengelompokkan ke empat barang tersebut menjadi 2 bagian di antaranya Bawang Putih dengan bawang merah dimasukkan ke dalam wadah yang sama supaya mudah membawanya.'
    ],
    bacaanGambar: './mtk-soal-25.png',
    pertanyaan: 'Pernyataan di bawah ini yang sesuai adalah ....',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Berat bawang merah dengan berat beras itu sama',
      'Berat beras jika dijumlah dengan berat bawang merah adalah 9 1/2 kg',
      'Berat bawang merah jika dijumlah dengan berat beras adalah 10 kg.'
    ],
    kunciTabel: ['Benar', 'Salah', 'Salah'],
    kunciText: 'Kunci jawaban: B, S, S.',
    kunciTeksReviu: 'B, S, S'
  },
  {
    nomorAsli: 26,
    tipe: 'tabel',
    bacaanJudul: 'Kartu Bilangan Toni dan Lisa',
    bacaanTeks: [
      'Toni dan Lisa membuat sebuah kartu bilangan. Kartu Toni bertuliskan bilangan 48.201. Kartu Lisa bertuliskan bilangan 22.930.'
    ],
    bacaanGambar: './mtk-soal-26.png',
    pertanyaan: 'Tentukan Benar atau Salah tentang dua bilangan dalam kartu tersebut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Jumlah bilangan dari kedua kartu adalah 71.131',
      'Selisih dari kedua kartu adalah 25.271',
      'Jumlah bilangan dari kedua kartu adalah 71.031',
      'Dua kali lipat dari bilangan di kartu Toni adalah 96.402',
      'Selisih dari kedua kartu adalah 26.271'
    ],
    kunciTabel: ['Benar', 'Benar', 'Salah', 'Benar', 'Salah'],
    kunciText: 'Kunci jawaban: B, B, S, B, S.',
    kunciTeksReviu: 'B, B, S, B, S'
  },
  {
    nomorAsli: 27,
    tipe: 'pg',
    bacaanJudul: 'Alat Tulis Dodi',
    bacaanTeks: [
      'Dodi memiliki 4 pensil dan 20 penghapus. Ia akan membagikannya kepada teman-teman. Tiap teman mendapatkan kedua jenis barang itu. Jumlah tiap jenis barang yang didapatkan tiap temannya sama banyak.'
    ],
    bacaanGambar: './mtk-soal-27.png',
    pertanyaan: 'Teman terbanyak yang mendapatkan kedua barang itu adalah ....',
    opsi: [
      { kode: 'A', teks: '1' },
      { kode: 'B', teks: '5' },
      { kode: 'C', teks: '4' },
      { kode: 'D', teks: '2' }
    ],
    kunciKodePg: 'C',
    kunciText: 'Kunci jawaban: C.',
    kunciTeksReviu: 'C'
  },
  {
    nomorAsli: 28,
    tipe: 'pg',
    bacaanJudul: 'Panen Jeruk Pak Doni',
    bacaanTeks: [
      'Pak Doni memanen 4.500 buah jeruk dari kebunnya. Jeruk-jeruk tersebut dimasukkan ke dalam 36 keranjang dengan jumlah yang sama banyak. Jika seluruh jeruk dalam 1 keranjang dijual dengan harga Rp150.000, berapa rupiah total uang yang diperoleh Pak Doni jika 1 keranjang berisi berapa buah jeruk?'
    ],
    bacaanGambar: './mtk-soal-28.png',
    pertanyaan: 'Satu keranjang berisi ... buah jeruk.',
    opsi: [
      { kode: 'A', teks: '115 buah' },
      { kode: 'B', teks: '120 buah' },
      { kode: 'C', teks: '125 buah' },
      { kode: 'D', teks: '130 buah' }
    ],
    kunciKodePg: 'C',
    kunciText: 'Kunci jawaban: C.',
    kunciTeksReviu: 'C'
  },
  {
    nomorAsli: 29,
    tipe: 'isian',
    bacaanJudul: 'Keliling Persegi dan Persegi Panjang',
    bacaanTeks: [
      'Sebuah persegi memiliki luas 36 cm². Persegi panjang memiliki panjang 12 cm dan lebar 3 cm.'
    ],
    bacaanGambar: './mtk-soal-29.png',
    pertanyaan: 'Kedua bangun memiliki luas yang sama, tetapi keliling persegi panjang lebih besar daripada keliling persegi sebanyak ... cm.',
    placeholderIsian: 'Tuliskan angkanya saja, contoh: 6',
    kunciIsianList: ['6', '6 cm'],
    kunciText: 'Kunci jawaban: 6.',
    kunciTeksReviu: '6'
  },
  {
    nomorAsli: 30,
    tipe: 'pg',
    bacaanJudul: 'Jumlah Buku Perpustakaan SDN Maju Sejahtera',
    bacaanTeks: [
      'Perpustakaan SDN Maju Sejahtera mencatat jumlah buku yang dimiliki oleh empat kelas sebagai berikut: Kelas IV A: 2.450 buku; Kelas IV B: 2.405 buku; Kelas IV C: 2.540 buku; Kelas IV D: 2.504 buku.'
    ],
    bacaanGambar: './mtk-soal-30.png',
    pertanyaan: 'Urutan jumlah buku dari yang terkecil ke terbesar adalah ....',
    opsi: [
      { kode: 'A', teks: '2.540, 2.504, 2.450, 2.405' },
      { kode: 'B', teks: '2.405, 2.450, 2.504, 2.540' },
      { kode: 'C', teks: '2.450, 2.405, 2.540, 2.504' },
      { kode: 'D', teks: '2.405, 2.504, 2.450, 2.540' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B.',
    kunciTeksReviu: 'B'
  }
]

const MAPEL_TERSEDIA = [
  'Bahasa Indonesia - SD Sederajat (Paket 1)',
  'Matematika - SD Sederajat (Paket 1)'
]

const daftarMapel = [
  'Matematika - SD Sederajat (Paket 1)',
  'Matematika - SD Sederajat (Paket 2)',
  'Bahasa Indonesia - SD Sederajat (Paket 1)',
  'Bahasa Indonesia - SD Sederajat (Paket 2)',
  'Bahasa Inggris - SD Sederajat (Paket 1)',
  'Bahasa Inggris - SD Sederajat (Paket 2)'
]

function susunSoalBerdasarkanMapel(namaMapel: string): DataSoal[] {
  // PENGACAKAN KELOMPOK BACAAN BAHASA INDONESIA PAKET 1 (TIDAK DIUBAH)
  if (namaMapel === 'Bahasa Indonesia - SD Sederajat (Paket 1)') {
    const k1 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli >= 1 && s.nomorAsli <= 4).sort(() => Math.random() - 0.5)
    const k2 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli >= 5 && s.nomorAsli <= 6).sort(() => Math.random() - 0.5)
    const k3 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli >= 7 && s.nomorAsli <= 8).sort(() => Math.random() - 0.5)
    const k4 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli >= 9 && s.nomorAsli <= 10).sort(() => Math.random() - 0.5)
    const k5 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli >= 11 && s.nomorAsli <= 12).sort(() => Math.random() - 0.5)
    const k13 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli === 13)
    const k14 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli === 14)
    const k6 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli >= 15 && s.nomorAsli <= 19).sort(() => Math.random() - 0.5)
    const k20 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli === 20)
    const k7 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli >= 21 && s.nomorAsli <= 25).sort(() => Math.random() - 0.5)
    const k8 = BANK_SOAL_BINDO_PAKET_1.filter(s => s.nomorAsli >= 26 && s.nomorAsli <= 30).sort(() => Math.random() - 0.5)

    return [
      ...k1, ...k2, ...k3, ...k4, ...k5, ...k13, ...k14, ...k6, ...k20, ...k7, ...k8
    ].map((item, index) => ({
      ...item,
      nomor: index + 1
    }))
  }

  // MATEMATIKA PAKET 1 (30 SOAL BERURUTAN SESUAI NASKAH PDF)
  if (namaMapel === 'Matematika - SD Sederajat (Paket 1)') {
    return BANK_SOAL_MATEMATIKA_PAKET_1.map((item, index) => ({
      ...item,
      nomor: index + 1
    }))
  }

  return []
}

function App() {
  const [halaman, setHalaman] = useState<'awal' | 'login' | 'konfirmasi' | 'konfirmasiTes' | 'ujian' | 'konfirmasiSelesai' | 'reviu'>('awal')
  const [sesiKey, setSesiKey] = useState(0)
  const [sedangMengirim, setSedangMengirim] = useState(false)

  const [jenjang, setJenjang] = useState('SD/MI/Sederajat')
  const [jenis, setJenis] = useState('Mata Pelajaran Wajib')
  const [mapel, setMapel] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [namaLembaga, setNamaLembaga] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [namaPeserta, setNamaPeserta] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [hari, setHari] = useState('')
  const [bulan, setBulan] = useState('')
  const [tahun, setTahun] = useState('')

  const [tokenInput, setTokenInput] = useState('')
  const [token, setToken] = useState(buatToken())
  const [logoError, setLogoError] = useState(false)

  // DATA UJIAN & BANK SOAL DINAMIS
  const [bankSoalAktif, setBankSoalAktif] = useState<DataSoal[]>([])
  const [nomorAktif, setNomorAktif] = useState(1)
  const [jawaban, setJawaban] = useState<Jawaban>({})
  const [ragu, setRagu] = useState<number[]>([])
  const [sisaWaktu, setSisaWaktu] = useState(75 * 60)
  const [lihatDaftar, setLihatDaftar] = useState(false)
  const [lihatInfo, setLihatInfo] = useState(false)
  const [ukuranFont, setUkuranFont] = useState(16)

  const [waktuTes] = useState(() =>
    new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  )

  const jenjangValid = jenjang === 'SD/MI/Sederajat'
  const jenisValid = jenjangValid && jenis === 'Mata Pelajaran Wajib'
  const mapelValid = jenisValid && MAPEL_TERSEDIA.includes(mapel)

  const identitasPeserta = `${username} - PESERTA SAS 1`

  const keluarKeHalamanAwal = () => {
    setJenjang('SD/MI/Sederajat')
    setJenis('Mata Pelajaran Wajib')
    setMapel('')

    setUsername('')
    setPassword('')
    setNamaLembaga('')
    setShowPassword(false)

    setNamaPeserta('')
    setJenisKelamin('')
    setHari('')
    setBulan('')
    setTahun('')

    setTokenInput('')
    setToken(buatToken())

    setBankSoalAktif([])
    setNomorAktif(1)
    setJawaban({})
    setRagu([])
    setSisaWaktu(75 * 60)
    setLihatDaftar(false)
    setLihatInfo(false)
    setUkuranFont(16)
    setSedangMengirim(false)

    setSesiKey(k => k + 1)
    setHalaman('awal')
  }

  // FUNGSI HITUNG NILAI SKALA 100 DENGAN PENILAIAN PARSIAL & KIRIM KE GOOGLE SHEETS
  const kirimNilaiKeGuru = async () => {
    if (sedangMengirim) return
    setSedangMengirim(true)

    let totalPoinMentah = 0
    const maxPoinTotal = Math.max(bankSoalAktif.length, 1)

    bankSoalAktif.forEach(soal => {
      const jawabSiswa = jawaban[soal.nomor]
      if (!jawabSiswa) return

      // 1. PILIHAN GANDA (PG)
      if (soal.tipe === 'pg') {
        if (soal.kunciKodePg) {
          if (jawabSiswa === soal.kunciKodePg) totalPoinMentah += 1
        } else {
          const opsiPilih = soal.opsi?.find(o => o.kode === jawabSiswa)
          if (
            (opsiPilih && soal.kunciTeksReviu && opsiPilih.teks.toLowerCase().includes(soal.kunciTeksReviu.toLowerCase().substring(0, 15))) ||
            jawabSiswa === soal.kunciTeksReviu
          ) {
            totalPoinMentah += 1
          }
        }
      }
      // 2. PILIHAN GANDA KOMPLEKS (PGK) - Penilaian Parsial
      else if (soal.tipe === 'pgk' && Array.isArray(jawabSiswa)) {
        const kodeBenarList = soal.kunciKodePgk
          ? soal.kunciKodePgk
          : (soal.opsi
              ?.filter(o => soal.kunciTeksReviu?.toLowerCase().includes(o.teks.toLowerCase().substring(0, 10)))
              .map(o => o.kode) || [])

        const totalBenarSeharusnya = kodeBenarList.length > 0 ? kodeBenarList.length : 1
        let benarDipilih = 0
        let salahDipilih = 0

        jawabSiswa.forEach((kode: string) => {
          if (kodeBenarList.includes(kode)) benarDipilih += 1
          else salahDipilih += 1
        })

        const skorParsial = Math.max(0, (benarDipilih - salahDipilih * 0.5) / totalBenarSeharusnya)
        totalPoinMentah += skorParsial
      }
      // 3. TABEL & MENJODOHKAN - Penilaian Parsial per Baris
      else if ((soal.tipe === 'tabel' || soal.tipe === 'jodoh') && typeof jawabSiswa === 'object') {
        const jumlahItem = soal.barisTabel?.length || soal.kolomKiri?.length || 1
        if (soal.kunciTabel && Array.isArray(soal.kunciTabel)) {
          let itemBenar = 0
          soal.kunciTabel.forEach((kunciBaris, idx) => {
            const pilihanBaris = jawabSiswa[idx + 1]
            if (pilihanBaris && String(pilihanBaris).trim().toLowerCase() === String(kunciBaris).trim().toLowerCase()) {
              itemBenar += 1
            }
          })
          totalPoinMentah += itemBenar / jumlahItem
        } else {
          const itemTerisi = Object.keys(jawabSiswa).length
          totalPoinMentah += itemTerisi / jumlahItem
        }
      }
      // 4. ISIAN SINGKAT & URAIAN
      else if (soal.tipe === 'isian' || soal.tipe === 'uraian') {
        if (typeof jawabSiswa === 'string' && jawabSiswa.trim().length > 0) {
          if (soal.kunciIsianList && soal.kunciIsianList.length > 0) {
            const bersih = jawabSiswa.trim().toLowerCase()
            const cocok = soal.kunciIsianList.some(k => bersih.includes(k.toLowerCase()))
            if (cocok) totalPoinMentah += 1
          } else {
            totalPoinMentah += 1
          }
        }
      }
    })

    const nilaiSkala100 = Math.round((totalPoinMentah / maxPoinTotal) * 100)

    const payload = {
      namaPeserta: namaPeserta.trim(),
      username: username.trim(),
      namaLembaga: namaLembaga.trim(),
      mapel: mapel,
      skor: nilaiSkala100,
      jawaban: jawaban
    }

    const URL_APPS_SCRIPT = 'https://script.google.com/macros/s/AKfycbxRuxEKvnSRtweKC0TLYWqk12P1tfsCRVp6vTKX7yssZxc7VsUED2gMq7j1q88ffii1dA/exec'

    try {
      await fetch(URL_APPS_SCRIPT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } catch (error) {
      console.error('Gagal mengirim nilai:', error)
    } finally {
      setSedangMengirim(false)
      setHalaman('reviu')
    }
  }

  useEffect(() => {
    if (halaman !== 'ujian') return

    const interval = window.setInterval(() => {
      setSisaWaktu(waktu => {
        if (waktu <= 1) {
          window.clearInterval(interval)
          setHalaman('konfirmasiSelesai')
          return 0
        }
        return waktu - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [halaman])

  const formatWaktu = (detik: number) => {
    const menit = Math.floor(detik / 60)
    const sisaDetik = detik % 60
    return `${String(menit).padStart(2, '0')}:${String(sisaDetik).padStart(2, '0')}`
  }

  const mulaiSimulasi = () => {
    if (!mapelValid) {
      alert('Pilihan kosong atau tidak tersedia untuk soal saat ini.')
      return
    }
    setHalaman('login')
  }

  const loginPeserta = () => {
    if (!username.trim() || !password.trim() || !namaLembaga.trim()) {
      alert('Username, password, dan nama lembaga wajib diisi!')
      return
    }
    setHalaman('konfirmasi')
  }

  const refreshToken = () => {
    setToken(buatToken())
    setTokenInput('')
  }

  const submitKonfirmasi = () => {
    if (
      !namaPeserta.trim() ||
      !jenisKelamin ||
      !hari ||
      !bulan ||
      !tahun ||
      !tokenInput.trim()
    ) {
      alert('Mohon lengkapi seluruh data peserta!')
      return
    }

    if (tokenInput.trim().toUpperCase() !== token) {
      alert('Token salah. Silakan periksa kembali!')
      return
    }

    const bankSoalFinal = susunSoalBerdasarkanMapel(mapel)
    if (bankSoalFinal.length === 0) {
      alert('Soal belum tersedia untuk mata pelajaran ini.')
      return
    }

    setBankSoalAktif(bankSoalFinal)
    setHalaman('konfirmasiTes')
  }

  const mulaiUjian = () => {
    setJawaban({})
    setRagu([])
    setNomorAktif(1)
    setSisaWaktu(75 * 60)
    setLihatDaftar(false)
    setLihatInfo(false)
    setHalaman('ujian')
  }

  const pilihJawaban = (nomorTampil: number, nilai: any) => {
    setJawaban((lama: Jawaban) => ({
      ...lama,
      [nomorTampil]: nilai
    }))
  }

  const pilihJawabanKompleks = (nomorTampil: number, nilai: string) => {
    const lama: string[] = jawaban[nomorTampil] || []
    const baru = lama.includes(nilai)
      ? lama.filter(item => item !== nilai)
      : [...lama, nilai]
    pilihJawaban(nomorTampil, baru)
  }

  const pilihBaris = (nomorTampil: number, baris: number, nilai: string) => {
    const lama = jawaban[nomorTampil] || {}
    pilihJawaban(nomorTampil, {
      ...lama,
      [baris]: nilai
    })
  }

  const tandaiRagu = () => {
    setRagu(lama =>
      lama.includes(nomorAktif)
        ? lama.filter(n => n !== nomorAktif)
        : [...lama, nomorAktif]
    )
  }

  const LogoTutWuri = () => (
    <div className="pus-logo">
      {!logoError ? (
        <img
          src="logo-tutwuri.png"
          alt="Logo Tut Wuri Handayani"
          onError={() => setLogoError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <span>🎓</span>
      )}
    </div>
  )

  const labelPesertaKanan = namaPeserta.trim()
    ? `${namaPeserta.trim()} - PESERTA SAS 1`
    : username.trim()
      ? `${username.trim()} - PESERTA SAS 1`
      : ''

  const Header = ({ peserta = false, reviu = false }: { peserta?: boolean; reviu?: boolean }) => (
    <header
      className={`anbk-header ${peserta ? 'header-peserta-mode' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
        padding: '0 3.5%',
        minHeight: '96px',
        boxSizing: 'border-box'
      }}
    >
      <div className="anbk-brand">
        <LogoTutWuri />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.4 }}>
          <strong>PUSMENDIK</strong>
          <small>APLIKASI TKA - SUMATIF AKHIR SEMESTER 1</small>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#ffffff' }}>
        {reviu && (
          <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>Reviu Hasil Simulasi</span>
        )}
        {peserta && labelPesertaKanan && (
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#ffffff' }}>
            {labelPesertaKanan}
          </span>
        )}
        <span
          title="Simulasi TKA"
          style={{
            background: '#60a5fa',
            borderRadius: '6px',
            width: '32px',
            height: '32px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '17px',
            lineHeight: 1
          }}
        >
          🎓
        </span>
      </div>
    </header>
  )

  // 1. HALAMAN AWAL
  if (halaman === 'awal') {
    return (
      <div key={`awal-${sesiKey}`} className="awal-page">
        <header className="awal-header">
          <div className="awal-brand">
            <LogoTutWuri />
            <div>
              <strong>PUSMENDIK</strong>
              <small>APLIKASI Sumatif Akhir Semester 1 (SAS 1)</small>
            </div>
          </div>
        </header>

        <main className="awal-main">
          <div className="awal-card">
            <div className="awal-icon">🎓</div>
            <h1>Sumatif Akhir Semester 1 (SAS 1)</h1>
            <p className="awal-subtitle">Pilih jenjang dan mata pelajaran untuk memulai simulasi</p>

            <div className="awal-group">
              <label>📚 &nbsp;Jenjang Pendidikan:</label>
              <select
                value={jenjang}
                onChange={e => {
                  setJenjang(e.target.value)
                  setMapel('')
                }}
              >
                <option value="SD/MI/Sederajat">SD/MI/Sederajat</option>
                <option value="SMP/MTs/Sederajat">SMP/MTs/Sederajat</option>
                <option value="SMA/MA/SMK/MAK/Sederajat">SMA/MA/SMK/MAK/Sederajat</option>
              </select>
              {!jenjangValid && (
                <div style={{ marginTop: '6px', color: '#64748b', fontSize: '13px' }}>
                  (Kosong / tidak tersedia)
                </div>
              )}
            </div>

            <div className="awal-group">
              <label>▣ &nbsp;Jenis Mata Pelajaran:</label>
              <select
                value={jenis}
                onChange={e => {
                  setJenis(e.target.value)
                  setMapel('')
                }}
              >
                <option value="Mata Pelajaran Wajib">Mata Pelajaran Wajib</option>
                <option value="Mata Pelajaran Pilihan">Mata Pelajaran Pilihan</option>
              </select>
              {jenjangValid && !jenisValid && (
                <div style={{ marginTop: '6px', color: '#64748b', fontSize: '13px' }}>
                  (Kosong / tidak tersedia)
                </div>
              )}
            </div>

            <div className="awal-group">
              <label>📖 &nbsp;Mata Pelajaran:</label>
              <select value={mapel} onChange={e => setMapel(e.target.value)}>
                <option value="">Pilih mata pelajaran...</option>
                {daftarMapel.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {jenisValid && mapel !== '' && !mapelValid && (
                <div style={{ marginTop: '6px', color: '#64748b', fontSize: '13px' }}>
                  (Kosong / belum tersedia)
                </div>
              )}
            </div>

            <button className="awal-button" onClick={mulaiSimulasi}>
              ▶ &nbsp; Mulai Ujian
            </button>
          </div>

          <div className="awal-copyright">Copyright © 2026 Pusmendik. All rights reserved.</div>
        </main>
      </div>
    )
  }

  // 2. HALAMAN LOGIN
  if (halaman === 'login') {
    return (
      <div key={`login-${sesiKey}`} className="login-page">
        <Header />
        <main className="login-main">
          <form
            className="login-card"
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault()
              loginPeserta()
            }}
          >
            <h3>Selamat Datang</h3>
            <p>Silakan login dengan menggunakan username dan password yang anda miliki</p>

            <div className="login-field">
              <span>👤</span>
              <input
                type="text"
                name={`tka_user_${sesiKey}`}
                autoComplete="off"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="login-field">
              <span>🔒</span>
              <input
                type="text"
                name={`tka_kode_akses_${sesiKey}`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                data-form-type="other"
                data-lpignore="true"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={
                  {
                    WebkitTextSecurity: showPassword ? 'none' : 'disc',
                    textSecurity: showPassword ? 'none' : 'disc'
                  } as any
                }
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '◉'}
              </button>
            </div>

            <div className="login-field">
              <span>🏫</span>
              <input
                type="text"
                name={`tka_lembaga_${sesiKey}`}
                autoComplete="off"
                placeholder="Nama Lembaga"
                value={namaLembaga}
                onChange={e => setNamaLembaga(e.target.value)}
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </main>
      </div>
    )
  }

  // 3. HALAMAN KONFIRMASI DATA PESERTA
  if (halaman === 'konfirmasi') {
    return (
      <div key={`konfirmasi-${sesiKey}`} className="konfirmasi-page">
        <Header peserta />

        <main className="konfirmasi-layout">
          <section className="token-card">
            <div className="token-content">
              <span>Token :</span>
              <strong>{token}</strong>
              <button type="button" onClick={refreshToken}>Refresh</button>
            </div>
          </section>

          <section className="data-card">
            <div className="data-content">
              <h2>Konfirmasi data Peserta</h2>

              <div className="data-group">
                <label>Username</label>
                <div className="readonly-value">{username}</div>
              </div>

              <div className="data-group">
                <label>Nama Peserta</label>
                <div className="readonly-value">{identitasPeserta}</div>
              </div>

              <div className="data-group">
                <label>Nama Lembaga</label>
                <div className="readonly-value">{namaLembaga}</div>
              </div>

              <div className="data-group">
                <label>Jenis Kelamin</label>
                <select
                  value={jenisKelamin}
                  onChange={e => setJenisKelamin(e.target.value)}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="data-group">
                <label>Mata Ujian</label>
                <div className="readonly-value">{mapel}</div>
              </div>

              <div className="data-group">
                <label>Nama Peserta</label>
                <input
                  type="text"
                  name={`tka_nama_${sesiKey}`}
                  autoComplete="off"
                  placeholder="Ketikkan Nama Peserta"
                  value={namaPeserta}
                  onChange={e => setNamaPeserta(e.target.value)}
                />
              </div>

              <div className="data-group">
                <label>Tanggal Lahir</label>
                <div className="tanggal-row">
                  <select value={hari} onChange={e => setHari(e.target.value)}>
                    <option value="">Hari</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>

                  <select value={bulan} onChange={e => setBulan(e.target.value)}>
                    <option value="">Bulan</option>
                    {[
                      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                    ].map((item, i) => (
                      <option key={item} value={i + 1}>{item}</option>
                    ))}
                  </select>

                  <select value={tahun} onChange={e => setTahun(e.target.value)}>
                    <option value="">Tahun</option>
                    {Array.from({ length: 40 }, (_, i) => (
                      <option key={i} value={2026 - i}>{2026 - i}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="data-group token-input-group">
                <label>Token</label>
                <input
                  type="text"
                  name={`tka_token_${sesiKey}`}
                  autoComplete="off"
                  placeholder="Ketikkan token di sini"
                  value={tokenInput}
                  onChange={e => setTokenInput(e.target.value.toUpperCase())}
                />
              </div>

              <button type="button" className="submit-data" onClick={submitKonfirmasi}>
                Submit
              </button>
            </div>
          </section>
        </main>
      </div>
    )
  }

  // 4. HALAMAN KONFIRMASI TES
  if (halaman === 'konfirmasiTes') {
    return (
      <div className="login-page">
        <Header peserta />
        <main className="tes-main">
          <section className="tes-card">
            <h2>Konfirmasi Tes</h2>
            <div className="tes-group">
              <label>Nama Tes</label>
              <div>{mapel}</div>
            </div>
            <div className="tes-group">
              <label>Status Tes</label>
              <div>Tes Baru</div>
            </div>
            <div className="tes-group">
              <label>Waktu Tes</label>
              <div>{waktuTes}</div>
            </div>
            <div className="tes-group">
              <label>Alokasi Waktu Tes</label>
              <div>75 Menit</div>
            </div>
            <button className="login-button" onClick={mulaiUjian}>
              Mulai
            </button>
          </section>
        </main>
      </div>
    )
  }

  // 5. POP-UP KONFIRMASI SELESAI
  if (halaman === 'konfirmasiSelesai') {
    return (
      <div className="login-page" style={{ position: 'relative' }}>
        <Header peserta />
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#ffffff',
            padding: '32px',
            borderRadius: '16px',
            width: '450px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#1e293b' }}>Konfirmasi Tes</h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
              Terimakasih telah berpartisipasi dalam tes ini. Silahkan tekan tombol <span style={{ background: '#dc2626', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>SELESAI TES</span> untuk mengakhiri tes. Atau tekan tombol <span style={{ background: '#059669', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>KEMBALI</span> untuk kembali ke halaman tes.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start' }}>
              <button
                type="button"
                disabled={sedangMengirim}
                onClick={kirimNilaiKeGuru}
                style={{
                  background: sedangMengirim ? '#9ca3af' : '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: sedangMengirim ? 'not-allowed' : 'pointer'
                }}
              >
                {sedangMengirim ? 'MENGIRIM...' : 'SELESAI TES'}
              </button>
              <button
                type="button"
                disabled={sedangMengirim}
                onClick={() => setHalaman('ujian')}
                style={{
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: sedangMengirim ? 'not-allowed' : 'pointer'
                }}
              >
                KEMBALI
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 6. REVIU HASIL SIMULASI
  if (halaman === 'reviu') {
    const jumlahSoalReviu = bankSoalAktif.length

    return (
      <div className="login-page" style={{ background: '#2563eb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header peserta reviu />

        <main style={{ flex: 1, padding: '30px 5%' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '30px',
            maxWidth: '1100px',
            margin: '0 auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                background: '#0284c7',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
                color: '#fff',
                fontSize: '20px'
              }}>
                📈
              </div>
              <h2 style={{ margin: 0, fontSize: '22px', color: '#1e293b' }}>Reviu Hasil Simulasi</h2>
              <div style={{
                display: 'inline-block',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '20px',
                padding: '6px 16px',
                marginTop: '10px',
                fontSize: '13px',
                color: '#334155'
              }}>
                📖 &nbsp;{mapel || 'Bahasa Indonesia - SD Sederajat (Paket 1)'}
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 1fr',
              background: '#3b82f6',
              color: '#ffffff',
              padding: '12px 16px',
              borderRadius: '8px 8px 0 0',
              fontWeight: 600,
              fontSize: '14px'
            }}>
              <div>No.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>👤 Jawaban Anda</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>🔑 Kunci Jawaban</div>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 8px 8px', marginBottom: '30px' }}>
              {bankSoalAktif.map(soal => {
                const jawabSiswa = jawaban[soal.nomor]
                let teksJawabanSiswa = '-'

                if (jawabSiswa) {
                  if (soal.tipe === 'pg') {
                    const pilihanObj = soal.opsi?.find(o => o.kode === jawabSiswa)
                    teksJawabanSiswa = pilihanObj ? pilihanObj.teks : jawabSiswa
                  } else if (soal.tipe === 'pgk' && Array.isArray(jawabSiswa)) {
                    teksJawabanSiswa = jawabSiswa.map(kode => {
                      const o = soal.opsi?.find(item => item.kode === kode)
                      return o ? o.teks : kode
                    }).join(', ')
                  } else if (typeof jawabSiswa === 'string') {
                    teksJawabanSiswa = jawabSiswa
                  } else if (Array.isArray(jawabSiswa)) {
                    teksJawabanSiswa = jawabSiswa.join(', ')
                  } else if (typeof jawabSiswa === 'object') {
                    teksJawabanSiswa = Object.entries(jawabSiswa)
                      .map(([k, v]) => `${k} (${v})`)
                      .join(', ')
                  }
                }

                return (
                  <div key={soal.nomor} style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 1fr',
                    padding: '16px',
                    borderBottom: '1px solid #f1f5f9',
                    alignItems: 'center',
                    background: soal.nomor % 2 === 0 ? '#fafafa' : '#ffffff'
                  }}>
                    <div style={{ fontWeight: 600, color: '#334155' }}>
                      No. {soal.nomor} <span style={{ fontSize: '11px', color: '#64748b' }}>(Asli: {soal.nomorAsli})</span>
                    </div>
                    <div style={{ color: '#0f172a', paddingRight: '12px' }}>
                      <span style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '8px', display: 'block' }}>
                        {teksJawabanSiswa}
                      </span>
                    </div>
                    <div style={{ color: '#047857' }}>
                      <span style={{ borderLeft: '3px solid #10b981', paddingLeft: '8px', display: 'block' }}>
                        {soal.kunciTeksReviu || soal.kunciText}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px 24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  background: '#1e3a8a',
                  color: '#fff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  📋
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '16px', color: '#1e293b' }}>Total Soal</strong>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{jumlahSoalReviu} Pertanyaan</span>
                </div>
              </div>

              <button
                type="button"
                onClick={keluarKeHalamanAwal}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🚪 &nbsp;Keluar
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // 7. HALAMAN UJIAN
  const daftarNomorAktif = Array.from({ length: bankSoalAktif.length || 1 }, (_, i) => i + 1)
  const soalAktif = bankSoalAktif[nomorAktif - 1] || bankSoalAktif[0]
  const isBindo = mapel === 'Bahasa Indonesia - SD Sederajat (Paket 1)'
  const isTargetGambarBesar = soalAktif
    ? (isBindo ? [1, 2, 3, 4, 13].includes(soalAktif.nomorAsli) : Boolean(soalAktif.bacaanGambar))
    : false

  return (
    <div className="login-page">
      <Header peserta />

      <main className="lembar-ujian">
        <div className="ujian-top">
          <div className="judul-soal-area">
            <strong>Soal nomor {nomorAktif}</strong>

            <div className="pengatur-font">
              <span>Ukuran font soal:</span>
              <button onClick={() => setUkuranFont(14)}>A</button>
              <button onClick={() => setUkuranFont(16)}>A</button>
              <button onClick={() => setUkuranFont(20)}>A</button>
            </div>
          </div>

          <div className="ujian-tools">
            <button onClick={() => setLihatInfo(!lihatInfo)}>INFORMASI SOAL</button>

            <span className={sisaWaktu < 300 ? 'timer-warning' : ''}>
              Sisa Waktu : <strong>{formatWaktu(sisaWaktu)}</strong>
            </span>

            <button onClick={() => setLihatDaftar(!lihatDaftar)}>Daftar Soal ▦</button>
          </div>
        </div>

        {lihatInfo && (
          <div className="info-soal">
            <strong>Informasi Soal</strong>
            <p>Bacalah cerita dengan cermat. Jawablah setiap soal sesuai petunjuk. Periksa kembali jawaban sebelum mengakhiri tes.</p>
            <button onClick={() => setLihatInfo(false)}>Tutup</button>
          </div>
        )}

        {lihatDaftar && (
          <div className="daftar-soal-panel">
            <div className="daftar-soal-header">
              <strong>Daftar Soal</strong>
              <button className="tutup-daftar" onClick={() => setLihatDaftar(false)}>×</button>
            </div>

            <div className="daftar-soal-grid">
              {daftarNomorAktif.map(n => (
                <button
                  key={n}
                  className={`
                    ${nomorAktif === n ? 'aktif' : ''}
                    ${jawaban[n] !== undefined ? 'terjawaban' : ''}
                    ${ragu.includes(n) ? 'ditandai-ragu' : ''}
                  `}
                  onClick={() => {
                    setNomorAktif(n)
                    setLihatDaftar(false)
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="ujian-mapel">{mapel}</div>

        {/* KOTAK PUTIH UTAMA */}
        {soalAktif && (
          <div className="area-soal">
            {/* KOLOM KIRI: JUDUL DESKRIPSI -> TEKS DESKRIPSI -> GAMBAR ILUSTRASI */}
            <div
              className="bacaan-soal"
              style={{
                fontSize: `${ukuranFont}px`,
                height: '440px',
                maxHeight: '440px',
                overflowY: 'auto',
                paddingRight: '12px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch'
              }}
            >
              {soalAktif.bacaanJudul && !(isBindo && [1, 2, 3, 4].includes(soalAktif.nomorAsli)) && (
                <h3 style={{ marginTop: 0, marginBottom: '12px', textAlign: 'center', color: '#1e293b', width: '100%' }}>
                  {soalAktif.bacaanJudul}
                </h3>
              )}

              {soalAktif.bacaanTeks && (
                <div style={{ textAlign: 'left', lineHeight: 1.7, marginBottom: '12px' }}>
                  {soalAktif.bacaanTeks.map((paragraf, idx) => (
                    <p key={idx} style={{ marginBottom: '10px', textIndent: isBindo ? '2em' : '0' }}>
                      {paragraf}
                    </p>
                  ))}
                </div>
              )}

              {soalAktif.bacaanGambar && (
                <img
                  src={soalAktif.bacaanGambar}
                  alt="Ilustrasi Soal"
                  onError={e => {
                    ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                  style={{
                    width: '100%',
                    maxHeight: isTargetGambarBesar ? '360px' : '260px',
                    borderRadius: '8px',
                    objectFit: 'contain'
                  }}
                />
              )}
            </div>

            {/* KOLOM KANAN */}
            <div
              className="pertanyaan-soal"
              style={{
                fontSize: `${ukuranFont}px`,
                height: '440px',
                maxHeight: '440px',
                overflowY: 'auto',
                paddingRight: '12px',
                boxSizing: 'border-box'
              }}
            >
              <p className="teks-pertanyaan">{soalAktif.pertanyaan}</p>

              {soalAktif.tipe === 'pgk' && (
                <p className="petunjuk-soal" style={{ color: '#2563eb', fontWeight: 500, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔗</span> {soalAktif.petunjuk || 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.'}
                </p>
              )}

              {soalAktif.petunjuk && soalAktif.tipe !== 'pgk' && (
                <p className="petunjuk-soal" style={{ color: '#2563eb', fontWeight: 500, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🔗</span> {soalAktif.petunjuk}
                </p>
              )}

              {/* 1. PILIHAN GANDA */}
              {soalAktif.tipe === 'pg' &&
                soalAktif.opsi?.map(item => (
                  <label className="pilihan-jawaban" key={item.kode} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '10px' }}>
                    <input
                      type="radio"
                      name={`soal-${soalAktif.nomor}`}
                      checked={jawaban[soalAktif.nomor] === item.kode}
                      onChange={() => pilihJawaban(soalAktif.nomor, item.kode)}
                    />
                    <span>{item.teks}</span>
                  </label>
                ))}

              {/* 2. PILIHAN GANDA KOMPLEKS */}
              {soalAktif.tipe === 'pgk' &&
                soalAktif.opsi?.map(item => (
                  <label className="pilihan-jawaban pilihan-kompleks" key={item.kode} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '10px' }}>
                    <input
                      type="checkbox"
                      checked={(jawaban[soalAktif.nomor] || []).includes(item.kode)}
                      onChange={() => pilihJawabanKompleks(soalAktif.nomor, item.kode)}
                    />
                    <span>{item.teks}</span>
                  </label>
                ))}

              {/* 3. TABEL */}
              {soalAktif.tipe === 'tabel' &&
                soalAktif.kolomTabel &&
                soalAktif.barisTabel && (
                  <div className="tabel-jawaban">
                    <div className="tabel-header">
                      <span>No.</span>
                      <span>Pernyataan</span>
                      <span>{soalAktif.kolomTabel[0]}</span>
                      <span>{soalAktif.kolomTabel[1]}</span>
                    </div>

                    {soalAktif.barisTabel.map((teks, i) => {
                      const kolom1 = soalAktif.kolomTabel![0]
                      const kolom2 = soalAktif.kolomTabel![1]

                      return (
                        <div className="tabel-baris" key={i}>
                          <span>{i + 1}</span>
                          <span>{teks}</span>
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

              {/* 4. MENJODOHKAN */}
              {soalAktif.tipe === 'jodoh' &&
                soalAktif.kolomKiri &&
                soalAktif.kolomKanan && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                    <div
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '12px 16px'
                      }}
                    >
                      <strong style={{ color: '#1e293b' }}>Pilihan Kolom B (Target Pasangan):</strong>
                      <ul style={{ margin: '8px 0 0 18px', padding: 0, lineHeight: 1.6 }}>
                        {soalAktif.kolomKanan.map(kanan => (
                          <li key={kanan.kode} style={{ color: '#334155' }}>
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
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                          }}
                        >
                          <span style={{ flex: 1, fontWeight: 500, color: '#1e293b' }}>
                            <strong>{kiri.nomor}.</strong> {kiri.teks}
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>Pasangan ➔</span>
                            <select
                              value={jawaban[soalAktif.nomor]?.[kiri.nomor] || ''}
                              onChange={e => pilihBaris(soalAktif.nomor, kiri.nomor, e.target.value)}
                              style={{
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '2px solid #3b82f6',
                                background: '#eff6ff',
                                color: '#1d4ed8',
                                fontWeight: 600,
                                cursor: 'pointer',
                                minWidth: '90px'
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

              {/* 5. ISIAN SINGKAT */}
              {soalAktif.tipe === 'isian' && (
                <input
                  className="isian-jawaban"
                  type="text"
                  placeholder={soalAktif.placeholderIsian || 'Tuliskan jawaban Anda...'}
                  value={jawaban[soalAktif.nomor] || ''}
                  onChange={e => pilihJawaban(soalAktif.nomor, e.target.value)}
                />
              )}

              {/* 6. URAIAN */}
              {soalAktif.tipe === 'uraian' && (
                <textarea
                  className="isian-jawaban"
                  rows={5}
                  style={{ width: '100%', resize: 'vertical', padding: '12px' }}
                  placeholder={soalAktif.placeholderIsian || 'Tuliskan uraian jawaban Anda...'}
                  value={jawaban[soalAktif.nomor] || ''}
                  onChange={e => pilihJawaban(soalAktif.nomor, e.target.value)}
                />
              )}
            </div>
          </div>
        )}

        {/* NAVIGASI SOAL */}
        <div className="navigasi-ujian">
          <button
            className="tombol-sebelumnya"
            disabled={nomorAktif === 1}
            onClick={() => setNomorAktif(n => n - 1)}
          >
            ◀ Soal sebelumnya
          </button>

          <button
            className={`tombol-ragu ${ragu.includes(nomorAktif) ? 'ragu-aktif' : ''}`}
            onClick={tandaiRagu}
          >
            □ {ragu.includes(nomorAktif) ? 'Hapus Ragu-ragu' : 'Ragu-ragu'}
          </button>

          {nomorAktif < daftarNomorAktif.length ? (
            <button
              className="tombol-berikutnya"
              onClick={() => setNomorAktif(n => n + 1)}
            >
              Soal berikutnya ▶
            </button>
          ) : (
            <button
              className="tombol-selesai"
              onClick={() => setHalaman('konfirmasiSelesai')}
            >
              Selesai
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default App