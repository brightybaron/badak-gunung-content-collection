import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@components/Icons";

const Accordion = ({ data, faqPage }: { data: any; faqPage: boolean }) => {
  const [openDays, setOpenDays] = useState<{ [key: string]: boolean }>({});

  const toggleDay = (index: number) => {
    setOpenDays((prev: any) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="border border-gray-300 rounded-sm overflow-hidden mb-2"
        >
          <button
            onClick={() => toggleDay(item.title)}
            className={`w-full py-3 flex items-center transition-colors duration-200 ${
              openDays[item.title]
                ? "bg-deep-blue text-white"
                : "bg-gray-50 text-black"
            } ${faqPage ? "px-4" : "px-1 sm:px-3"}`}
          >
            <div className="flex items-center gap-x-2">
              <span
                className={`min-w-11 ${
                  openDays[item.title] ? "text-sandy-beige" : "text-deep-blue"
                } font-semibold ${faqPage ? "hidden" : ""}`}
              >
                Day {index + 1}
              </span>
              <span className="font-medium text-left">
                {item.title
                  .split(/(\([^)]*\))/)
                  .map((part: string, index: number) =>
                    part.startsWith("(") && part.endsWith(")") ? (
                      <span key={index} className="font-bold">
                        {part}
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  )}
              </span>
            </div>
            <div className="ml-auto">
              {openDays[item.title] ? <IconChevronUp /> : <IconChevronDown />}
            </div>
          </button>
          <div
            className={`
                overflow-hidden transition-all duration-200 bg-white
                ${
                  openDays[item.title]
                    ? "max-h-fit px-2 sm:px-4 py-3"
                    : "max-h-0"
                }
              `}
          >
            {faqPage ? (
              <div className="px-4">
                <ul className="space-y-2">
                  {item.items.map((item: any, idx: number) => (
                    <li
                      key={idx}
                      className="text-slate-800 font-medium list-disc"
                    >
                      {item.details}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <table className="w-full ">
                <tbody>
                  {item.items.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      className="flex text-slate-900 mb-2 last:mb-0"
                    >
                      <td className="flex mr-1 justify-center min-w-13">
                        {item.time && <b>{item.time}</b>}
                      </td>
                      <td>
                        {item.details
                          .split(/(\([^)]*\))/)
                          .map((part: string, index: number) =>
                            part.startsWith("(") && part.endsWith(")") ? (
                              <span key={index} className="font-semibold">
                                {part}
                              </span>
                            ) : (
                              <span key={index}>{part}</span>
                            )
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Accordion;
