import createService from '@/services'

export default ({ $axios }, inject) => {
    inject('services', createService($axios))
}
