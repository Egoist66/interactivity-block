import "./editor.scss";

import { useCryptoTracker } from "./hooks/useCryptoTracker.js";
import spinner from "./assets/spinner.svg";
import React, { Fragment } from "react";

export default function Edit(props) {
  const {
    formattedPrice,
    formattedChange,
    formattedTime,
    setSelectedCoin,
    isLoading,
    error,
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

  const renderContentByCondition = () => {
    if (isLoading) {
      return <img className="crypto-spinner" src={spinner} alt="spinner" />;
    }

    if (isAllReportVisible && allReportData?.data?.length) {
      return allReportData?.data?.map((cryptoItem) => (
        <Fragment key={cryptoItem?.id}>
          <div className="crypto-info">
            <div className="crypto-icon">
              <img
                src={cryptoItem?.icon}
                alt={cryptoItem?.fullName}
                width="32"
                height="32"
              />
            </div>
            <h3 className="crypto-name">{cryptoItem?.fullName}</h3>
            <p className="crypto-price">${cryptoItem?.price}</p>
            <p className="crypto-change change-positive">
              {cryptoItem?.priceChange}
            </p>
            <small className="crypto-updated">
              {new Date(cryptoItem?.lastUpdated).toLocaleString()}
            </small>
          </div>
        </Fragment>
      ));
    }

    return (
      <>
        <div className="crypto-info">
          <div className="crypto-icon">
            <img
              src={data?.data?.icon}
              alt={data?.data?.fullName}
              width="32"
              height="32"
            />
          </div>
          <h3 className="crypto-name">{data?.data?.fullName}</h3>
          <p className="crypto-price">{formattedPrice}</p>
          <p className="crypto-change change-positive">{formattedChange}</p>
          <small className="crypto-updated">{formattedTime}</small>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className="crypto-price-container"
        data-wp-interactive="crypto-app-store"
      >
        <div className="crypto-selector">
          <label for="crypto-select">Выберите криптовалюту:</label>
          <select
            onChange={(e) => setSelectedCoin(e.target.value)}
            id="crypto-select"
          >
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="solana">Solana (SOL)</option>
          </select>
        </div>

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
            {renderContentByCondition()}
          </div>

          {!isLoading && (
            <div className="controls-wrapper">
              <div className="refresh-btn-wrapper">
                {!isAllReportVisible && (
                  <button
                    onClick={refetch}
                    className="controls-btn refresh-btn"
                  >
                    Обновить данные
                  </button>
                )}
              </div>

              <div className="show-all-btn-wrapper">
                <button onClick={toggleAllReport} className="controls-btn">
                  {isAllReportVisible ? "Скрыть" : "Показать"} данные всех
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
