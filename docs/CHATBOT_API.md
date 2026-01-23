# 🤖 HRM Chatbot API Documentation

## Overview

HRM Chatbot là module hỗ trợ người dùng tìm hiểu và sử dụng hệ thống HRM thông qua giao diện chat. Chatbot sử dụng Knowledge Base được xây dựng từ source code và documentation của hệ thống.

## Base URL

```
/api/chatbot
```

## Authentication

Tất cả endpoints yêu cầu JWT authentication header:

```
Authorization: Bearer <token>
```

## Endpoints

### 1. Ask Question

Gửi câu hỏi và nhận câu trả lời từ chatbot.

**Endpoint:** `POST /api/chatbot/ask`

**Request Body:**

```json
{
  "question": "Làm sao để xem bảng lương của tôi?",
  "context": "bang-luong",  // optional: module context
  "topK": 5                  // optional: số lượng chunks tối đa (default: 5)
}
```

**Response:**

```json
{
  "answer": "Để xem bảng lương của bạn, bạn có thể:\n\n1. Đăng nhập vào hệ thống\n2. Vào menu 'Bảng lương' ở sidebar\n3. Chọn tháng muốn xem\n4. Hệ thống sẽ hiển thị chi tiết lương của bạn\n\nNếu bạn là nhân viên, bạn cũng có thể xem qua Employee Portal.",
  "relatedChunks": [
    {
      "chunkId": "bang-luong_workflow_001",
      "content": "Module Bảng Lương cho phép...",
      "module": "bang-luong",
      "workflow": "xem-luong",
      "type": "workflow",
      "tags": ["salary", "view", "employee"],
      "score": 0.92
    }
  ],
  "questionType": "how-to",
  "confidence": 0.85,
  "suggestedQuestions": [
    "Làm sao để in bảng lương?",
    "Bảng lương được tính như thế nào?"
  ]
}
```

**Question Types:**

| Type | Description | Example |
|------|-------------|---------|
| `how-to` | Hướng dẫn cách làm | "Làm sao để..." |
| `what-is` | Định nghĩa/giải thích | "... là gì?" |
| `where` | Vị trí/địa điểm | "Ở đâu để xem..." |
| `why` | Lý do | "Tại sao..." |
| `general` | Câu hỏi chung | Các câu hỏi khác |

---

### 2. Get FAQs

Lấy danh sách câu hỏi thường gặp.

**Endpoint:** `GET /api/chatbot/faqs`

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Lọc theo danh mục (module name) |
| `limit` | number | Số lượng tối đa (default: 20, max: 50) |

**Response:**

```json
{
  "faqs": [
    {
      "id": "faq_001",
      "question": "Làm sao để xem bảng lương của tôi?",
      "answer": "Truy cập menu 'Bảng lương' và chọn tháng cần xem.",
      "category": "bang-luong",
      "tags": ["salary", "view"]
    },
    {
      "id": "faq_002",
      "question": "Làm sao để xin nghỉ phép?",
      "answer": "Vào Employee Portal > Yêu cầu > Tạo yêu cầu nghỉ phép mới.",
      "category": "nghi-phep",
      "tags": ["leave", "request"]
    }
  ],
  "total": 16
}
```

---

### 3. Get Glossary Term

Tra cứu thuật ngữ chuyên ngành.

**Endpoint:** `GET /api/chatbot/glossary`

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `term` | string | Thuật ngữ cần tra (để trống = lấy tất cả) |

**Example: Get specific term**

```
GET /api/chatbot/glossary?term=BHXH
```

**Response:**

```json
{
  "term": "BHXH",
  "definition": "Bảo hiểm xã hội - đóng 8% lương căn bản, công ty đóng 17.5%",
  "related": ["BHYT", "BHTN", "KPCĐ"],
  "module": "bhxh-thue"
}
```

**Example: Get all terms**

```
GET /api/chatbot/glossary
```

**Response:**

```json
{
  "terms": [
    {
      "term": "BHXH",
      "definition": "Bảo hiểm xã hội...",
      "related": ["BHYT", "BHTN"]
    },
    {
      "term": "BHYT",
      "definition": "Bảo hiểm y tế...",
      "related": ["BHXH"]
    }
  ],
  "total": 15
}
```

---

### 4. Get Statistics

Lấy thống kê về Knowledge Base.

**Endpoint:** `GET /api/chatbot/stats`

**Response:**

```json
{
  "totalChunks": 141,
  "glossaryTerms": 15,
  "faqCount": 16,
  "byModule": {
    "bang-luong": 25,
    "cham-cong": 18,
    "nhan-vien": 15,
    "bhxh-thue": 12,
    "hop-dong": 10,
    "nghi-phep": 9,
    "san-luong": 8,
    "phan-ca": 7,
    "kpi": 6,
    "rbac": 5,
    "other": 26
  },
  "byType": {
    "concept": 50,
    "workflow": 40,
    "api": 30,
    "faq": 21
  },
  "lastUpdated": "2026-01-24T10:30:00.000Z"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Câu hỏi không được để trống",
  "error": "Bad Request"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Không tìm thấy thuật ngữ: XYZ",
  "error": "Not Found"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Không thể tải Knowledge Base",
  "error": "Internal Server Error"
}
```

---

## Frontend Integration

### Chat Widget

Chatbot widget đã được tích hợp sẵn trong Layout:

```tsx
import ChatbotWidget from './components/chatbot/ChatbotWidget';

// Trong layout component
<ChatbotWidget />
```

### Custom Integration

```typescript
import apiClient from '../api/client';

// Ask a question
const askQuestion = async (question: string) => {
  const response = await apiClient.post('/chatbot/ask', {
    question,
    topK: 5
  });
  return response.data;
};

// Get FAQs
const getFAQs = async (category?: string) => {
  const response = await apiClient.get('/chatbot/faqs', {
    params: { category, limit: 10 }
  });
  return response.data.faqs;
};

// Search glossary
const getGlossary = async (term: string) => {
  const response = await apiClient.get('/chatbot/glossary', {
    params: { term }
  });
  return response.data;
};
```

---

## Search Algorithm

Chatbot sử dụng keyword-based search với scoring:

1. **Keyword Extraction**: Tách keywords từ câu hỏi
2. **Chunk Matching**: Tìm chunks có chứa keywords
3. **Scoring**: 
   - Content match: +1 điểm/keyword
   - Tag match: +0.5 điểm/keyword
   - Module/workflow match: +0.3 điểm
4. **Ranking**: Sắp xếp theo score giảm dần
5. **Answer Generation**: Tổng hợp từ top-K chunks

---

## Performance

| Metric | Value |
|--------|-------|
| Avg response time | < 100ms |
| Max chunks searched | 141 |
| Cache TTL | 5 minutes |

---

## Limitations

1. **Keyword-based**: Chưa hỗ trợ semantic search (cần embedding)
2. **Vietnamese only**: Tối ưu cho tiếng Việt
3. **No conversation history**: Mỗi câu hỏi độc lập
4. **Static KB**: Cần rebuild khi có code mới

---

## Roadmap

- [ ] Vector search với embeddings
- [ ] Conversation context
- [ ] Multi-language support
- [ ] Real-time KB updates
- [ ] Analytics dashboard

---

*Documentation version: 1.0.0*
*Last updated: January 2026*
