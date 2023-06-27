<script>
    import { goto } from '$app/navigation';
    export let data;

    const { block } = data;

    function navigateToBlocks() {
        goto('/blocks');
    }

    let expandedTransactions = [];
  
    function toggleTransaction(transactionId) {
      if (expandedTransactions.includes(transactionId)) {
        expandedTransactions = expandedTransactions.filter(id => id !== transactionId);
      } else {
        expandedTransactions = [...expandedTransactions, transactionId];
      }
    }
</script>

<h1 class="text-2xl font-bold mb-4">Block Details: {block.hash}</h1>
<p class="mb-2">Index: {block.index}</p>
<p class="mb-2">Previous Hash: {block.previousHash}</p>

<div class="bg-white rounded-lg shadow-md p-6 mb-6">
  <h1 class="text-2xl font-bold mb-4">Block Details: {block.hash}</h1>
  <p class="mb-2">Index: {block.index}</p>
  <p class="mb-2">Previous Hash: {block.previousHash}</p>
</div>

<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-xl font-bold mb-4">Transactions:</h2>
  {#each block.data as transaction}
    <div class="bg-gray-100 rounded-lg p-4 mb-4">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <h3 class="text-lg font-bold mb-2 cursor-pointer" on:click={() => toggleTransaction(transaction.id)}>
        Transaction ID: {transaction.id}
      </h3>
      {#if expandedTransactions.includes(transaction.id)}
        <ul class="mb-4">
          {#each transaction.txIns as txIn}
            <li class="mb-2"><span class="font-bold">Signature:</span> {txIn.signature}</li>
            <li class="mb-2"><span class="font-bold">txOutId:</span> {txIn.txOutId}</li>
            <li class="mb-2"><span class="font-bold">txOutIndex:</span> {txIn.txOutIndex}</li>
          {/each}
        </ul>
        <ul>
          {#each transaction.txOuts as txOut}
            <li class="mb-2"><span class="font-bold">Address:</span> {txOut.address}</li>
            <li class="mb-2"><span class="font-bold">Amount:</span> {txOut.amount}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/each}
</div>

<button on:click={navigateToBlocks}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
    Back to Blocks
</button>

<style>
    .w-6 { width: 24px; }
    .h-6 { height: 24px; }
</style>
