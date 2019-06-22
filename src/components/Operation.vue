<template>
  <div>
    <p>Operation info</p>
    <p>Operation code: {{ operation_code }} ({{ operation_codes[operation_code] }})</p>
    <hr>
    <!-- OPCODE 0 -->
    <div v-if="operation_code === 0">
      <p>Amount:<asset-amount :amount="operation.amount" /></p>
      <p>Fee: <asset-amount :amount="operation.fee" /></p>
      <br>
      <p>
        To:
        <router-link to="TODO">{{ operation.to }}</router-link>
      </p>
      <p>
        From:
        <router-link to="TODO">{{ operation.from }}</router-link>
      </p>
      <div v-if="operation.memo">
        <br>
        <p>Memo:</p>
        <div class="indent memo">
          <p v-for="value, key in operation.memo">{{ key }}: {{ value }}</p>
        </div>
      </div>
    </div>

    <!-- OPCODE 1 -->
    <div v-else-if="operation_code === 1">
      <p>Seller: {{ operation.seller }}</p>
      <p>Expiration: {{ operation.expiration }}</p>
      <br>
      <p>Amount to sell: <asset-amount :amount="operation.amount_to_sell" /></p>
      <p>Minimum to receive: <asset-amount :amount="operation.min_to_receive" /></p>
      <br>
      <p>Fee: <asset-amount :amount="operation.fee" /></p>
      <br>
      <p>Fill or kill: {{ operation.fill_or_kill }}</p>
    </div>

    <!-- OPCODE 2 -->
    <div v-else-if="operation_code === 2">
      <p>Fee: <asset-amount :amount="operation.fee" /></p>
      <p>Fee paying account: {{ operation.fee_paying_account }}</p>
      <p>Order: {{ operation.order }}</p>
    </div>

    <!-- OPCODE 3 -->
    <div v-else-if="operation_code === 3">
    </div>

    <!-- OPCODE 4 -->
    <div v-else-if="operation_code === 4">
      <p>Order ID: {{ operation.order_id }}</p>
      <p>Pays: <asset-amount :amount="operation.pays" /></p>
      <p>Receives: <asset-amount :amount="operation.receives" /></p>
      <br>
      <p>
        Fill price:
        <div class="indent">
          <p>
            Base:
            <asset-amount :amount="operation.fill_price.base" />
          </p>
          <p>
            Quote:
            <asset-amount :amount="operation.fill_price.quote" />
          </p>
        </div>
      </p>
      <br>
      <p>Fee: <asset-amount :amount="operation.fee" /></p>
      <br>
      <p>User made this order? {{ operation.is_maker }}</p>
    </div>

    <!-- OPCODE 5 -->
    <div v-else-if="operation_code === 5">
    </div>

    <!-- OPCODE 6 -->
    <div v-else-if="operation_code === 6">
    </div>

    <!-- OPCODE 7 -->
    <div v-else-if="operation_code === 7">
    </div>

    <!-- OPCODE 8 -->
    <div v-else-if="operation_code === 8">
    </div>

    <!-- OPCODE 9 -->
    <div v-else-if="operation_code === 9">
    </div>

    <!-- OPCODE 10 -->
    <div v-else-if="operation_code === 10">
    </div>

    <!-- OPCODE 11 -->
    <div v-else-if="operation_code === 11">
    </div>

    <!-- OPCODE 12 -->
    <div v-else-if="operation_code === 12">
    </div>

    <!-- OPCODE 13 -->
    <div v-else-if="operation_code === 13">
    </div>

    <!-- OPCODE 14 -->
    <div v-else-if="operation_code === 14">
    </div>

    <!-- OPCODE 15 -->
    <div v-else-if="operation_code === 15">
    </div>

    <!-- OPCODE 16 -->
    <div v-else-if="operation_code === 16">
    </div>

    <!-- OPCODE 17 -->
    <div v-else-if="operation_code === 17">
    </div>

    <!-- OPCODE 18 -->
    <div v-else-if="operation_code === 18">
    </div>

    <!-- OPCODE 19 -->
    <div v-else-if="operation_code === 19">
    </div>

    <!-- OPCODE 20 -->
    <div v-else-if="operation_code === 20">
    </div>

    <!-- OPCODE 21 -->
    <div v-else-if="operation_code === 21">
    </div>

    <!-- OPCODE 22 -->
    <div v-else-if="operation_code === 22">
    </div>

    <!-- OPCODE 23 -->
    <div v-else-if="operation_code === 23">
    </div>

    <!-- OPCODE 24 -->
    <div v-else-if="operation_code === 24">
    </div>

    <!-- OPCODE 25 -->
    <div v-else-if="operation_code === 25">
    </div>

    <!-- OPCODE 26 -->
    <div v-else-if="operation_code === 26">
    </div>

    <!-- OPCODE 27 -->
    <div v-else-if="operation_code === 27">
    </div>

    <!-- OPCODE 28 -->
    <div v-else-if="operation_code === 28">
    </div>

    <!-- OPCODE 29 -->
    <div v-else-if="operation_code === 29">
    </div>

    <!-- OPCODE 30 -->
    <div v-else-if="operation_code === 30">
    </div>

    <!-- OPCODE 31 -->
    <div v-else-if="operation_code === 31">
    </div>

    <!-- OPCODE 32 -->
    <div v-else-if="operation_code === 32">
    </div>

    <!-- OPCODE 33 -->
    <div v-else-if="operation_code === 33">
    </div>

    <!-- OPCODE 34 -->
    <div v-else-if="operation_code === 34">
    </div>

    <!-- OPCODE 35 -->
    <div v-else-if="operation_code === 35">
    </div>

    <!-- OPCODE 36 -->
    <div v-else-if="operation_code === 36">
    </div>

    <!-- OPCODE 37 -->
    <div v-else-if="operation_code === 37">
    </div>

    <!-- OPCODE 38 -->
    <div v-else-if="operation_code === 38">
    </div>

    <!-- OPCODE 39 -->
    <div v-else-if="operation_code === 39">
    </div>

    <!-- OPCODE 40 -->
    <div v-else-if="operation_code === 40">
    </div>

    <!-- OPCODE 41 -->
    <div v-else-if="operation_code === 41">
    </div>

    <!-- OPCODE 42 -->
    <div v-else-if="operation_code === 42">
    </div>

    <!-- OPCODE 43 -->
    <div v-else-if="operation_code === 43">
    </div>

    <!-- OPCODE 44 -->
    <div v-else-if="operation_code === 44">
    </div>

    <!-- OPCODE 45 -->
    <div v-else-if="operation_code === 45">
    </div>

    <!-- OPCODE 46 -->
    <div v-else-if="operation_code === 46">
    </div>

    <!-- OPCODE 47 -->
    <div v-else-if="operation_code === 47">
    </div>

    <!-- OPCODE 48 -->
    <div v-else-if="operation_code === 48">
    </div>

    <!-- OPCODE 49 -->
    <div v-else-if="operation_code === 49">
    </div>

    <!-- OPCODE 50 -->
    <div v-else-if="operation_code === 50">
    </div>

    <!-- OPCODE 51 -->
    <div v-else-if="operation_code === 51">
    </div>
  </div>
