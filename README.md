# 하루 단어(一日の単語)

> 일본어 JLPT 단어 학습을 위한 사이드 프로젝트  
> 개인 학습 및 포트폴리오용으로 제작된 단어 학습 서비스입니다.

## 🎯 프로젝트 개요

일본어 단어를 단순 암기가 아니라
“이해함 / 이해하지 못함” 피드백 기반 반복학습으로 효율적으로 장기 기억에 남기는 것을 목표로 하는 학습 서비스입니다.
SM-2 알고리즘을 변형해 사용자에게 적절한 시점에 단어를 다시 노출하고,
학습 과정 전체를 정량적/시각적으로 확인할 수 있도록 설계했습니다.

🎯 프로젝트 목표

단어 암기 중심이 아닌 이해 기반 학습 루프 구축
개인별 학습 이력과 상태를 반영한 반복 스케줄링(SM-2 변형)
JLPT 전 레벨(N1~N5)을 대상으로 한 체계적인 학습
학습 기록, 진행률을 모아 시각화된 통계 페이지 제공
단어장, 복습, 신규 단어 추천 등 사용자 중심 기능 제공

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
