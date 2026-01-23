# 🚀 HRM Lite Production Deployment Guide

## Prerequisites

1. **Server Requirements**:
   - Linux server (Ubuntu 22.04+ recommended)
   - Docker & Docker Compose installed
   - 2GB+ RAM
   - 20GB+ disk space

2. **Domain & SSL**:
   - Domain pointing to server IP
   - SSL certificate (Let's Encrypt recommended)

## Quick Start

### 1. Clone & Setup

```bash
# Clone repository
git clone <repo-url> hrm-lite
cd hrm-lite

# Copy environment file
cp .env.prod.example .env.prod

# Edit with your values
nano .env.prod
```

### 2. Configure Environment

Edit `.env.prod`:

```env
# Required - Change these!
POSTGRES_PASSWORD=your_strong_db_password_here
JWT_SECRET=your_32_char_random_string_here

# Optional
REDIS_URL=redis://redis:6379
OPENAI_API_KEY=sk-xxx  # For future AI features
```

### 3. Setup SSL Certificates

Option A: Let's Encrypt (free):
```bash
mkdir -p certs
certbot certonly --standalone -d yourdomain.com
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem certs/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem certs/
```

Option B: Self-signed (testing only):
```bash
mkdir -p certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/privkey.pem \
  -out certs/fullchain.pem
```

### 4. Deploy

```bash
# Build and start
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 5. Initialize Database

```bash
# Run initial seed (first time only)
docker exec hrm-lite-backend-prod sh -c "npx prisma db seed"
```

## Management Commands

### View Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Backend only
docker logs -f hrm-lite-backend-prod
```

### Restart Services
```bash
docker-compose -f docker-compose.prod.yml restart

# Or specific service
docker-compose -f docker-compose.prod.yml restart backend
```

### Update Deployment
```bash
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

### Database Backup
```bash
# Backup
docker exec hrm-lite-db-prod pg_dump -U hrm_admin hrm_lite > backup_$(date +%Y%m%d).sql

# Restore
cat backup_20260123.sql | docker exec -i hrm-lite-db-prod psql -U hrm_admin hrm_lite
```

### Shell Access
```bash
# Backend shell
docker exec -it hrm-lite-backend-prod sh

# Database shell
docker exec -it hrm-lite-db-prod psql -U hrm_admin hrm_lite
```

## Security Checklist

- [ ] Changed default passwords in `.env.prod`
- [ ] SSL certificate installed
- [ ] Firewall configured (only 80/443 open)
- [ ] Database not exposed to public
- [ ] Regular backups configured
- [ ] Monitoring setup (optional)

## Troubleshooting

### Backend not starting
```bash
docker logs hrm-lite-backend-prod
# Check DATABASE_URL is correct
```

### Database connection issues
```bash
docker exec hrm-lite-backend-prod ping postgres
# Should resolve to postgres container
```

### SSL issues
```bash
# Check certificates exist
ls -la certs/
# Verify nginx config
docker exec hrm-lite-frontend-prod nginx -t
```

## Monitoring (Optional)

Add Prometheus + Grafana:
```yaml
# Add to docker-compose.prod.yml
prometheus:
  image: prom/prometheus
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports:
    - "9090:9090"
```

## Support

- GitHub Issues: <repo-url>/issues
- Documentation: /docs folder
