'use client';

import { JLPTLevel } from '@/types/word';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // 레벨별 색상

export default function LevelDistributionChart({
  data,
}: {
  data: {
    name: JLPTLevel;
    learned: number;
  }[];
}) {
  // Pie Chart는 0이 아닌 데이터만 사용
  const validData = data.filter((d) => d.learned > 0);

  if (validData.length === 0) return <p className="text-center py-10 text-gray-500">학습된 레벨이 없습니다.</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={validData} cx="50%" cy="50%" innerRadius={80} outerRadius={100} fill="#8884d8" dataKey="learned">
          {validData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value.toLocaleString()}개`, '학습 단어 수']} />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
}
