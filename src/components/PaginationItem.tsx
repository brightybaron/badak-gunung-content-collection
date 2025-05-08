import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@components/Icons";

const PaginationItem = ({ content, dataType }: any) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemShown = 6;
  return (
    <div>
      <ul className={`min-h-44 ${dataType === "fasilitas" ? "py-2" : "py-0"}`}>
        <div
          className={`space-y-2 ${dataType === "fasilitas" ? "px-6" : "px-4"}`}
        >
          {content
            .slice(currentPage * itemShown, currentPage * itemShown + itemShown)
            .map((item: any) => (
              <li className="list-disc" key={item}>
                {item}
              </li>
            ))}
        </div>
      </ul>
      {content.length > itemShown && (
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }}
            disabled={currentPage === 0}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconChevronLeft />
          </button>

          <span className="text-sm font-semibold">
            {currentPage + 1} / {Math.ceil(content.length / itemShown)}
          </span>

          <button
            onClick={() => {
              if (currentPage < Math.ceil(content.length / itemShown) - 1) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage >= Math.ceil(content.length / itemShown) - 1}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationItem;
