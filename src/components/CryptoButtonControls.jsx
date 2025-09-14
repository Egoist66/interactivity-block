
export const  CryptoButtonControls = ({
  isLoading,
  isAllReportVisible,
  refetch = () => {},
  toggleAllReport = () => {},
}) => {
  return (
    <>
      {!isLoading && (
        <div className="controls-wrapper">
          <div className="refresh-btn-wrapper">
            {!isAllReportVisible && (
              <button onClick={refetch} className="controls-btn refresh-btn">
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
    </>
  );
};
