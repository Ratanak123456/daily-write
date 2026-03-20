import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default () => {
  return defineConfig({
    plugins: [react(), tailwindcss(), flowbiteReact()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            const pathAfterNodeModules = id.split("node_modules/")[1];
            if (!pathAfterNodeModules) return "vendor";

            const parts = pathAfterNodeModules.split("/");
            const pkgName = parts[0].startsWith("@")
              ? `${parts[0]}-${parts[1]}`
              : parts[0];

            return `vendor-${pkgName.replace("@", "")}`;
          },
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  });
};
