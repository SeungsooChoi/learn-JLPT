import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Home() {
  const SAMPLE_WORDS = [
    { id: "gakkou", word: "学校", reading: "がっこう", kanaType: "ひらがな", meaning: "학교", level: "N5", examples: ["学校へ行きます。", "明日、学校でテストがあります。"] },
    { id: "taberu", word: "食べる", reading: "たべる", kanaType: "ひらがな", meaning: "먹다", level: "N5", examples: ["朝ごはんを食べました。", "好きなものをたくさん食べてください。"] },
    { id: "jisho", word: "辞書", reading: "じしょ", kanaType: "ひらがな", meaning: "사전", level: "N4", examples: ["辞書で調べてください。"] },
    { id: "hanashi", word: "話す", reading: "はなす", kanaType: "ひらがな", meaning: "말하다", level: "N3", examples: ["友達と話しました。", "もっとゆっくり話してください。"] },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div>
            <div className="mt-1 text-sm text-muted-foreground">[{SAMPLE_WORDS[0].level}]</div>
            <div className="mt-1 text-sm text-muted-foreground">{SAMPLE_WORDS[0].reading}</div>
            <CardTitle className="text-3xl">{SAMPLE_WORDS[0].word}</CardTitle>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button size="sm" aria-label="단어 발음 재생">듣기</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <section className="mb-3">
          {/* <h3 className="text-lg font-medium">뜻</h3> */}
          <p className="mt-2 text-base">{SAMPLE_WORDS[0].meaning}</p>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">예문</h3>
          </div>
          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            {(SAMPLE_WORDS[0].examples).map((ex, i) => (
              <li key={i} className="py-1" lang="ja">{ex}</li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
