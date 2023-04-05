<script setup lang="ts"></script>

<template>
  <section class="transactions_list">
    <div class="transactions_header">
      <div class="header">Transaction History</div>
      <div class="view_all">View All</div>
    </div>
    <div class="transaction_filters">
      <span class="filter_option">Today</span>
      <span class="filter_option">Last 7 Days</span>
      <span class="filter_option">This Month</span>
    </div>
  </section>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';

.transactions_list {
  background-color: white;
  padding: 4rem 3rem;
  border-radius: 1rem;
  min-height: 30rem;
  .transactions_header {
    padding: 2.2rem 3rem;
    margin-left: -3rem;
    border-bottom: 0.1rem solid #eeeeee;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.8rem;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .view_all {
      color: var(--primary-color);
    }
  }
  .transaction_filters {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    margin-bottom: 1.2rem;
    .filter_option {
      padding: 1.2rem 2rem;
      text-align: center;
      color: #999999;
      background: #ececec;
      border-radius: 0.4rem;
      width: 10rem;
      max-width: 100%;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
    }
  }
}
</style>
