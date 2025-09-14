
export const CryptoSelect = ({onSelectCoin = () => {}}) => {
  return (
    <div className="crypto-selector">
      <label for="crypto-select">Выберите криптовалюту:</label>
      <select
        onChange={(e) => onSelectCoin(e.target.value)}
        id="crypto-select"
      >
        <option value="bitcoin">Bitcoin (BTC)</option>
        <option value="ethereum">Ethereum (ETH)</option>
        <option value="solana">Solana (SOL)</option>
      </select>
    </div>
  );
};
