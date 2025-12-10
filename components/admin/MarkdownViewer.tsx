import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 원하는 테마 선택

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 1. 제목 스타일 강제 적용 (prose 클래스가 안 먹힐 경우 대비)
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-6 mt-2" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-4 mt-8" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-3 mt-6" {...props} />,

          // 2. 코드 블록 스타일링 (Syntax Highlighting 적용)
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');

            // 인라인 코드 (`code`) 인 경우
            if (inline || !match) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-semibold text-primary" {...props}>
                  {children}
                </code>
              );
            }

            // 코드 블록 (```code```) 인 경우
            return (
              <SyntaxHighlighter
                style={vscDarkPlus} // 테마 적용
                language={match[1]}
                PreTag="div"
                className="rounded-md overflow-hidden my-4"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
