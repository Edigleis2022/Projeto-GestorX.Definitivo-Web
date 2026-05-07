import { Search } from "lucide-react";

interface AbaPesquisarProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function AbaPesquisar({ query, setQuery }: AbaPesquisarProps) {
  return (
    <div classname={Styles.containerDiv}
    // className="flex items-center gap-2 bg-white rounded-md px-3 py-2 w-2/5"
    >
      <Search className="w-5 h-5 text-gray-600" />
      <input
        type="text"
        placeholder="Pesquisar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent outline-none text-black placeholder-gray-500 w-full"
      />
    </div>
  );
}
