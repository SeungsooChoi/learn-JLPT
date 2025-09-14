import { Button } from "../../components/ui/button"
import { SAMPLE_WORDS } from "../data/data"

export default function Words() {
  return (
    <div className="bg-card rounded p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <select className="border rounded px-2 py-1">
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-muted-foreground">
              <th className="px-2">단어</th>
              <th className="px-2">읽기</th>
              <th className="px-2">뜻</th>
              <th className="px-2">의미 표시/숨김</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_WORDS.map((w, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-2 cursor-pointer">
                  <div className="font-medium">{w.word}</div>
                </td>
                <td className="py-2 px-2">{w.reading}</td>
                <td className="py-2 px-2">{w.meaning}</td>
                <td className="py-2 px-2">
                  <Button size="sm">표시</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
        <div>총 n개 — 페이지 n / n</div>
        <div className="flex items-center gap-2">
          <Button size="sm">이전</Button>
          <Button size="sm">다음</Button>
        </div>
      </div>
    </div>
  )
}