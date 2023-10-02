import { AvailableSizesType } from "@/utils/types";

const TileComponent: React.FC<{
  data: AvailableSizesType[];
  selectedData: AvailableSizesType[];
  onClick: (size: AvailableSizesType) => void;
}> = ({ data, selectedData, onClick }) => {
  return (
    data &&
    data.length && (
      <div className="mt-3 flex flex-wrap items-center gap-1">
        {data.map((dataItem) => (
          <button
            key={dataItem.id}
            onClick={() => onClick(dataItem)}
            className={`${
              selectedData &&
              selectedData.length &&
              selectedData.map((item) => item.id).indexOf(dataItem.id) !== -1
                ? "bg-gray-400 transition ease-in duration-100"
                : ""
            }`}
          >
            {dataItem.label}
          </button>
        ))}
      </div>
    )
  );
};

export default TileComponent;
