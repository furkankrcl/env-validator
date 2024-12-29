# env-validator

**env-validator** bir CLI aracıdır. `.env` dosyalarını belirtilen bir `config` dosyasına göre doğrulamanıza yardımcı olur. Değişkenlerin varlığını, tiplerini, değerlerini (regex ve enum) kontrol edebilir ve eksik ya da yanlış yapılandırılmış değişkenleri raporlar.

## 📖 Diğer Diller

- [English (README.md)](README.md)

## 🚀 Özellikler

- Birden fazla `.env` dosyasını kontrol edebilir.
- Geliştirici tarafından belirlenen kurallara göre:
  - Değişkenlerin varlığını kontrol eder.
  - Değişken tiplerini (`string`, `number`, `boolean`, `enum`) doğrular.
  - Regex ve enum kurallarını uygular.
  - Bir `.env` dosyasında var olup diğerinde eksik olan değişkenleri raporlar.
  - Bir `.env` dosyasında var olup `<config>.json` dosyasında tanımlanmayan değişkenleri raporlar.
- Kolay CLI kullanımı.

## 🛠️ Kurulum

### **NPM üzerinden yükleme**:

Paketinizi şu komutla global olarak yükleyin:

```bash
npm install -g env-validator-cli
```

#### Doğruluğunu kontrol edin:

Kurulumun başarılı olduğunu doğrulamak için:

```bash
env-validator-cli --help
```

## 📂 Yapılandırma (Config Dosyası)

Aracın çalışması için bir config dosyasına ihtiyacı vardır. Config dosyasını JSON, TS veya JS formatında oluşturabilirsiniz.

### Özellikler

- `envPath`:
  - .env dosyalarının bulunduğu dizini belirtir.
  - Varsayılan olarak pwd (komutun çalıştığı mevcut dizin) kullanılır.
- `envFiles`:
  - Kontrol edilecek .env dosyalarının isimlerini belirten bir dizidir.
  - Varsayılan olarak `[".env"]` şeklindedir.
- `variables`:
  - .env dosyalarında bulunması gereken değişkenlerin tanımlarını içerir.
  - Her değişken için:
    - `required`: Değişkenin zorunlu olup olmadığını belirtir (true veya false).
    - `type`: Değişkenin tipi (string, number, boolean, enum).
    - `regex`: Değişkenin değerinin eşleşmesi gereken bir düzenli ifade (isteğe bağlı).
    - `enum`: Değişkenin alabileceği değerleri belirten bir liste (type enum olduğu durumda kullanılmalıdır).

**Örnek Config Dosyası** (config.json):

```json
{
  "envPath": "./envs",
  "envFiles": [".env", ".env.production"],
  "variables": {
    "API_KEY": { "required": true, "type": "string" },
    "DB_PORT": { "required": true, "type": "number" },
    "ENV_MODE": {
      "required": false,
      "type": "enum",
      "enum": ["development", "staging", "production"]
    },
    "EMAIL": {
      "required": false,
      "type": "string",
      "regex": "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
    }
  }
}
```

## 🔧 Kullanım

### Komut:

Config dosyanızın yolunu belirterek çalıştırabilirsiniz:

```bash
env-validator-cli --config=path/to/config.json
```

### Örnek Çıktılar:

1. Tüm değişkenler doğruysa:

   ```bash
   All environment variables are valid.
   ```

2. Eksik veya hatalı değişkenler varsa:

   ```bash
   Missing required variable: API_KEY in .env.production
   Invalid type for DB_PORT in .env: Expected number, got string
   ```

## 📜 Lisans

Bu proje [MIT](https://opensource.org/licenses/MIT) lisansı ile lisanslanmıştır. Daha fazla bilgi için [`LICENSE`](./LICENSE) dosyasına bakabilirsiniz.

## 🤝 Katkı Sağlama

Katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın.
