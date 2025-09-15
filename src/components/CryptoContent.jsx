import React, { Fragment } from "react";
import spinner from "../assets/spinner.svg";

export const CryptoContent = ({
  isLoading,
  isAllReportVisible,
  getChangeClass = () => {},
  allReportData,
  data,
  formattedPrice,
  formattedChange,
  formattedTime,
}) => {
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
          <p
            className={`crypto-change ${getChangeClass(
              +cryptoItem?.priceChange
            )}`}
          >
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
        <p
          className={`crypto-change change-positive ${getChangeClass(
            +cryptoItem?.priceChange
          )}`}
        >
          {formattedChange}
        </p>
        <small className="crypto-updated">{formattedTime}</small>
      </div>
    </>
  );
};
