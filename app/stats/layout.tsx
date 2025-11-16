export default function LearningLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
