import { fetchWords } from '@/app/(protected)/learn/actions';

const mockGetUser = jest.fn();
const mockSelect = jest.fn();
const mockFrom = jest.fn();
const mockRpc = jest.fn();

// 체이닝을 위한 빌더 패턴
const createQueryChain = (finalResult: any) => {
  const chain = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue(finalResult),
  };

  // 마지막 호출에서 결과 반환
  chain.gte.mockResolvedValue(finalResult);
  return chain;
};

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
    from: mockFrom,
    rpc: mockRpc,
  })),
}));

describe('Learning Actions Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // 기본 인증
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
    });
  });

  describe('fetchWords (Per-Level Daily Limit)', () => {
    it('N5 레벨을 요청하면 N5의 오늘 학습량만 카운트하고 30개 제한을 적용한다', async () => {
      // Arrange
      const todayCount = 5;
      const mockWords = Array.from({ length: 25 }, (_, i) => ({
        id: `word-${i}`,
        word: `こんにちは${i}`,
        meaning: `Hello${i}`,
      }));

      // learning_records 조회 체이닝 설정
      const queryChain = createQueryChain({ count: todayCount, error: null });
      mockFrom.mockReturnValue(queryChain);
      mockSelect.mockReturnValue(queryChain);

      // RPC 호출 결과 설정
      mockRpc.mockResolvedValue({ data: mockWords, error: null });

      // Act
      const result = await fetchWords('N5', 'test-user-id');

      // Assert
      // 1. from select 호출 확인
      expect(mockFrom).toHaveBeenCalledWith('learning_records');
      expect(queryChain.select).toHaveBeenCalledWith('*, jlpt_words!inner(level)', { count: 'exact', head: true });

      // 2. 필터링 체인 확인
      expect(queryChain.eq).toHaveBeenCalledWith('user_id', 'test-user-id');
      expect(queryChain.eq).toHaveBeenCalledWith('jlpt_words.level', 'N5');

      // 3. RPC 호출 시 남은 할당량 (30 - 5 = 25)
      expect(mockRpc).toHaveBeenCalledWith('fetch_words', {
        p_user_id: 'test-user-id',
        p_level: 'N5',
        p_limit: 25,
      });

      // 검증
      expect(result).toEqual({
        words: mockWords,
        todayCount: todayCount,
        dailyGoal: 30,
        isGoalReached: false,
      });
    });

    it('N5 목표(30개)를 달성했으면 빈 배열을 반환하고 RPC를 호출하지 않는다.', async () => {
      // Arrange
      const queryChain = createQueryChain({ count: 30, error: null });
      mockFrom.mockReturnValue(queryChain);

      // Act
      const result = await fetchWords('N5', 'test-user-id');

      // Assert
      expect(mockRpc).not.toHaveBeenCalled();

      // 검증
      expect(result).toEqual({
        words: [],
        todayCount: 30,
        dailyGoal: 30,
        isGoalReached: true,
      });
    });
  });
});
