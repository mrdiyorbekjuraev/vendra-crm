import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useLocaleNavigate } from "../useLocaleNavigate";
import { useLanguage } from "../useLanguage";

type ShortcutAction = () => void;

interface KeyboardShortcut {
  keys: string[];
  action: ShortcutAction;
}

type KeyboardShortcutMap = Record<string, KeyboardShortcut>;

export const SIDEBAR_KEYBOARD_SHORTCUT = ".";

export const useKeyboardShortcuts = (toggleSidebar?: () => void) => {
  const lang = useLanguage();
  const { navigate } = useLocaleNavigate();

  // Use refs to avoid recreating functions on each render
  const pressedKeysRef = useRef<string[]>([]);
  const keyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetPressedKeys = useCallback(() => {
    pressedKeysRef.current = [];
    if (keyTimeoutRef.current) {
      clearTimeout(keyTimeoutRef.current);
      keyTimeoutRef.current = null;
    }
  }, []);

  // Define navigation function
  const navigateTo = useCallback(
    (path: string) => {
      navigate(path, lang);
    },
    [navigate]
  );

  useEffect(() => {
    // Define shortcuts map - moved inside useEffect to avoid recreating on every render
    const shortcutMap: KeyboardShortcutMap = {
      // Sidebar toggle - Command/Ctrl + .
      [SIDEBAR_KEYBOARD_SHORTCUT]: {
        keys: ["Meta", "Control", SIDEBAR_KEYBOARD_SHORTCUT],
        action: () => {
          if (toggleSidebar) toggleSidebar();
        },
      },
      // Section shortcuts
      "g+w": {
        keys: ["g", "w"],
        action: () => navigateTo("/management/workers"),
      },
      "g+r": {
        keys: ["g", "r"],
        action: () => navigateTo("/management/roles"),
      },
    };

    // Handle keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip keyboard shortcuts when typing in inputs, textareas, or contentEditable elements
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }

      const keyPressed = event.key.toLowerCase();
      const pressedKeys = pressedKeysRef.current;

      // Add the pressed key to the array
      pressedKeys.push(keyPressed);

      // Create a timeout to clear the pressed keys after a delay
      if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);
      keyTimeoutRef.current = setTimeout(resetPressedKeys, 1000);

      // Check for Command/Ctrl + . shortcut
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === SIDEBAR_KEYBOARD_SHORTCUT
      ) {
        event.preventDefault();
        shortcutMap[SIDEBAR_KEYBOARD_SHORTCUT].action();
        return;
      }

      // Check for single key shortcuts (like 'r' for Reflect)
      if (pressedKeys.length === 1 && pressedKeys[0] !== "g") {
        const key = pressedKeys[0];
        const shortcut = shortcutMap[key];
        if (shortcut && shortcut.keys.length === 1) {
          event.preventDefault();
          shortcut.action();
          resetPressedKeys();
          return;
        }
      }

      // Check for sequential shortcuts (like 'g' then 't' for Tasks)
      if (pressedKeys.length === 2 && pressedKeys[0] === "g") {
        const shortcutKey = `${pressedKeys[0]}+${pressedKeys[1]}`;
        const shortcut = shortcutMap[shortcutKey];

        if (shortcut) {
          event.preventDefault();
          shortcut.action();
          resetPressedKeys();
          return;
        }
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);

    // Clean up on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);
    };
  }, [navigateTo, toggleSidebar, resetPressedKeys]);
};
