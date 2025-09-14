import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "../utils/debounce";

export const useCryptoTracker = ({ coin, refreshInterval }) => {
  const [selectedCoin, setSelectedCoin] = useState(coin || "bitcoin");
  const [isAllReportVisible, setIsAllReportVisible] = useState(false);
  const [data, setData] = useState(null);
  const [allReportData, setAllReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);

  const cryptoConfig = {
    currentCryptoUrl: "https://crypto-api-app-production.up.railway.app/price/",
    allCryptosUrl: "https://crypto-api-app-production.up.railway.app/cryptos",
  };

  const toggleAllReport = () => {
    setIsAllReportVisible((prev) => !prev);
  };

  const fetchPrice = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${cryptoConfig.currentCryptoUrl}${selectedCoin}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (data) {
        setData(data);
      }

      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching crypto price:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCryptosPrice = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(cryptoConfig.allCryptosUrl, {
        headers: {
          Accept: "application/json",
        },
      });

      if (data) {
        setAllReportData(data);
      }

      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching all cryptos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Форматированные значения
  const formattedPrice = data?.data?.price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(data.data.price)
    : "Loading...";

  const formattedChange = data?.data?.priceChange
    ? `${data.data.priceChange > 0 ? "+" : ""}${data.data.priceChange.toFixed(
        2
      )}%`
    : "0%";

  const changeClass = {
    "change-positive": data?.data?.priceChange
      ? data.data.priceChange > 0
      : false,
    "change-negative": data?.data?.priceChange
      ? data.data.priceChange < 0
      : false,
    "change-neutral": data?.data?.priceChange
      ? data.data.priceChange === 0
      : false,
  };

  const formattedTime = lastUpdated
    ? `Updated: ${lastUpdated.toLocaleTimeString()}`
    : "";

  const refetch = debounce(() => {
    if (isAllReportVisible) {
      fetchAllCryptosPrice();
    } else {
      fetchPrice();
    }
  }, 1000);

  useEffect(() => {
    if (refreshInterval) {
      intervalRef.current = setInterval(() => {
        refetch();
      }, refreshInterval * 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshInterval, isAllReportVisible]);

  useEffect(() => {
    fetchPrice();
  }, [selectedCoin]);

  useEffect(() => {
    if (isAllReportVisible) {
      fetchAllCryptosPrice();
    } else {
      fetchPrice();
    }
  }, [isAllReportVisible]);

  useEffect(() => {
    console.log(selectedCoin);
  }, [selectedCoin]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return {
    fetchPrice,
    toggleAllReport,
    formattedPrice,
    formattedChange,
    changeClass,
    formattedTime,
    selectedCoin,
    setSelectedCoin,
    data,
    error,
    refetch,
    isError: !!error,
    isLoading: loading,
    dataUpdatedAt: lastUpdated,
    status: loading ? "loading" : error ? "error" : "success",
    isAllReportVisible,
    allReportData,
  };
};
