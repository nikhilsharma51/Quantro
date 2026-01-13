import useAppStore from "../../store/useAppStore";
import TradeChart from "./TradeChart";
import TradeEditor from "./TradeEditor";

const TradeModal = () => {
  const {
    selectedTrade,
    isModalOpen,
    isEditMode,
    closeModal,
    enableEdit,
  } = useAppStore();

  if (!isModalOpen || !selectedTrade) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#020617] w-[900px] max-h-[90vh] rounded-xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
          <h2 className="text-lg font-medium">
            {selectedTrade.symbol} Trade
          </h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          <TradeChart trade={selectedTrade} />

          {!isEditMode && (
            <button
              onClick={enableEdit}
              className="px-4 py-2 bg-blue-500 rounded-lg text-white"
            >
              Edit Trade
            </button>
          )}

          {isEditMode && <TradeEditor trade={selectedTrade} />}
        </div>
      </div>
    </div>
  );
};

export default TradeModal;
