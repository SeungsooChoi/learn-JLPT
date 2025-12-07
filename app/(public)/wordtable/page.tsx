import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WordChart from '@/components/wordtable/WordChart';
import WordDoubled from '@/components/wordtable/WordDoubled';

export default function WordTablePage() {
  // 히라가나 기본
  const hiraganaBasic = [
    ['あ', 'a', 'い', 'i', 'う', 'u', 'え', 'e', 'お', 'o', 'あ행'],
    ['か', 'ka', 'き', 'ki', 'く', 'ku', 'け', 'ke', 'こ', 'ko', 'か행'],
    ['さ', 'sa', 'し', 'shi', 'す', 'su', 'せ', 'se', 'そ', 'so', 'さ행'],
    ['た', 'ta', 'ち', 'chi', 'つ', 'tsu', 'て', 'te', 'と', 'to', 'た행'],
    ['な', 'na', 'に', 'ni', 'ぬ', 'nu', 'ね', 'ne', 'の', 'no', 'な행'],
    ['は', 'ha', 'ひ', 'hi', 'ふ', 'fu', 'へ', 'he', 'ほ', 'ho', 'は행'],
    ['ま', 'ma', 'み', 'mi', 'む', 'mu', 'め', 'me', 'も', 'mo', 'ま행'],
    ['や', 'ya', '', '', 'ゆ', 'yu', '', '', 'よ', 'yo', 'や행'],
    ['ら', 'ra', 'り', 'ri', 'る', 'ru', 'れ', 're', 'ろ', 'ro', 'ら행'],
    ['わ', 'wa', '', '', '', '', 'ゑ', 'we', 'を', 'wo', 'わ행'],
    ['ん', 'n', '', '', '', '', '', '', '', '', 'ん'],
  ];

  // 히라가나 탁음
  const hiraganaTageum = [
    ['が', 'ga', 'ぎ', 'gi', 'ぐ', 'gu', 'げ', 'ge', 'ご', 'go', 'が행'],
    ['ざ', 'za', 'じ', 'ji', 'ず', 'zu', 'ぜ', 'ze', 'ぞ', 'zo', 'ざ행'],
    ['だ', 'da', 'ぢ', 'ji', 'づ', 'zu', 'で', 'de', 'ど', 'do', 'だ행'],
    ['ば', 'ba', 'び', 'bi', 'ぶ', 'bu', 'べ', 'be', 'ぼ', 'bo', 'ば행'],
  ];

  // 히라가나 반탁음
  const hiraganaBanTageum = [['ぱ', 'pa', 'ぴ', 'pi', 'ぷ', 'pu', 'ぺ', 'pe', 'ぽ', 'po', 'ぱ행']];

  // 히라가나 요음
  const hiraganaYoeum = [
    ['きゃ', 'kya', 'きゅ', 'kyu', 'きょ', 'kyo', 'き행'],
    ['しゃ', 'sha', 'しゅ', 'shu', 'しょ', 'sho', 'し행'],
    ['ちゃ', 'cha', 'ちゅ', 'chu', 'ちょ', 'cho', 'ち행'],
    ['にゃ', 'nya', 'にゅ', 'nyu', 'にょ', 'nyo', 'に행'],
    ['ひゃ', 'hya', 'ひゅ', 'hyu', 'ひょ', 'hyo', 'ひ행'],
    ['みゃ', 'mya', 'みゅ', 'myu', 'みょ', 'myo', 'み행'],
    ['りゃ', 'rya', 'りゅ', 'ryu', 'りょ', 'ryo', 'り행'],
    ['ぎゃ', 'gya', 'ぎゅ', 'gyu', 'ぎょ', 'gyo', 'ぎ행'],
    ['じゃ', 'ja', 'じゅ', 'ju', 'じょ', 'jo', 'じ행'],
    ['びゃ', 'bya', 'びゅ', 'byu', 'びょ', 'byo', 'び행'],
    ['ぴゃ', 'pya', 'ぴゅ', 'pyu', 'ぴょ', 'pyo', 'ぴ행'],
  ];

  // 가타카나 기본
  const katakanaBasic = [
    ['ア', 'a', 'イ', 'i', 'ウ', 'u', 'エ', 'e', 'オ', 'o', 'ア행'],
    ['カ', 'ka', 'キ', 'ki', 'ク', 'ku', 'ケ', 'ke', 'コ', 'ko', 'カ행'],
    ['サ', 'sa', 'シ', 'shi', 'ス', 'su', 'セ', 'se', 'ソ', 'so', 'サ행'],
    ['タ', 'ta', 'チ', 'chi', 'ツ', 'tsu', 'テ', 'te', 'ト', 'to', 'タ행'],
    ['ナ', 'na', 'ニ', 'ni', 'ヌ', 'nu', 'ネ', 'ne', 'ノ', 'no', 'ナ행'],
    ['ハ', 'ha', 'ヒ', 'hi', 'フ', 'fu', 'ヘ', 'he', 'ホ', 'ho', 'ハ행'],
    ['マ', 'ma', 'ミ', 'mi', 'ム', 'mu', 'メ', 'me', 'モ', 'mo', 'マ행'],
    ['ヤ', 'ya', '', '', 'ユ', 'yu', '', '', 'ヨ', 'yo', 'ヤ행'],
    ['ラ', 'ra', 'リ', 'ri', 'ル', 'ru', 'レ', 're', 'ロ', 'ro', 'ラ행'],
    ['ワ', 'wa', '', '', '', '', 'ヱ', 'we', 'ヲ', 'wo', 'ワ행'],
    ['ン', 'n', '', '', '', '', '', '', '', '', 'ン'],
  ];

  // 가타카나 탁음
  const katakanaTageum = [
    ['ガ', 'ga', 'ギ', 'gi', 'グ', 'gu', 'ゲ', 'ge', 'ゴ', 'go', 'ガ행'],
    ['ザ', 'za', 'ジ', 'ji', 'ズ', 'zu', 'ゼ', 'ze', 'ゾ', 'zo', 'ザ행'],
    ['ダ', 'da', 'ヂ', 'ji', 'ヅ', 'zu', 'デ', 'de', 'ド', 'do', 'ダ행'],
    ['バ', 'ba', 'ビ', 'bi', 'ブ', 'bu', 'ベ', 'be', 'ボ', 'bo', 'バ행'],
  ];

  // 가타카나 반탁음
  const katakanaBanTageum = [['パ', 'pa', 'ピ', 'pi', 'プ', 'pu', 'ペ', 'pe', 'ポ', 'po', 'パ행']];

  // 가타카나 요음
  const katakanaYoeum = [
    ['キャ', 'kya', 'キュ', 'kyu', 'キョ', 'kyo', 'キ행'],
    ['シャ', 'sha', 'シュ', 'shu', 'ショ', 'sho', 'シ행'],
    ['チャ', 'cha', 'チュ', 'chu', 'チョ', 'cho', 'チ행'],
    ['ニャ', 'nya', 'ニュ', 'nyu', 'ニョ', 'nyo', 'ニ행'],
    ['ヒャ', 'hya', 'ヒュ', 'hyu', 'ヒョ', 'hyo', 'ヒ행'],
    ['ミャ', 'mya', 'ミュ', 'myu', 'ミョ', 'myo', 'ミ행'],
    ['リャ', 'rya', 'リュ', 'ryu', 'リョ', 'ryo', 'リ행'],
    ['ギャ', 'gya', 'ギュ', 'gyu', 'ギョ', 'gyo', 'ギ행'],
    ['ジャ', 'ja', 'ジュ', 'ju', 'ジョ', 'jo', 'ジ행'],
    ['ビャ', 'bya', 'ビュ', 'byu', 'ビョ', 'byo', 'ビ행'],
    ['ピャ', 'pya', 'ピュ', 'pyu', 'ピョ', 'pyo', 'ピ행'],
  ];

  return (
    <div className="mx-auto space-y-10">
      <h1 className="text-xl">일본어 문자표</h1>

      <Tabs defaultValue="hiragana">
        <TabsList>
          <TabsTrigger value="hiragana">히라가나</TabsTrigger>
          <TabsTrigger value="katakana">가타카나</TabsTrigger>
        </TabsList>

        <TabsContent value="hiragana" className="space-y-4">
          <WordChart data={hiraganaBasic} sectionKey="hiragana-basic" title="히라가나" />
          <WordChart data={hiraganaTageum} sectionKey="hiragana-tageum" title="탁음" />
          <WordChart data={hiraganaBanTageum} sectionKey="hiragana-bantageum" title="반탁음" />
          <WordChart data={hiraganaYoeum} sectionKey="hiragana-youm" title="요음" isYoeum={true} />
          <WordDoubled type="hiragana" />
        </TabsContent>
        <TabsContent value="katakana" className="space-y-4">
          <WordChart data={katakanaBasic} sectionKey="hiragana-basic" title="가타카나" />
          <WordChart data={katakanaTageum} sectionKey="hiragana-tageum" title="탁음" />
          <WordChart data={katakanaBanTageum} sectionKey="hiragana-bantageum" title="반탁음" />
          <WordChart data={katakanaYoeum} sectionKey="hiragana-youm" title="요음" isYoeum={true} />
          <WordDoubled type="katakana" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
