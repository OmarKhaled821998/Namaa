import { RefObject } from "react";

export const useDropdownPosition = (
    ref : RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
    const getDropdownPosition = () => {
        if (!ref.current) return { top: 0, left: 0 };

        const rect = ref.current.getBoundingClientRect();
        const top = rect.bottom + window.scrollY;
        let left = rect.left + window.scrollX;

        const dropdownWidth = 240; // Adjust based on your dropdown width

        if (left + dropdownWidth > window.innerWidth) {
        // Align to right edge of button instead
        left = rect.right + window.scrollX - dropdownWidth;

        // If still off-screen, align to the right edge of viewport with
        if (left < 0) {
            left = window.innerWidth - dropdownWidth - 16;
        }
     }

        // Ensure dropdown doesn't go off left edge
        if (left < 0) {
        left = 16;
        } 
        return { top, left };
    };

    return { getDropdownPosition };
}