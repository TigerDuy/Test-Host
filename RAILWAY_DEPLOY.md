# 🚀 Hướng dẫn Deploy lên Railway

## Bước 1: Chuẩn bị Repository

1. **Push code lên GitHub:**
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

## Bước 2: Tạo Project trên Railway

1. Truy cập [Railway.app](https://railway.app)
2. Đăng nhập bằng GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Chọn repository `schedule-manager`

## Bước 3: Setup Database

1. **Thêm PostgreSQL:**
   - Click "Add Service" → "Database" → "PostgreSQL"
   - Railway sẽ tự động tạo database và cung cấp `DATABASE_URL`

2. **Thêm Redis:**
   - Click "Add Service" → "Database" → "Redis"
   - Railway sẽ tự động tạo Redis và cung cấp `REDIS_URL`

## Bước 4: Deploy Backend

1. **Tạo Backend Service:**
   - Click "Add Service" → "GitHub Repo"
   - Chọn repository và set Root Directory: `backend`

2. **Cấu hình Environment Variables:**
```env
NODE_ENV=production
PORT=5001
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
JWT_SECRET=your-super-secure-jwt-secret-2025
FRONTEND_URL=https://your-frontend-domain.railway.app
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

3. **Cấu hình Build:**
   - Build Command: `npm install`
   - Start Command: `npm start`

## Bước 5: Deploy Frontend

1. **Tạo Frontend Service:**
   - Click "Add Service" → "GitHub Repo"
   - Chọn repository và set Root Directory: `frontend`

2. **Cấu hình Environment Variables:**
```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app/api
NEXTAUTH_URL=https://your-frontend-domain.railway.app
NEXTAUTH_SECRET=your-nextauth-secret-2025
```

3. **Cấu hình Build:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

## Bước 6: Cấu hình Domain

1. **Backend Domain:**
   - Vào Backend service → Settings → Domains
   - Generate domain hoặc add custom domain
   - Copy domain URL (ví dụ: `https://backend-production-abc.railway.app`)

2. **Frontend Domain:**
   - Vào Frontend service → Settings → Domains
   - Generate domain hoặc add custom domain
   - Copy domain URL (ví dụ: `https://frontend-production-xyz.railway.app`)

3. **Cập nhật Environment Variables:**
   - Cập nhật `FRONTEND_URL` trong Backend service
   - Cập nhật `NEXT_PUBLIC_API_URL` và `NEXTAUTH_URL` trong Frontend service

## Bước 7: Database Migration

1. **Chạy Migration:**
   - Vào Backend service → Deployments
   - Click vào deployment mới nhất
   - Mở Terminal và chạy:
```bash
npx knex migrate:latest
```

## Bước 8: Kiểm tra Deployment

1. **Test Backend:**
   - Truy cập: `https://your-backend-domain.railway.app/health`
   - Kiểm tra API docs: `https://your-backend-domain.railway.app/api-docs`

2. **Test Frontend:**
   - Truy cập: `https://your-frontend-domain.railway.app`
   - Test đăng ký/đăng nhập

## Bước 9: Monitoring và Logs

1. **Xem Logs:**
   - Railway Dashboard → Service → Deployments → View Logs

2. **Monitoring:**
   - Railway tự động monitor CPU, Memory, Network
   - Set up alerts nếu cần

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **Database Connection Error:**
   - Kiểm tra `DATABASE_URL` có đúng không
   - Đảm bảo PostgreSQL service đang chạy

2. **CORS Error:**
   - Kiểm tra `FRONTEND_URL` trong backend
   - Đảm bảo domain chính xác

3. **Build Error:**
   - Kiểm tra Node.js version
   - Xem build logs để debug

4. **Migration Error:**
   - Chạy migration manual qua Railway terminal
   - Kiểm tra database permissions

### Useful Commands:

```bash
# Xem logs
railway logs

# Connect to database
railway connect

# Run commands
railway run npm run migrate
```

## 📊 Cost Estimation

- **Hobby Plan (Free):** $0/month
  - 512MB RAM, 1GB Disk
  - Suitable for development/testing

- **Pro Plan:** $20/month
  - 8GB RAM, 100GB Disk
  - Suitable for production

## 🎯 Next Steps

1. Setup custom domain
2. Configure SSL certificates
3. Setup monitoring alerts
4. Configure backup strategy
5. Setup CI/CD pipeline
