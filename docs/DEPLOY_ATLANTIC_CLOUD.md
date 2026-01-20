# Hướng Dẫn Deploy HRM-Lite lên Atlantic.Net Cloud

## 📋 Mục Lục

1. [Chuẩn Bị](#1-chuẩn-bị)
2. [Tạo Server trên Atlantic.Net](#2-tạo-server-trên-atlanticnet)
3. [Cài Đặt Docker trên Server](#3-cài-đặt-docker-trên-server)
4. [Upload Code lên Server](#4-upload-code-lên-server)
5. [Cấu Hình Environment](#5-cấu-hình-environment)
6. [Deploy Application](#6-deploy-application)
7. [Cấu Hình SSL (HTTPS)](#7-cấu-hình-ssl-https)
8. [Backup & Monitoring](#8-backup--monitoring)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Chuẩn Bị

### Yêu cầu tối thiểu Server:
- **CPU**: 2 vCPU
- **RAM**: 4GB (recommend 8GB)
- **Storage**: 40GB SSD
- **OS**: Ubuntu 22.04 LTS hoặc Ubuntu 24.04 LTS
- **Network**: Public IPv4

### Trên máy local cần có:
- SSH client
- Git
- rsync hoặc scp

---

## 2. Tạo Server trên Atlantic.Net

### Bước 1: Đăng nhập Atlantic.Net
```
https://cloud.atlantic.net
```

### Bước 2: Tạo Cloud Server
1. Click **"Create Server"** hoặc **"Add Server"**
2. Chọn **Location**: Chọn region gần nhất (Orlando, New York, etc.)
3. Chọn **Image**: Ubuntu 22.04 LTS
4. Chọn **Size**: 
   - Minimum: 2GB RAM, 1 vCPU ($10/month)
   - Recommended: 4GB RAM, 2 vCPU ($20/month)
5. **SSH Keys**: Add SSH public key của bạn
6. **Hostname**: `hrm-lite-prod`
7. Click **"Create Server"**

### Bước 3: Lấy IP Address
Sau khi tạo xong, note lại **Public IP** (ví dụ: `45.79.123.45`)

---

## 3. Cài Đặt Docker trên Server

### SSH vào server:
```bash
ssh root@YOUR_SERVER_IP
# hoặc
ssh -i ~/.ssh/your_key root@YOUR_SERVER_IP
```

### Cài đặt Docker:
```bash
# Update system
apt update && apt upgrade -y

# Install dependencies
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Enable Docker to start on boot
systemctl enable docker
systemctl start docker

# Verify installation
docker --version
docker compose version
```

### Tạo user deploy (khuyến nghị):
```bash
# Tạo user
adduser deploy
usermod -aG docker deploy
usermod -aG sudo deploy

# Cho phép SSH
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

---

## 4. Upload Code lên Server

### Option A: Sử dụng rsync (Recommended)
```bash
# Từ máy local, chạy:
cd /Volumes/DATA/VSCODE/tinh-luong

# Sync code lên server
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  --exclude '.env' \
  --exclude '.env.v2' \
  --exclude 'postgres_data*' \
  --exclude 'redis_data*' \
  ./ deploy@YOUR_SERVER_IP:/home/deploy/hrm-lite/
```

### Option B: Sử dụng Git
```bash
# Trên server:
cd /home/deploy
git clone https://github.com/YOUR_REPO/hrm-lite.git
cd hrm-lite
```

### Option C: Sử dụng SCP
```bash
# Từ máy local:
# Tạo archive
tar --exclude='node_modules' --exclude='.git' --exclude='dist' \
  -czvf hrm-lite.tar.gz -C /Volumes/DATA/VSCODE tinh-luong

# Upload
scp hrm-lite.tar.gz deploy@YOUR_SERVER_IP:/home/deploy/

# Trên server, extract:
cd /home/deploy
tar -xzvf hrm-lite.tar.gz
mv tinh-luong hrm-lite
```

---

## 5. Cấu Hình Environment

### SSH vào server và tạo file .env.v2:
```bash
ssh deploy@YOUR_SERVER_IP
cd /home/deploy/hrm-lite
nano .env.v2
```

### Nội dung file .env.v2 cho Production:
```env
# ========================================
# HRM-LITE v2 - PRODUCTION
# ========================================

# Database - PostgreSQL
POSTGRES_USER=hrmlite
POSTGRES_PASSWORD=CHANGE_ME_STRONG_PASSWORD_123!
POSTGRES_DB=hrm_lite
DB_PORT=5432

# Redis Cache
REDIS_PORT=6379

# Backend API
API_PORT=3001
NODE_ENV=production
LOG_LEVEL=info

# JWT Authentication (QUAN TRỌNG: Đổi secret key!)
JWT_SECRET=CHANGE_ME_TO_RANDOM_STRING_64_CHARS_MINIMUM_!@#$%^&*
JWT_EXPIRATION=24h
JWT_REFRESH_EXPIRATION=7d

# CORS Origins - Thay YOUR_DOMAIN bằng domain thực
CORS_ORIGINS=http://YOUR_SERVER_IP,https://YOUR_DOMAIN.com,https://www.YOUR_DOMAIN.com

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100

# Frontend Web
WEB_PORT=80
WEB_SSL_PORT=443
VITE_API_URL=/api

# Tools (tắt trên production)
# ADMINER_PORT=8080
```

### Tạo password mạnh:
```bash
# Tạo random password cho Postgres
openssl rand -base64 24

# Tạo JWT secret
openssl rand -base64 48
```

---

## 6. Deploy Application

### Bước 1: Build và Start Docker
```bash
cd /home/deploy/hrm-lite

# Pull images và build
docker compose -f docker-compose.v2.yml build --no-cache

# Start containers
docker compose -f docker-compose.v2.yml up -d

# Kiểm tra status
docker compose -f docker-compose.v2.yml ps
```

### Bước 2: Chạy Database Migrations
```bash
# Vào backend container
docker exec -it hrm-lite-backend-v2 sh

# Chạy Prisma migrations
npx prisma migrate deploy

# Seed data (nếu cần)
npx prisma db seed

# Exit
exit
```

### Bước 3: Kiểm tra logs
```bash
# Xem logs tất cả services
docker compose -f docker-compose.v2.yml logs -f

# Xem logs từng service
docker logs -f hrm-lite-backend-v2
docker logs -f hrm-lite-frontend-v2
docker logs -f hrm-lite-db-v2
```

### Bước 4: Verify deployment
```bash
# Check health
curl http://localhost:3001/health

# Check frontend
curl http://localhost:80
```

---

## 7. Cấu Hình SSL (HTTPS)

### Option A: Sử dụng Certbot + Let's Encrypt

```bash
# Cài đặt Certbot
apt install -y certbot

# Tạm dừng frontend để lấy cert
docker stop hrm-lite-frontend-v2

# Lấy certificate
certbot certonly --standalone -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# Start lại frontend
docker start hrm-lite-frontend-v2
```

### Cập nhật Nginx config trong frontend:

Tạo file `frontend/nginx-ssl.conf`:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;
    
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://backend:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option B: Sử dụng Cloudflare (Recommended)

1. Thêm domain vào Cloudflare
2. Đổi nameservers về Cloudflare
3. Enable **Flexible SSL** hoặc **Full SSL**
4. Enable **Always Use HTTPS**

---

## 8. Backup & Monitoring

### Backup Database hàng ngày:
```bash
# Tạo script backup
nano /home/deploy/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/deploy/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker exec hrm-lite-db-v2 pg_dump -U hrmlite hrm_lite | gzip > $BACKUP_DIR/hrm_lite_$DATE.sql.gz

# Xóa backup cũ hơn 7 ngày
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/hrm_lite_$DATE.sql.gz"
```

```bash
# Phân quyền và schedule cron
chmod +x /home/deploy/backup-db.sh
crontab -e

# Thêm dòng này để backup lúc 2h sáng mỗi ngày
0 2 * * * /home/deploy/backup-db.sh >> /home/deploy/backup.log 2>&1
```

### Monitor containers:
```bash
# Xem resource usage
docker stats

# Setup auto-restart nếu container crash
docker update --restart=always hrm-lite-db-v2
docker update --restart=always hrm-lite-redis-v2
docker update --restart=always hrm-lite-backend-v2
docker update --restart=always hrm-lite-frontend-v2
```

---

## 9. Troubleshooting

### Container không start:
```bash
# Xem detailed logs
docker logs hrm-lite-backend-v2 --tail 100

# Kiểm tra disk space
df -h

# Kiểm tra memory
free -m
```

### Database connection error:
```bash
# Check PostgreSQL status
docker exec hrm-lite-db-v2 pg_isready -U hrmlite

# Check network
docker network inspect hrm-lite-network-v2
```

### Frontend 502 Bad Gateway:
```bash
# Check backend health
curl http://localhost:3001/health

# Restart backend
docker restart hrm-lite-backend-v2
```

### Rebuild sau khi update code:
```bash
cd /home/deploy/hrm-lite

# Pull code mới (nếu dùng Git)
git pull origin main

# Hoặc rsync từ local
# (chạy từ máy local)

# Rebuild và deploy
docker compose -f docker-compose.v2.yml build --no-cache backend frontend
docker compose -f docker-compose.v2.yml up -d
```

---

## 🚀 Quick Deploy Script

Tạo file `deploy.sh` để deploy nhanh:

```bash
#!/bin/bash
set -e

echo "🚀 Deploying HRM-Lite to Production..."

cd /home/deploy/hrm-lite

# Pull latest code (nếu dùng Git)
# git pull origin main

# Rebuild containers
echo "📦 Building containers..."
docker compose -f docker-compose.v2.yml build --no-cache

# Restart services
echo "🔄 Restarting services..."
docker compose -f docker-compose.v2.yml up -d

# Wait for health check
echo "⏳ Waiting for health check..."
sleep 10

# Run migrations
echo "📊 Running database migrations..."
docker exec hrm-lite-backend-v2 npx prisma migrate deploy

# Check status
echo "✅ Deployment complete!"
docker compose -f docker-compose.v2.yml ps

echo ""
echo "🌐 Application is running at:"
echo "   http://YOUR_SERVER_IP"
echo "   https://YOUR_DOMAIN.com"
```

```bash
chmod +x /home/deploy/hrm-lite/deploy.sh
```

---

## 📞 Liên Hệ Hỗ Trợ

- Atlantic.Net Support: https://cloud.atlantic.net/support
- Docker Documentation: https://docs.docker.com
- Prisma Documentation: https://www.prisma.io/docs

---

*Tài liệu cập nhật: Tháng 01/2026*
