import { PUBLIC_BE_HOST } from '$env/static/public'

export const load = ({ fetch, params }) => {
    const fetchBlockData = async (hash) => {
        const res = await fetch(`${PUBLIC_BE_HOST}/block/${hash}`)
        const data = await res.json()
        console.log(data)
        return data
      }
    return {
        block: fetchBlockData(params.hash)
    }
}