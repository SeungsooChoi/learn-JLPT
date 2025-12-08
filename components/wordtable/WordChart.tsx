'use client';

import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface WordChartProps {
  data: string[][];
  sectionKey: string;
  title: string;
  isYoeum?: boolean;
}

/** 강조 셀 위치 타입 */
interface FocusedCell {
  row: number;
  col: number;
  section: string;
}

export default function WordChart({ data, sectionKey, title, isYoeum = false }: WordChartProps) {
  const [focusedCell, setFocusedCell] = useState<FocusedCell | null>(null);

  const handleCellClick = (rowIdx: number, colIdx: number, section: string) => {
    if (focusedCell && focusedCell.row === rowIdx && focusedCell.col === colIdx && focusedCell.section === section) {
      setFocusedCell(null);
    } else {
      setFocusedCell({ row: rowIdx, col: colIdx, section });
    }
  };

  const isCellFocused = (rowIdx: number, colIdx: number, section: string) => {
    if (!focusedCell || focusedCell.section !== section) return false;
    return focusedCell.row === rowIdx && focusedCell.col === colIdx;
  };

  const isRowFocused = (rowIdx: number, section: string) => {
    if (!focusedCell || focusedCell.section !== section) return false;
    return focusedCell.row === rowIdx;
  };

  const isColFocused = (colIdx: number, section: string) => {
    if (!focusedCell || focusedCell.section !== section) return false;
    return focusedCell.col === colIdx;
  };

  const columns = ['あ단', 'い단', 'う단', 'え단', 'お단'];
  const yoonColumns = ['ゃ', 'ゅ', 'ょ'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          {title}
          {isYoeum && (
            <Badge variant="secondary" className="text-xs rounded-full">
              拗音
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr>
                <th className="p-2 text-sm md:text-base w-20"></th>
                {(isYoeum ? yoonColumns : columns).map((col, idx) => (
                  <th
                    key={idx}
                    className={`
                      p-2 md:p-3 text-sm md:text-base font-semibold
                      transition-all duration-200
                      ${isColFocused(idx, sectionKey) ? 'bg-blue-400 text-white shadow-lg' : 'bg-gray-50 text-gray-700'}
                    `}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td
                    className={`
                      p-2 md:p-3 text-center font-semibold text-sm md:text-base
                      transition-all duration-200
                      ${
                        isRowFocused(rowIdx, sectionKey)
                          ? 'bg-blue-400 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700'
                      }
                    `}
                  >
                    {row[isYoeum ? 6 : 10]}
                  </td>
                  {(isYoeum ? [0, 2, 4] : [0, 2, 4, 6, 8]).map((colIdx, idx) => {
                    const kana = row[colIdx];
                    const romaji = row[colIdx + 1];
                    const isEmpty = !kana;
                    const focused = isCellFocused(rowIdx, idx, sectionKey);

                    return (
                      <td
                        key={idx}
                        onClick={() => !isEmpty && handleCellClick(rowIdx, idx, sectionKey)}
                        className={`
                          p-2 md:p-4 text-center rounded-xl
                          transition-all duration-200
                          ${isEmpty ? 'cursor-default' : 'cursor-pointer hover:bg-blue-50'}
                          ${isEmpty ? 'bg-transparent' : focused ? 'bg-blue-100' : 'bg-white'}
                        `}
                      >
                        {!isEmpty && (
                          <div className="flex flex-col items-center gap-1">
                            <div
                              className={`font-medium ${
                                isYoeum ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                              } text-zinc-600`}
                            >
                              {kana}
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">{romaji}</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
