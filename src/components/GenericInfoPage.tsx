import InfoPageLayout from "@/components/InfoPageLayout";

export default function GenericInfoPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <InfoPageLayout title={title}>
      <div className="space-y-6 text-slate-300 font-light leading-relaxed">
        <p className="text-xl text-blue-400 font-medium mb-8 tracking-wide">
          {description}
        </p>
        <div className="p-12 text-center border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/30">
          <p className="text-slate-500 font-medium text-sm tracking-wide">
            Content currently being updated...
          </p>
        </div>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Stay Tuned
          </h2>
          <p>
            We are working hard to bring you the latest information regarding{" "}
            {title}. Check back soon for the full update.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
