import { supabase } from "@/lib/supabase-client";
import { Word } from "@/lib/types";
import { useEffect, useState } from "react";

export function useWords(level: string, currentPage: number, pageSize: number){
	const [words, setWords] = useState<Word[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);


	useEffect(()=>{
		async function fetchWords(){
			try {
				setError(null);
				setLoading(true);

				const offset = (currentPage - 1) * pageSize;
				const {data, count, error} = await supabase
					.from('word_with_korean')
					.select('*', { count: 'exact' }) // 전체 개수 포함
					.eq('jlpt_level', level)
					.range(offset, offset + pageSize - 1)
					.order('created_at', { ascending: true }) // 생성 시간순
	
				if(error){
					throw error;
				}
	
				setTotalCount(count || 0);
	
				const formatted = data.map((w) => ({
					id: w.id,
					word: w.word,
					reading: w.reading,
					meanings: w.korean_meanings.join(', '),
					level: w.jlpt_level,
					created_at: w.created_at,
				}));
	
				setWords(formatted);
			} catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다. ', error);
        setError(error instanceof Error ? error.message : "Failed to fetch words");
			} finally {
				setLoading(false);
			}
		}
		fetchWords();
	}, [level, currentPage, pageSize]);


	return {words, loading, error, totalCount};
}