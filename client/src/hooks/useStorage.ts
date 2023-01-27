import { createEffect, createRenderEffect, createSignal, on } from "solid-js";
import { Store } from "tauri-plugin-store-api";
import localforage from 'localforage'

import { RUNNING_IN_TAURI } from "@configs";

import * as path from '@tauri-apps/api/path';

const SAVE_DELAY = 500 as const

interface LocaleSavedData {
    filename: string,
    store: Store
}

const saves: LocaleSavedData[] = [];

const getTauriStore = async (filename: string) => {
    const documentsDir = await path.documentDir()
    if (!saves.some(save => save.filename === filename)) {
        const store = { filename: filename, store: new Store(`${documentsDir}${filename}`) }
        saves.push(store)
    }
    return saves.find(save => save.filename === filename)?.store
}

export const useTauriStore = (key: string, defaultValue: any, storeName = 'data.dat') => {
    // storeName is a path that is relative to AppData if not absolute
    const [state, setState] = createSignal(defaultValue);
    const [loading, setLoading] = createSignal(true);

    let timeout: NodeJS.Timeout;

    // createRenderEffect will be called before DOM paintings and before createEffect
    createRenderEffect(() => {
        let allow = true;
        getTauriStore(storeName).then(store => {
            store?.get(key)
                .then(value => {
                    if (value === null) throw ''
                    if (allow) setState(value)
                })
                .catch(() => {
                    store.set(key, defaultValue).then(() => {
                        timeout = setTimeout(() => store.save(), SAVE_DELAY)
                    })
                })
                .then(() => {
                    if (allow) setLoading(false);
                });
            return () => allow = false;
        })
    })

    createEffect(on(state, () => {
        // do not allow setState to be called before data has even been loaded!
        // this prevents overwriting
        if (!loading()) {
            getTauriStore(storeName).then(store => {
                clearTimeout(timeout);
                store?.set(key, state())
                    .then(() => {
                        timeout = setTimeout(() => {
                            store.save();
                        }, SAVE_DELAY)
                    })
            })
        }
        // ensure data is saved by not clearing the timeout on unmount
    }))

    return { state, setState, loading: loading() };
}

export const useLocalForage = (key: string, defaultValue: any) => {
    const [state, setState] = createSignal(defaultValue);
    const [loading, setLoading] = createSignal(true);

    createRenderEffect(() => {
        let allow = true;
        localforage.getItem(key)
            .then(value => {
                if (value === null) throw '';
                if (allow) setState(value);
            })
            .catch(() => localforage.setItem(key, defaultValue))
            .then(() => { if (allow) setLoading(false) })

        return () => allow = false
    })

    createEffect(on(state, () => {
        if (!loading()) localforage.setItem(key, state())
    }))

    return { state, setState, loading: loading() }
}

// useLocalForage on web and tauri-plugin-store in Tauri
export const useStorage = RUNNING_IN_TAURI ? useTauriStore : useLocalForage;