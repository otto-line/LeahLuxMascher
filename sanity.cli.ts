import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ssrah1z8',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
