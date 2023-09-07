import { addSeconds, compareAsc } from 'date-fns'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const request = async ($axios, ...args) => {
    const { data: requestResponse } = await $axios(...args)
    let response = requestResponse

    if (args.length === 4 && args[3]) {
        const fetchStatusCallback = args[3]

        let dataAtual = new Date()
        const dataFim = addSeconds(new Date(), 15)
        let stop = false
        let statusResponse = null

        while (compareAsc(dataAtual, dataFim) < 1) {
            statusResponse = await fetchStatusCallback(requestResponse, () => { stop = true })
            if (stop) {
                break
            }
            await sleep(1500)
            dataAtual = new Date()
        }

        response = {
            response: requestResponse.data,
            status: statusResponse
        }
    }

    return response
}

export default ($axios) => {
    const service = {
        get: async (...args) => {
            return await request($axios.get, ...args)
        },
        put: async (...args) => {
            return await request($axios.put, ...args)
        },
        patch: async (...args) => {
            return await request($axios.patch, ...args)
        },
        delete: async (...args) => {
            return await request($axios.delete, ...args)
        },
        post: async (...args) => {
            return await request($axios.post, ...args)
        }
    }

    return {
    }
}
