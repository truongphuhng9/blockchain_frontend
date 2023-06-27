<script>
    import { load } from 'svelte';

    let block;

    // Load the route parameter value
    load(async (params) => {
        const hash = params.hash;

        // Make an API request or retrieve the block data in any way you prefer
        const response = await fetch(`${PUBLIC_BE_HOST}/block/${hash}`);
        block = await response.json();
    });

    function navigateToBlocks() {
        goto('/blocks');
    }
</script>

<h1>Block Details: {block.hash}</h1>
<p>Index: {block.index}</p>
<p>Previous Hash: {block.previousHash}</p>

<h2>Transactions:</h2>
{#each block.data as transaction}
  <div>
    <h3>Transaction ID: {transaction.id}</h3>
    <ul>
      {#each transaction.txIns as txIn}
        <li>Signature: {txIn.signature}</li>
        <li>txOutId: {txIn.txOutId}</li>
        <li>txOutIndex: {txIn.txOutIndex}</li>
      {/each}
    </ul>
    <ul>
      {#each transaction.txOuts as txOut}
        <li>Address: {txOut.address}</li>
        <li>Amount: {txOut.amount}</li>
      {/each}
    </ul>
  </div>
{/each}

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
