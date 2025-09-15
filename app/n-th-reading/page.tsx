import { Card, CardAction, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const levels = ["N5", "N4", "N3", "N2", "N1"];

export default function Reading() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-xl font-bold">JLPT 레벨 선택</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {levels.map((level) => (
          <Card className="min-w-[100px] min-h-[100px] flex items-center justify-center shadow-lg" key={level}>
            <CardTitle>
              <CardAction>
                <Link href={`n-th-reading/${level}`} className="text-lg font-semibold">{level}</Link>
              </CardAction>
            </CardTitle>
          </Card>
        ))}
      </div>
    </div>
  )
}