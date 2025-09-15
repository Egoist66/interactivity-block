import "./editor.scss";

import { useCryptoTracker } from "./hooks/useCryptoTracker.js";

import { CryptoSelect } from "./components/CryptoSelect.jsx";
import { CryptoButtonControls } from "./components/CryptoButtonControls.jsx";
import { CryptoContent } from "./components/CryptoContent.jsx";

export default function Edit(props) {
  const {
    formattedPrice,
    formattedChange,
    formattedTime,
    setSelectedCoin,
    isLoading,
    error,
    refetch,
    getChangeClass,
    data,
    toggleAllReport,
    isAllReportVisible,
    allReportData,
  } = useCryptoTracker({
    coin: "bitcoin",
    refreshInterval: 60,
  });

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div
        className="crypto-price-container"
        data-wp-interactive="crypto-app-store"
      >
        <CryptoSelect isAllReportVisible={isAllReportVisible} onSelectCoin={setSelectedCoin} />

        <div
          style={{
            justifyContent: isLoading ? "center" : "space-between",
            flexDirection: isAllReportVisible ? "column" : "row",
            gap: isAllReportVisible ? 40 : 0,
          }}
          className="crypto-content-wrapper"
        >
          <div
            style={{ display: isAllReportVisible ? "block" : "flex" }}
            className="crypto-content"
          >
            <CryptoContent
              isLoading={isLoading}
              getChangeClass={getChangeClass}
              isAllReportVisible={isAllReportVisible}
              allReportData={allReportData}
              data={data}
              formattedPrice={formattedPrice}
              formattedChange={formattedChange}
              formattedTime={formattedTime}
            />
          </div>

          <CryptoButtonControls
            isLoading={isLoading}
            isAllReportVisible={isAllReportVisible}
            refetch={refetch}
            toggleAllReport={toggleAllReport}
          />
        </div>
      </div>
    </>
  );
}