</template>

<script>
import AssetAmount from './AssetAmount.vue'

export default {
  name: 'Operation',
  props: ['operation_code', 'operation'],
  components: {
    AssetAmount
  },
  data() {
    return {
      operation_codes: {
        0: 'transfer',
        1: 'limit_order_create',
        2: 'limit_order_cancel',
        3: 'call_order_update',
        4: 'fill_order',
        5: 'account_create',
        6: 'account_update',
        7: 'account_whitelist',
        8: 'account_upgrade',
        9: 'account_transfer',
        10: 'asset_create',
        11: 'asset_update',
        12: 'asset_update_bitasset',
        13: 'asset_update_feed_producers',
        14: 'asset_issue',
        15: 'asset_reserve',
        16: 'asset_fund_fee_pool',
        17: 'asset_settle',
        18: 'asset_global_settle',
        19: 'asset_publish_feed',
        20: 'witness_create',
        21: 'witness_update',
        22: 'proposal_create',
        23: 'proposal_update',
        24: 'proposal_delete',
        25: 'withdraw_permission_create',
        26: 'withdraw_permission_update',
        27: 'withdraw_permission_claim',
        28: 'withdraw_permission_delete',
        29: 'committee_member_create',
        30: 'committee_member_update',
        31: 'committee_member_update_global_parameters',
        32: 'vesting_balance_create',
        33: 'vesting_balance_withdraw',
        34: 'worker_create',
        35: 'custom',
        36: 'assert',
        37: 'balance_claim',
        38: 'override_transfer',
        39: 'transfer_to_blind',
        40: 'blind_transfer',
        41: 'transfer_from_blind',
        42: 'asset_settle_cancel',
        43: 'asset_claim_fees',
        44: 'fba_distribute',
        45: 'bid_collateral',
        46: 'execute_bid',
        47: 'asset_claim_pool',
        48: 'asset_update_issuer',
        49: 'custom_authority_create',
        50: 'custom_authority_update',
        51: 'custom_authority_delete'
      }
    }
  }
}
</script>

<style scoped>
  
</style>
