<?php

    $ourContext = [
        "showSkyColor"   => false,
        "showGrassColor" => false,
        "attributes"     => $attributes,
    ];

?>
<div class="crypto-price-container" data-wp-interactive="crypto-app-store" <?php echo wp_interactivity_data_wp_context($ourContext); ?>>
  <div class="crypto-selector">
    <label for="crypto-select">Выберите криптовалюту:</label>
    <select id="crypto-select">
      <option value="bitcoin">Bitcoin (BTC)</option>
      <option value="ethereum">Ethereum (ETH)</option>
      <option value="solana">Solana (SOL)</option>
    </select>
  </div>

  <div class="crypto-refresh crypto-selector">
    <div class="crypto-content-wrapper">
      <div class="crypto-content">
        <div class="crypto-icon">
          <img src="https://img.icons8.com/color/48/bitcoin" alt="bitcoin" width="32" height="32" />
        </div>

        <div class="crypto-info">
          <h3 class="crypto-name">Bitcoin (BTC)</h3>
          <p class="crypto-price">$43,250.75</p>

          <p class="crypto-change change-positive">+2.35%</p>

          <small class="crypto-updated">
            Updated: 15:30:45
          </small>
        </div>
      </div>

      <div class="refresh-btn-wrapper">
        <button>Обновить данные</button>
      </div>

      <div class="show-all-btn-wrapper">
        <button>Показать данные всех</button>
      </div>
    </div>
  </div>
</div>