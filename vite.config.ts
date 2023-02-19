import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      react(),
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: 'muhammad-farid-zia',
        project: 'example-react-app',
        // Specify the directory containing build artifacts
        include: './dist',
        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and needs the `project:releases` and `org:read` scopes
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        // Optionally uncomment the line below to override automatic release name detection
        release: env.VITE_RELEASE_TAG,
      }),
    ],
  }
})
