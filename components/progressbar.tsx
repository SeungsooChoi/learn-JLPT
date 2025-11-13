import { Progress } from '@/components/ui/progress';

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <Progress value={percent} />
      <p className="text-center text-sm text-gray-500 mt-1">
        {current} / {total}
      </p>
    </div>
  );
}
