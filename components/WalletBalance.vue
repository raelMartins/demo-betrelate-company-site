<script setup lang="ts">
const profile = useState<any>('profile');
</script>

<template>
  <section class="wallet_balance">
    <div class="wallet_icon">
      <SvgsWalletIcon />
    </div>
    <div class="balance">
      <span class="wallet_caption">Wallet Balance</span>
      <span class="wallet_amount">&#8358;{{ profile.wallet }}</span>
    </div>
    <div class="fund_wallet">
      <button>Fund Wallet</button>
    </div>
  </section>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';
.wallet_balance {
  padding: 2rem 3rem;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  min-height: 14rem;
  flex-direction: column;
  text-align: center;
  @include tablet {
    flex-direction: row;
    text-align: left;
  }
  .balance {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    letter-spacing: var(--letter-spacing);
    .wallet_caption {
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 1.6rem;
      color: #999999;
    }
    .wallet_amount {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 2.8rem;
      color: #404040;
    }
  }
  .fund_wallet {
    button {
      @include darkButton;
      width: 25rem;
      @include tablet {
        width: max-content;
      }
    }
  }
}
</style>
