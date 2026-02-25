import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default () => {
  return defineConfig({
    plugins: [react(), tailwindcss(), flowbiteReact()],
  });
};
