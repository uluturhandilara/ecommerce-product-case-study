# E-ticaret Ürün Listeleme ve Detay Sayfası

Bir e-ticaret platformunun ürün listeleme ve ürün detay sayfalarını içeren frontend case study projesi. Kullanıcılar ürünleri listeleyebilir, bir ürüne tıklayarak detay sayfasına gidebilir; detay sayfasında ürün bilgileri, görseller ve yorumlar gösterilir. Veri [JSONPlaceholder](https://jsonplaceholder.typicode.com) API’sinden alınır.

## Özellikler

- **Ürün listesi:** Tüm ürünlerin isim, fiyat ve kısa açıklaması; bir ürüne tıklanınca detay sayfasına yönlendirme
- **Ürün detayı:** Ürün adı, fiyat, açıklama, görsel(ler) ve kullanıcı yorumları
- Loading ve hata durumları; hata sonrası yeniden deneme (retry)
- Responsive arayüz, erişilebilirlik (aria, klavye odakları, anlamlı başlıklar) ve performans odaklı yapı (lazy loading, memoization)

## Teknoloji ve Yapı

- **React 19** + **Vite 7**
- **React Router** (sayfa geçişleri)
- **Redux Toolkit** (state yönetimi)
- **Tailwind CSS** (stil ve responsive)
- Modüler yapı: `app/` (store, router, slices), `features/` (ürün listesi, detay, yorumlar), `pages/`, `shared/` (API, UI bileşenleri)

### State yönetimi tercihi: Redux Toolkit

- Ürün listesi ve detay sayfası aynı ürün verisini kullanıyor; merkezi state ile tek kaynak (single source of truth) sağlandı.
- API istekleri, initial load ve error durumları async thunk’larla yönetiliyor; bileşenler sadece selector ve dispatch kullanıyor.
- Yorumlar ayrı slice’ta tutuluyor; ileride filtreleme, sayfalama veya başka modüller eklenirse store genişletilebilir.

## Gereksinimler

- **Node.js** 18+
- **npm** 9+

## Projeyi çalıştırma (adım adım)

1. **Projeyi klonlayın** (veya indirip açın):
   ```bash
   git clone <repo-url>
   cd ecommerce-product-case-study
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. Tarayıcıda Vite’ın gösterdiği adrese gidin (`http://localhost:5173`). Ürün listesi ana sayfada açılır; bir ürüne tıklayarak detay sayfasına gidebilirsiniz.

## Diğer komutlar

- **Production build:**
  ```bash
  npm run build
  ```
- **Build’i yerel olarak önizleme:**
  ```bash
  npm run preview
  ```
- **Lint:**
  ```bash
  npm run lint
  ```

## Testler

Projede **Vitest** ve **React Testing Library** ile unit ve integration testler bulunur.

- **Testleri çalıştırma (watch modunda):**
  ```bash
  npm test
  ```
- **Testleri tek seferde çalıştırma (CI için):**
  ```bash
  npm run test:run
  ```

### Test stratejisi

- **Unit / component testleri:** `Spinner`, `ErrorMessage`, `ProductCard`, `ProductList` gibi bileşenlerin doğru render edilmesi, erişilebilirlik (role, label, alt) ve kullanıcı etkileşimleri (retry butonu) test edilir.
- **Integration testleri:** `ProductListPage` ve `ProductDetailPage` sayfaları Redux store ve API mock’u ile birlikte test edilir; loading, başarılı veri yükleme, hata ve retry senaryoları kapsanır.
- API çağrıları test ortamında `src/shared/api/products.js` modülü mock’lanarak gerçek ağ isteği yapılmaz.

## API

Veri [JSONPlaceholder](https://jsonplaceholder.typicode.com) kullanılarak alınır: `/posts` ürün listesi ve detay, `/posts/:id/comments` ilgili ürün yorumları için kullanılır. Görseller [Picsum Photos](https://picsum.photos) ile ürün id’sine göre üretilir.

## Proje yapısı

```
src/
├── app/           # Store, router, Redux slices
├── features/      # product list, product detail, comments
├── pages/         # ProductListPage, ProductDetailPage
├── shared/        # API client, UI (Button, Card, Image, Spinner, ErrorMessage, vb.)
├── App.jsx
├── main.jsx
└── index.css
```

---

Bu proje, e-ticaret ürün listeleme ve detay sayfası frontend case study kapsamında geliştirilmiştir.
