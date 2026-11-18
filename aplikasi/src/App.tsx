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
}

const daftarNomor = Array.from({ length: 30 }, (_, i) => i + 1)

// BACAAN PER KELOMPOK SOAL
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

// BANK SOAL MASTER
const BANK_SOAL_MASTER: Omit<DataSoal, 'nomor'>[] = [
  {
    nomorAsli: 1,
    tipe: 'pg',
    bacaanGambar: '/cerita-sungai-bersih.png',
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
    bacaanGambar: '/cerita-sungai-bersih.png',
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
    bacaanGambar: '/cerita-sungai-bersih.png',
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
    bacaanGambar: '/cerita-sungai-bersih.png',
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
    bacaanGambar: '/komik-aldi.png',
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

function App() {
  const [halaman, setHalaman] = useState<'awal' | 'login' | 'konfirmasi' | 'konfirmasiTes' | 'ujian' | 'konfirmasiSelesai' | 'reviu'>('awal')

  const [jenjang, setJenjang] = useState('SD/MI/Sederajat')
  const [jenis, setJenis] = useState('Mata Pelajaran Wajib')
  const [mapel, setMapel] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const daftarMapel = [
    'Matematika - SD Sederajat (Paket 1)',
    'Matematika - SD Sederajat (Paket 2)',
    'Bahasa Indonesia - SD Sederajat (Paket 1)',
    'Bahasa Indonesia - SD Sederajat (Paket 2)',
    'Bahasa Inggris - SD Sederajat (Paket 1)',
    'Bahasa Inggris - SD Sederajat (Paket 2)'
  ]

  const identitasPeserta = `${username} - PESERTA SAS 1`

  // FUNGSI HITUNG NILAI SKALA 100 & KIRIM KE GOOGLE SHEETS
  const kirimNilaiKeGuru = async () => {
    let totalPoinMentah = 0;
    const maxPoinTotal = 30; // Total 30 soal, dikonversi ke skala 100

    bankSoalAktif.forEach(soal => {
      const jawabSiswa = jawaban[soal.nomor];
      if (!jawabSiswa) return;

      // 1. PILIHAN GANDA (PG)
      if (soal.tipe === 'pg') {
        const opsiPilih = soal.opsi?.find(o => o.kode === jawabSiswa);
        if (
          (opsiPilih && soal.kunciTeksReviu && opsiPilih.teks.toLowerCase().includes(soal.kunciTeksReviu.toLowerCase().substring(0, 15))) ||
          jawabSiswa === soal.kunciTeksReviu
        ) {
          totalPoinMentah += 1;
        }
      } 
      // 2. PILIHAN GANDA KOMPLEKS (PGK) - Penilaian Parsial (Benar sebagian tetap ada nilai)
      else if (soal.tipe === 'pgk' && Array.isArray(jawabSiswa)) {
        const opsiBenarList = soal.opsi?.filter(o => 
          soal.kunciTeksReviu?.toLowerCase().includes(o.teks.toLowerCase().substring(0, 10))
        ) || [];
        const totalBenarSeharusnya = opsiBenarList.length > 0 ? opsiBenarList.length : 1;
        
        let benarDipilih = 0;
        let salahDipilih = 0;
        
        jawabSiswa.forEach((kode: string) => {
          const isBenar = opsiBenarList.some(o => o.kode === kode);
          if (isBenar) benarDipilih += 1;
          else salahDipilih += 1;
        });

        let skorParsial = Math.max(0, (benarDipilih - (salahDipilih * 0.5)) / totalBenarSeharusnya);
        totalPoinMentah += skorParsial;
      }
      // 3. TABEL & MENJODOHKAN (Dinilai proporsional per baris/pasangan)
      else if ((soal.tipe === 'tabel' || soal.tipe === 'jodoh') && typeof jawabSiswa === 'object') {
        const jumlahItem = soal.barisTabel?.length || soal.kolomKiri?.length || 1;
        let itemBenar = 0;
        
        Object.keys(jawabSiswa).forEach(() => {
          itemBenar += 1;
        });

        totalPoinMentah += (itemBenar / jumlahItem);
      }
      // 4. ISIAN SINGKAT & URAIAN
      else if (soal.tipe === 'isian' || soal.tipe === 'uraian') {
        if (typeof jawabSiswa === 'string' && jawabSiswa.trim().length > 0) {
          totalPoinMentah += 1;
        }
      }
    });

    // Konversi total poin ke rentang Nilai Skala 100
    const nilaiSkala100 = Math.round((totalPoinMentah / maxPoinTotal) * 100);

    const payload = {
      namaPeserta: namaPeserta,
      username: username,
      mapel: mapel,
      skor: nilaiSkala100, // Nilai akhir skala 0 - 100
      jawaban: jawaban
    };

    const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbxRuxEKvnSRtweKC0TLYWqk12P1tfsCRVp6vTKX7yssZxc7VsUED2gMq7j1q88ffii1dA/exec";

    try {
      await fetch(URL_APPS_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Gagal mengirim nilai:", error);
    }

    setHalaman('reviu');
  };

  // TIMER UJIAN
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
    if (!mapel) {
      alert('Silakan pilih mata pelajaran terlebih dahulu!')
      return
    }
    setHalaman('login')
  }

  const loginPeserta = () => {
    if (!username.trim() || !password.trim()) {
      alert('Username dan password wajib diisi!')
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

    // PENGACAKAN KELOMPOK BACAAN
    const k1 = BANK_SOAL_MASTER.filter(s => s.nomorAsli >= 1 && s.nomorAsli <= 4).sort(() => Math.random() - 0.5)
    const k2 = BANK_SOAL_MASTER.filter(s => s.nomorAsli >= 5 && s.nomorAsli <= 6).sort(() => Math.random() - 0.5)
    const k3 = BANK_SOAL_MASTER.filter(s => s.nomorAsli >= 7 && s.nomorAsli <= 8).sort(() => Math.random() - 0.5)
    const k4 = BANK_SOAL_MASTER.filter(s => s.nomorAsli >= 9 && s.nomorAsli <= 10).sort(() => Math.random() - 0.5)
    const k5 = BANK_SOAL_MASTER.filter(s => s.nomorAsli >= 11 && s.nomorAsli <= 12).sort(() => Math.random() - 0.5)
    const k13 = BANK_SOAL_MASTER.filter(s => s.nomorAsli === 13)
    const k14 = BANK_SOAL_MASTER.filter(s => s.nomorAsli === 14)
    const k6 = BANK_SOAL_MASTER.filter(s => s.nomorAsli >= 15 && s.nomorAsli <= 19).sort(() => Math.random() - 0.5)
    const k20 = BANK_SOAL_MASTER.filter(s => s.nomorAsli === 20)
    const k7 = BANK_SOAL_MASTER.filter(s => s.nomorAsli >= 21 && s.nomorAsli <= 25).sort(() => Math.random() - 0.5)
    const k8 = BANK_SOAL_MASTER.filter(s => s.nomorAsli >= 26 && s.nomorAsli <= 30).sort(() => Math.random() - 0.5)

    const gabunganAcak = [
      ...k1, ...k2, ...k3, ...k4, ...k5, ...k13, ...k14, ...k6, ...k20, ...k7, ...k8
    ]

    const bankSoalFinal: DataSoal[] = gabunganAcak.map((item, index) => ({
      ...item,
      nomor: index + 1
    }))

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
          src="/logo-tutwuri.png"
          alt="Logo Tut Wuri Handayani"
          onError={() => setLogoError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <span>🎓</span>
      )}
    </div>
  )

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
          <small>APLIKASI ANBK - Simulasi TKA</small>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {reviu && (
          <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>Reviu Hasil Simulasi</span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}>
          <span style={{ fontSize: '14px' }}>a - a</span>
          <div style={{ background: '#ffffff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e3a8a' }}>
            👤
          </div>
        </div>
      </div>
    </header>
  )

  // 1. HALAMAN AWAL
  if (halaman === 'awal') {
    return (
      <div className="awal-page">
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
                <option>SD/MI/Sederajat</option>
                <option>SMP/MTs/Sederajat</option>
                <option>SMA/MA/SMK/MAK/Sederajat</option>
              </select>
            </div>

            <div className="awal-group">
              <label>▣ &nbsp;Jenis Mata Pelajaran:</label>
              <select value={jenis} onChange={e => setJenis(e.target.value)}>
                <option>Mata Pelajaran Wajib</option>
                <option>Mata Pelajaran Pilihan</option>
              </select>
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
            </div>

            <button className="awal-button" onClick={mulaiSimulasi}>
              ▶ &nbsp; Mulai Simulasi
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
      <div className="login-page">
        <Header />
        <main className="login-main">
          <div className="login-card">
            <h3>Selamat Datang</h3>
            <p>Silakan login dengan menggunakan username dan password yang anda miliki</p>

            <div className="login-field">
              <span>👤</span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="login-field">
              <span>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') loginPeserta()
                }}
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '◉'}
              </button>
            </div>

            <button className="login-button" onClick={loginPeserta}>
              Login
            </button>
          </div>
        </main>
      </div>
    )
  }

  // 3. HALAMAN KONFIRMASI DATA PESERTA
  if (halaman === 'konfirmasi') {
    return (
      <div className="konfirmasi-page">
        <Header peserta />

        <main className="konfirmasi-layout">
          <section className="token-card">
            <div className="token-content">
              <span>Token :</span>
              <strong>{token}</strong>
              <button onClick={refreshToken}>Refresh</button>
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
                  placeholder="Ketikkan token di sini"
                  value={tokenInput}
                  onChange={e => setTokenInput(e.target.value.toUpperCase())}
                />
              </div>

              <button className="submit-data" onClick={submitKonfirmasi}>
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
                onClick={kirimNilaiKeGuru}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                SELESAI TES
              </button>
              <button
                onClick={() => setHalaman('ujian')}
                style={{
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
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

            {/* TABEL HEADER */}
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

            {/* DAFTAR 30 SOAL */}
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
                    <div style={{ fontWeight: 600, color: '#334155' }}>No. {soal.nomor} <span style={{ fontSize: '11px', color: '#64748b' }}>(Asli: {soal.nomorAsli})</span></div>
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

            {/* FOOTER REVIU */}
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
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{daftarNomor.length} Pertanyaan</span>
                </div>
              </div>

              <button
                onClick={() => setHalaman('awal')}
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
  const soalAktif = bankSoalAktif[nomorAktif - 1] || bankSoalAktif[0]
  const isTargetGambarBesar = soalAktif ? [1, 2, 3, 4, 13].includes(soalAktif.nomorAsli) : false

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
              {daftarNomor.map(n => (
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
            {/* KOLOM KIRI */}
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
                justifyContent: soalAktif.bacaanGambar && !soalAktif.bacaanTeks ? 'center' : 'flex-start',
                alignItems: soalAktif.bacaanGambar && !soalAktif.bacaanTeks ? 'center' : 'stretch'
              }}
            >
              {soalAktif.bacaanJudul && ![1, 2, 3, 4].includes(soalAktif.nomorAsli) && (
                <h3 style={{ marginTop: 0, marginBottom: '12px', textAlign: 'center', color: '#1e293b', width: '100%' }}>
                  {soalAktif.bacaanJudul}
                </h3>
              )}

              {soalAktif.bacaanTeks && (
                <div style={{ textAlign: 'left', lineHeight: 1.7, marginBottom: '16px' }}>
                  {soalAktif.bacaanTeks.map((paragraf, idx) => (
                    <p key={idx} style={{ marginBottom: '10px', textIndent: '2em' }}>
                      {paragraf}
                    </p>
                  ))}
                </div>
              )}

              {soalAktif.bacaanGambar && (
                <img
                  src={soalAktif.bacaanGambar}
                  alt="Ilustrasi Soal"
                  style={{
                    width: '100%',
                    maxHeight: isTargetGambarBesar ? '415px' : '310px',
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

          {nomorAktif < daftarNomor.length ? (
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