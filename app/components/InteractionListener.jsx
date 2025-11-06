"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_FIRST_KEY = "first-interaction:session";
const CHANNEL_NAME = "klafs-first-interaction";

/** Format timestamp as YYYY-MM-DD HH:mm:ss */
function formatTimestamp() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mi = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export default function InteractionListener({ children }) {
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const supportsBC = typeof BroadcastChannel !== "undefined";
    const alreadyInThisTab = sessionStorage.getItem(SESSION_FIRST_KEY) === "1";

    let channel = null;
    let hasFirstInSession = alreadyInThisTab;
    let cleanupFirstListeners = null;
    let handshakeTimer = null;

    const attachFirstListeners = () => {
      if (cleanupFirstListeners) return; // already attached

      const handleFirst = () => {
        if (sessionStorage.getItem(SESSION_FIRST_KEY) === "1") return;

        const time = formatTimestamp();
        sessionStorage.setItem(SESSION_FIRST_KEY, "1");

        if (channel) {
          channel.postMessage({
            type: "FIRST_INTERACTION_CAPTURED",
            time,
          });
        }

        console.log(
          "[InteractionListener] 🎉 First user interaction captured at",
          time,
          "on path:",
          pathname
        );
      };

      window.addEventListener("click", handleFirst, { once: true, capture: true });
      window.addEventListener("pointerdown", handleFirst, { once: true, capture: true });

      cleanupFirstListeners = () => {
        window.removeEventListener("click", handleFirst, true);
        window.removeEventListener("pointerdown", handleFirst, true);
      };
    };

    if (supportsBC) {
      channel = new BroadcastChannel(CHANNEL_NAME);

      channel.onmessage = (event) => {
        const data = event.data || {};
        if (!data.type) return;

        if (data.type === "FIRST_INTERACTION_QUERY") {
          const mine = sessionStorage.getItem(SESSION_FIRST_KEY) === "1";
          if (mine) {
            channel.postMessage({
              type: "FIRST_INTERACTION_STATUS",
              value: true,
            });
          }
        } else if (data.type === "FIRST_INTERACTION_STATUS" && data.value === true) {
          hasFirstInSession = true;
          sessionStorage.setItem(SESSION_FIRST_KEY, "1");
          console.log(
            "[InteractionListener] First interaction already captured in another tab (synced). Path:",
            pathname
          );
          if (cleanupFirstListeners) {
            cleanupFirstListeners();
            cleanupFirstListeners = null;
          }
        } else if (data.type === "FIRST_INTERACTION_CAPTURED") {
          hasFirstInSession = true;
          sessionStorage.setItem(SESSION_FIRST_KEY, "1");
          console.log(
            "[InteractionListener] First interaction captured in another tab (live). Path:",
            pathname
          );
          if (cleanupFirstListeners) {
            cleanupFirstListeners();
            cleanupFirstListeners = null;
          }
        }
      };
    }

    if (alreadyInThisTab) {
      console.log(
        "[InteractionListener] First interaction already captured in this tab/session. Path:",
        pathname
      );
    } else {
      if (supportsBC && channel) {
        channel.postMessage({ type: "FIRST_INTERACTION_QUERY" });

        handshakeTimer = setTimeout(() => {
          if (!hasFirstInSession) {
            attachFirstListeners();
          }
        }, 150);
      } else {
        attachFirstListeners();
      }
    }

    return () => {
      if (handshakeTimer) clearTimeout(handshakeTimer);
      if (cleanupFirstListeners) cleanupFirstListeners();
      if (channel) channel.close();
    };
  }, [pathname]);

  return <>{children}</>;
}
