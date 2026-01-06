// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
import { VitePWA } from "file:///home/project/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "NGNTax - Nigerian PAYE Tax Calculator",
        short_name: "NGNTax",
        description: "Calculate your Nigerian income tax with precision and ease",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "favicon.ico",
            sizes: "any",
            type: "image/x-icon"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom"
          ],
          ui: [
            "lucide-react",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-switch",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip"
          ],
          forms: [
            "react-hook-form",
            "@hookform/resolvers",
            "zod"
          ],
          charts: [
            "recharts",
            "embla-carousel-react"
          ],
          utils: [
            "@tanstack/react-query",
            "date-fns",
            "clsx",
            "tailwind-merge",
            "class-variance-authority"
          ]
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBtb2RlID09PSBcImRldmVsb3BtZW50XCIgJiYgY29tcG9uZW50VGFnZ2VyKCksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgaW5jbHVkZUFzc2V0czogW1wiZmF2aWNvbi5pY29cIiwgXCJyb2JvdHMudHh0XCJdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJOR05UYXggLSBOaWdlcmlhbiBQQVlFIFRheCBDYWxjdWxhdG9yXCIsXG4gICAgICAgIHNob3J0X25hbWU6IFwiTkdOVGF4XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbGN1bGF0ZSB5b3VyIE5pZ2VyaWFuIGluY29tZSB0YXggd2l0aCBwcmVjaXNpb24gYW5kIGVhc2VcIixcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIHNjb3BlOiBcIi9cIixcbiAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiZmF2aWNvbi5pY29cIixcbiAgICAgICAgICAgIHNpemVzOiBcImFueVwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS94LWljb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbXCIqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Zyx3b2ZmLHdvZmYyfVwiXSxcbiAgICAgICAgcnVudGltZUNhY2hpbmc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ29vZ2xlYXBpc1xcLmNvbVxcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiBcIkNhY2hlRmlyc3RcIixcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiBcImdvb2dsZS1mb250cy1jYWNoZVwiLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMTAsXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogMzY1LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsXG4gICAgbWluaWZ5OiBcInRlcnNlclwiLFxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbXG4gICAgICAgICAgICBcInJlYWN0XCIsXG4gICAgICAgICAgICBcInJlYWN0LWRvbVwiLFxuICAgICAgICAgICAgXCJyZWFjdC1yb3V0ZXItZG9tXCIsXG4gICAgICAgICAgXSxcbiAgICAgICAgICB1aTogW1xuICAgICAgICAgICAgXCJsdWNpZGUtcmVhY3RcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWRpYWxvZ1wiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudVwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtcG9wb3ZlclwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0XCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC10YWJzXCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1hY2NvcmRpb25cIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWFsZXJ0LWRpYWxvZ1wiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtYXZhdGFyXCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1jaGVja2JveFwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtY29sbGFwc2libGVcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWNvbnRleHQtbWVudVwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtaG92ZXItY2FyZFwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtbGFiZWxcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LW1lbnViYXJcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LW5hdmlnYXRpb24tbWVudVwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtcHJvZ3Jlc3NcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXJhZGlvLWdyb3VwXCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1zY3JvbGwtYXJlYVwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2VwYXJhdG9yXCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1zbGlkZXJcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXN3aXRjaFwiLFxuICAgICAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtdG9nZ2xlXCIsXG4gICAgICAgICAgICBcIkByYWRpeC11aS9yZWFjdC10b2dnbGUtZ3JvdXBcIixcbiAgICAgICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXRvb2x0aXBcIixcbiAgICAgICAgICBdLFxuICAgICAgICAgIGZvcm1zOiBbXG4gICAgICAgICAgICBcInJlYWN0LWhvb2stZm9ybVwiLFxuICAgICAgICAgICAgXCJAaG9va2Zvcm0vcmVzb2x2ZXJzXCIsXG4gICAgICAgICAgICBcInpvZFwiLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgY2hhcnRzOiBbXG4gICAgICAgICAgICBcInJlY2hhcnRzXCIsXG4gICAgICAgICAgICBcImVtYmxhLWNhcm91c2VsLXJlYWN0XCIsXG4gICAgICAgICAgXSxcbiAgICAgICAgICB1dGlsczogW1xuICAgICAgICAgICAgXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIixcbiAgICAgICAgICAgIFwiZGF0ZS1mbnNcIixcbiAgICAgICAgICAgIFwiY2xzeFwiLFxuICAgICAgICAgICAgXCJ0YWlsd2luZC1tZXJnZVwiLFxuICAgICAgICAgICAgXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIixcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsZUFBZTtBQUp4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUMxQyxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxlQUFlLENBQUMsZUFBZSxZQUFZO0FBQUEsTUFDM0MsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQywyQ0FBMkM7QUFBQSxRQUMxRCxnQkFBZ0I7QUFBQSxVQUNkO0FBQUEsWUFDRSxZQUFZO0FBQUEsWUFDWixTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxXQUFXO0FBQUEsY0FDWCxZQUFZO0FBQUEsZ0JBQ1YsWUFBWTtBQUFBLGdCQUNaLGVBQWUsS0FBSyxLQUFLLEtBQUs7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFlBQ047QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLElBQUk7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsT0FBTztBQUFBLFlBQ0w7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLFFBQVE7QUFBQSxZQUNOO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE9BQU87QUFBQSxZQUNMO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
