# README

Hướng dẫn deploy NEXTJS server.

### Yêu cầu cài đặt
1. Nodejs@12x
1. yarn
```
$ npm install --global yarn
```
1. pm2
```
$ npm install pm2@latest -g
# or
$ yarn global add pm2
```

### Tạo site tương ứng với mỗi brand trong CMS server
1. Truy cập server [CMS](https://brand-gogi-dev.ggg.systems/admin/plugins/content-manager/collectionType/application::site.site)
1. Bên tab Sites trong Collection Types click chọn **Add New Site**
1. Điền thông tin tương ứng với Brand (Site_code, Name, Upload site logo)
1. Click **Save**

### Nginx config (ứng với mỗi subdomain)

1. cd vào thư mục sites-available `$ cd /etc/nginx/sites-available`.
1. Tạo 1 subdomain config file  `sub.domain.com.conf`.
1. Copy config vào file (thay thế server name trong []):
```
server {
    index index.html index.htm index.nginx-debian.html;

    server_name [sub.domain.com];
    
    location / {
        proxy_pass http://localhost:3041;
        proxy_set_header Host            $host;
    }
}
```
1. Config let's crypt https (nếu cần thiết):
```
$ sudo certbot --nginx -d sub.domain.com
# press 2
```
1. Copy config từ sites-available sang sites-enabled:
```
$ sudo ln -s /etc/nginx/sites-available/sub.domain.com.conf /etc/nginx/sites-enabled/
```
1. Reload nginx service:
```
$ sudo service nginx reload
```

### Deploy NEXT JS

1. Clone file `.env.example` ra file `.env` và thêm config vào `.env`.
    1. **NEXT_PUBLIC_API_HOST**: api backend address dùng cho tool dev.
    1. **NEXT_PUBLIC_KEY_TINY_EDITOR**: Tiny editor key.
    1. **API_HOST**: api backend host dùng cho next server, nếu host cả next server và backend cùng 1 server thì có thể  dùng http://localhost:1341.
    1. **NEXTJS_USERNAME**: username dùng để truy cập data base của backend *(user này phải có quyền admin,  có thể get được tất cả các site)*.
    1. **NEXTJS_PASSWORD**: password cho nextjs user.
    1. **NEXT_PUBLIC_GGG_BRAND_PCMS**: Brand pcms api host.
    1. **NEXT_PUBLIC_GGG_INTERNAL**: GGG internal api host.
    
1. Cấp quyền đọc + ghi cho folder frontend.
1. Chạy lệnh: 
```
# deploy gogi by default
$ sudo sh deploy.sh
```