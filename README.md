# JLPT 단어장

JLPT 단어 학습을 위한 웹 애플리케이션입니다. 개인적인 일본어 공부와 함께 최신 웹 기술 스택을 실험하고 학습하기 위해 시작한 프로젝트입니다.

## 🎯 프로젝트 목적

- JLPT 단어 학습의 효율성 향상
- Next.js 15+ App Router 및 최신 React 패턴 학습
- TypeScript를 활용한 타입 안전성 확보

## ✨ 주요 기능

### 1. 회독 학습
- JLPT 레벨(N5~N1)별 단어 그룹 제공
- 반복 학습을 통한 효과적인 암기 지원
- 학습 진행도 추적

### 2. 단어장
- 전체 단어 목록 조회
- 레벨별 필터링
- 검색 기능

## 🛠️ 기술 스택

**Frontend**
- React 19+
- TypeScript
- Next.js 15+ (App Router)
- Zustand(예정)

**Styling**
- Tailwind CSS
- shadcn/ui

**Backend & Database**
- Supabase (Database, Authentication)

## 🚀 시작하기

### 설치
```bash
# 저장소 클론
git clone [repository-url]

# 의존성 설치
npm install
# 또는
yarn install
```

### 환경 변수 설정
`.env.local` 파일에 다음 환경 변수를 설정하세요:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 실행
```bash
# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📚 배운 점

- Next.js 15 App Router의 서버 컴포넌트 패턴
- shadcn/ui를 활용한 재사용 가능한 컴포넌트 설계
- TypeScript를 통한 타입 안전한 개발 경험
- Supabase를 활용한 빠른 백엔드 구축

## 📝 라이선스

MIT License

## 📧 연락처

프로젝트에 대한 문의사항이나 제안은 [이메일/GitHub 이슈]로 연락주세요.