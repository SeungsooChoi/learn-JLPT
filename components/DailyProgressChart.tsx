'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DailyProgressChart({
  data,
}: {
  data: {
    date: string;
    learned: number;
  }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" stroke="#666" />
        <YAxis
          allowDecimals={false} // Y축은 정수만 표시
          tickFormatter={(value) => value.toLocaleString()}
          stroke="#666"
        />
        <Tooltip
          formatter={(value) => [`${value.toLocaleString()}개`, '학습 단어 수']}
          labelFormatter={(label) => `날짜: ${label}`}
        />
        <Bar dataKey="learned" fill="#4f46e5" name="학습 단어 수" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
