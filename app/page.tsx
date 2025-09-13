import { Button } from "@/app/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/shared/ui/card";
import { SAMPLE_WORDS } from "./data/data";

export default function Home() {

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
