# Okey 101 — Oyun Geçmişi İzleyici

Okey 101 oyunlarının geçmişini adım adım görselleştiren, React + TypeScript tabanlı bir playback uygulaması.

2 ve 4 kişilik oyun verilerini yükleyerek hamleleri otomatik veya manuel olarak izleyebilir, açılan taşları, ıskarta yığınlarını ve kazananı görebilirsiniz.

<img width="1898" height="901" alt="image" src="https://github.com/user-attachments/assets/5701c45b-ddb8-4a4a-bef5-ed51907b798f" />


## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama varsayılan olarak [http://localhost:5173](http://localhost:5173) adresinde açılır.

## 📦 Diğer Scriptler

| Script | Açıklama |
|--------|----------|
| `npm run dev` | Vite dev server başlatır |
| `npm run build` | TypeScript derler + production build oluşturur |
| `npm run preview` | Production build'i yerel olarak sunar |
| `npm run lint` | ESLint ile kod kontrolü yapar |
| `npm run test` | Vitest ile testleri çalıştırır |
| `npm run storybook` | Storybook'u `localhost:6006`'da başlatır |
| `npm run build-storybook` | Storybook'un static build'ini oluşturur |

## 🗂️ Proje Yapısı

```
101/
├── public/                    # Statik dosyalar (favicon, manifest, og-image)
├── src/
│   ├── assets/
│   │   └── images/tiles/      # Taş görselleri (Yellow_1.png, BackTiles.png, vb.)
│   ├── components/
│   │   ├── ActionCounter/     # Mevcut hamle / toplam hamle sayacı
│   │   ├── DiscardStack/      # Oyuncuların ıskarta yığınları
│   │   ├── GameBoard/         # Ana oyun tahtası layout'u
│   │   ├── GameSelector/      # Oyun seçim ekranı (2 / 4 kişilik)
│   │   ├── LoadingScreen/     # Yükleme ekranı
│   │   ├── OpeningArea/       # Açılan taşlar alanı
│   │   ├── PairOpeningGrid/   # Çift açma grid'i
│   │   ├── PlaybackControls/  # Oynat / durdur / ileri / geri kontrolleri
│   │   ├── PlayerOpeningGrid/ # Oyuncu açma grid'i
│   │   ├── PlayerRack/        # Oyuncu el taşları
│   │   ├── TileComponent/     # Tekil taş görseli
│   │   └── WinnerOverlay/     # Kazanan overlay animasyonu
│   ├── context/
│   │   └── WinnerContext.tsx   # Kazanan state yönetimi (React Context)
│   ├── hooks/
│   │   └── useGameEngine.ts   # Oyun motoru: state hesaplama, playback kontrolü
│   ├── utils/
│   │   ├── constants.ts       # Aksiyon isimleri ve sabitler
│   │   ├── gridUtils.ts       # Açma grid'i hesaplama fonksiyonları
│   │   ├── tileUtils.ts       # Taş görsel yolu, aksiyon etiketi vb.
│   │   └── __tests__/         # Unit testler
│   ├── types.ts               # TypeScript tipleri
│   ├── App.tsx                # Ana uygulama bileşeni
│   ├── App.css                # Global stiller
│   └── main.tsx               # React giriş noktası
├── .storybook/                # Storybook konfigürasyonu
├── 2_players.json             # 2 kişilik oyun verisi
├── 4_players.json             # 4 kişilik oyun verisi
├── eslint.config.js           # ESLint konfigürasyonu
├── tsconfig.json              # TypeScript konfigürasyonu
├── vite.config.ts             # Vite konfigürasyonu
└── package.json
```

## ✨ Özellikler

- **Dinamik Oyuncu Layout'u** — 2 ve 4 kişilik oyunlara otomatik uyum
- **Otomatik Playback** — Saniyede bir hamle ilerleyen otomatik oynatma
- **Manuel Kontrol** — İleri, geri, durdur, başa dön
- **Okey Gösterimi** — Okey taşı belirgin badge ile işaretli
- **Açma Alanı** — Standart ve çift açmalar grid üzerinde görselleştirme
- **Kalan Taş Sayısı** — Havuzdaki taş sayısı gerçek zamanlı güncelleme
- **Kazanan Overlay** — Animasyonlu tam ekran kazanan bildirimi (confetti + trophy)
- **Hamle Sayacı** — Mevcut / toplam hamle bilgisi
- **Iskarta Yığınları** — Her oyuncuya özel ıskarta görselleştirme

## 🛠️ Teknolojiler

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| React | 19.x | UI framework |
| TypeScript | 5.9 | Tip güvenliği |
| Vite | 7.x | Build tool & dev server |
| SCSS Modules | — | Scoped component stilleri |
| Storybook | 10.x | Component geliştirme & dokümantasyon |
| Vitest | 4.x | Unit testler |
| ESLint + Prettier | — | Kod kalitesi & formatlama |
| Husky + lint-staged | — | Pre-commit hook'ları |

## 🔮 Geliştirilebilecek Özellikler

- **Taş Animasyonları** — Çekme, atma ve açma işlemlerinde smooth geçiş animasyonları
- **Hız Kontrolü** — Playback hızını ayarlayabilme (0.5x, 1x, 2x, 4x)
- **Timeline Slider** — Hamlelerde sürüklenebilir slider ile gezinme
- **Ses Efektleri** — Taş çekme, atma, açma sesler
- **Mobil Responsive** — Küçük ekranlar için optimize edilmiş layout
- **Oyun İstatistikleri** — Toplam çekme/atma sayısı, açma puanları gibi dashboard
- **Farklı Tema Desteği** — Açık/koyu tema seçenekleri
- **Oyun Karşılaştırma** — İki farklı oyunu yan yana izleme
- **Hamle Filtresi** — Belirli bir oyuncunun hamlelerini filtreleme
- **Paylaşım** — Belirli bir hamlenin linkini paylaşabilme
- **PWA Desteği** — Offline çalışabilme ve ana ekrana ekleme
- **i18n** — Çoklu dil desteği (EN / TR)
