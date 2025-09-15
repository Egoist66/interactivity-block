import React from "react";
import ReactDOM from "react-dom/client";

import { CryptoSelect } from "./components/CryptoSelect.jsx";
import { CryptoContent } from "./components/CryptoContent.jsx";
import { CryptoButtonControls } from "./components/CryptoButtonControls.jsx";
import { useCryptoTracker } from "./hooks/useCryptoTracker.js";

const divsToUpdate = document.querySelector(".crypto-price-container");

  const root = ReactDOM.createRoot(divsToUpdate);
  root.render(<CryptoApp />);
  divsToUpdate.classList.remove("crypto-price-container");

function CryptoApp(props) {
  const {
    formattedPrice,
    formattedChange,
    formattedTime,
    setSelectedCoin,
    isLoading,
    error,
    changeClass,
    refetch,
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
        <CryptoSelect
          isAllReportVisible={isAllReportVisible}
          onSelectCoin={setSelectedCoin}
        />

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
              changeClass={changeClass}
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
