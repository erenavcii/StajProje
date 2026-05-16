# StajProje

ASP.NET Core Web API ve Angular kullanılarak geliştirilmiş fatura yönetim sistemi.

## Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Backend | ASP.NET Core 10 Web API |
| Frontend | Angular 21 + Bootstrap |
| Veritabanı | SQL Server 2019 |
| ORM | Entity Framework Core |
| Kimlik Doğrulama | JWT Bearer Token |

## Ön Gereksinimler

Projeyi çalıştırabilmek için aşağıdaki yazılımların kurulu olması gerekmektedir.

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- [SQL Server 2019+](https://www.microsoft.com/tr-tr/sql-server/sql-server-downloads)

## Veritabanı Kurulumu

Proje dizinindeki `database.sql` dosyası SQL Server Management Studio üzerinden çalıştırıldığında `StajProje` veritabanı ve gerekli tablolar otomatik olarak oluşturulacaktır.

Kurulum sonrasında sisteme giriş için aşağıdaki test kullanıcısı tanımlıdır.

| Alan | Değer |
|------|-------|
| Kullanıcı adı | admin |
| Şifre | 1234 |

## Yapılandırma

`StajProje.API/appsettings.json` dosyasındaki bağlantı dizesinin yerel SQL Server adıyla güncellenmesi gerekmektedir.

```json
"DefaultConnection": "Server=SUNUCU_ADIN;Database=StajProje;Trusted_Connection=True;TrustServerCertificate=True;"
```

SQL Server adı, SSMS bağlantı ekranının üst kısmında görüntülenmektedir.

## Çalıştırma

**Backend**
```bash
cd StajProje.API
dotnet run
```
API ayağa kalktıktan sonra Swagger arayüzüne `/swagger` yoluyla erişilebilir.

**Frontend**
```bash
cd StajProje.UI
npm install
ng serve
```
Uygulama varsayılan olarak `http://localhost:4200` adresinde çalışmaktadır.
