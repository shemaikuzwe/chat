import { Source, Sources, SourcesContent, SourcesTrigger } from "../ui/source";
type TSource = {
  id: string;
  title: string;
};
const SourcesView = ({ sources }: { sources?: TSource[] }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <Sources>
      <SourcesTrigger count={sources.length} />
      <SourcesContent>
        {sources.map((source, index) => (
          <Source key={index} href={source.id} title={source.title} />
        ))}
      </SourcesContent>
    </Sources>
  );
};

export default SourcesView;
