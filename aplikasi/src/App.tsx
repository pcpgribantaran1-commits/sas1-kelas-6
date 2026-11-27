import React, { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

function buatToken() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

function resolveAssetUrl(rawPath?: string): string {
  if (!rawPath) return ''
  if (/^https?:\/\//i.test(rawPath)) return rawPath
  const clean = rawPath.replace(/^\.?\//, '').replace(/^public\//i, '')
  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${clean}`
}

const KEY_ANTREAN_NILAI = 'sas1_kelas6_antrean_nilai_v1'
const KEY_SESI_UJIAN = 'sas1_kelas6_sesi_ujian_v1'
const URL_APPS_SCRIPT =
  'https://script.google.com/macros/s/AKfycbxhp44qsZdQ9FoE96A2FFQFFFMkle8d4rWPKIGcnrGF5PxlomDBLbNWH5n7Qs_sptY/exec'

const NOMOR_BINDO_GAMBAR_SCROLL_PENUH = [20, 24, 26, 29, 30, 31, 32, 33, 34, 35]

function GambarSoal({
  srcRaw,
  alt,
  maxHeight,
  isBindoGambar1to4,
  fullWidthScroll = false,
  expandFullWidth = false,
  nomorAsli,
  isMtk = false
}: {
  srcRaw: string
  alt: string
  maxHeight: string
  isBindoGambar1to4: boolean
  fullWidthScroll?: boolean
  expandFullWidth?: boolean
  nomorAsli?: number
  isMtk?: boolean
}) {
  const [idxKandidat, setIdxKandidat] = useState(0)

  const kandidatUrl = React.useMemo(() => {
    const clean = srcRaw.replace(/^\.?\//, '').replace(/^public\//i, '')
    const base = import.meta.env.BASE_URL || '/'
    const normalizedBase = base.endsWith('/') ? base : `${base}/`
    const stem = clean.replace(/\.[^/.]+$/, '')

    const utama = `${normalizedBase}${clean}`
    const daftar: string[] = [utama]

    if (nomorAsli === 13 && !isMtk) {
      daftar.push(
        `${normalizedBase}bindo6-soal-13.png`,
        `${normalizedBase}bindo6-soal-13.jpg`,
        `${normalizedBase}bindo6-soal-13.webp`,
        `${normalizedBase}bindo6-soal-12.png`
      )
    } else if (nomorAsli === 30 && !isMtk) {
      daftar.push(
        `${normalizedBase}bindo6-soal-30.png`,
        `${normalizedBase}bindo6-soal-30.jpg`,
        `${normalizedBase}bindo6-soal-30.webp`,
        `${normalizedBase}bindo6-soal-29.png`
      )
    } else {
      daftar.push(
        `${normalizedBase}${stem}.png`,
        `${normalizedBase}${stem}.jpg`,
        `${normalizedBase}${stem}.webp`
      )
      if (clean === 'bindo6-soal-10.png') {
        daftar.push(`${normalizedBase}bindo6-soal-11.png`)
      }
    }

    return Array.from(new Set(daftar))
  }, [srcRaw, nomorAsli, isMtk])

  useEffect(() => {
    setIdxKandidat(0)
  }, [srcRaw, nomorAsli, isMtk])

  if (kandidatUrl.length === 0) {
    return null
  }

  const isNomorUtuhBesarScroll = Boolean(
    !isMtk && nomorAsli !== undefined && [20, 29, 30].includes(nomorAsli)
  )

  return (
    <img
      key={`${srcRaw}-${nomorAsli ?? ''}-${isMtk ? 'mtk' : 'lain'}-${idxKandidat}`}
      src={kandidatUrl[idxKandidat]}
      alt={alt}
      loading="eager"
      decoding="sync"
      fetchPriority="high"
      onError={() => {
        if (idxKandidat + 1 < kandidatUrl.length) {
          setIdxKandidat(prev => prev + 1)
        }
      }}
      style={{
        display: 'block',
        width: isNomorUtuhBesarScroll || expandFullWidth ? '100%' : 'auto',
        maxWidth: '100%',
        height: 'auto',
        maxHeight: isNomorUtuhBesarScroll || expandFullWidth ? 'none' : maxHeight,
        borderRadius: isBindoGambar1to4 ? '6px' : '8px',
        objectFit: 'contain',
        objectPosition: 'top center',
        transform: 'none',
        flexShrink: 0,
        margin:
          isNomorUtuhBesarScroll || fullWidthScroll || expandFullWidth
            ? '2px auto 20px auto'
            : '6px auto 8px auto'
      }}
    />
  )
}

function JamAnalogSvg({ jam, menit }: { jam: number; menit: number }) {
  const jam12 = ((jam % 12) + menit / 60) * 30
  const sudutMenit = menit * 6
  const cx = 74
  const cy = 74
  const r = 64

  const radJam = ((jam12 - 90) * Math.PI) / 180
  const radMenit = ((sudutMenit - 90) * Math.PI) / 180

  const jx = cx + 34 * Math.cos(radJam)
  const jy = cy + 34 * Math.sin(radJam)
  const mx = cx + 50 * Math.cos(radMenit)
  const my = cy + 50 * Math.sin(radMenit)

  const angkaJam = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <svg width="148" height="148" viewBox="0 0 148 148" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx={cx} cy={cy} r={r + 4} fill="#1d4ed8" />
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
      {angkaJam.map((angka, idx) => {
        const a = ((idx * 30 - 90) * Math.PI) / 180
        const tx = cx + 48 * Math.cos(a)
        const ty = cy + 48 * Math.sin(a)
        return (
          <text
            key={angka}
            x={tx}
            y={ty + 4.5}
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="700"
            fill="#0f172a"
          >
            {angka}
          </text>
        )
      })}
      <line
        x1={cx}
        y1={cy}
        x2={jx}
        y2={jy}
        stroke="#0f172a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={cy}
        x2={mx}
        y2={my}
        stroke="#dc2626"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="5" fill="#1d4ed8" />
    </svg>
  )
}

function IlustrasiOtomatisMtk({ nomorAsli }: { nomorAsli: number }) {
  if (![30, 33, 34].includes(nomorAsli)) return null

  const boxStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    minHeight: '380px',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    background: '#f8fafc',
    padding: '18px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px'
  }

  switch (nomorAsli) {
    case 30:
      return (
        <div style={boxStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', textAlign: 'center' }}>
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#475569' }}>1 Jam</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#1d4ed8', marginTop: '4px' }}>60 Menit</div>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#475569' }}>Pukul 13.00</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>01.00 Siang</div>
            </div>
          </div>
        </div>
      )

    case 33:
      return (
        <div style={boxStyle}>
          <JamAnalogSvg jam={8} menit={15} />
          <div style={{ fontSize: '13.5px', color: '#0f172a', fontWeight: 600 }}>
            Jarum Pendek → 8 | Jarum Panjang → 3
          </div>
        </div>
      )

    case 34:
      return (
        <div style={boxStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%', textAlign: 'center' }}>
            <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontWeight: 700 }}>Angka 3</div>
              <div style={{ fontWeight: 800, color: '#1d4ed8', marginTop: '4px' }}>15 Menit</div>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontWeight: 700 }}>Angka 6</div>
              <div style={{ fontWeight: 800, color: '#059669', marginTop: '4px' }}>30 Menit</div>
            </div>
            <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontWeight: 700 }}>Angka 9</div>
              <div style={{ fontWeight: 800, color: '#d97706', marginTop: '4px' }}>45 Menit</div>
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}

type Jawaban = {
  [key: number]: any
}

interface PayloadNilai {
  namaPeserta: string
  username: string
  namaLembaga: string
  mapel: string
  skor: number
  jawaban: Jawaban
  waktuKirim?: string
}

function bacaAntreanNilai(): PayloadNilai[] {
  try {
    const raw = localStorage.getItem(KEY_ANTREAN_NILAI)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function simpanAntreanNilai(daftar: PayloadNilai[]) {
  try {
    localStorage.setItem(KEY_ANTREAN_NILAI, JSON.stringify(daftar))
  } catch {
    // abaikan jika storage penuh
  }
}

type TipeSoal = 'pg' | 'pgk' | 'tabel' | 'jodoh' | 'isian' | 'uraian'

interface DataSoal {
  nomorAsli: number
  nomor: number
  tipe: TipeSoal
  bacaanJudul?: string
  bacaanTeks?: string[]
  bacaanList?: string[]
  bacaanTabel?: { headers: string[]; rows: string[][] }
  bacaanTeksBawah?: string[]
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

interface GarisKoordinat {
  nomorKiri: number
  kodeKanan: string
  x1: number
  y1: number
  x2: number
  y2: number
  warna: string
}

const WARNA_GARIS = ['#1d4ed8', '#059669', '#d97706', '#7c3aed', '#db2777']

function PanelMenjodohkanTarikGaris({
  nomorSoal,
  kolomKiri,
  kolomKanan,
  nilaiJawaban,
  onPilihPasangan
}: {
  nomorSoal: number
  kolomKiri: { nomor: number; teks: string }[]
  kolomKanan: { kode: string; teks: string }[]
  nilaiJawaban: Record<number, string> | undefined
  onPilihPasangan: (barisKiri: number, kodeKanan: string) => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const kiriRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const kananRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const pasanganAktif: Record<number, string> = nilaiJawaban || {}

  const [garisTersimpan, setGarisTersimpan] = useState<GarisKoordinat[]>([])
  const [aktifMulai, setAktifMulai] = useState<number | null>(null)
  const [titikAwal, setTitikAwal] = useState<{ x: number; y: number } | null>(null)
  const [titikSekarang, setTitikSekarang] = useState<{ x: number; y: number } | null>(null)
  const [hoverKanan, setHoverKanan] = useState<string | null>(null)

  const hitungUlangGaris = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rectContainer = container.getBoundingClientRect()
    const hasil: GarisKoordinat[] = []

    kolomKiri.forEach((kiri, idx) => {
      const kodeKanan = pasanganAktif[kiri.nomor]
      if (!kodeKanan) return

      const elKiri = kiriRefs.current[kiri.nomor]
      const elKanan = kananRefs.current[kodeKanan]
      if (!elKiri || !elKanan) return

      const rectKiri = elKiri.getBoundingClientRect()
      const rectKanan = elKanan.getBoundingClientRect()

      const x1 = rectKiri.right - rectContainer.left
      const y1 = rectKiri.top + rectKiri.height / 2 - rectContainer.top
      const x2 = rectKanan.left - rectContainer.left
      const y2 = rectKanan.top + rectKanan.height / 2 - rectContainer.top

      hasil.push({
        nomorKiri: kiri.nomor,
        kodeKanan,
        x1,
        y1,
        x2,
        y2,
        warna: WARNA_GARIS[idx % WARNA_GARIS.length]
      })
    })

    setGarisTersimpan(hasil)
  }, [kolomKiri, pasanganAktif])

  useEffect(() => {
    hitungUlangGaris()
    window.addEventListener('resize', hitungUlangGaris)
    return () => window.removeEventListener('resize', hitungUlangGaris)
  }, [hitungUlangGaris, nomorSoal])

  const mulaiTarikDariKiri = (nomorKiri: number, e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const container = containerRef.current
    const elKiri = kiriRefs.current[nomorKiri]
    if (!container || !elKiri) return

    elKiri.setPointerCapture(e.pointerId)
    const rectContainer = container.getBoundingClientRect()
    const rectKiri = elKiri.getBoundingClientRect()

    const startX = rectKiri.right - rectContainer.left
    const startY = rectKiri.top + rectKiri.height / 2 - rectContainer.top

    setAktifMulai(nomorKiri)
    setTitikAwal({ x: startX, y: startY })
    setTitikSekarang({
      x: e.clientX - rectContainer.left,
      y: e.clientY - rectContainer.top
    })
  }

  const gerakPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (aktifMulai === null || !containerRef.current) return
    const rectContainer = containerRef.current.getBoundingClientRect()
    const currX = e.clientX - rectContainer.left
    const currY = e.clientY - rectContainer.top

    setTitikSekarang({ x: currX, y: currY })

    let ditemukan: string | null = null
    for (const kanan of kolomKanan) {
      const elKanan = kananRefs.current[kanan.kode]
      if (!elKanan) continue
      const r = elKanan.getBoundingClientRect()
      if (
        e.clientX >= r.left - 12 &&
        e.clientX <= r.right + 12 &&
        e.clientY >= r.top - 6 &&
        e.clientY <= r.bottom + 6
      ) {
        ditemukan = kanan.kode
        break
      }
    }
    setHoverKanan(ditemukan)
  }

  const lepasPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (aktifMulai === null) return

    let targetKode = hoverKanan
    if (!targetKode) {
      for (const kanan of kolomKanan) {
        const elKanan = kananRefs.current[kanan.kode]
        if (!elKanan) continue
        const r = elKanan.getBoundingClientRect()
        if (
          e.clientX >= r.left - 16 &&
          e.clientX <= r.right + 16 &&
          e.clientY >= r.top - 8 &&
          e.clientY <= r.bottom + 8
        ) {
          targetKode = kanan.kode
          break
        }
      }
    }

    if (targetKode) {
      onPilihPasangan(aktifMulai, targetKode)
    }

    setAktifMulai(null)
    setTitikAwal(null)
    setTitikSekarang(null)
    setHoverKanan(null)
    requestAnimationFrame(hitungUlangGaris)
  }

  const klikItemKiri = (nomorKiri: number) => {
    if (aktifMulai === nomorKiri) {
      setAktifMulai(null)
      setTitikAwal(null)
      setTitikSekarang(null)
      return
    }
    const container = containerRef.current
    const elKiri = kiriRefs.current[nomorKiri]
    if (!container || !elKiri) return
    const rectContainer = container.getBoundingClientRect()
    const rectKiri = elKiri.getBoundingClientRect()

    setAktifMulai(nomorKiri)
    setTitikAwal({
      x: rectKiri.right - rectContainer.left,
      y: rectKiri.top + rectKiri.height / 2 - rectContainer.top
    })
    setTitikSekarang({
      x: rectKiri.right - rectContainer.left + 40,
      y: rectKiri.top + rectKiri.height / 2 - rectContainer.top
    })
  }

  const klikItemKanan = (kodeKanan: string) => {
    if (aktifMulai !== null) {
      onPilihPasangan(aktifMulai, kodeKanan)
      setAktifMulai(null)
      setTitikAwal(null)
      setTitikSekarang(null)
      setHoverKanan(null)
      requestAnimationFrame(hitungUlangGaris)
    }
  }

  const hapusPasanganKiri = (nomorKiri: number, e: React.MouseEvent) => {
    e.stopPropagation()
    onPilihPasangan(nomorKiri, '')
    requestAnimationFrame(hitungUlangGaris)
  }

  const buatPathKurva = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = Math.max(40, Math.abs(x2 - x1) * 0.45)
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
  }

  return (
    <div style={{ marginTop: '10px', userSelect: 'none' }}>
      <div
        style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          color: '#1e40af',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '12.5px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        <span>
          <strong>ⓘ</strong> Tarik garis dari titik di <strong>Kolom A</strong> ke <strong>Kolom B</strong> (atau klik Kolom A lalu klik Kolom B).
        </span>
      </div>

      <div
        ref={containerRef}
        onPointerMove={gerakPointer}
        onPointerUp={lepasPointer}
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr',
          gap: '28px',
          alignItems: 'start'
        }}
      >
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 3,
            overflow: 'visible'
          }}
        >
          {garisTersimpan.map(g => (
            <g key={`${g.nomorKiri}-${g.kodeKanan}`}>
              <path
                d={buatPathKurva(g.x1, g.y1, g.x2, g.y2)}
                fill="none"
                stroke={g.warna}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <circle cx={g.x1} cy={g.y1} r={5} fill={g.warna} />
              <circle cx={g.x2} cy={g.y2} r={5} fill={g.warna} />
            </g>
          ))}

          {aktifMulai !== null && titikAwal && titikSekarang && (
            <g>
              <path
                d={buatPathKurva(titikAwal.x, titikAwal.y, titikSekarang.x, titikSekarang.y)}
                fill="none"
                stroke="#2563eb"
                strokeWidth={3}
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
              <circle cx={titikAwal.x} cy={titikAwal.y} r={6} fill="#2563eb" />
              <circle cx={titikSekarang.x} cy={titikSekarang.y} r={5} fill="#2563eb" />
            </g>
          )}
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              background: '#1d63a5',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '13px',
              textAlign: 'center',
              padding: '9px 12px',
              borderRadius: '8px'
            }}
          >
            Kolom A (Pernyataan)
          </div>

          {kolomKiri.map((kiri, idx) => {
            const terhubungKe = pasanganAktif[kiri.nomor]
            const sedangDipilih = aktifMulai === kiri.nomor
            const warnaItem = WARNA_GARIS[idx % WARNA_GARIS.length]

            return (
              <div
                key={kiri.nomor}
                ref={el => {
                  kiriRefs.current[kiri.nomor] = el
                }}
                onClick={() => klikItemKiri(kiri.nomor)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  padding: '13px 16px 13px 14px',
                  borderRadius: '10px',
                  border: sedangDipilih
                    ? '2px solid #2563eb'
                    : terhubungKe
                      ? `2px solid ${warnaItem}`
                      : '1px solid #cbd5e1',
                  background: sedangDipilih ? '#eff6ff' : '#f8fafc',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '13.5px', color: '#0f172a', lineHeight: 1.4 }}>
                  <strong style={{ marginRight: '8px' }}>{kiri.nomor}.</strong>
                  <span>{kiri.teks}</span>
                  {terhubungKe && (
                    <span
                      style={{
                        marginLeft: '8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: warnaItem,
                        background: '#ffffff',
                        border: `1px solid ${warnaItem}`,
                        borderRadius: '999px',
                        padding: '1px 7px'
                      }}
                    >
                      → {terhubungKe}
                    </span>
                  )}
                </div>

                {terhubungKe && (
                  <button
                    type="button"
                    title="Hapus pasangan"
                    onClick={e => hapusPasanganKiri(kiri.nomor, e)}
                    style={{
                      border: 'none',
                      background: '#fee2e2',
                      color: '#b91c1c',
                      borderRadius: '6px',
                      padding: '2px 7px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                )}

                <div
                  onPointerDown={e => mulaiTarikDariKiri(kiri.nomor, e)}
                  title="Tarik garis ke Kolom B"
                  style={{
                    position: 'absolute',
                    right: '-7px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: terhubungKe ? warnaItem : '#1d63a5',
                    border: '2px solid #ffffff',
                    boxShadow: '0 0 0 1px rgba(15,23,42,0.2)',
                    cursor: 'crosshair',
                    touchAction: 'none',
                    zIndex: 4
                  }}
                />
              </div>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              background: '#1d63a5',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '13px',
              textAlign: 'center',
              padding: '9px 12px',
              borderRadius: '8px'
            }}
          >
            Kolom B (Pasangan Jawaban)
          </div>

          {kolomKanan.map(kanan => {
            const nomorTerhubung = Object.entries(pasanganAktif).find(([, v]) => v === kanan.kode)?.[0]
            const isHover = hoverKanan === kanan.kode

            return (
              <div
                key={kanan.kode}
                ref={el => {
                  kananRefs.current[kanan.kode] = el
                }}
                onClick={() => klikItemKanan(kanan.kode)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: isHover
                    ? '2px solid #2563eb'
                    : nomorTerhubung
                      ? '2px solid #93c5fd'
                      : '1px solid #cbd5e1',
                  background: isHover ? '#eff6ff' : '#f8fafc',
                  cursor: aktifMulai !== null ? 'pointer' : 'default',
                  transition: 'all 0.15s ease'
                }}
              >
                <strong style={{ fontSize: '13px', color: '#0f172a', minWidth: '18px' }}>
                  {kanan.kode}.
                </strong>
                <span style={{ fontSize: '12.5px', color: '#1e293b', lineHeight: 1.45, flex: 1 }}>
                  {kanan.teks}
                </span>
                {nomorTerhubung && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#1d4ed8',
                      background: '#dbeafe',
                      borderRadius: '6px',
                      padding: '2px 6px'
                    }}
                  >
                    #{nomorTerhubung}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const JUDUL_KEPALA_DESA = 'Kepala Desa yang Sombong Menjadi Dermawan'
const TEKS_KEPALA_DESA = [
  'Seorang pengemis datang ke rumah kepala desa untuk meminta makan dan sedikit uang. Bukannya memberi makan, sang kepala desa justru mengusir pengemis itu. Keesokan harinya, saat bangun tidur, kepala desa yang kikir itu merasakan tangannya lumpuh dan tidak dapat digerakkan. Ia pun membuat sayembara. Siapa pun yang dapat menyembuhkannya, akan diberi setengah dari kekayaannya. Pengemis yang kemarin diusirnya datang, "Hai, orang kaya! Ini adalah akibat dari sifat sombong dan kikirmu! Hanya ada tiga hal yang dapat menyembuhkanmu! Pertama, kau harus mengubah sifat sombong dan kikirmu. Kedua, bertapalah di sebuah batu cekung di Gunung Karang selama tujuh hari tujuh malam. Ketiga, jika kau sembuh, penuhilah janjimu. Bagikan setengah harta kekayaanmu kepada orang-orang tidak mampu!"',
  'Kepala desa yang kaya itu pun melakukan hal-hal yang disebutkan oleh pengemis. Ia pergi ke Gunung Karang dan melewati perjalanan yang melelahkan. Ia bertapa dan berdoa selama tujuh hari tujuh malam melewati berbagai cobaan. Pada hari ketujuh, tiba-tiba batu cekung itu menyemburkan sumber mata air panas. Sang kepala desa itu segera mandi. Secara ajaib, ia pun sembuh dari kelumpuhannya.',
  'Ia kembali ke desa dan memenuhi janjinya, mendermakan hartanya kepada orang-orang tidak mampu. Akhirnya, kepala desa yang kaya raya itu dikenal sebagai orang yang dermawan. Warga pun sangat menyayanginya.'
]

const BANK_SOAL_BINDO_PAKET_1: Omit<DataSoal, 'nomor'>[] = [
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
    kunciText: 'Kunci jawaban: B - Kejujuran untuk mengembalikan barang yang bukan haknya.',
    kunciTeksReviu: 'B - Kejujuran untuk mengembalikan barang yang bukan haknya'
  },
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
      { kode: 'A', teks: 'Kura-kura meminta imbalan sebelum menerima bantuan dari Burung Jalak.' },
      { kode: 'B', teks: 'Burung Jalak menunjukkan sikap kepedulian sosial kepada sesama makhluk.' },
      { kode: 'C', teks: 'Kebaikan tidak dinilai dari besarnya bantuan, melainkan dari ketulusan hati.' },
      { kode: 'D', teks: 'Tolong-menolong sebaiknya dilakukan jika menguntungkan diri sendiri.' }
    ],
    kunciKodePgk: ['A', 'C'],
    kunciText: 'Kunci jawaban: Pernyataan 1 dan 3.',
    kunciTeksReviu: 'Pernyataan 1 dan 3 (sesuai kunci jawaban)'
  },
  {
    nomorAsli: 3,
    tipe: 'jodoh',
    bacaanGambar: 'bindo6-soal-3.png',
    pertanyaan: 'Jodohkan istilah nilai dalam cerita pada Kolom A dengan deskripsi penerapan yang tepat pada Kolom B !',
    petunjuk: 'Hubungkan atau pilih pasangan huruf yang tepat untuk setiap pernyataan!',
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
    kunciText: 'Kunci jawaban: 1-A, 2-B, 3-C.',
    kunciTeksReviu: '1-A, 2-B, 3-C'
  },
  {
    nomorAsli: 4,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-4.png',
    bacaanTeks: [
      'Pak Doni berjanji mendampingi Nisa belajar matematika malam ini. Namun, karena tergiur menonton bola di TV bersama teman-temannya, Pak Doni mengingkari janji hingga Nisa menangis kebingungan.'
    ],
    pertanyaan: 'Tentukan kebenaran dari pernyataan berikut berdasarkan cerita di atas!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Kesalahan Pak Doni memberikan pelajaran pentingnya komitmen dan menepati janji.',
      'Tindakan Pak Doni merupakan contoh penerapan nilai tanggung jawab orang tua.',
      'Nisa merasa kecewa karena janji pendampingan belajar tidak dipenuhi.'
    ],
    kunciTabel: ['Benar', 'Salah', 'Benar'],
    kunciText: 'Kunci jawaban: Benar, Salah, Benar.',
    kunciTeksReviu: 'Benar, Salah, Benar'
  },
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
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Folivora merupakan hewan yang geraknya sangat aktif',
      'Folivora memiliki usus yang panjang',
      'Folivora hanya memakan daging'
    ],
    kunciTabel: ['Tidak Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: 'Kunci jawaban: Tidak Sesuai, Sesuai, Tidak Sesuai.',
    kunciTeksReviu: 'Tidak Sesuai, Sesuai, Tidak Sesuai'
  },
  {
    nomorAsli: 6,
    tipe: 'tabel',
    bacaanJudul: JUDUL_KEPALA_DESA,
    bacaanTeks: TEKS_KEPALA_DESA,
    bacaanGambar: 'bindo6-soal-6.png',
    pertanyaan: 'Apa nilai moral positif yang terkandung di dalam teks tersebut? Tentukan sesuai atau tidak sesuai untuk setiap pernyataan mengenai nilai moral berikut ini.',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Memberi lebih baik daripada menerima',
      'Memberikan sebagian dari harta kita, akan membawa kebahagiaan bagi orang yang memerlukannya',
      'Memberikan semua harta kekayaan, tidak akan menjadikan seseorang kesulitan keuangan'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: 'Kunci jawaban: Sesuai, Sesuai, Tidak Sesuai.',
    kunciTeksReviu: 'Sesuai, Sesuai, Tidak Sesuai'
  },
  {
    nomorAsli: 7,
    tipe: 'pgk',
    bacaanJudul: JUDUL_KEPALA_DESA,
    bacaanTeks: TEKS_KEPALA_DESA,
    bacaanGambar: 'bindo6-soal-7.png',
    pertanyaan: 'Apa makna kata "kikir" dalam teks tersebut?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Suka memberi dan murah hati' },
      { kode: 'B', teks: 'Sangat pelit' },
      { kode: 'C', teks: 'Tidak mau memberi atau mengeluarkan hartanya' }
    ],
    kunciKodePgk: ['B', 'C'],
    kunciText: 'Kunci jawaban: Pilihan 2 dan 3 - Sangat pelit; tidak mau memberi atau mengeluarkan hartanya.',
    kunciTeksReviu: 'Pilihan 2 dan 3 - Sangat pelit; tidak mau memberi atau mengeluarkan hartanya'
  },
  {
    nomorAsli: 8,
    tipe: 'tabel',
    bacaanJudul: JUDUL_KEPALA_DESA,
    bacaanTeks: TEKS_KEPALA_DESA,
    bacaanGambar: 'bindo6-soal-8.png',
    pertanyaan: 'Berdasarkan teks, apa tujuan kepala desa pergi ke Gunung Karang? Tentukan sesuai atau tidak sesuai untuk setiap pernyataan mengenai tujuan kepala desa berikut!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Menyembuhkan tangannya yang lumpuh',
      'Melaksanakan hal-hal yang diberikan oleh pengemis',
      'Berendam air panas untuk menyegarkan badannya'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: 'Kunci jawaban: Sesuai, Sesuai, Tidak Sesuai.',
    kunciTeksReviu: 'Sesuai, Sesuai, Tidak Sesuai'
  },
  {
    nomorAsli: 9,
    tipe: 'tabel',
    bacaanJudul: JUDUL_KEPALA_DESA,
    bacaanTeks: TEKS_KEPALA_DESA,
    bacaanGambar: 'bindo6-soal-9.png',
    pertanyaan: 'Apa perubahan karakter yang terjadi pada tokoh kepala desa? Tentukan sesuai atau tidak sesuai untuk setiap pernyataan perubahan karakter kepala desa berikut!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Sombong menjadi dermawan',
      'Kikir menjadi rendah hati',
      'Peduli sesama menjadi tidak peduli kepada orang miskin'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: 'Kunci jawaban: Sesuai, Sesuai, Tidak Sesuai.',
    kunciTeksReviu: 'Sesuai, Sesuai, Tidak Sesuai'
  },
  {
    nomorAsli: 10,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-10.png',
    bacaanTeks: [],
    pertanyaan: 'Tujuan utama surat tersebut adalah',
    opsi: [
      { kode: 'A', teks: 'A. memberitahukan hasil kegiatan literasi' },
      { kode: 'B', teks: 'B. mengundang orang tua menghadiri kegiatan literasi' },
      { kode: 'C', teks: 'C. meminta orang tua mengisi formulir' },
      { kode: 'D', teks: 'D. menawarkan buku kepada orang tua' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B - Mengundang orang tua menghadiri kegiatan literasi.',
    kunciTeksReviu: 'B - Mengundang orang tua menghadiri kegiatan literasi'
  },
  {
    nomorAsli: 11,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-10.png',
    bacaanTeks: [],
    pertanyaan: 'Berdasarkan teks tersebut. Tentukan sesuai atau tidak sesuai untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
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
    kunciText: 'Kunci jawaban: Sesuai, Tidak Sesuai, Sesuai, Sesuai, Tidak Sesuai, Sesuai.',
    kunciTeksReviu: 'Sesuai, Tidak Sesuai, Sesuai, Sesuai, Tidak Sesuai, Sesuai'
  },
  {
    nomorAsli: 12,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-12.png',
    bacaanTeks: [],
    pertanyaan: 'Nama peserta yang mengisi formulir adalah ....',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['Dimas Pratama'],
    kunciText: 'Kunci jawaban: Dimas Pratama.',
    kunciTeksReviu: 'Dimas Pratama'
  },
  {
    nomorAsli: 13,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-13.png',
    bacaanTeks: [],
    pertanyaan: 'Berdasarkan formulir pendaftaran klub jurnalistik tersebut. Tentukan benar atau salah untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
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
    kunciText: 'Kunci jawaban: Benar, Salah, Benar, Salah, Benar, Benar.',
    kunciTeksReviu: 'Benar, Salah, Benar, Salah, Benar, Benar'
  },
  {
    nomorAsli: 14,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-14.png',
    bacaanTeks: [
      'Kalimat A: "Bapak/Ibu wajib hadir dalam kegiatan tersebut. Kalau tidak datang, kegiatan akan terganggu."',
      'Kalimat B: "Kami mengharapkan kehadiran Bapak/Ibu untuk mendukung keberhasilan kegiatan tersebut."'
    ],
    pertanyaan: 'Kalimat manakah yang lebih tepat digunakan dalam surat resmi?',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['Kalimat B', 'B'],
    kunciText: 'Kunci jawaban: Kalimat B.',
    kunciTeksReviu: 'Kalimat B'
  },
  {
    nomorAsli: 15,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-15.png',
    bacaanTeks: [
      'Dalam sebuah cerita visual, Sinta mengikuti latihan tari tradisional di balai desa. Ia melihat beberapa temannya lebih tertarik memainkan telepon genggam daripada mempelajari tarian daerah. Sinta mengajak teman-temannya berlatih bersama dan menjelaskan bahwa tarian tradisional merupakan warisan budaya yang harus dijaga. Akhirnya, mereka sepakat mengikuti latihan untuk tampil dalam acara perayaan desa.'
    ],
    pertanyaan: 'Nilai budaya yang terdapat dalam cerita tersebut adalah',
    opsi: [
      { kode: 'A', teks: 'A. Melestarikan kesenian tradisional.' },
      { kode: 'B', teks: 'B. Mengutamakan permainan modern.' },
      { kode: 'C', teks: 'C. Menghindari kegiatan masyarakat.' },
      { kode: 'D', teks: 'D. Mengabaikan tradisi daerah.' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A - Melestarikan kesenian tradisional.',
    kunciTeksReviu: 'A - Melestarikan kesenian tradisional'
  },
  {
    nomorAsli: 16,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-16.png',
    bacaanTeks: [
      'Dalam sebuah gambar animasi, warga kampung melaksanakan kerja bakti pada hari Minggu. Mereka membersihkan selokan, menyapu jalan, dan mengumpulkan sampah. Meskipun pekerjaan cukup berat, mereka tetap bersemangat karena dilakukan bersama-sama. Lingkungan kampung menjadi bersih dan nyaman.'
    ],
    pertanyaan: 'Kegiatan kerja bakti dalam cerita mencerminkan sikap peduli terhadap',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['lingkungan', 'kebersihan lingkungan', 'lingkungan sekitar'],
    kunciText: 'Kunci jawaban: Lingkungan.',
    kunciTeksReviu: 'Lingkungan'
  },
  {
    nomorAsli: 17,
    tipe: 'tabel',
    bacaanTeks: [
      'Dalam sebuah komik, Roni melihat Rohman terjatuh saat berjalan menuju kelas. Buku-buku Rohman berserakan di lantai. Roni segera membantu Rohman berdiri dan mengumpulkan buku-bukunya. Rohman berterima kasih kepada Roni karena telah membantunya.'
    ],
    pertanyaan: 'Berdasarkan bacaan tersebut. Tentukan sesuai atau tidak sesuai untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Rina menunjukkan sikap peduli dengan membantu Siti.',
      'Nilai moral dalam cerita tersebut adalah sikap tidak peduli terhadap teman.',
      'Pesan cerita tersebut adalah kita sebaiknya membantu orang yang mengalami kesulitan.',
      'Rohman berterimakasih kepada Roni'
    ],
    kunciTabel: ['Salah', 'Salah', 'Benar', 'Benar'],
    kunciText: 'Kunci jawaban: Salah, Salah, Benar, Benar.',
    kunciTeksReviu: 'Salah, Salah, Benar, Benar'
  },
  {
    nomorAsli: 18,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-18.png',
    bacaanTeks: [
      'Dalam sebuah komik, siswa kelas VI mendapat tugas membuat poster tentang persatuan. Kelompok mereka terdiri atas siswa dengan latar belakang budaya dan kemampuan yang berbeda. Ketika berdiskusi, beberapa siswa selalu memutuskan sendiri tanpa mendengarkan pendapat anggota lain. Mereka juga mengabaikan usulan seorang teman yang mengalami kesulitan berbicara. Ketua kelompok kemudian mengajak semua anggota menyampaikan pendapat secara bergiliran dan membagi tugas sesuai kemampuan masing-masing. Akhirnya, mereka menghasilkan poster yang baik.'
    ],
    pertanyaan: 'Berdasarkan keseluruhan cerita, kesimpulan yang paling tepat tentang nilai persatuan adalah',
    opsi: [
      { kode: 'A', teks: 'A. persatuan berarti semua anggota harus memiliki pendapat yang sama' },
      { kode: 'B', teks: 'B. persatuan hanya dapat dicapai jika ketua menentukan semua keputusan' },
      { kode: 'C', teks: 'C. perbedaan kemampuan sebaiknya dihindari ketika bekerja dalam kelompok' },
      { kode: 'D', teks: 'D. persatuan terwujud ketika setiap anggota dihargai dan berkontribusi sesuai kemampuannya' }
    ],
    kunciKodePg: 'D',
    kunciText: 'Kunci jawaban: D - Persatuan terwujud ketika setiap anggota dihargai dan berkontribusi sesuai kemampuannya.',
    kunciTeksReviu: 'D - Persatuan terwujud ketika setiap anggota dihargai dan berkontribusi sesuai kemampuannya'
  },
  {
    nomorAsli: 19,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-19.png',
    pertanyaan: 'Kata pramuka, kristal, traktor, blangko. Berdasarkan cara pelafalannya, kelompok kata tersebut mengandung gabungan konsonan yang disebut...',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['kluster', 'konsonan rangkap', 'kluster (konsonan rangkap)'],
    kunciText: 'Kunci jawaban: Kluster (konsonan rangkap).',
    kunciTeksReviu: 'Kluster (konsonan rangkap)'
  },
  {
    nomorAsli: 20,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-20.png',
    bacaanTeks: [],
    pertanyaan: 'Berdasarkan bacaan tersebut. Tentukan pernyataan di bawah ini sesuai atau tidak sesuai!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Kata proklamasi dalam teks di atas mengandung konsonan rangkap yang terletak di awal kata pada suku kata pertama',
      'Kata sastra mengandung konsonan rangkap pada suku kata terakhirnya yaitu tr',
      'Kata kartu merupakan contoh kata yang memiliki konsonan rangkap yaitu rt',
      'Kata Astuti termasuk kata yang memiliki konsonan rangkap karena kedua hurufnya terpisah oleh suku kata saat diucapkan',
      'Syarat utama konsonan rangkap (kluster) kedua huruf konsonan wajib berada dalam satu suku kata yang sama saat diucapkan'
    ],
    kunciTabel: ['Tidak Sesuai', 'Sesuai', 'Tidak Sesuai', 'Tidak Sesuai', 'Sesuai'],
    kunciText: 'Kunci jawaban: Tidak Sesuai, Sesuai, Tidak Sesuai, Tidak Sesuai, Sesuai.',
    kunciTeksReviu: 'Tidak Sesuai, Sesuai, Tidak Sesuai, Tidak Sesuai, Sesuai'
  },
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
    kunciKodePgk: ['B', 'C'],
    kunciText: 'Kunci jawaban: B dan C - dokter dan khusus.',
    kunciTeksReviu: 'B dan C - dokter dan khusus'
  },
  {
    nomorAsli: 22,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-22.png',
    pertanyaan: 'Berilah tanda centang (√) pada kolom Benar atau Salah berdasarkan pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Perbedaan utama antara digraf dan kluster adalah pada cara pelafalannya digraf menghasilkan satu bunyi baru, sedangkan kluster tetap memunculkan bunyi asli kedua hurufnya',
      'Gabungan huruf ng pada kata "ngarai" dan gabungan huruf ny pada kata "nyanyi" termasuk ke dalam jenis konsonan rangkap digraf',
      'Kata kertas nerupakan kata yang memiliki konsonan rangkap karena huruf r dan t ditulis secara berdampingan',
      'Kata khawatir dan syarat mengandung konsonan rangkap yang letak posisinya berada di tengah - tengah kata',
      'Pemenggalan suku kata yang tepat untuk kata blender adalah blen-der sehingga gabungan huruf bl disebut sebagai konsonan rangkap kluster'
    ],
    kunciTabel: ['Benar', 'Benar', 'Salah', 'Salah', 'Benar'],
    kunciText: 'Kunci jawaban: Benar, Benar, Salah, Salah, Benar.',
    kunciTeksReviu: 'Benar, Benar, Salah, Salah, Benar'
  },
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
    kunciText: 'Kunci jawaban: B.',
    kunciTeksReviu: 'B'
  },
  {
    nomorAsli: 24,
    tipe: 'pgk',
    bacaanGambar: 'bindo6-soal-24.png',
    bacaanTeks: [
      'Perhatikan ilustrasi formulir pendaftaran yang sedang diisi oleh seorang siswa (Nama: Rara; Alamat: Jl. Mawar No. 10; Tanggal Lahir: 30 Februari 2012).'
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
    kunciText: 'Kunci jawaban: A dan B.',
    kunciTeksReviu: 'A dan B'
  },
  {
    nomorAsli: 25,
    tipe: 'pg',
    bacaanGambar: 'bindo6-soal-25.png',
    pertanyaan: 'Dalam etika berkomunikasi digital (Netiquette), menuliskan seluruh pesan atau subjek dalam surat elektronik (email) menggunakan HURUF KAPITAL SEMUA dianggap sebagai tindakan yang tidak sopan karena setara dengan berteriak kepada penerima pesan.',
    opsi: [
      { kode: 'A', teks: 'A. Benar' },
      { kode: 'B', teks: 'B. Salah' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A - Benar.',
    kunciTeksReviu: 'A - Benar'
  },
  {
    nomorAsli: 26,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-26.png',
    bacaanTeks: [
      'PROFIL SISWA — Nama: Budi | Alamat: Jl. Pintar No. 1 | Hobi: Membaca buku cerita dan menggambar | Prestasi: Juara 2 Lomba Menulis Cerpen | Grafik Skor: Hobi Membaca (85), Hobi Menggambar (75), Prestasi (90), Aktivitas Kelas (80).'
    ],
    pertanyaan: 'Perhatikan infografis Kurikulum Vitae (CV) milik Budi. Jika Budi ingin mendaftarkan diri sebagai anggota "Klub Literasi Sekolah" yang syarat utamanya adalah gemar membaca, bagian kategori manakah pada CV tersebut yang menjadi bukti kuat bahwa Budi layak diterima?',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['hobi', 'kategori hobi', 'hobi membaca'],
    kunciText: 'Kunci jawaban: Kategori hobi.',
    kunciTeksReviu: 'Kategori hobi'
  },
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
    kunciText: 'Kunci jawaban: B - Surat undangan resmi.',
    kunciTeksReviu: 'B - Surat undangan resmi'
  },
  {
    nomorAsli: 28,
    tipe: 'isian',
    bacaanGambar: 'bindo6-soal-28.png',
    pertanyaan: '(.....) Surat resmi (undangan rapat sekolah dari kepala sekolah) menggunakan bahasa baku, ragam resmi, serta dilengkapi dengan kop surat, nomor surat, lampiran, dan perihal. Tuliskan huruf B jika pernyataan tersebut benar, atau huruf S jika pernyataan tersebut salah!',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['B', 'b', 'benar'],
    kunciText: 'Kunci jawaban: B - Benar.',
    kunciTeksReviu: 'B - Benar'
  },
  {
    nomorAsli: 29,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-29.png',
    bacaanTeks: [],
    pertanyaan: 'Tentukan apakah pernyataan berikut sesuai atau tidak sesuai dengan isi surat!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Surat tersebut merupakan surat pribadi karena ditujukan kepada sahabat, yaitu Rani.',
      'Sinta berencana mengunjungi Keraton dan Malioboro bersama keluarganya saat liburan semester depan.',
      'Surat tersebut ditulis oleh Rani yang tinggal di Yogyakarta kepada Sinta di Bandung.'
    ],
    kunciTabel: ['Tidak Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: 'Kunci jawaban: Tidak Sesuai, Sesuai, Tidak Sesuai.',
    kunciTeksReviu: 'Tidak Sesuai, Sesuai, Tidak Sesuai'
  },
  {
    nomorAsli: 30,
    tipe: 'pgk',
    bacaanGambar: 'bindo6-soal-30.png',
    bacaanTeks: [],
    pertanyaan: 'Informasi apa saja yang sesuai dengan isi surat Sinta? Berdasarkan isi surat tersebut, pilihlah dua jawaban yang benar dengan memberikan tanda centang ( )!',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Sinta tinggal di Bandung dan menulis surat kepada sahabatnya yang bernama Rani.' },
      { kode: 'B', teks: 'B. Sinta berencana mengunjungi Keraton dan Malioboro bersama keluarganya saat liburan semester depan.' },
      { kode: 'C', teks: 'C. Rani mengajak Sinta berlibur ke Bandung pada liburan semester depan.' },
      { kode: 'D', teks: 'D. Sinta dan keluarganya sedang sakit sehingga tidak dapat berlibur ke Yogyakarta.' }
    ],
    kunciKodePgk: ['A', 'B'],
    kunciText: 'Kunci jawaban: A dan B.',
    kunciTeksReviu: 'A dan B'
  },
  {
    nomorAsli: 31,
    tipe: 'pgk',
    bacaanGambar: 'bindo6-soal-31.png',
    bacaanTeks: [],
    pertanyaan: 'Berdasarkan puisi tersebut, pilihlah semua pernyataan yang benar! Jawaban benar lebih dari satu.',
    petunjuk: 'klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Puisi menggambarkan suasana pagi yang indah dan menyenangkan.' },
      { kode: 'B', teks: 'B. Kalimat "Angin berbisik di antara pepohonan" menggunakan majas personifikasi.' },
      { kode: 'C', teks: 'C. Puisi menggambarkan suasana malam yang menakutkan.' },
      { kode: 'D', teks: 'D. Kalimat "Daun-daun menari mengikuti irama" menggambarkan daun melakukan gerakan seperti manusia.' }
    ],
    kunciKodePgk: ['A', 'B', 'D'],
    kunciText: 'Kunci jawaban: A, B, dan D.',
    kunciTeksReviu: 'A, B, dan D'
  },
  {
    nomorAsli: 32,
    tipe: 'pgk',
    bacaanGambar: 'bindo6-soal-32.png',
    bacaanTeks: [],
    pertanyaan: 'Perhatikan penggunaan majas dalam puisi! Pilihlah semua kalimat yang menggunakan majas personifikasi.',
    petunjuk: 'klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Mentari tersenyum menyambut pagi.' },
      { kode: 'B', teks: 'B. Burung bernyanyi riang sekali.' },
      { kode: 'C', teks: 'C. Sungai berlari menuju samudra.' },
      { kode: 'D', teks: 'D. Alam menyapa dengan penuh cinta.' }
    ],
    kunciKodePgk: ['A', 'C', 'D'],
    kunciText: 'Kunci jawaban: A, C, dan D.',
    kunciTeksReviu: 'A, C, dan D'
  },
  {
    nomorAsli: 33,
    tipe: 'uraian',
    bacaanGambar: 'bindo6-soal-33.png',
    bacaanTeks: [],
    pertanyaan: '"Daun-daun menari mengikuti irama." Jelaskan mengapa kalimat tersebut termasuk majas personifikasi! Kemudian, tuliskan makna sebenarnya dari kalimat tersebut menurut pemahamanmu!',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciText: 'Kunci jawaban: Kalimat tersebut termasuk personifikasi karena daun digambarkan dapat menari seperti manusia. Makna sebenarnya adalah daun bergerak karena tertiup angin.',
    kunciTeksReviu: 'Personifikasi karena daun digambarkan menari seperti manusia; makna sebenarnya: daun bergerak tertiup angin'
  },
  {
    nomorAsli: 34,
    tipe: 'jodoh',
    bacaanGambar: 'bindo6-soal-34.png',
    bacaanTeks: [],
    pertanyaan: 'Pasangkan kalimat dalam puisi dengan makna yang tepat!',
    petunjuk: 'Tarik garis atau pilih pasangan huruf yang tepat untuk setiap kalimat!',
    kolomKiri: [
      { nomor: 1, teks: 'Mentari tersenyum' },
      { nomor: 2, teks: 'Angin berbisik' },
      { nomor: 3, teks: 'Daun-daun menari' },
      { nomor: 4, teks: 'Sungai berlari' }
    ],
    kolomKanan: [
      { kode: 'A', teks: 'Air mengalir menuju laut' },
      { kode: 'B', teks: 'Matahari mulai bersinar' },
      { kode: 'C', teks: 'Angin bertiup pelan' },
      { kode: 'D', teks: 'Daun bergerak tertiup angin' }
    ],
    kunciTabel: ['B', 'C', 'D', 'A'],
    kunciText: 'Kunci jawaban: 1-B, 2-C, 3-D, 4-A.',
    kunciTeksReviu: '1-B, 2-C, 3-D, 4-A'
  },
  {
    nomorAsli: 35,
    tipe: 'tabel',
    bacaanGambar: 'bindo6-soal-35.png',
    bacaanTeks: [],
    pertanyaan: 'Berdasarkan puisi "Pagi di Desaku", tentukan Benar atau Salah pada setiap pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Puisi menggambarkan keindahan suasana pagi di desa.',
      'Kalimat "Mentari tersenyum" merupakan majas hiperbola.',
      'Majas personifikasi memberikan sifat manusia kepada benda atau alam.',
      'Kalimat "Sungai berlari menuju samudra" bermakna sungai benar-benar memiliki kaki untuk berlari.',
      'Puisi tersebut mengandung pesan agar manusia menghargai keindahan alam.'
    ],
    kunciTabel: ['Benar', 'Salah', 'Benar', 'Salah', 'Benar'],
    kunciText: 'Kunci jawaban: Benar, Salah, Benar, Salah, Benar.',
    kunciTeksReviu: 'Benar, Salah, Benar, Salah, Benar'
  }
]

const BANK_SOAL_MATEMATIKA_PAKET_1: Omit<DataSoal, 'nomor'>[] = [
  {
    nomorAsli: 1,
    tipe: 'pgk',
    bacaanTeks: [
      'Pak Ahmad memelihara hewan ternak di belakang rumahnya. Hewan ternak tersebut terdiri atas ayam dan bebek. Rasio banyaknya ayam terhadap bebek adalah 4 : 5. Jumlah seluruh hewan ternak Pak Ahmad adalah 45 ekor.'
    ],
    bacaanGambar: 'mtk6-soal-1.png',
    pertanyaan: 'Pak Ahmad memiliki ayam dan bebek dengan rasio 4 : 5 dan jumlah seluruh hewan 45 ekor. Pernyataan yang tepat mengenai jumlah masing-masing hewan dan makna hubungan rasionya adalah...',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Jumlah ayam adalah 25 ekor dan bebek 20 ekor, karena ayam memiliki rasio yang lebih besar' },
      { kode: 'B', teks: 'B. Jumlah ayam adalah 20 ekor dan bebek 25 ekor, dengan selisih antara bebek dan ayam sebanyak 5 ekor' },
      { kode: 'C', teks: 'C. Jumlah ayam adalah 16 ekor dan bebek 20 ekor, sehingga total seluruh ternak adalah 36 ekor' },
      { kode: 'D', teks: 'D. Jumlah ayam adalah 20 ekor dan bebek 25 ekor, yang artinya jumlah bebek kurang dari jumlah ayam' }
    ],
    kunciKodePgk: ['B'],
    kunciText: 'Kunci jawaban: B.',
    kunciTeksReviu: 'B'
  },
  {
    nomorAsli: 2,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-2.png',
    pertanyaan: 'Berdasarkan prinsip kesamaan rasio pada tabel di atas, nilai A dan B yang tepat untuk melengkapi tabel rasio Lani adalah...',
    opsi: [
      { kode: 'A', teks: 'A. A = 180 dan B = 400' },
      { kode: 'B', teks: 'B. A = 160 dan B = 400' },
      { kode: 'C', teks: 'C. A = 180 dan B = 350' },
      { kode: 'D', teks: 'D. A = 150 dan B = 500' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A (A = 180 dan B = 400).',
    kunciTeksReviu: 'A (A = 180 dan B = 400)'
  },
  {
    nomorAsli: 3,
    tipe: 'pg',
    bacaanTeks: [
      'Seorang koki membuat kue dengan resep khusus. Rasio tepung terigu terhadap gula pasir yang digunakan adalah 2 : 3. Koki tersebut berencana membuat kue dalam jumlah besar dan menggunakan 12 kg tepung terigu.'
    ],
    bacaanGambar: 'mtk6-soal-3.png',
    pertanyaan: 'Rasio tepung terigu terhadap gula pasir adalah 2 : 3. Jika digunakan 12 kg tepung terigu, berapakah gula pasir yang dibutuhkan dan bagaimana hubungan bahasa rasionya?',
    opsi: [
      { kode: 'A', teks: 'A. Dibutuhkan 13 kg gula pasir, karena gula pasir selalu berjarak 1 kg dari tepung terigu' },
      { kode: 'B', teks: 'B. Dibutuhkan 15 kg gula pasir, karena jika tepung terigu dikali 6, gula pasir dikali 5' },
      { kode: 'C', teks: 'C. Dibutuhkan 18 kg gula pasir, karena untuk menjaga perbandingan tetap 2 : 3, jumlah tepung terigu dan gula pasir masing-masing dikalikan dengan faktor skala 6' },
      { kode: 'D', teks: 'D. Dibutuhkan 8 kg gula pasir, karena gula pasir besarnya 2/3 dari jumlah tepung terigu' }
    ],
    kunciKodePg: 'C',
    kunciText: 'Kunci jawaban: C (18 kg gula pasir, faktor skala 6).',
    kunciTeksReviu: 'C (18 kg gula pasir, faktor skala 6)'
  },
  {
    nomorAsli: 4,
    tipe: 'pg',
    bacaanTeks: [
      'Perhatikan beberapa tabel perbandingan kuantitas berikut. Setiap tabel memuat pasangan nilai yang menunjukkan hubungan rasio antarbesaran.'
    ],
    bacaanGambar: 'mtk6-soal-4.png',
    pertanyaan: 'Manakah pasang tabel di atas yang SELURUH pasang nilainya menunjukkan kesamaan rasio (rasio senilai) yang benar dan konsisten?',
    opsi: [
      { kode: 'A', teks: 'A. Tabel 1 dan Tabel 2' },
      { kode: 'B', teks: 'B. Tabel 1 dan Tabel 3' },
      { kode: 'C', teks: 'C. Tabel 2 dan Tabel 4' },
      { kode: 'D', teks: 'D. Tabel 3 dan Tabel 4' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B (Tabel 1 dan Tabel 3).',
    kunciTeksReviu: 'B (Tabel 1 dan Tabel 3)'
  },
  {
    nomorAsli: 5,
    tipe: 'tabel',
    bacaanGambar: 'mtk6-soal-5.png',
    pertanyaan: 'Berdasarkan gambar tersebut, tentukan Benar atau Salah tentang pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Rasio banyak tomat bagus terhadap tomat busuk adalah 2 : 3',
      'Rasio banyak tomat busuk terhadap tomat bagus adalah 2 : 3',
      'Rasio banyak tomat bagus terhadap tomat busuk adalah 3 : 2'
    ],
    kunciTabel: ['Salah', 'Benar', 'Benar'],
    kunciText: 'Kunci jawaban: Salah, Benar, Benar.',
    kunciTeksReviu: 'Salah, Benar, Benar'
  },
  {
    nomorAsli: 6,
    tipe: 'pg',
    bacaanTeks: [
      'Pada hari Jumat, siswa kelas VI SD Negeri Besuk I mengadakan kegiatan “Bekal Sehat Bersama”. Setiap kelompok membawa buah untuk dimakan bersama. Kelompok A membawa 8 apel, 12 jeruk, dan 10 pisang. Sebelum makan bersama, guru meminta siswa mengamati jumlah buah tersebut. Guru berkata,',
      '“Kalian tidak hanya perlu mengetahui jumlah buah, tetapi juga dapat membandingkan jumlah satu jenis buah dengan jenis buah lainnya maupun dengan seluruh buah.” Kemudian beberapa siswa memberikan pendapat.',
      'Rani: “Rasio apel terhadap jeruk adalah 2 : 3.”',
      'Dika: “Rasio apel terhadap seluruh buah adalah 4 : 15.”',
      'Siti: “Rasio jeruk terhadap pisang adalah 6 : 5.”'
    ],
    pertanyaan: 'Pernyataan siswa yang benar adalah ....',
    opsi: [
      { kode: 'A', teks: 'A. Hanya pendapat Rani yang benar' },
      { kode: 'B', teks: 'B. Pendapat Rani dan Dika yang benar' },
      { kode: 'C', teks: 'C. Pendapat Rani dan Siti yang benar' },
      { kode: 'D', teks: 'D. Pendapat Rani, Dika, dan Siti semuanya benar' }
    ],
    kunciKodePg: 'D',
    kunciText: 'Kunci jawaban: D (Pendapat Rani, Dika, dan Siti semuanya benar).',
    kunciTeksReviu: 'D (Rani, Dika, dan Siti semuanya benar)'
  },
  {
    nomorAsli: 7,
    tipe: 'pgk',
    bacaanGambar: 'mtk6-soal-7.png',
    pertanyaan: 'Pernyataan mana yang BENAR tentang rasio buku di rak tersebut?',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'Rasio buku cerita terhadap buku pelajaran adalah 3 : 2' },
      { kode: 'B', teks: 'Rasio buku pelajaran terhadap seluruh buku adalah 1 : 5' },
      { kode: 'C', teks: 'Rasio buku ensiklopedia terhadap buku cerita adalah 5 : 3' },
      { kode: 'D', teks: 'Rasio buku cerita terhadap seluruh buku adalah 3 : 10' }
    ],
    kunciKodePgk: ['A', 'B', 'C', 'D'],
    kunciText: 'Kunci jawaban: A, B, C, dan D benar.',
    kunciTeksReviu: 'A, B, C, dan D benar'
  },
  {
    nomorAsli: 8,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-8.png',
    pertanyaan: 'Perbandingan tepung dan gula untuk membuat kue adalah 5 : 2. Jika tepung yang digunakan 500 gram, pernyataan yang benar adalah ....',
    opsi: [
      { kode: 'A', teks: 'A. Gula yang diperlukan 200 gram.' },
      { kode: 'B', teks: 'B. Jumlah tepung dan gula 700 gram.' },
      { kode: 'C', teks: 'C. Jika tepung menjadi 1.000 gram, gula yang diperlukan 400 gram.' },
      { kode: 'D', teks: 'D. Perbandingan gula dan tepung adalah 5 : 2.' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A (Gula yang diperlukan 200 gram).',
    kunciTeksReviu: 'A (Gula yang diperlukan 200 gram)'
  },
  {
    nomorAsli: 9,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-9.png',
    pertanyaan: 'Perbandingan siswa yang mengikuti kegiatan pramuka dan olahraga adalah 3 : 4. Jika jumlah seluruh siswa yang mengikuti kedua kegiatan tersebut 42 orang, pernyataan yang benar adalah ....',
    opsi: [
      { kode: 'A', teks: 'A. Siswa pramuka berjumlah 18 orang.' },
      { kode: 'B', teks: 'B. Siswa olahraga berjumlah 24 orang.' },
      { kode: 'C', teks: 'C. Selisih jumlah siswa kedua kegiatan adalah 6 orang.' },
      { kode: 'D', teks: 'D. Jumlah siswa pramuka lebih banyak daripada siswa olahraga.' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A (Siswa pramuka berjumlah 18 orang).',
    kunciTeksReviu: 'A (Siswa pramuka berjumlah 18 orang)'
  },
  {
    nomorAsli: 10,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-10.png',
    pertanyaan: 'Urutkan air minum yang dibawa Santi, Tio, Galuh dan Radit dari yang paling sedikit ke yang paling banyak!',
    opsi: [
      { kode: 'A', teks: 'A. Santi, Radit, Galuh, Tio' },
      { kode: 'B', teks: 'B. Radit, Santi, Galuh, Tio' },
      { kode: 'C', teks: 'C. Tio, Galuh, Santi, Radit' },
      { kode: 'D', teks: 'D. Galuh, Tio, Santi, Radit' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B (Radit, Santi, Galuh, Tio).',
    kunciTeksReviu: 'B (Radit, Santi, Galuh, Tio)'
  },
  {
    nomorAsli: 11,
    tipe: 'tabel',
    bacaanGambar: 'mtk6-soal-11.png',
    pertanyaan: 'Sebuah bus membawa 56 penumpang: 3/8 pria, 3/7 wanita, dan sisanya anak-anak. Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Banyaknya penumpang laki-laki adalah 21 orang',
      'Banyaknya penumpang wanita adalah 24 orang',
      'Banyaknya penumpang anak-anak adalah 11 orang',
      'Jika penumpang termasuk dengan kru bus yang berjenis kelamin laki-laki yang berjumlah 3 orang, maka penumpang laki-lakinya menjadi 27 orang'
    ],
    kunciTabel: ['Benar', 'Benar', 'Benar', 'Salah'],
    kunciText: 'Kunci jawaban: Benar, Benar, Benar, Salah.',
    kunciTeksReviu: 'Benar, Benar, Benar, Salah'
  },
  {
    nomorAsli: 12,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-12.png',
    pertanyaan: 'Pak Jatmiko memiliki kebun mangga yang berbentuk persegi Panjang. Kebun manga tersebut memiliki Panjang 8 2/5 m dan lebarnya 7,18 meter. Berpakah luas dan keliling kebun mangga yang dimiliki pak Jatmiko?',
    opsi: [
      { kode: 'A', teks: 'A. Luas = 60,312' },
      { kode: 'B', teks: 'B. Luas = 60,321' },
      { kode: 'C', teks: 'C. Keliling = 31 4/15' },
      { kode: 'D', teks: 'D. 314/25' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A (Luas = 60,312).',
    kunciTeksReviu: 'A (Luas = 60,312)'
  },
  {
    nomorAsli: 13,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-13.png',
    pertanyaan: 'Kebun berbentuk persegi panjang memiliki panjang 18 cm dan lebar 12 cm pada denah. Berapakah keliling kebun pada denah tersebut?',
    opsi: [
      { kode: 'A', teks: 'A. 30 cm' },
      { kode: 'B', teks: 'B. 48 cm' },
      { kode: 'C', teks: 'C. 60 cm' },
      { kode: 'D', teks: 'D. 216 cm' }
    ],
    kunciKodePg: 'C',
    kunciText: 'Kunci jawaban: C (2 × (18 + 12) = 60 cm).',
    kunciTeksReviu: 'C (60 cm)'
  },
  {
    nomorAsli: 14,
    tipe: 'pgk',
    bacaanGambar: 'mtk6-soal-14.png',
    pertanyaan: 'Sebuah taman berbentuk huruf L tersusun dari ukuran-ukuran seperti pada gambar. Pilihlah semua pernyataan yang benar berdasarkan gambar tersebut.',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Luas taman adalah 120 cm².' },
      { kode: 'B', teks: 'B. Keliling taman adalah 48 cm.' },
      { kode: 'C', teks: 'C. Luas taman dapat dihitung dari 14 × 10 dikurangi 5 × 4' },
      { kode: 'D', teks: 'D. Keliling taman adalah 40 cm.' }
    ],
    kunciKodePgk: ['A', 'B', 'C'],
    kunciText: 'Kunci jawaban: A, B, dan C benar.',
    kunciTeksReviu: 'A, B, dan C benar'
  },
  {
    nomorAsli: 15,
    tipe: 'tabel',
    bacaanGambar: 'mtk6-soal-15.png',
    pertanyaan: 'Kebun berukuran 20 m × 12 m memiliki kolam persegi bersisi 4 m; sisanya ditanami rumput. Tentukan benar atau salah untuk setiap pernyataan berikut.',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Keliling seluruh kebun adalah 64 m.',
      'Luas seluruh kebun adalah 240 m².',
      'Luas kolam adalah 16 m².',
      'Luas bagian kebun yang ditanami rumput adalah 224 m².'
    ],
    kunciTabel: ['Benar', 'Benar', 'Benar', 'Benar'],
    kunciText: 'Kunci jawaban: Benar semua.',
    kunciTeksReviu: 'Benar semua'
  },
  {
    nomorAsli: 16,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-16.png',
    pertanyaan: 'Sebuah bangun segitiga memiliki panjang alas 12 cm, tinggi 8 cm, dan kedua sisi miringnya masing-masing 10 cm. Berapakah luas segitiga tersebut?',
    opsi: [
      { kode: 'A', teks: 'A. 40 cm²' },
      { kode: 'B', teks: 'B. 48 cm²' },
      { kode: 'C', teks: 'C. 60 cm²' },
      { kode: 'D', teks: 'D. 120 cm²' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B (1/2 × 12 × 8 = 48 cm²).',
    kunciTeksReviu: 'B (48 cm²)'
  },
  {
    nomorAsli: 17,
    tipe: 'pgk',
    bacaanGambar: 'mtk6-soal-17.png',
    pertanyaan: 'Bangun gabungan terdiri atas persegi panjang A (16 cm × 8 cm) dan persegi B (sisi 8 cm) yang menempel tanpa saling menutupi. Pilihlah semua pernyataan yang benar.',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Luas bangun A adalah 128 cm².' },
      { kode: 'B', teks: 'B. Luas bangun B adalah 64 cm².' },
      { kode: 'C', teks: 'C. Luas seluruh bangun gabungan adalah 192 cm².' },
      { kode: 'D', teks: 'D. Keliling bangun gabungan adalah 64 cm.' }
    ],
    kunciKodePgk: ['A', 'B', 'C', 'D'],
    kunciText: 'Kunci jawaban: A, B, C, dan D benar.',
    kunciTeksReviu: 'A, B, C, dan D benar'
  },
  {
    nomorAsli: 18,
    tipe: 'pg',
    bacaanTeks: [
      'Sebuah bus berangkat dari kota A menuju kota B yang berjarak 180 km dengan kecepatan rata-rata 60 km/jam. Di tengah perjalanan, bus tersebut berhenti untuk beristirahat selama 30 menit.'
    ],
    bacaanGambar: 'mtk6-soal-18.png',
    pertanyaan: 'Jika bus tiba di kota B tepat pukul 11.45, pukul berapakah bus tersebut berangkat dari kota A?',
    opsi: [
      { kode: 'A', teks: 'A. 08.15' },
      { kode: 'B', teks: 'B. 08.45' },
      { kode: 'C', teks: 'C. 09.15' },
      { kode: 'D', teks: 'D. 09.45' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A (180 / 60 = 3 jam + 30 menit = 3 jam 30 menit; 11.45 − 03.30 = 08.15).',
    kunciTeksReviu: 'A (08.15)'
  },
  {
    nomorAsli: 19,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-19.png',
    pertanyaan: 'Sebuah proyek perbaikan jalan direncanakan selesai dalam waktu 3 minggu. Jika para pekerja sudah menyelesaikan proyek tersebut selama 12 hari, pernyataan berikut yang benar tentang sisa waktu pengerjaan adalah…',
    opsi: [
      { kode: 'A', teks: 'A. Sisa waktu pengerjaan proyek adalah 9 hari' },
      { kode: 'B', teks: 'B. Sisa waktu pengerjaan proyek adalah 11 hari' },
      { kode: 'C', teks: 'C. Sisa waktu tersebut sama dengan 3/7 dari total waktu perencanaan' },
      { kode: 'D', teks: 'D. Sisa waktu tersebut sama dengan 1/3 dari total waktu perencanaan' }
    ],
    kunciKodePg: 'A',
    kunciText: 'Kunci jawaban: A (21 − 12 = 9 hari; 9/21 = 3/7).',
    kunciTeksReviu: 'A (9 hari)'
  },
  {
    nomorAsli: 20,
    tipe: 'isian',
    bacaanGambar: 'mtk6-soal-20.png',
    pertanyaan: 'Sebuah pompa air dapat mengisi sebuah tandon air kosong berkapasitas 1.200 liter sampai penuh dalam waktu 25 menit. Debit aliran air dari pompa tersebut jika dinyatakan dalam satuan liter/detik adalah …',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['0,8', '0.8', '0,8 liter/detik', '4/5'],
    kunciText: 'Kunci jawaban: 0,8 liter/detik.',
    kunciTeksReviu: '0,8 liter/detik'
  },
  {
    nomorAsli: 21,
    tipe: 'pg',
    bacaanGambar: 'mtk6-soal-21.png',
    pertanyaan: 'Andi mulai mengerjakan tugas pukul 08.25. Ia membutuhkan waktu 1 jam 35 menit untuk menyelesaikan tugas tersebut. Pukul berapakah Andi selesai mengerjakan tugas?',
    opsi: [
      { kode: 'A', teks: 'A. 09.50' },
      { kode: 'B', teks: 'B. 10.00' },
      { kode: 'C', teks: 'C. 10.10' },
      { kode: 'D', teks: 'D. 10.25' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B (08.25 + 1 jam 35 menit = 10.00).',
    kunciTeksReviu: 'B (10.00)'
  },
  {
    nomorAsli: 22,
    tipe: 'tabel',
    bacaanGambar: 'mtk6-soal-22.png',
    pertanyaan: 'Siti sedang mempelajari hubungan antara jam, menit, dan detik. Berilah tanda centang (✓) pada kolom yang sesuai!',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      '2 jam 30 menit sama dengan 150 menit.',
      '4 menit sama dengan 240 detik.',
      'Jarum menit bergerak satu putaran penuh dalam waktu 1 jam.',
      '1 jam 15 menit sama dengan 4.500 detik.'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Sesuai', 'Sesuai'],
    kunciText: 'Kunci jawaban: Sesuai semua.',
    kunciTeksReviu: 'Sesuai semua'
  },
  {
    nomorAsli: 23,
    tipe: 'isian',
    bacaanGambar: 'mtk6-soal-23.png',
    pertanyaan: 'Sebuah kereta berangkat pukul 09.40. Perjalanan berlangsung selama 2 jam 25 menit. Kereta tiba tepat waktu. Pukul berapa kereta tiba? ….',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['12.05', '12:05', '12.05 WIB'],
    kunciText: 'Kunci jawaban: 12.05.',
    kunciTeksReviu: '12.05'
  },
  {
    nomorAsli: 24,
    tipe: 'tabel',
    bacaanGambar: 'mtk6-soal-24.png',
    pertanyaan: 'Perhatikan beberapa pernyataan tentang penggunaan waktu dalam kehidupan sehari-hari. Berilah tanda centang (✓) pada kolom Benar atau Salah!',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Jika sekarang pukul 07.45, maka 30 menit kemudian adalah pukul 08.15.',
      'Waktu 2 menit 30 detik sama dengan 150 detik.',
      'Jika jarum detik bergerak 2 putaran penuh, waktu yang berlalu adalah 120 detik.',
      'Kegiatan yang dimulai pukul 13.20 dan selesai pukul 14.05 berlangsung selama 55 menit.'
    ],
    kunciTabel: ['Benar', 'Benar', 'Benar', 'Salah'],
    kunciText: 'Kunci jawaban: Benar, Benar, Benar, Salah.',
    kunciTeksReviu: 'Benar, Benar, Benar, Salah'
  },
  {
    nomorAsli: 25,
    tipe: 'pgk',
    bacaanGambar: 'mtk6-soal-25.png',
    pertanyaan: 'Berdasarkan teks yang ada pada gambar tersebut. Pilih semua pernyataan yang benar! Jawaban benar dapat lebih dari satu.',
    petunjuk: 'Klik pada setiap pilihan jawaban benar! Jawaban benar lebih dari satu.',
    opsi: [
      { kode: 'A', teks: 'A. Kegiatan olahraga pertama selesai pukul 10.00.' },
      { kode: 'B', teks: 'B. Waktu istirahat dimulai pukul 09.15.' },
      { kode: 'C', teks: 'C. Kegiatan senam selesai pukul 09.50.' },
      { kode: 'D', teks: 'D. Total waktu dari awal kegiatan olahraga hingga senam selesai adalah 2 jam 30 menit.' }
    ],
    kunciKodePgk: ['C', 'D'],
    kunciText: 'Kunci jawaban: C dan D.',
    kunciTeksReviu: 'C dan D'
  },
  {
    nomorAsli: 26,
    tipe: 'pg',
    bacaanTeks: [
      'Pak Roni adalah seorang perajin ukiran kayu tradisional. Untuk menyelesaikan satu unit lemari ukir, Pak Roni membutuhkan waktu selama 3 minggu 4 hari. Sebelum dijual ke pelanggan, lemari tersebut harus melalui proses pengeringan perban/cat pelapis selama 48 jam.'
    ],
    bacaanGambar: 'mtk6-soal-26.png',
    pertanyaan: 'Total waktu yang dibutuhkan Pak Roni dari awal pengerjaan ukiran hingga lemari siap dijual adalah ... hari.',
    opsi: [
      { kode: 'A', teks: 'A. 25 hari' },
      { kode: 'B', teks: 'B. 27 hari' },
      { kode: 'C', teks: 'C. 29 hari' },
      { kode: 'D', teks: 'D. 31 hari' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B (25 + 2 = 27 hari).',
    kunciTeksReviu: 'B (27 hari)'
  },
  {
    nomorAsli: 27,
    tipe: 'tabel',
    bacaanGambar: 'mtk6-soal-27.png',
    pertanyaan: 'Riko melihat jam dinding. Sebentar lagi semua berkumpul untuk makan malam. Ia sudah selesai mengerjakan tugas dari sekolah. Tandailah pernyataan yang benar dan yang salah.',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Jam dinding menunjukkan pukul 07.20 malam',
      'Jam dinding menunjukkan pukul 19.20',
      'Jam dinding menunjukkan pukul  07.40 pagi',
      'Jam dinding menunjukkan pukul 19.40 pagi'
    ],
    kunciTabel: ['Benar', 'Benar', 'Salah', 'Salah'],
    kunciText: 'Kunci jawaban: Benar, Benar, Salah, Salah.',
    kunciTeksReviu: 'Benar, Benar, Salah, Salah'
  },
  {
    nomorAsli: 28,
    tipe: 'tabel',
    bacaanGambar: 'mtk6-soal-28.png',
    pertanyaan: 'Berdasarkan teks pada gambar tersebut. Berilah tanda centang (✓) pada kolom sesuai atau Tidak sesuai!',
    petunjuk: 'Pilih Sesuai atau Tidak sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak sesuai'],
    barisTabel: [
      'Reno mengelilingi lapnagn selama 1 jam',
      'Toni mengelilingi lapangan selama 1 jam 30 menit',
      'Wina mengelilingi lapangan selama 1 jam 45 menit',
      'Reno membutuhkan waktu paling lama untuk mengelilingi lapngan'
    ],
    kunciTabel: ['Sesuai', 'Sesuai', 'Tidak sesuai', 'Tidak sesuai'],
    kunciText: 'Kunci jawaban: Sesuai, Sesuai, Tidak sesuai, Tidak sesuai.',
    kunciTeksReviu: 'Sesuai, Sesuai, Tidak sesuai, Tidak sesuai'
  },
  {
    nomorAsli: 29,
    tipe: 'pg',
    bacaanTeks: [
      'Kelas 6 SDN Kedungrejo III mengadakan wisata edukasi ke Kebun Raya. Rombongan berangkat dari sekolah pukul 06.45 dan tiba di Kebun Raya pukul 09.15.',
      'Kegiatan di Kebun Raya dimulai pukul 09.30 dengan jadwal sebagai berikut:'
    ],
    bacaanTabel: {
      headers: ['Kegiatan', 'Durasi'],
      rows: [
        ['Pengenalan tanaman bersama pemandu', '1 jam 15 menit'],
        ['Istirahat dan makan siang', '45 menit'],
        ['Menggambar tanaman', '1 jam']
      ]
    },
    bacaanTeksBawah: [
      'Setelah kegiatan menggambar selesai, rombongan langsung kembali ke sekolah. Perjalanan pulang memerlukan waktu yang sama dengan perjalanan berangkat.'
    ],
    pertanyaan: 'Jika semua kegiatan berlangsung berurutan tanpa jeda, rombongan tiba kembali di sekolah pada pukul ...',
    opsi: [
      { kode: 'A', teks: 'A. 14.15' },
      { kode: 'B', teks: 'B. 14.45' },
      { kode: 'C', teks: 'C. 15.15' },
      { kode: 'D', teks: 'D. 15.45' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B (14.45).',
    kunciTeksReviu: 'B (14.45)'
  },
  {
    nomorAsli: 30,
    tipe: 'tabel',
    bacaanTeks: [
      'Perhatikan beberapa pernyataan mengenai konversi satuan waktu dan penentuan waktu selesai/durasi.'
    ],
    pertanyaan: 'Tentukan apakah pernyataan berikut benar atau salah. Beri tanda centang pada kolom yang tepat.',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      '1 jam 30 menit sama dengan 90 menit.',
      'Pukul 13.00 sama dengan pukul 1 siang.',
      'Film yang dimulai pukul 19.45 dan berdurasi 2 jam 20 menit akan selesai pada pukul 22.15.',
      'Durasi dari pukul 08.50 sampai pukul 10.20 adalah 1 jam 40 menit.',
      '3 jam 15 menit sama dengan 195 menit.'
    ],
    kunciTabel: ['Benar', 'Benar', 'Salah', 'Salah', 'Benar'],
    kunciText: 'Kunci jawaban: Benar, Benar, Salah, Salah, Benar.',
    kunciTeksReviu: 'Benar, Benar, Salah, Salah, Benar'
  },
  {
    nomorAsli: 31,
    tipe: 'pg',
    bacaanTeks: [
      'Rani memiliki kegiatan setiap pagi. Ia bangun pukul 05.30. Setelah mandi dan sarapan, Rani berangkat ke sekolah pukul 06.30. Pelajaran dimulai pukul 07.00.',
      'Saat istirahat, jam menunjukkan pukul 09.30. Sekolah selesai pukul 12.00.',
      'Perhatikan pergerakan jarum jam berikut:'
    ],
    bacaanList: [
      'Jarum pendek menunjukkan jam.',
      'Jarum panjang menunjukkan menit.',
      'Jarum panjang bergerak satu putaran penuh dalam 60 menit.'
    ],
    bacaanTeksBawah: [
      'Setiap berpindah satu angka pada jam, jarum panjang bergerak 5 menit.'
    ],
    pertanyaan: 'Rani bangun pada pukul ....',
    opsi: [
      { kode: 'A', teks: 'A. 05.00' },
      { kode: 'B', teks: 'B. 05.30' },
      { kode: 'C', teks: 'C. 06.00' },
      { kode: 'D', teks: 'D. 06.30' }
    ],
    kunciKodePg: 'B',
    kunciText: 'Kunci jawaban: B (05.30).',
    kunciTeksReviu: 'B (05.30)'
  },
  {
    nomorAsli: 32,
    tipe: 'tabel',
    bacaanTeks: [
      'Rani memiliki kegiatan setiap pagi. Ia bangun pukul 05.30. Setelah mandi dan sarapan, Rani berangkat ke sekolah pukul 06.30. Pelajaran dimulai pukul 07.00.',
      'Saat istirahat, jam menunjukkan pukul 09.30. Sekolah selesai pukul 12.00.',
      'Perhatikan pergerakan jarum jam berikut:'
    ],
    bacaanList: [
      'Jarum pendek menunjukkan jam.',
      'Jarum panjang menunjukkan menit.',
      'Jarum panjang bergerak satu putaran penuh dalam 60 menit.'
    ],
    bacaanTeksBawah: [
      'Setiap berpindah satu angka pada jam, jarum panjang bergerak 5 menit.'
    ],
    pertanyaan: 'Berdasarkan pernyataan di atas, isilah table berikut.',
    petunjuk: 'Pilih Sesuai atau Tidak Sesuai untuk setiap pernyataan!',
    kolomTabel: ['Sesuai', 'Tidak Sesuai'],
    barisTabel: [
      'Rani bangun pukul 05.30.',
      'Rani berangkat sekolah pukul 07.00.',
      'Saat istirahat, waktu menunjukkan pukul 09.30.',
      'Pada pukul 06.30, jarum panjang berada di angka 6.',
      'Jarum panjang membutuhkan 30 menit untuk bergerak dari angka 12 ke angka 6.',
      'Jarum panjang bergerak satu angka berarti 10 menit.'
    ],
    kunciTabel: ['Sesuai', 'Tidak Sesuai', 'Sesuai', 'Sesuai', 'Sesuai', 'Tidak Sesuai'],
    kunciText: 'Kunci jawaban: Sesuai, Tidak Sesuai, Sesuai, Sesuai, Sesuai, Tidak Sesuai.',
    kunciTeksReviu: 'Sesuai, Tidak Sesuai, Sesuai, Sesuai, Sesuai, Tidak Sesuai'
  },
  {
    nomorAsli: 33,
    tipe: 'isian',
    bacaanTeks: [
      'Perhatikan posisi jarum pendek dan jarum panjang pada jam dinding.'
    ],
    pertanyaan: 'Ketika jarum pendek menunjuk angka 8 dan jarum panjang menunjuk angka 3, waktu menunjukkan pukul...',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['08.15', '8.15', '08:15', '8:15'],
    kunciText: 'Kunci jawaban: 08.15.',
    kunciTeksReviu: '08.15'
  },
  {
    nomorAsli: 34,
    tipe: 'tabel',
    bacaanTeks: [
      'Perhatikan pernyataan mengenai fungsi jarum jam dan nilai menit pada angka jam dinding.'
    ],
    pertanyaan: 'Isilah tabel di bawah ini sesuai dengan pernyataan.',
    petunjuk: 'Pilih Benar atau Salah untuk setiap pernyataan!',
    kolomTabel: ['Benar', 'Salah'],
    barisTabel: [
      'Jarum panjang menunjukkan menit.',
      'Jarum pendek menunjukkan menit.',
      'Jarum panjang yang menunjuk angka 6 berarti 30 menit.',
      'Jarum panjang yang menunjuk angka 3 berarti 30 menit.',
      'Jarum panjang yang menunjuk angka 9 berarti 45 menit.',
      'Satu putaran penuh jarum panjang membutuhkan 60 menit.',
      'Dari angka 2 ke angka 5 pada jarum panjang berarti waktu bertambah 15 menit.',
      'Dari angka 12 ke angka 3 pada jarum panjang berarti waktu bertambah 10 menit.'
    ],
    kunciTabel: ['Benar', 'Salah', 'Benar', 'Salah', 'Benar', 'Benar', 'Benar', 'Salah'],
    kunciText: 'Kunci jawaban: Benar, Salah, Benar, Salah, Benar, Benar, Benar, Salah.',
    kunciTeksReviu: 'Benar, Salah, Benar, Salah, Benar, Benar, Benar, Salah'
  },
  {
    nomorAsli: 35,
    tipe: 'isian',
    bacaanTeks: [
      'Keluarga Bima akan pergi ke kebun binatang. Mereka berangkat dari rumah pukul 07.15. Perjalanan menuju kebun binatang membutuhkan waktu 45 menit.',
      'Setelah sampai, Bima melihat jam dinding di pintu masuk. Jarum panjang menunjuk angka 12, sedangkan jarum pendek menunjuk angka 8.',
      'Bima berkata, “Jam di pintu masuk menunjukkan pukul 08.00. Jadi, perjalanan dari rumah memakan waktu 45 menit.”'
    ],
    bacaanGambar: 'mtk6-soal-35.png',
    pertanyaan: 'Apakah pernyataan Bima benar?',
    placeholderIsian: 'Ketik jawaban di sini...',
    kunciIsianList: ['benar', 'ya', 'ya, benar'],
    kunciText: 'Kunci jawaban: Benar (07.15 + 45 menit = 08.00).',
    kunciTeksReviu: 'Benar'
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
  if (namaMapel === 'Bahasa Indonesia - SD Sederajat (Paket 1)') {
    return BANK_SOAL_BINDO_PAKET_1.map((item, index) => ({
      ...item,
      nomor: index + 1
    }))
  }

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
  const bacaanRef = useRef<HTMLDivElement | null>(null)

  const [jenjang, setJenjang] = useState('SD/MI/Sederajat')
  const [jenis, setJenis] = useState('Mata Pelajaran Wajib')
  const [mapel, setMapel] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [namaLembaga, setNamaLembaga] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [namaPeserta, setNamaPeserta] = useState('')
  const [namaPesertaManual, setNamaPesertaManual] = useState('')
  const [lockAutofillNama, setLockAutofillNama] = useState(false)
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [hari, setHari] = useState('')
  const [bulan, setBulan] = useState('')
  const [tahun, setTahun] = useState('')

  const [token, setToken] = useState(() => buatToken())
  const [tokenInput, setTokenInput] = useState('')
  const [logoError, setLogoError] = useState(false)

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

  const prosesAntreanNilai = useCallback(async () => {
    if (!navigator.onLine) return
    const antrean = bacaAntreanNilai()
    if (antrean.length === 0) return

    const sisaAntrean: PayloadNilai[] = []
    for (const item of antrean) {
      try {
        await fetch(URL_APPS_SCRIPT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      } catch {
        sisaAntrean.push(item)
      }
    }
    simpanAntreanNilai(sisaAntrean)
  }, [])

  useEffect(() => {
    prosesAntreanNilai()
    const handleOnline = () => {
      prosesAntreanNilai()
    }
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [prosesAntreanNilai])

  useEffect(() => {
    if (halaman !== 'ujian') return
    try {
      localStorage.setItem(
        KEY_SESI_UJIAN,
        JSON.stringify({
          mapel,
          username,
          namaPeserta,
          namaLembaga,
          bankSoalAktif,
          nomorAktif,
          jawaban,
          ragu,
          sisaWaktu
        })
      )
    } catch {
      // abaikan jika storage penuh
    }
  }, [halaman, mapel, username, namaPeserta, namaLembaga, bankSoalAktif, nomorAktif, jawaban, ragu, sisaWaktu])

  useEffect(() => {
    if (halaman === 'ujian' && bacaanRef.current) {
      bacaanRef.current.scrollTop = 0
    }
  }, [halaman, nomorAktif, mapel])

  useEffect(() => {
    if (halaman !== 'konfirmasi') return
    setNamaPesertaManual('')
    setLockAutofillNama(true)
    const timer = window.setTimeout(() => {
      setNamaPesertaManual('')
      setLockAutofillNama(false)
    }, 150)
    return () => window.clearTimeout(timer)
  }, [halaman, sesiKey])

  const keluarKeHalamanAwal = () => {
    setJenjang('SD/MI/Sederajat')
    setJenis('Mata Pelajaran Wajib')
    setMapel('')

    setUsername('')
    setPassword('')
    setNamaLembaga('')
    setShowPassword(false)

    setNamaPeserta('')
    setNamaPesertaManual('')
    setLockAutofillNama(false)
    setJenisKelamin('')
    setHari('')
    setBulan('')
    setTahun('')

    const tokenBaru = buatToken()
    setToken(tokenBaru)
    setTokenInput('')

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

  const kirimNilaiKeGuru = async () => {
    if (sedangMengirim) return
    setSedangMengirim(true)

    let totalPoinMentah = 0
    const maxPoinTotal = Math.max(bankSoalAktif.length, 1)

    bankSoalAktif.forEach(soal => {
      const jawabSiswa = jawaban[soal.nomor]
      if (jawabSiswa === undefined || jawabSiswa === null) return

      if (soal.tipe === 'pg') {
        if (soal.kunciKodePg && jawabSiswa === soal.kunciKodePg) {
          totalPoinMentah += 1
        }
      } else if (soal.tipe === 'pgk' && Array.isArray(jawabSiswa)) {
        const kodeBenarList = soal.kunciKodePgk || []
        const totalBenarSeharusnya = Math.max(kodeBenarList.length, 1)

        let benarDipilih = 0
        let salahDipilih = 0

        jawabSiswa.forEach((kode: string) => {
          if (kodeBenarList.includes(kode)) {
            benarDipilih += 1
          } else {
            salahDipilih += 1
          }
        })

        const skorParsial = Math.max(
          0,
          (benarDipilih - salahDipilih * 0.5) / totalBenarSeharusnya
        )
        totalPoinMentah += skorParsial
      } else if (soal.tipe === 'tabel' && typeof jawabSiswa === 'object') {
        const jumlahBaris = Math.max(soal.barisTabel?.length || 1, 1)
        if (soal.kunciTabel && Array.isArray(soal.kunciTabel)) {
          let barisBenar = 0
          soal.kunciTabel.forEach((kunciBaris, idx) => {
            const pilihanBaris = jawabSiswa[idx + 1]
            if (
              pilihanBaris &&
              String(pilihanBaris).trim().toLowerCase() ===
                String(kunciBaris).trim().toLowerCase()
            ) {
              barisBenar += 1
            }
          })
          totalPoinMentah += barisBenar / jumlahBaris
        }
      } else if (soal.tipe === 'jodoh' && typeof jawabSiswa === 'object') {
        const jumlahPasangan = Math.max(soal.kolomKiri?.length || 1, 1)
        let pasanganBenar = 0

        if (soal.kunciTabel && Array.isArray(soal.kunciTabel)) {
          soal.kunciTabel.forEach((kunciKode, idx) => {
            const pilihanSiswa = jawabSiswa[idx + 1]
            if (
              pilihanSiswa &&
              String(pilihanSiswa).trim().toUpperCase() ===
                String(kunciKode).trim().toUpperCase()
            ) {
              pasanganBenar += 1
            }
          })
        } else if (soal.nomorAsli === 3) {
          if (jawabSiswa[1] === 'A') pasanganBenar += 1
          if (jawabSiswa[2] === 'B') pasanganBenar += 1
          if (jawabSiswa[3] === 'C') pasanganBenar += 1
        }

        totalPoinMentah += pasanganBenar / jumlahPasangan
      } else if (soal.tipe === 'isian' || soal.tipe === 'uraian') {
        if (typeof jawabSiswa === 'string' && jawabSiswa.trim().length > 0) {
          if (soal.kunciIsianList && soal.kunciIsianList.length > 0) {
            const bersih = jawabSiswa.trim().toLowerCase()
            const cocok = soal.kunciIsianList.some(k =>
              bersih.includes(k.toLowerCase())
            )
            if (cocok) totalPoinMentah += 1
          } else {
            totalPoinMentah += 1
          }
        }
      }
    })

    const nilaiSkala100 = Math.round((totalPoinMentah / maxPoinTotal) * 100)

    const payload: PayloadNilai = {
      namaPeserta: namaPeserta.trim(),
      username: username.trim(),
      namaLembaga: namaLembaga.trim(),
      mapel: mapel,
      skor: nilaiSkala100,
      jawaban: jawaban,
      waktuKirim: new Date().toISOString()
    }

    try {
      if (!navigator.onLine) {
        throw new Error('Perangkat sedang offline')
      }
      await fetch(URL_APPS_SCRIPT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } catch {
      const antreanLama = bacaAntreanNilai()
      simpanAntreanNilai([...antreanLama, payload])
    } finally {
      localStorage.removeItem(KEY_SESI_UJIAN)
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

  useEffect(() => {
    if (halaman !== 'ujian' || bankSoalAktif.length === 0) return

    const indeksTarget = [nomorAktif - 2, nomorAktif - 1, nomorAktif]
    const preloaded: HTMLImageElement[] = []

    indeksTarget.forEach(idx => {
      const soal = bankSoalAktif[idx]
      if (!soal?.bacaanGambar) return
      const img = new Image()
      img.decoding = 'async'
      img.src = resolveAssetUrl(soal.bacaanGambar)
      preloaded.push(img)
    })

    return () => {
      preloaded.length = 0
    }
  }, [halaman, bankSoalAktif, nomorAktif])

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
    const userFinal = username.trim() || 'SISWA'
    const passFinal = password.trim() || 'UJIAN'
    const lembagaFinal = namaLembaga.trim() || 'SD Negeri'

    setUsername(userFinal)
    setPassword(passFinal)
    setNamaLembaga(lembagaFinal)
    setNamaPeserta('')
    setNamaPesertaManual('')
    const tBaru = buatToken()
    setToken(tBaru)
    setTokenInput('')
    setHalaman('konfirmasi')
  }

  const refreshToken = () => {
    const tBaru = buatToken()
    setToken(tBaru)
    setTokenInput('')
  }

  const submitKonfirmasi = () => {
    const namaManualBersih = namaPesertaManual.trim()
    if (!namaManualBersih) {
      alert('Silakan tulis Nama Peserta secara manual terlebih dahulu.')
      return
    }

    if (tokenInput.trim().toUpperCase() !== token.trim().toUpperCase()) {
      alert('Token yang Anda tulis belum sesuai dengan token di atas. Silakan tulis ulang token dengan benar.')
      return
    }

    setNamaPeserta(namaManualBersih)

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
          src={`${import.meta.env.BASE_URL}logo-tutwuri.png`}
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
    : namaPesertaManual.trim()
      ? `${namaPesertaManual.trim()} - PESERTA SAS 1`
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

  if (halaman === 'awal') {
    return (
      <div key={`awal-${sesiKey}`} className="awal-page">
        <header className="awal-header">
          <div className="awal-brand">
            <LogoTutWuri />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.35 }}>
              <strong>PUSMENDIK</strong>
              <small>APLIKASI Sumatif Akhir Semester 1 (SAS 1)</small>
              <small style={{ fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>Kelas VI (Enam)</small>
            </div>
          </div>
        </header>

        <main className="awal-main">
          <div className="awal-card">
            <div className="awal-icon">🎓</div>
            <h1 style={{ color: '#0f172a', fontWeight: 800 }}>Sumatif Akhir Semester 1 (SAS 1)</h1>
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
            <p>Silakan login untuk memulai simulasi</p>

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
                placeholder="Nama Lembaga / Sekolah"
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
                  key={`nama-peserta-manual-${sesiKey}`}
                  type="text"
                  name={`nama_peserta_tulis_tangan_${sesiKey}`}
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="words"
                  spellCheck={false}
                  readOnly={lockAutofillNama}
                  placeholder="Ketikkan Nama Peserta"
                  value={namaPesertaManual}
                  onFocus={() => {
                    if (lockAutofillNama) setLockAutofillNama(false)
                  }}
                  onChange={e => setNamaPesertaManual(e.target.value)}
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
                  key={`token-input-${token}-${sesiKey}`}
                  type="text"
                  name={`manual_kode_token_${token}_${sesiKey}`}
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder="Ketikkan Token sesuai di atas"
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
                📖 &nbsp;{mapel || 'Matematika - SD Sederajat (Paket 1)'}
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
                      .map(([k, v]) => `${k}-${v}`)
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

  const daftarNomorAktif = Array.from({ length: bankSoalAktif.length || 1 }, (_, i) => i + 1)
  const soalAktif = bankSoalAktif[nomorAktif - 1] || bankSoalAktif[0]
  const isBindo = mapel === 'Bahasa Indonesia - SD Sederajat (Paket 1)'
  const isMtkKelas6 = mapel === 'Matematika - SD Sederajat (Paket 1)'
  const isMtkNomor2GambarBesar = Boolean(isMtkKelas6 && soalAktif && soalAktif.nomorAsli === 2)
  const isMtkNomor5GambarBesar = Boolean(isMtkKelas6 && soalAktif && soalAktif.nomorAsli === 5)
  const isMtkNomor7GambarBesar = Boolean(isMtkKelas6 && soalAktif && soalAktif.nomorAsli === 7)
  const isMtkGambarBesarTanpaTeks = Boolean(
    isMtkKelas6 &&
      soalAktif &&
      [2, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 27, 28].includes(soalAktif.nomorAsli)
  )
  const isBindoGambar1to4 = Boolean(isBindo && soalAktif && [1, 2, 3, 4].includes(soalAktif.nomorAsli))
  const isBindoGambarScrollPenuh = Boolean(
    isBindo && soalAktif && NOMOR_BINDO_GAMBAR_SCROLL_PENUH.includes(soalAktif.nomorAsli)
  )
  const isBindoNomor20_29_30 = Boolean(
    isBindo && soalAktif && [20, 29, 30].includes(soalAktif.nomorAsli)
  )
  const isBindoGambarBesarTanpaTeks = Boolean(
    isBindo &&
      soalAktif &&
      !isBindoGambarScrollPenuh &&
      [10, 11, 12, 13, 19, 22, 25, 28].includes(soalAktif.nomorAsli)
  )
  const isBindoPasKotakPutih = Boolean(
    isBindo &&
      soalAktif &&
      !isBindoGambarScrollPenuh &&
      [22, 25, 28].includes(soalAktif.nomorAsli)
  )
  const isBindoGambarScrollBesar = Boolean(
    isBindo && soalAktif && [19, 23, 24, 26, 27].includes(soalAktif.nomorAsli)
  )

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
            <p>
              {isMtkKelas6
                ? 'Perhatikan gambar/ilustrasi di sebelah kiri dan soal di sebelah kanan dengan teliti.'
                : 'Bacalah cerita dengan cermat. Jawablah setiap soal sesuai petunjuk. Periksa kembali jawaban sebelum mengakhiri tes.'}
            </p>
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
                    ${jawaban[n] !== undefined ? 'terjawab' : ''}
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

        {soalAktif && (
          <div className="area-soal">
            <div
              ref={bacaanRef}
              className="bacaan-soal"
              style={{
                fontSize: `${ukuranFont}px`,
                height: '440px',
                maxHeight: '440px',
                overflowY: isBindoPasKotakPutih ? 'hidden' : 'auto',
                overflowX: isBindoPasKotakPutih ? 'hidden' : 'auto',
                padding: isBindoNomor20_29_30 || isBindoGambarScrollPenuh
                  ? '6px 14px 36px 8px'
                  : isMtkNomor2GambarBesar || isMtkNomor5GambarBesar || isMtkNomor7GambarBesar
                    ? '6px'
                    : isMtkGambarBesarTanpaTeks
                      ? '8px'
                      : isMtkKelas6
                        ? '8px 12px 8px 4px'
                        : isBindoPasKotakPutih
                          ? '10px'
                          : isBindoGambarScrollBesar
                            ? '8px'
                            : '4px 12px 4px 4px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isBindoNomor20_29_30 || isBindoGambarScrollPenuh
                  ? 'flex-start'
                  : isMtkGambarBesarTanpaTeks || isBindoGambarBesarTanpaTeks || isBindoPasKotakPutih
                    ? 'center'
                    : 'flex-start',
                alignItems: isBindoNomor20_29_30 || isBindoGambarScrollPenuh
                  ? 'stretch'
                  : 'center'
              }}
            >
              {soalAktif.bacaanJudul &&
                !(isBindo && [1, 2, 3, 4, 10, 11, 12, 13, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].includes(soalAktif.nomorAsli)) && (
                  <h3 style={{ marginTop: 0, marginBottom: '12px', textAlign: 'center', color: '#1e293b', width: '100%' }}>
                    {soalAktif.bacaanJudul}
                  </h3>
                )}

              {soalAktif.bacaanTeks && soalAktif.bacaanTeks.length > 0 && (
                <div style={{ textAlign: 'left', lineHeight: 1.7, marginBottom: '12px', width: '100%' }}>
                  {soalAktif.bacaanTeks.map((paragraf, idx) => (
                    <p key={idx} style={{ marginBottom: '10px', textIndent: isBindo ? '2em' : '0' }}>
                      {paragraf}
                    </p>
                  ))}
                </div>
              )}

              {soalAktif.bacaanList && soalAktif.bacaanList.length > 0 && (
                <ul
                  style={{
                    textAlign: 'left',
                    lineHeight: 1.7,
                    marginTop: '-4px',
                    marginBottom: '10px',
                    paddingLeft: '24px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  {soalAktif.bacaanList.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {soalAktif.bacaanTabel && (
                <div style={{ width: '100%', marginBottom: '12px', overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '0.92em',
                      background: '#ffffff'
                    }}
                  >
                    <thead>
                      <tr>
                        {soalAktif.bacaanTabel.headers.map((head, idx) => (
                          <th
                            key={idx}
                            style={{
                              border: '1px solid #cbd5e1',
                              background: '#e2e8f0',
                              color: '#0f172a',
                              padding: '8px 12px',
                              textAlign: 'left',
                              fontWeight: 700
                            }}
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {soalAktif.bacaanTabel.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              style={{
                                border: '1px solid #cbd5e1',
                                padding: '8px 12px',
                                color: '#1e293b'
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {soalAktif.bacaanTeksBawah && soalAktif.bacaanTeksBawah.length > 0 && (
                <div style={{ textAlign: 'left', lineHeight: 1.7, marginBottom: '12px', width: '100%' }}>
                  {soalAktif.bacaanTeksBawah.map((paragraf, idx) => (
                    <p key={idx} style={{ marginBottom: '10px' }}>
                      {paragraf}
                    </p>
                  ))}
                </div>
              )}

              {soalAktif.bacaanGambar && (
                <GambarSoal
                  srcRaw={soalAktif.bacaanGambar}
                  alt={`Ilustrasi Soal ${soalAktif.nomor}`}
                  nomorAsli={soalAktif.nomorAsli}
                  isMtk={isMtkKelas6}
                  isBindoGambar1to4={isBindoGambar1to4}
                  fullWidthScroll={isBindoGambarScrollBesar || isBindoNomor20_29_30}
                  expandFullWidth={isBindoGambarScrollPenuh || isBindoNomor20_29_30}
                  maxHeight={
                    isBindoNomor20_29_30 || isBindoGambarScrollPenuh
                      ? 'none'
                      : isMtkGambarBesarTanpaTeks
                        ? '410px'
                        : isMtkKelas6
                          ? '280px'
                          : isBindoPasKotakPutih
                            ? '360px'
                            : isBindoGambarScrollBesar
                              ? '360px'
                              : isBindoGambarBesarTanpaTeks
                                ? '380px'
                                : isBindoGambar1to4
                                  ? '290px'
                                  : '260px'
                  }
                />
              )}

              {isMtkKelas6 && [30, 33, 34].includes(soalAktif.nomorAsli) && (
                <IlustrasiOtomatisMtk nomorAsli={soalAktif.nomorAsli} />
              )}
            </div>

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

              {soalAktif.tipe === 'jodoh' &&
                soalAktif.kolomKiri &&
                soalAktif.kolomKanan && (
                  <PanelMenjodohkanTarikGaris
                    nomorSoal={soalAktif.nomor}
                    kolomKiri={soalAktif.kolomKiri}
                    kolomKanan={soalAktif.kolomKanan}
                    nilaiJawaban={jawaban[soalAktif.nomor]}
                    onPilihPasangan={(barisKiri, kodeKanan) => {
                      if (!kodeKanan) {
                        const salinan = { ...(jawaban[soalAktif.nomor] || {}) }
                        delete salinan[barisKiri]
                        pilihJawaban(soalAktif.nomor, salinan)
                      } else {
                        pilihBaris(soalAktif.nomor, barisKiri, kodeKanan)
                      }
                    }}
                  />
                )}

              {soalAktif.tipe === 'isian' && (
                <input
                  className="isian-jawaban"
                  type="text"
                  placeholder="Ketik jawaban di sini..."
                  value={jawaban[soalAktif.nomor] || ''}
                  onChange={e => pilihJawaban(soalAktif.nomor, e.target.value)}
                />
              )}

              {soalAktif.tipe === 'uraian' && (
                <textarea
                  className="isian-jawaban"
                  rows={5}
                  style={{ width: '100%', resize: 'vertical', padding: '12px' }}
                  placeholder="Ketik jawaban di sini..."
                  value={jawaban[soalAktif.nomor] || ''}
                  onChange={e => pilihJawaban(soalAktif.nomor, e.target.value)}
                />
              )}
            </div>
          </div>
        )}

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