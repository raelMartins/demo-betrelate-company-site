<script setup lang="ts">
const transactions: any = ref([]);
const days = ref('30');
const loading = ref(false);

const switchTab = catchAsyncError(async (tab: string) => {
  days.value = tab;
  await getAllTransactions();
});

const token = useCookie('betrelatecompanytoken').value;

const getAllTransactions = async () => {
  try {
    loading.value = true;
    const res: any = await getTransactions(token, { days: days.value });
    console.log(res);
    transactions.value = res.data;
    loading.value = false;
  } catch (err) {
    loading.value = false;
    console.log(err);
  }
};

getAllTransactions();

const activestyle = 'background-color: var(--primary-color); color: white';
</script>

<template>
  <section class="transactions_list">
    <div class="transactions_header">
      <div class="header">Transaction History</div>
      <div class="view_all">View All</div>
    </div>
    <div class="transaction_filters">
      <span
        class="filter_option"
        @click="switchTab('1')"
        :style="days === '1' ? activestyle : ``"
        >Today</span
      >
      <span
        class="filter_option"
        @click="switchTab('7')"
        :style="days === '7' ? activestyle : ``"
        >Last 7 Days</span
      >
      <span
        class="filter_option"
        @click="switchTab('30')"
        :style="days === '30' ? activestyle : ``"
        >This Month</span
      >
    </div>
    <div class="transaction_table_header">
      <span>Details</span>
      <span>Amount</span>
      <span>Date</span>
    </div>
    <ul class="list_of_transactions">
      <OverlayLoader :loading="loading" />
      <li class="transaction" v-for="transaction in transactions">
        <span class="transaction_description">
          <span class="transaction_type">
            <i
              class="pi pi-arrow-circle-down credit_transaction"
              v-if="transaction.transaction_type === `credit`"
            ></i>
            <i
              class="pi pi-arrow-circle-up debit_transaction"
              v-else-if="transaction.transaction_type === `debit`"
            ></i>
          </span>
          {{ transaction.transaction_description }}</span
        >
        <span class="transaction_amount"
          >N{{ transaction.transaction_amount }}</span
        >
        <span class="transaction_date">{{
          simpleDateFormat(transaction.createdAt)
        }}</span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';

.transactions_list {
  background-color: white;
  padding: 4rem 3rem;
  border-radius: 1rem;
  min-height: 30rem;
  height: 100%;
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
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    margin-bottom: 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @include tablet {
      display: flex;
    }
    .filter_option {
      padding: 1.2rem 2rem;
      text-align: center;
      color: #999999;
      background: #ececec;
      border-radius: 0.4rem;
      // width: 10rem;
      flex: 1;
      min-width: max-content;
      max-width: 100%;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
    }
  }
  .transaction_table_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 1.2rem;
    gap: 1rem;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: #000000;
    span {
      flex: 1;
      text-align: right;
    }
    span:nth-child(1) {
      flex: 2;
      text-align: left;
    }
    span:last-of-type {
      display: none;
      @include largephone {
        display: inline-block;
      }
    }
  }
  .list_of_transactions {
    list-style: none;
    margin: 0rem;
    padding: 0rem;
    position: relative;
    min-height: 20rem;
    .transaction {
      display: flex;
      gap: 1.2rem;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.6rem;
      color: #404040;
      padding: 1.2rem;
      margin-bottom: 0.1rem solid #eeeeee;
      // width: 100%;
      .pi {
        border-radius: 50%;
        color: white;
        font-size: 2rem;
      }
      .credit_transaction {
        background-color: green;
      }
      .debit_transaction {
        background-color: red;
      }
      .transaction_description {
        flex: 2;
        display: flex;
        align-items: center;
        gap: 1.2rem;
      }
      .transaction_amount {
        flex: 1;
        text-align: right;
      }
      .transaction_date {
        flex: 1;
        text-align: right;
        display: none;
        @include largephone {
          display: inline-block;
        }
      }
    }
  }
}
</style>
