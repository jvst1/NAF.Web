import RouteBlocklist from '~/config/route-blocklist'
import { Roles } from '~/config/enums'

export default function ({ store, route, redirect }) {
    const user = store.getters.user

    if (user) {
        const { text: profile } = Roles.find(p => p.value === user.role)

        const canAcess = !RouteBlocklist[profile].includes(route.name)

        console.log(canAcess)
    }
}