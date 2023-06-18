<script>
    import { onMount } from "svelte";
    import { PUBLIC_BE_HOST } from '$env/static/public';
    import Blocks from "../../components/Blocks.svelte";

    let blocks = []

    onMount(async () => {
        await getBlocks()
    })

    const getBlocks = async () => {
        await fetch(`${PUBLIC_BE_HOST}/blocks`)
			.then(response => response.json())
			.then(result => blocks = result.sort((a,b) => b.index - a.index))
        console.log(blocks)
    }

    const refreshBlocks = async () => {
        await getBlocks()
    }


</script>

<div>
    Hello, this is Blockchain page
    <div>
        Latest block
    </div>
     <Blocks {blocks} {refreshBlocks}/>
</div> 