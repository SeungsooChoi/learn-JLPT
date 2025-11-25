import { calculateSM2 } from "@/lib/sm2"

describe('SM-2 Algorithm', () => {
  // 테스트에 사용할 고정 날짜
  const BASE_DATE = new Date('2024-01-15');

  describe('실패 시나리오 (quality < 3)', () => {
    // 1. 완전 모름 (q=0)
    it('quality=0 → repetitions=0, interval=0 (완전 리셋)', () => {
      const result = calculateSM2(0, 2, 3, 2.5, BASE_DATE)
      expect(result.repetitions).toBe(0)
      expect(result.interval).toBe(0)
      // 0점은 EF가 크게 깎여야 함 (2.5 -> 1.7)
      expect(result.e_factor).toBeLessThan(2.5) 
    })

    // 2. 거의 모름 (q=1)
    it('quality=1 → repetitions=0, interval=0', () => {
      const result = calculateSM2(1, 5, 10, 2.5, BASE_DATE)
      expect(result.repetitions).toBe(0)
      expect(result.interval).toBe(0)
      // 1점도 EF 감소
      expect(result.e_factor).toBeLessThan(2.5)
    })

    // 3. 어려움/틀림 (q=2)
    it('quality=2 → repetitions=0, interval=0', () => {
      const result = calculateSM2(2, 10, 30, 2.5, BASE_DATE)
      expect(result.repetitions).toBe(0)
      expect(result.interval).toBe(0)
    })

    // 4. EF 하한선 테스트
    it('EF는 실패가 반복되어도 1.3 밑으로 떨어지지 않아야 한다', () => {
      // 이미 EF가 1.3인 상태에서 실패(0점)
      const result = calculateSM2(0, 0, 0, 1.3, BASE_DATE)
      expect(result.e_factor).toBe(1.3)
    })

    // 5. 날짜 계산 확인 (실패 시)
    it('실패 시(interval=0) 다음 복습일은 기준일과 같아야 한다', () => {
      const result = calculateSM2(0, 2, 3, 2.5, BASE_DATE)
      const expectedDate = BASE_DATE.toISOString().split('T')[0]
      expect(result.next_review_date).toBe(expectedDate)
    })

    // 6. 높은 EF에서의 실패
    it('높은 EF(3.0)에서 실패 시 EF가 급격히 감소해야 한다', () => {
      const result = calculateSM2(0, 5, 10, 3.0, BASE_DATE)
      // 공식: 3.0 + (0.1 - (5-0)*(0.08 + (5-0)*0.02)) 
      // 3.0 + (0.1 - 5 * 0.18) = 3.0 + (0.1 - 0.9) = 3.0 - 0.8 = 2.2
      expect(result.e_factor).toBeCloseTo(2.2, 2)
    })
  })

  describe('성공 시나리오 (quality >= 3)', () => {
    // 1. 첫 성공 (Rep 0 -> 1)
    it('첫 성공 (rep 0→1) → interval=1', () => {
      const result = calculateSM2(5, 0, 0, 2.5, BASE_DATE)
      expect(result.repetitions).toBe(1)
      expect(result.interval).toBe(1)
    })

    // 2. 두 번째 성공 (Rep 1 -> 2)
    it('두 번째 성공 (rep 1→2) → interval=3 (코드 로직 기준)', () => {
      const result = calculateSM2(4, 1, 1, 2.5, BASE_DATE)
      expect(result.repetitions).toBe(2)
      expect(result.interval).toBe(3)
    })

    // 3. 세 번째 성공 (Rep 2 -> 3) : 쉬움(5)
    it('세 번째 성공 & quality=5 (쉬움) → EF 증가, 간격 확장', () => {
      const currentEF = 2.5
      const currentInterval = 3
      const result = calculateSM2(5, 2, currentInterval, currentEF, BASE_DATE)
      
      expect(result.repetitions).toBe(3)
      // q=5일 때 EF는 0.1 증가 (2.5 -> 2.6)
      expect(result.e_factor).toBe(2.6)
      // Interval: 3 * 2.6 = 7.8 -> 반올림 8
      expect(result.interval).toBe(8)
    })

    // 4. 세 번째 성공 (Rep 2 -> 3) : 보통(4)
    it('세 번째 성공 & quality=4 (보통) → EF 유지', () => {
      const currentEF = 2.5
      const result = calculateSM2(4, 2, 3, currentEF, BASE_DATE)
      
      // q=4일 때 공식상 EF 변화 없음
      expect(result.e_factor).toBe(2.5)
      // Interval: 3 * 2.5 = 7.5 -> 반올림 8
      expect(result.interval).toBe(8)
    })

    // 5. 세 번째 성공 (Rep 2 -> 3) : 어려움(3)
    it('세 번째 성공 & quality=3 (턱걸이) → EF 감소', () => {
      const currentEF = 2.5
      const result = calculateSM2(3, 2, 3, currentEF, BASE_DATE)
      
      // q=3일 때 EF 감소 (2.5 -> 2.36)
      expect(result.e_factor).toBe(2.36)
      // Interval: 3 * 2.36 = 7.08 -> 반올림 7
      expect(result.interval).toBe(7)
    })

    // 6. 날짜 계산 정확도
    it('Interval이 8일이면 날짜도 8일 뒤여야 한다', () => {
      // 1월 15일 + 8일 = 1월 23일
      const result = calculateSM2(5, 2, 3, 2.5, BASE_DATE)
      expect(result.interval).toBe(8)
      expect(result.next_review_date).toBe('2024-01-23')
    })

    // 7. EF 상한선 테스트 (일반적으로 3.5 제한을 두기도 하지만 코드엔 max제한이 없음, 상승 확인)
    it('연속된 quality=5는 EF를 계속 증가시킨다', () => {
      const result = calculateSM2(5, 5, 10, 3.0, BASE_DATE)
      expect(result.e_factor).toBeGreaterThan(3.0)
    })

    // 8. 소수점 처리 확인
    it('EF는 소수점 둘째 자리까지 반환해야 한다', () => {
      const result = calculateSM2(3, 2, 3, 2.5, BASE_DATE)
      // 2.36
      expect(result.e_factor.toString()).toMatch(/^\d+\.\d{1,2}$/)
    })

    // 9. 긴 간격 계산
    it('큰 Interval과 EF 계산 확인', () => {
      // 현재 간격 100일, EF 2.5, q=5
      const result = calculateSM2(5, 10, 100, 2.5, BASE_DATE)
      // 100 * 2.6 = 260일
      expect(result.interval).toBe(260)
    })

    // 10. 윤년/월 변경 날짜 테스트
    it('월이 바뀌는 날짜 계산이 정확해야 한다 (1/30 + 3일)', () => {
      const jan30 = new Date('2024-01-30')
      const result = calculateSM2(4, 1, 1, 2.5, jan30) // rep 1->2, interval 3
      expect(result.interval).toBe(3)
      expect(result.next_review_date).toBe('2024-02-02')
    })
  })

  describe('실제 학습 시나리오', () => {
    it('완벽한 학습 곡선: 5점 반복 (신규 -> 3회차)', () => {
      // 1. 신규 학습 (Day 0)
      const step1 = calculateSM2(5, 0, 0, 2.5, BASE_DATE);
      expect(step1).toEqual(expect.objectContaining({
        repetitions: 1,
        interval: 1,
        e_factor: 2.6
      }));

      // 2. 1일 뒤 복습 (Day 1)
      const date2 = new Date(BASE_DATE);
      date2.setDate(date2.getDate() + step1.interval);
      
      const step2 = calculateSM2(5, step1.repetitions, step1.interval, step1.e_factor, date2);
      expect(step2).toEqual(expect.objectContaining({
        repetitions: 2,
        interval: 3, // 코드상 고정
        e_factor: 2.7
      }));

      // 3. 3일 뒤 복습 (Day 4)
      const date3 = new Date(date2);
      date3.setDate(date3.getDate() + step2.interval);

      const step3 = calculateSM2(5, step2.repetitions, step2.interval, step2.e_factor, date3);
      expect(step3).toEqual(expect.objectContaining({
        repetitions: 3,
        interval: 8, // Math.round(3 * 2.7) = 8.1 -> 8
        e_factor: 2.8
      }));
    });

    it('중간 실패 후 복구 시나리오', () => {
      // 1. 성공 (Rep 1)
      let result = calculateSM2(4, 0, 0, 2.5, BASE_DATE);
      expect(result.repetitions).toBe(1);
      expect(result.interval).toBe(1);

      // 2. 성공 (Rep 2)
      result = calculateSM2(4, result.repetitions, result.interval, result.e_factor, BASE_DATE);
      expect(result.repetitions).toBe(2);
      expect(result.interval).toBe(3);

      // 3. 실패 (Rep 0 으로 리셋)
      const efBeforeFail = result.e_factor;
      result = calculateSM2(1, result.repetitions, result.interval, result.e_factor, BASE_DATE);
      expect(result.repetitions).toBe(0);
      expect(result.interval).toBe(0);
      expect(result.e_factor).toBeLessThan(efBeforeFail); // EF는 깎여야 함

      // 4. 다시 성공 (Rep 1) - 깎인 EF로 시작
      const reducedEF = result.e_factor;
      result = calculateSM2(4, result.repetitions, result.interval, result.e_factor, BASE_DATE);
      expect(result.repetitions).toBe(1);
      expect(result.interval).toBe(1);
      expect(result.e_factor).toBe(reducedEF); // q=4는 EF 유지
    });
  });
});