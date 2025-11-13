# 하루 단어(一日の単語)

> 일본어 JLPT 단어 학습을 위한 사이드 프로젝트  
> 개인 학습 및 포트폴리오용으로 제작된 단어 학습 서비스입니다.

## 🎯 프로젝트 개요

**목표**  
일본어 단어를 단순 암기가 아닌  
“이해함 / 이해못함” 피드백 기반의 반복 학습으로 기억에 남게 만드는 것.

현재는 **MVP 단계**로,  
로컬 JSON 데이터를 활용해 핵심 학습 흐름(표시 → 피드백 → 회독)을 검증합니다.  
이후 **Supabase** 연동을 통해 사용자별 학습 상태를 저장하고,  
**JLPT 레벨별 필터링 및 복습 기능**으로 확장할 예정입니다.

## 🛠️ 기술 스택

**Frontend**

- React 19+
- TypeScript
- Next.js 15+ (App Router)
- Zustand

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

## 📝 라이선스

MIT License

## 📧 연락처

프로젝트에 대한 문의사항이나 제안은 [이메일/GitHub 이슈]로 연락주세요.
