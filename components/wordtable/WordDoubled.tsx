import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function WordDoubled({ type = 'hiragana' }: { type: string }) {
  return (
    <Card className="mb-6 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">
          촉음 (促音)
          <Badge variant="secondary" className="text-md ml-2">
            っ / ッ
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl md:text-5xl font-medium text-purple-600">
                {type === 'hiragana' ? 'っ' : 'ッ'}
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-800"> 작은 &apos;つ/ツ&apos;로 표기 </p>
                <p className="text-xs md:text-sm text-gray-600"> 다음 자음을 한 박자 멈추고 발음 </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-lg md:text-xl font-medium text-purple-600">
                  {type === 'hiragana' ? 'がっこう' : 'ガッコウ'}
                </span>
                <span className="text-sm text-gray-600 ml-2">gakkou (学校)</span>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-lg md:text-xl font-medium text-purple-600">
                  {type === 'hiragana' ? 'きっぷ' : 'キップ'}
                </span>
                <span className="text-sm text-gray-600 ml-2">kippu (切符)</span>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-lg md:text-xl font-medium text-purple-600">
                  {type === 'hiragana' ? 'ずっと' : 'ズット'}
                </span>
                <span className="text-sm text-gray-600 ml-2">zutto (ずっと)</span>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-lg md:text-xl font-medium text-purple-600">
                  {type === 'hiragana' ? 'まっすぐ' : 'マッスグ'}
                </span>
                <span className="text-sm text-gray-600 ml-2">massugu (真っ直ぐ)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
