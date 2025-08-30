import { useState } from "react";

const FeaturesDisplay = ({ features }: { features: string[] }) => {
  const [showAll, setShowAll] = useState(false);

  if (!features || features.length === 0) {
    return null;
  }

  const visibleFeatures = showAll ? features : features.slice(0, 3);
  const hiddenCount = features.length - 3;

  return (
    <div className="flex flex-wrap gap-1 mb-4">
      {visibleFeatures.map((feature, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-indigo-50 dark:bg-[#374151] text-blue-700 dark:text-[#f3f4f6] text-xs font-medium rounded-full"
        >
          {feature}
        </span>
      ))}

      {features.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {showAll ? "Show less" : `+${hiddenCount} more`}
        </button>
      )}
    </div>
  );
};

export default FeaturesDisplay;
