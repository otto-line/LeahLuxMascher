import {defineConfig, buildLegacyTheme} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {ImagesIcon, DocumentTextIcon, ControlsIcon} from '@sanity/icons'
import {schemaTypes} from './sanity/schemaTypes'

const theme = buildLegacyTheme({
  '--black': '#111111',
  '--white': '#f5f0eb',
  '--gray-base': '#888',
  '--component-bg': '#1a1a1a',
  '--component-text-color': '#f0ebe5',
  '--brand-primary': '#dc0202',
  '--main-navigation-color': '#0f0f0f',
  '--main-navigation-color--inverted': '#f0ebe5',
  '--focus-color': '#dc0202',
  '--default-button-primary-color': '#dc0202',
  '--default-button-success-color': '#4caf50',
  '--default-button-warning-color': '#ff9800',
  '--default-button-danger-color': '#f44336',
  '--state-success-color': '#4caf50',
  '--state-warning-color': '#ff9800',
  '--state-danger-color': '#f44336',
  '--state-info-color': '#dc0202',
})

export default defineConfig({
  name: 'default',
  title: 'Leah Lux Mascher',
  projectId: 'ssrah1z8',
  dataset: 'production',
  theme,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Studio')
          .items([
            S.listItem()
              .title('Projects')
              .icon(ImagesIcon)
              .child(S.documentTypeList('project').title('Projects')),
            S.listItem()
              .title('CV')
              .icon(DocumentTextIcon)
              .child(S.documentTypeList('cvItem').title('CV Items')),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .icon(ControlsIcon)
              .child(
                S.editor()
                  .id('siteSettings')
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
