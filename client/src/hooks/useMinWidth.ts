import { createEffect } from "solid-js"
import { currentMonitor, getCurrent } from '@tauri-apps/api/window';
import { RUNNING_IN_TAURI } from "@configs"

export const useMinWidth = (minWidth: number) => {
    if (RUNNING_IN_TAURI) {
        createEffect(() => {
            const resizeWindow = async () => {
                // to set a size consistently accrosss devices,
                // one must use LogicalSize (Physical cannot be relied upon)
                const phisicalSize = await getCurrent().innerSize();

                // Since innerSize returns Physical size, we need
                // to get the current monitor scale factor
                // to convert the physical size into a logical size
                const monitor = await currentMonitor();
                const scaleFactor = monitor?.scaleFactor || 1.0;
                const logicalSize = phisicalSize.toLogical(scaleFactor);

                if (logicalSize.width < minWidth) {
                    logicalSize.width = minWidth;
                    await getCurrent().setSize(logicalSize)
                }
            }
            resizeWindow().catch(console.error)
        })
    }
}