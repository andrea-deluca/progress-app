import { createSignal } from "solid-js"

export const useModal = (initialState: boolean = false) => {
    const [isOpen, setOpen] = createSignal(initialState);

    const close = () => setOpen(false)
    const open = () => setOpen(true)

    return { isOpen, close, open }
}