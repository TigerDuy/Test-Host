# 🗓️ Schedule Manager

Ứng dụng quản lý thời gian biểu hiện đại được xây dựng với Next.js, React, Node.js và PostgreSQL.

## ✨ Tính năng chính

- 🔐 **Xác thực người dùng** - Đăng ký, đăng nhập với JWT
- 📅 **Quản lý sự kiện** - Tạo, sửa, xóa sự kiện với thông tin chi tiết
- 🏷️ **Danh mục sự kiện** - Phân loại và tùy chỉnh màu sắc
- ⏰ **Nhắc nhở** - Thiết lập thông báo trước sự kiện
- 🔄 **Sự kiện lặp lại** - Hỗ trợ lặp hàng ngày, tuần, tháng
- 📊 **Dashboard** - Thống kê và tổng quan sự kiện
- 🌙 **Dark/Light mode** - Giao diện tối/sáng
- 📱 **Responsive** - Tương thích mobile và desktop

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database chính
- **MySQL** - Frontend API
- **Redis** - Caching
- **Knex.js** - Query builder
- **JWT** - Authentication
- **Swagger** - API documentation

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+
- PostgreSQL 15+
- MySQL 8.0+
- Redis 7+
- Docker & Docker Compose (khuyến nghị)

### Cách 1: Chạy với Docker (Khuyến nghị)

1. **Clone repository**
```bash
git clone <repository-url>
cd schedule-manager
```

2. **Khởi động tất cả services**
```bash
docker-compose up -d
```

3. **Chạy database migrations**
```bash
docker-compose exec backend npx knex migrate:latest
```

4. **Truy cập ứng dụng**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001/health
- API Docs: http://localhost:5001/api-docs

### Cách 2: Chạy manual

1. **Setup Backend**
```bash
cd backend
cp .env.example .env
# Chỉnh sửa file .env với thông tin database
npm install
npx knex migrate:latest
npm run dev
```

2. **Setup Frontend**
```bash
cd frontend
cp .env.example .env.local
# Chỉnh sửa file .env.local
npm install
npm run dev
```

## 📁 Cấu trúc dự án

```
schedule-manager/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Database & app config
│   │   ├── middleware/     # Authentication middleware
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   ├── migrations/         # Database migrations
│   └── package.json
├── frontend/               # Frontend app
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities & API client
│   │   ├── store/         # State management
│   │   └── types/         # TypeScript types
│   └── package.json
├── shared/                # Shared types
└── docker-compose.yml     # Docker orchestration
```

## 🔧 Cấu hình

### Backend (.env)
```env
NODE_ENV=development
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=schedule_manager
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 📚 API Documentation

API documentation có sẵn tại: http://localhost:5001/api-docs

### Endpoints chính:
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/events` - Lấy danh sách sự kiện
- `POST /api/events` - Tạo sự kiện mới
- `GET /api/categories` - Lấy danh sách danh mục

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Build Production

```bash
# Build tất cả
docker-compose -f docker-compose.prod.yml up --build

# Hoặc build riêng
cd backend && npm run build
cd frontend && npm run build
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Authors

- **Nhóm phát triển** - Schedule Manager Team

## 🙏 Acknowledgments

- Next.js team
- React team
- PostgreSQL community
- All contributors
