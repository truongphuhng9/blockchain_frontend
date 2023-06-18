<script>
    export let blocks;
    export let refreshBlocks;
  </script>
  
  <div class="flex flex-wrap">
    {#each blocks.slice(0, 3) as block}
      <div class="block-card bg-gray-100 rounded-lg p-4 shadow-md mb-4 mr-4">
        <h2 class="text-xl font-semibold mb-2">Block Number: {block.index}</h2>
        <p class="text-gray-600 mb-2">Timestamp: {block.timestamp}</p>
        <div class="break-all">
          <p class="text-gray-600 mb-2">Hash: {block.hash}</p>
        </div>
        <div class="break-all">
          <p class="text-gray-600 mb-4">Previous Hash: {block.previousHash}</p>
        </div>
        <p class="text-gray-600 mb-4">Timestamp: {block.timestamp}</p>
        <p class="text-gray-600 mb-4">Nonce: {block.nonce}</p>
      </div>
    {/each}
  
    {#if blocks.length > 3}
      <div class="refresh-button-container">
        <button class="refresh-button" on:click={refreshBlocks}>Refresh</button>
      </div>
      <div class="table-container mt-4">
        <table class="block-table w-full mt-4">
          <thead>
            <tr>
              <th class="py-2">Block Number</th>
              <th class="py-2">Timestamp</th>
              <th class="py-2">Hash</th>
              <th class="py-2">Previous Hash</th>
            </tr>
          </thead>
          <tbody>
            {#each blocks.slice(3) as block}
              <tr>
                <td class="py-2">{block.index}</td>
                <td class="py-2">{block.timestamp}</td>
                <td class="py-2">{block.hash}</td>
                <td class="py-2">{block.previousHash}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      
    {/if}
  </div>
  
  <style>
    .block-card {
      flex-basis: calc(33.3333% - 1rem);
      max-width: calc(33.3333% - 1rem);
    }
  
    .block-table {
      width: 100%;
      border-collapse: collapse;
    }
  
    .block-table th,
    .block-table td {
      border: 1px solid #ccc;
      padding: 0.5rem;
    }
    .refresh-button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .refresh-button {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  </style>
  