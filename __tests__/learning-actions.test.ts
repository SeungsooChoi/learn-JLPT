import { getNewWords, getReviewWords, recordReview } from "@/app/(protected)/learn/actions"

// 1. Supabase Mock 함수 정의
const mockSelect = jest.fn()
const mockInsert = jest.fn()
const mockUpsert = jest.fn()
const mockEq = jest.fn()
const mockNot = jest.fn()
const mockLte = jest.fn()
const mockLimit = jest.fn()
const mockOrder = jest.fn()
const mockSingle = jest.fn()

// 2. 체이닝 헬퍼 함수
// Supabase 쿼리 빌더(.from().select().eq()...)를 흉내내기 위해 자기 자신(체인)을 반환
const createChain = () => ({
  select: mockSelect,
  insert: mockInsert,
  upsert: mockUpsert,
  eq: mockEq,
  not: mockNot,
  lte: mockLte,
  limit: mockLimit,
  order: mockOrder,
  single: mockSingle,
})

// 각 Mock 함수가 체인 객체를 반환하도록 설정
mockSelect.mockReturnValue(createChain())
mockEq.mockReturnValue(createChain())
mockNot.mockReturnValue(createChain())
mockLte.mockReturnValue(createChain())
mockLimit.mockReturnValue(createChain())
mockOrder.mockReturnValue(createChain())

// 3. 모듈 모킹 (jest.mock)
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({ 
        data: { user: { id: 'test-user-id' } } 
      })
    },
    from: jest.fn(() => createChain())
  }))
}))

describe('Learning Actions (Server Actions)', () => {
  // 각 테스트 실행 전 Mock 초기화
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('새로운 단어만 반환 (학습 기록 배제 필터 확인)', async () => {
    // Arrange
    const mockWords = [{ id: 'word-1', word: 'Test1' }, { id: 'word-2', word: 'Test2' }]
    // limit 호출 시 최종 데이터 반환 설정
    mockLimit.mockResolvedValue({ data: mockWords, error: null })

    // Act
    const words = await getNewWords('N5', 10)

    // Assert
    expect(words).toHaveLength(2)
    // Supabase의 .not() 메서드가 올바른 인자로 호출되었는지 확인
    expect(mockNot).toHaveBeenCalledWith(
      'id',
      'in',
      expect.stringContaining('select word_id from learning_records')
    )
    expect(mockEq).toHaveBeenCalledWith('level', 'N5')
  })

  it('복습할 단어만 반환 (날짜 조건 확인)', async () => {
    // Arrange
    const today = new Date().toISOString().split('T')[0]
    const mockRecords = [
      { jlpt_words: { id: 'w1' }, next_review_date: '2023-01-01' },
      { jlpt_words: { id: 'w2' }, next_review_date: today }
    ]
    mockLimit.mockResolvedValue({ data: mockRecords, error: null })

    // Act
    const words = await getReviewWords('N5')

    // Assert
    expect(words[0]).toEqual({ id: 'w1' }) // 데이터 구조 평탄화 확인
    expect(mockLte).toHaveBeenCalledWith('next_review_date', today) // 오늘 날짜 이하 조건
    expect(mockEq).toHaveBeenCalledWith('is_archived', false)
  })

  it('recordReview가 SM-2 결과를 계산하여 DB에 저장 (신규 학습)', async () => {
    // Arrange
    mockSingle.mockResolvedValue({ data: null }) // 기존 기록 없음
    mockUpsert.mockResolvedValue({ error: null })

    const wordId = 'new-word-id'
    
    // Act
    const result = await recordReview(wordId, 5) // Quality 5 (완벽)

    // Assert
    expect(result.success).toBe(true)
    expect(result.repetitions).toBe(1)
    expect(result.interval).toBe(1)

    // DB 저장 호출 검증
    expect(mockUpsert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: 'test-user-id',
      word_id: wordId,
      repetitions: 1,
      interval_days: 1,
      next_review_date: expect.any(String)
    }))
  })

  it('recordReview가 SM-2 결과를 계산하여 DB에 저장 (기존 기록 업데이트)', async () => {
    // Arrange
    const existingRecord = {
      repetitions: 1,
      interval_days: 1,
      e_factor: 2.5,
      last_reviewed_at: '2024-01-01T00:00:00.000Z'
    }
    mockSingle.mockResolvedValue({ data: existingRecord })
    mockUpsert.mockResolvedValue({ error: null })

    const wordId = 'existing-id'

    // Act
    // 기존 Rep 1, Interval 1 상태에서 Quality 4(성공) -> Rep 2, Interval 3 예상
    const result = await recordReview(wordId, 4)

    // Assert
    expect(result.repetitions).toBe(2)
    expect(result.interval).toBe(3)
    
    expect(mockUpsert).toHaveBeenCalledWith(expect.objectContaining({
      word_id: wordId,
      repetitions: 2,
      interval_days: 3,
      e_factor: 2.5 // Quality 4는 EF 유지
    }))
  })
})