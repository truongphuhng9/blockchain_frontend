<script>
	import { onMount } from 'svelte';
	import { PUBLIC_BE_HOST } from '$env/static/public';

	let address = null
	let balance = 0
	let receiver = ''
	let amount = 0
	let newPeer = ''
	let peers = []
	let errorMsg = ''

	onMount(async () => {
		await getAddress()
		await getBalance()
		await getPeers()
	})

	const getAddress = async () => {
		await fetch(`${PUBLIC_BE_HOST}/address`)
			.then(response => response.json())
			.then(result => (address = result.address))
	}

	const getPeers = async () => {
		await fetch(`${PUBLIC_BE_HOST}/peers`)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				peers = res
			})
	}

	const getBalance = async () => {
		await fetch(`${PUBLIC_BE_HOST}/balance`)
			.then(response => response.json())
			.then(result => (balance = result.balance))
	}

	const sendTransaction = async () => {
		let data = { address: receiver, amount: amount }
		await fetch(`${PUBLIC_BE_HOST}/send-transaction`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(result => (errorMsg = result))
			.then(async () => getBalance())
			.catch(e => (errorMsg = e))
	}

	const mineBlock = async () => {
		await fetch(`${PUBLIC_BE_HOST}/mine-block`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(result => (errorMsg = result))
			.then(async () => getBalance())
			.catch(e => (errorMsg = e))
	}

	const addPeer = async () => {
		const data = { peer: newPeer }
		await fetch(`${PUBLIC_BE_HOST}/add-peer`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(async () => getPeers())
			.catch(e => (errorMsg = e))
	}

	const mineTransaction = async () => {
		let data = { address: receiver, amount: amount }
		await fetch(`${httpHost}/mine-transaction`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(result => (errorMsg = result))
			.then(async () => getBalance())
			.catch(e => (errorMsg = e))
	}

	const onSendCoin = async e => {
		e.preventDefault()
		await sendTransaction()
	}

	const onMineTx = async e => {
		e.preventDefault()
		await mineBlock()
	}

	const onSendAndMine = async e => {
		e.preventDefault()
		await mineTransaction()
	}

	const onAddPeer = async e => {
		e.preventDefault()
		await addPeer()
	}
</script>

<main class="flex">
	<div class="flex-1 mx-4">
		<div class="mb-4">
			<h1 class="text-2xl font-semibold">Your Coin Address</h1>
			<div class="break-all">
				<p class="text-gray-600">{address}</p>
			</div>
		</div>
		<div class="mb-4">
			<h1 class="text-2xl font-semibold">Your Balance</h1>
			<p class="text-gray-600">{balance}</p>
		</div>
		<br />
		<form>
			<div class="mb-8">
				<h2 class="text-xl font-semibold mb-4">Send Coin</h2>
				<div class="mb-4">
					<label class="block text-lg font-medium">Receiver</label>
					<input
						type="text"
						class="w-full p-2 border border-gray-300 rounded-md"
						bind:value={receiver}
					/>
				</div>
				<div class="mb-4">
					<label class="block text-lg font-medium">Amount</label>
					<input
						type="number"
						class="w-full p-2 border border-gray-300 rounded-md"
						bind:value={amount}
					/>
				</div>
				<div class="flex space-x-4">
					<button
						type="submit"
						class="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
						on:click={onSendCoin}
					>
						Send
					</button>
					<button
						type="submit"
						class="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
						on:click={onMineTx}
					>
						Mine
					</button>
					<button
						type="submit"
						class="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
						on:click={onSendAndMine}
					>
						Send &amp; Mine
					</button>
				</div>
			</div>
		</form>
	</div>
	<div class="flex-4/6 mx-4">
		<h2 class="text-xl font-semibold mb-4">Connected Peers</h2>
		<table class="w-full">
			<thead>
				<tr>
					<th class="px-4 py-2">Peers</th>
				</tr>
			</thead>
			<tbody>
				{#each peers as peer}
				<tr>
					<td class="px-4 py-2">{peer}</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<form class="mt-4">
			<div class="mb-4">
				<label class="block text-lg font-medium">Connect to Peer</label>
				<input
					type="text"
					class="w-full p-2 border border-gray-300 rounded-md"
					bind:value={newPeer}
				/>
			</div>
			<div class="mt-2">
				<button
					type="submit"
					class="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
					on:click={onAddPeer}
				>
					Connect
				</button>
			</div>
		</form>
	</div>
</main>

<style>
	.container {
		max-width: 600px;
	}
</style>
