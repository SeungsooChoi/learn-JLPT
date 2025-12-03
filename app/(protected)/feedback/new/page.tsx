import FeedbackForm from '@/components/feedback/FeedbackForm';

export default function FeedbackCreatePage() {
  return (
    <div className="max-w-xl mx-auto py-10 space-y-8">
      <h1 className="text-xl font-semibold">문의글 작성</h1>
      <FeedbackForm />
    </div>
  );
}
