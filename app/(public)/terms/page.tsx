import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
};

export default function TermsPage() {
  return (
    // 전체 컨테이너: 최대 너비를 유지하되, 세로 여백을 추가하고 배경색을 흰색으로 설정
    <div className="max-w-5xl mx-auto p-8 lg:p-10 my-10 bg-white shadow-lg rounded-xl">
      {/* 메인 제목: 더 크고, 두꺼운 글꼴, 하단 여백 추가 */}
      <h1 className="text-2xl font-bold mb-8 text-gray-900 border-b pb-4">이용약관</h1>

      {/* 서문: 행간을 넓혀 가독성 향상, 회색 텍스트로 보조적인 느낌 부여 */}
      <p className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 leading-relaxed rounded-md">
        본 서비스는 개인이 운영하는 JLPT 단어 학습 서비스입니다. 본 서비스를 이용함으로써 아래 내용을 동의한 것으로
        간주합니다.
      </p>

      {/* 각 조항 섹션 */}
      <section className="space-y-6">
        {/* h2 제목: 섹션 구분을 위해 text-xl, semibold, 상단 여백 추가 */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제 1조 목적</h2>
        <p className="leading-relaxed">
          본 약관은 운영자(이하 “운영자”)가 제공하는 “하루 단어(一日の単語)”(이하 “서비스”)의 이용과 관련하여 운영자와
          이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다. 본 서비스는 JLPT 단어 학습을 돕기 위한 무료 웹
          애플리케이션입니다. 서비스 내용은 언제든지 변경되거나 중단될 수 있습니다.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제2조 약관의 효력 및 변경</h2>
        <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed">
          <li>운영자는 본 약관을 서비스 내 게시 또는 안내하여 효력을 발생하게 합니다.</li>
          <li>운영자는 관련 법령 개정, 서비스 변경 등의 사유가 발생하는 경우 약관을 개정할 수 있습니다.</li>
          <li>약관이 변경되는 경우, 운영자는 변경 내용을 서비스 내에 공지합니다.</li>
          <li>이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단해야 합니다.</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제3조 정의</h2>
        <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed">
          <li>“이용자”란 본 약관에 따라 서비스를 이용하는 모든 사용자를 의미합니다.</li>
          <li>“콘텐츠”란 서비스 내에서 제공되는 텍스트, 이미지, 데이터 등을 의미합니다.</li>
          <li>“사용자 생성 콘텐츠(UGC)”란 이용자가 직접 입력하거나 업로드한 모든 데이터를 의미합니다.</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제4조 서비스 제공</h2>
        <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed">
          <li>
            운영자는 다음과 같은 서비스를 제공합니다.
            {/* 내부 리스트: 동그라미 스타일, 왼쪽 여백 추가 */}
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-600">
              <li>JLPT 단어 학습 기능</li>
              <li>단어 데이터 조회 기능</li>
              <li>기타 운영자가 추가 개발하여 제공하는 기능</li>
            </ul>
          </li>
          <li>운영자는 장비 점검, 업데이트, 서비스 개선 등을 위해 서비스 제공을 일시적으로 중단할 수 있습니다.</li>
          <li>운영자의 개인 프로젝트 특성상 서비스가 지속적으로 유지·보장되지 않을 수 있습니다.</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제5조 서비스 이용의 제한</h2>
        {/* 주요 제한 사항을 담은 박스: 배경색 및 테두리 적용으로 강조 */}
        <div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <p className="font-medium text-red-700 mb-3">
            운영자는 다음 사유가 발생한 경우 이용자의 서비스 이용을 제한할 수 있습니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed text-gray-700">
            <li>서비스의 정상적인 운영을 방해하는 경우</li>
            <li>불법적 또는 부적절한 콘텐츠를 입력·공유하는 경우</li>
            <li>서비스 데이터를 무단으로 크롤링, 복제, 상업적 이용하는 경우</li>
            <li>기타 운영자가 부적절하다고 판단하는 경우</li>
          </ol>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제6조 사용자 생성 콘텐츠(UGC)</h2>
        <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed">
          <li>이용자가 서비스에 입력한 데이터는 이용자 본인의 책임하에 관리됩니다.</li>
          <li>사용자가 입력한 단어, 학습 기록 등은 서비스 기능 제공을 위해 활용될 수 있습니다.</li>
          <li>
            운영자는 사용자의 콘텐츠를 사전 동의 없이 공개하거나 제3자에게 제공하지 않습니다. (법령에 따른 경우 제외)
          </li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제7조 저작권 및 라이선스</h2>
        <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed">
          <li>
            서비스에서 제공하는 일부 데이터는 공개 라이선스를 따릅니다.
            {/* 라이선스 정보를 별도 박스로 구분하여 명확히 강조 */}
            <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm rounded-r-md">
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>JLPT 단어 데이터는 Open Anki JLPT Decks 프로젝트를 기반으로 합니다.</li>
                <li>
                  출처: &quot;Open Anki JLPT Decks by Jam Sinclair&quot;
                  <a
                    href="https://github.com/jamsinclair/open-anki-jlpt-decks"
                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/jamsinclair/open-anki-jlpt-decks
                  </a>
                  (라이선스: MIT)
                </li>
              </ul>
            </div>
          </li>
          <li>이용자는 서비스에서 제공하는 데이터를 무단 복제, 판매, 재배포할 수 없습니다.</li>
          <li>
            이용자의 게시물에 대한 저작권은 이용자에게 있으며, 서비스 운영·개선에 필요한 범위 내에서 사용될 수 있습니다.
          </li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제8조 개인정보 보호</h2>
        <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed">
          <li>서비스는 로그인, 학습 기록 저장 등 최소한의 기능 제공을 위해 필요한 정보만 수집합니다.</li>
          <li>개인정보 처리에 관한 상세 내용은 “개인정보 처리방침”에서 규정합니다.</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제9조 책임의 제한</h2>
        {/* 책임 제한을 담은 박스: 주의 사항임을 강조 */}
        <div className="p-4 border border-gray-300 bg-gray-50 rounded-md">
          <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed font-medium text-gray-800">
            <li>서비스는 개인이 취미·연구 목적으로 운영하는 프로젝트입니다.</li>
            <li>운영자는 서비스의 정확성, 연속성, 안정성에 대해 보장하지 않습니다.</li>
            <li>이용자가 서비스를 사용함으로써 발생한 손해에 대해 운영자는 책임을 지지 않습니다.</li>
            <li>단어 데이터의 오류, 누락, 부정확성에 대해서도 운영자는 법적 책임을 지지 않습니다.</li>
          </ol>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제10조 서비스 종료</h2>
        <ol className="list-decimal list-inside space-y-2 pl-4 leading-relaxed">
          <li>운영자는 개인 프로젝트 특성상 서비스 운영을 중단할 수 있습니다.</li>
          <li>서비스 종료 시 사전 안내를 위해 가능한 경우 서비스 내에 고지합니다.</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800">제11조 준거법 및 분쟁 해결</h2>
        <p className="leading-relaxed">
          본 약관은 대한민국 법령을 기준으로 해석되며, 서비스 이용과 관련한 분쟁은 대한민국 법률에 따라 해결합니다.
        </p>
      </section>
    </div>
  );
}
