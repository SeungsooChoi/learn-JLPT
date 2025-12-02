import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리방침',
};

export default function PrivacyPolicyPage() {
  return (
    // 전체 컨테이너: 최대 너비, 중앙 정렬, 충분한 여백, 배경/그림자 적용
    <div className="max-w-5xl mx-auto p-8 lg:p-10 my-10 bg-white shadow-lg rounded-xl">
      {/* 메인 제목: 크고 두꺼운 글꼴, 하단 구분선 */}
      <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-4">개인정보 처리방침</h1>

      {/* 서문: 행간을 넓혀 가독성 향상, 회색 텍스트로 보조적인 느낌 부여 */}
      <p className="mb-8 p-4 bg-indigo-50 border-l-4 border-indigo-400 text-gray-700 leading-relaxed rounded-md">
        본 개인정보 처리방침은 운영자(이하 “운영자”)가 제공하는 “서비스명”(이하 “서비스”)에서 이용자의 개인정보를 어떻게
        수집, 이용, 보관 및 보호하는지에 대해 설명합니다.
        <br />
        운영자는 개인정보 보호법 등 관련 법령을 준수하며, 이용자의 개인정보를 안전하게 관리하기 위해 최선을 다합니다.
      </p>

      {/* --- 제1조 수집하는 개인정보 항목 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800 border-b pb-2">제1조 수집하는 개인정보 항목</h2>

        <div className="space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="font-medium text-gray-800">서비스는 다음과 같은 최소한의 개인정보를 수집할 수 있습니다.</p>

          {/* 1. 회원가입 및 로그인 시 */}
          <h3 className="text-lg font-semibold mt-4 text-gray-700">1. 회원가입 및 로그인 시</h3>
          <ul className="list-disc list-inside ml-6 space-y-1 leading-relaxed">
            <li>이메일 주소</li>
            <li>비밀번호(해시 처리된 형태로 저장되며, 운영자가 확인할 수 없음)</li>
          </ul>
          <p className="text-sm text-gray-500 italic ml-6">Supabase Auth를 사용하여 보안 처리됩니다.</p>

          {/* 2. 서비스 이용 시 자동으로 수집되는 정보 */}
          <h3 className="text-lg font-semibold mt-4 text-gray-700">2. 서비스 이용 시 자동으로 수집되는 정보</h3>
          <ul className="list-disc list-inside ml-6 space-y-1 leading-relaxed">
            <li>접속 IP 주소</li>
            <li>브라우저 종류 및 버전</li>
            <li>접속 일시</li>
            <li>서비스 이용 기록(페이지 이동 등)</li>
          </ul>

          {/* 3. 사용자가 입력하는 데이터 */}
          <h3 className="text-lg font-semibold mt-4 text-gray-700">3. 사용자가 입력하는 데이터</h3>
          <ul className="list-disc list-inside ml-6 space-y-1 leading-relaxed">
            <li>학습 기록(단어 학습 진행도 및 통계)</li>
            <li>설정 값(레벨 선택, 학습 환경 설정 등)</li>
          </ul>

          {/* 4. 광고 서비스 이용 시 */}
          <h3 className="text-lg font-semibold mt-4 text-gray-700">4. 광고 서비스 이용 시</h3>
          <div className="p-3 bg-red-50 border-l-4 border-red-300 rounded-r-md">
            <p>Google AdSense가 다음 데이터를 자동 수집할 수 있습니다.</p>
            <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-600">
              <li>쿠키 정보</li>
              <li>맞춤형 광고 제공을 위한 사용자 행동 데이터</li>
              <li>제3자 쿠키(광고 파트너)</li>
            </ul>
            <p className="mt-2 text-xs text-red-600">
              AdSense 정책 준수: “Google 파트너 사이트의 사용자 데이터 처리 방식”
            </p>
          </div>
        </div>
      </section>

      {/* --- 제2조 개인정보 수집 방법 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제2조 개인정보 수집 방법</h2>
        <ul className="list-disc list-inside ml-4 space-y-2 leading-relaxed">
          <li>회원가입 및 로그인 과정에서 이용자가 직접 입력</li>
          <li>서비스 이용 과정에서 자동 생성</li>
          <li>쿠키 및 로컬스토리지 사용</li>
          <li>제3자 서비스(Supabase, Google AdSense)를 통한 수집</li>
        </ul>
      </section>

      {/* --- 제3조 개인정보의 이용 목적 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제3조 개인정보의 이용 목적</h2>
        <p className="leading-relaxed">운영자는 수집한 개인정보를 다음 목적으로 사용합니다.</p>
        <ul className="list-disc list-inside ml-4 space-y-2 leading-relaxed">
          <li>회원 인증 및 로그인 유지</li>
          <li>개인별 학습 기록 저장 및 진행도 제공</li>
          <li>서비스 기능 개선 및 오류 분석</li>
          <li>보안 위협 탐지 및 부정 이용 방지</li>
          <li>Google AdSense 기반 광고 제공(선택적)</li>
          <li>공지·문의 대응</li>
        </ul>
      </section>

      {/* --- 제4조 개인정보의 보관 및 파기 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제4조 개인정보의 보관 및 파기</h2>
        <p className="leading-relaxed font-medium text-red-700">회원 탈퇴 시 즉시 모든 개인정보는 삭제됩니다.</p>
        <p className="leading-relaxed">단, 법령에서 일정 기간 보관을 요구하는 경우 해당 기간 동안만 보관합니다.</p>

        <h3 className="text-lg font-semibold mt-4 text-gray-700">파기 절차:</h3>
        <ul className="list-disc list-inside ml-6 space-y-1 leading-relaxed">
          <li>회원 탈퇴 → 데이터베이스에서 삭제 명령 실행</li>
          <li>백업 데이터는 일정 주기 경과 후 자동 삭제</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 text-gray-700">파기 방법:</h3>
        <ul className="list-disc list-inside ml-6 space-y-1 leading-relaxed">
          <li>데이터베이스 파기 명령 (SQL DELETE)</li>
          <li>백업 파일은 암호화된 상태로 자동 덮어쓰기 또는 삭제</li>
        </ul>
      </section>

      {/* --- 제5조 개인정보의 제3자 제공 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제5조 개인정보의 제3자 제공</h2>
        <p className="leading-relaxed font-medium text-green-700">
          운영자는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
        </p>
        <p className="leading-relaxed">다만, 다음 경우 예외적으로 제공될 수 있습니다.</p>
        <ul className="list-disc list-inside ml-6 space-y-2 leading-relaxed">
          <li>이용자가 사전에 동의한 경우</li>
          <li>법령에 의해 요구되는 경우</li>
          <li>범죄 수사, 법원 명령 등 공적 기관 요청 시</li>
        </ul>
      </section>

      {/* --- 제6조 개인정보 처리의 위탁 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제6조 개인정보 처리의 위탁</h2>
        <p className="leading-relaxed">서비스 운영을 위해 다음 업체에 개인정보 처리를 위탁합니다.</p>

        {/* 위탁 업체 정보를 표로 정리하여 가독성 향상 */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  위탁 업체
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  위탁 목적
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Supabase</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  로그인 / 사용자 인증, 회원관리, 세션 관리, 학습 기록 저장
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Google AdSense</td>
                <td className="px-6 py-4 text-sm text-gray-500">맞춤형 광고 제공 (선택)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="leading-relaxed mt-4 text-sm text-gray-600">
          운영자는 위탁 업체가 관련 법령을 준수하도록 관리·감독합니다.
        </p>
      </section>

      {/* --- 제7조 쿠키(Cookie) 및 로컬 저장소(LocalStorage) --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">
          제7조 쿠키(Cookie) 및 로컬 저장소(LocalStorage)
        </h2>
        <p className="leading-relaxed">서비스는 다음 목적을 위해 쿠키 또는 로컬스토리지를 사용할 수 있습니다.</p>
        <ul className="list-disc list-inside ml-4 space-y-2 leading-relaxed">
          <li>로그인 세션 유지</li>
          <li>학습 설정 기억</li>
          <li>이용자 경험 개선</li>
          <li>광고 쿠키(AdSense) 허용 시 개인화 광고 제공</li>
        </ul>
        <p className="leading-relaxed mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-300 rounded-r-md">
          사용자는 브라우저 설정에서 쿠키 저장을 제한하거나 차단할 수 있습니다.
        </p>
      </section>

      {/* --- 제8조 이용자의 권리 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제8조 이용자의 권리</h2>
        <p className="leading-relaxed">이용자는 다음과 같은 권리를 가집니다.</p>
        <ul className="list-disc list-inside ml-4 space-y-2 leading-relaxed">
          <li>개인정보 조회</li>
          <li>개인정보 수정</li>
          <li>서비스 탈퇴 및 개인정보 삭제 요청</li>
          {/* <li>광고 개인화 비활성화</li> */}
          {/* <li>문의 대응 요청</li> */}
        </ul>
        {/* <p className="leading-relaxed mt-3 text-sm text-gray-600">
          요청은 운영자의 이메일(your-email@example.com)을 통해 처리됩니다.
        </p> */}
      </section>

      {/* --- 제9조 개인정보 보호 조치 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제9조 개인정보 보호 조치</h2>
        <p className="leading-relaxed">운영자는 다음과 같은 기술적·관리적 보호 조치를 시행합니다.</p>

        <h3 className="text-lg font-semibold mt-4 text-gray-700">1. 기술적 조치</h3>
        <ul className="list-disc list-inside ml-6 space-y-1 leading-relaxed">
          <li>Supabase 기반 암호화 저장</li>
          <li>Supabase Policy(RLS)를 이용해 인증된 사용자만 자신의 데이터에 접근 가능하도록 설정.</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 text-gray-700">2. 관리적 조치</h3>
        <ul className="list-disc list-inside ml-6 space-y-1 leading-relaxed">
          <li>개인정보를 외부에 공유하지 않음</li>
          <li>요청·문의에 성실히 대응</li>
        </ul>
      </section>

      {/* --- 제10조 개인정보 처리방침 변경 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제10조 개인정보 처리방침 변경</h2>
        <ul className="list-disc list-inside ml-4 space-y-2 leading-relaxed">
          <li>법령 변경, 서비스 추가·변경 등 사유 발생 시 본 방침이 변경될 수 있습니다.</li>
          <li>중요한 변경 사항은 서비스 내 공지로 안내합니다.</li>
          <li>변경된 내용은 게시 시점부터 효력이 발생합니다.</li>
        </ul>
      </section>

      {/* --- 제11조 문의처 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 border-b pb-2">제11조 문의처</h2>
        <p className="leading-relaxed">개인정보 관련 문의는 아래로 연락해 주시기 바랍니다.</p>
        <div className="p-4 border border-indigo-200 bg-indigo-50 rounded-md inline-block">
          <p>
            이메일:{' '}
            <a href="mailto:tmdtn5389@gmail.com" className="text-indigo-600 hover:underline">
              tmdtn5389@gmail.com
            </a>
          </p>
        </div>
        <p className="leading-relaxed mt-3">운영자는 이용자의 문의에 성실히 답변하겠습니다.</p>
      </section>
    </div>
  );
}
