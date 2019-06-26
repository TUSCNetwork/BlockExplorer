<template>
  <div>
    <p>Operation info</p>
    <p>Operation code: {{ operation_code }} ({{ operation_codes[operation_code] }})</p>
    <hr>
    
    <!-- OPCODE 0 transfer -->
    <div v-if="operation_code === 0">
      <p>Amount:<asset-amount :amount="operation.amount" /></p>
      <p>Fee: <asset-amount :amount="operation.fee" /></p>
      <br>
      <p>
        To:
        <router-link :to="'/account/'+operation.to">{{ operation.to }}</router-link>
      </p>
      <p>
        From:
        <router-link :to="'/account/'+operation.from">{{ operation.from }}</router-link>
      </p>
      <div v-if="operation.memo">
        <br>
        <p>Memo:</p>
        <div class="indent memo">
          <p v-for="value, key in operation.memo">{{ key }}: {{ value }}</p>
        </div>
      </div>
    </div>

    <!-- OPCODE 5 account_create -->
    <div v-else-if="operation_code === 5">
    </div>

    <!-- OPCODE 6 account_update -->
    <div v-else-if="operation_code === 6">
    </div>

    <!-- OPCODE 7 account_whitelist -->
    <div v-else-if="operation_code === 7">
    </div>

    <!-- OPCODE 8 account_upgrade -->
    <div v-else-if="operation_code === 8">
    </div>

    <!-- OPCODE 9 account_transfer -->
    <div v-else-if="operation_code === 9">
    </div>

    <!-- OPCODE 15 asset_reserve -->
    <div v-else-if="operation_code === 15">
    </div>

    <!-- OPCODE 20 witness_create -->
    <div v-else-if="operation_code === 20">
    </div>

    <!-- OPCODE 21 witness_update -->
    <div v-else-if="operation_code === 21">
    </div>

    <!-- OPCODE 22 proposal_create -->
    <div v-else-if="operation_code === 22">
    </div>

    <!-- OPCODE 23 proposal_update -->
    <div v-else-if="operation_code === 23">
    </div>

    <!-- OPCODE 24 proposal_delete -->
    <div v-else-if="operation_code === 24">
    </div>

    <!-- OPCODE 25 withdraw_permission_create -->
    <div v-else-if="operation_code === 25">
    </div>

    <!-- OPCODE 26 withdraw_permission_create -->
    <div v-else-if="operation_code === 26">
    </div>

    <!-- OPCODE 27 withdraw_permission_claim -->
    <div v-else-if="operation_code === 27">
    </div>

    <!-- OPCODE 28 withdraw_permission_delete -->
    <div v-else-if="operation_code === 28">
    </div>

    <!-- OPCODE 29 committee_member_create -->
    <div v-else-if="operation_code === 29">
    </div>

    <!-- OPCODE 30 committee_member_update -->
    <div v-else-if="operation_code === 30">
    </div>

    <!-- OPCODE 31 committee_member_update_global_parameters -->
    <div v-else-if="operation_code === 31">
    </div>

    <!-- OPCODE 32 vesting_balance_create -->
    <div v-else-if="operation_code === 32">
    </div>

    <!-- OPCODE 33 vesting_balance_withdraw -->
    <div v-else-if="operation_code === 33">
    </div>

    <!-- OPCODE 34 worker_create -->
    <div v-else-if="operation_code === 34">
    </div>

    <!-- OPCODE 35 custom -->
    <div v-else-if="operation_code === 35">
    </div>

    <!-- OPCODE 36 assert -->
    <div v-else-if="operation_code === 36">
    </div>

    <!-- OPCODE 37 balance_claim -->
    <div v-else-if="operation_code === 37">
    </div>

    <!-- OPCODE 38 override_transfer -->
    <div v-else-if="operation_code === 38">
    </div>

    <!-- OPCODE 39 transfer_to_blind -->
    <div v-else-if="operation_code === 39">
    </div>

    <!-- OPCODE 40 blind_transfer -->
    <div v-else-if="operation_code === 40">
    </div>

    <!-- OPCODE 41 transfer_from_blind -->
    <div v-else-if="operation_code === 41">
    </div>

    <!-- OPCODE 43 asset_claim_fees -->
    <div v-else-if="operation_code === 43">
    </div>

    <!-- OPCODE 47 asset_claim_pool -->
    <div v-else-if="operation_code === 47">
    </div>

    <!-- OPCODE 49 custom_authority_create -->
    <div v-else-if="operation_code === 49">
    </div>

    <!-- OPCODE 50 custom_authority_update -->
    <div v-else-if="operation_code === 50">
    </div>

    <!-- OPCODE 51 custom_authority_delete -->
    <div v-else-if="operation_code === 51">
    </div>
  </div>
</template>

<script>
import AssetAmount from './AssetAmount.vue'

export default {
  name: 'Operation',
  props: ['operationCode', 'operation'],
  components: {
    AssetAmount
  },
  data() {
    return {
      operationCodes: {
        0: 'transfer',
        // 1: 'limit_order_create',
        // 2: 'limit_order_cancel',
        // 3: 'call_order_update',
        // 4: 'fill_order',
        5: 'account_create',
        6: 'account_update',
        7: 'account_whitelist',
        8: 'account_upgrade',
        9: 'account_transfer',
        // 10: 'asset_create',
        // 11: 'asset_update',
        // 12: 'asset_update_bitasset',
        // 13: 'asset_update_feed_producers',
        // 14: 'asset_issue',
        15: 'asset_reserve',
        // 16: 'asset_fund_fee_pool',
        // 17: 'asset_settle',
        // 18: 'asset_global_settle',
        // 19: 'asset_publish_feed',
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
        // 42: 'asset_settle_cancel',
        43: 'asset_claim_fees',
        // 44: 'fba_distribute',
        // 45: 'bid_collateral',
        // 46: 'execute_bid',
        47: 'asset_claim_pool',
        // 48: 'asset_update_issuer',
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
