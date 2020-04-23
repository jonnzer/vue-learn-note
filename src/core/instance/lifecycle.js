export function mountComponent(vm, el) {
    vm.$el = el
    console.log(vm)
    return vm
}