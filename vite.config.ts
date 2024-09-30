import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [client()],
    };
  }

  const entry = "./app/server.ts";

  return {
    plugins: [ssg({ entry }), honox()],
  };
});
