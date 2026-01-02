import { cn } from "@/lib/utils";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const FilterBar = ({ categories, activeCategory, onSelectCategory }: FilterBarProps) => {
  return (
    <div className="w-full overflow-x-auto py-6 mb-8 no-scrollbar bg-background/95 backdrop-blur-sm sticky top-0 z-30 border-b border-white/5">
      <div className="container flex items-center gap-4 min-w-max px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "px-6 py-2 rounded-sm text-sm font-body uppercase tracking-wider transition-all duration-300 border border-transparent",
              activeCategory === category
                ? "bg-brand-platinum text-brand-dark font-bold shadow-[0_0_15px_rgba(200,200,200,0.3)]"
                : "text-muted-foreground hover:text-brand-platinum hover:border-brand-platinum/20 bg-surface/50"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
