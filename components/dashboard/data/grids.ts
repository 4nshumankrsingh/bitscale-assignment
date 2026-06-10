export type GridRow = {
  id: string
  name: string
  iconColor: string
  iconBg: string
  starred: boolean
  editedBy: { name: string; seed: string }
  lastEdited: string
  type: 'workbook' | 'linkedin' | 'nav' | 'company' | 'csv' | 'people' | 'maps' | 'search' | 'factors' | 'hubspot'
  hasChildren?: boolean
}

export const grids: GridRow[] = [
  {
    id: '1',
    name: 'Workbook - Testing design Ideas for grid and workbook',
    iconColor: '#ef4444',
    iconBg: '#fef2f2',
    starred: false,
    editedBy: { name: 'Sam Taylor', seed: 'SamTaylor' },
    lastEdited: '06 Aug, 2025',
    type: 'workbook',
    hasChildren: true,
  },
  {
    id: '2',
    name: 'LinkedIn',
    iconColor: '#0077b5',
    iconBg: '#eff8ff',
    starred: false,
    editedBy: { name: 'Chris Parker', seed: 'ChrisParker' },
    lastEdited: '06 Aug, 2025',
    type: 'linkedin',
  },
  {
    id: '3',
    name: 'Sales nav',
    iconColor: '#f97316',
    iconBg: '#fff7ed',
    starred: false,
    editedBy: { name: 'Jone Doe', seed: 'JoneDoe' },
    lastEdited: '06 Aug, 2025',
    type: 'nav',
  },
  {
    id: '4',
    name: 'find company',
    iconColor: '#10b981',
    iconBg: '#f0fdf4',
    starred: true,
    editedBy: { name: 'Alex Morgan', seed: 'AlexMorgan' },
    lastEdited: '06 Aug, 2025',
    type: 'company',
  },
  {
    id: '5',
    name: 'import csv',
    iconColor: '#8b5cf6',
    iconBg: '#f5f3ff',
    starred: false,
    editedBy: { name: 'Drew Wilson', seed: 'DrewWilson' },
    lastEdited: '06 Aug, 2025',
    type: 'csv',
  },
  {
    id: '6',
    name: 'Find people',
    iconColor: '#6b7280',
    iconBg: '#f9fafb',
    starred: false,
    editedBy: { name: 'Jone Doe', seed: 'JoneDoe' },
    lastEdited: '06 Aug, 2025',
    type: 'people',
  },
  {
    id: '7',
    name: 'Google maps',
    iconColor: '#ef4444',
    iconBg: '#fef2f2',
    starred: false,
    editedBy: { name: 'Jone Doe', seed: 'JoneDoe' },
    lastEdited: '06 Aug, 2025',
    type: 'maps',
  },
  {
    id: '8',
    name: 'google search results',
    iconColor: '#3b82f6',
    iconBg: '#eff6ff',
    starred: false,
    editedBy: { name: 'Jone Doe', seed: 'JoneDoe' },
    lastEdited: '06 Aug, 2025',
    type: 'search',
  },
  {
    id: '9',
    name: 'factors',
    iconColor: '#f97316',
    iconBg: '#fff7ed',
    starred: false,
    editedBy: { name: 'Jone Doe', seed: 'JoneDoe' },
    lastEdited: '06 Aug, 2025',
    type: 'factors',
  },
  {
    id: '10',
    name: 'Hubspot List - 10 (05 Aug 25)',
    iconColor: '#f97316',
    iconBg: '#fff7ed',
    starred: true,
    editedBy: { name: 'Jone Doe', seed: 'JoneDoe' },
    lastEdited: '06 Aug, 2025',
    type: 'hubspot',
  },
]

export const videos = [
  {
    id: 'dtgtbVL2LEU',
    title: 'How to Integrate 2 Way HubSpot',
    description:
      'Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple add our API key through the integrations pa...',
    postedAt: 'Posted today',
  },
  {
    id: '8FYMnLxjrew',
    title: 'Bitscale + Clay: The Ultimate GTM Stack',
    description:
      'Learn how to combine Bitscale and Clay to build a powerful GTM automation stack that makes your SDR team 10x more effective...',
    postedAt: 'Posted 3 days ago',
  },
  {
    id: 'wIsr3KAIS30',
    title: 'How to Build a Lead Enrichment Workflow',
    description:
      'Step-by-step walkthrough of building a fully automated lead enrichment pipeline using Bitscale signals and waterfall providers...',
    postedAt: 'Posted 1 week ago',
  },
  {
    id: 'q0vATx8K-lU',
    title: 'Signal-Based Outreach at Scale',
    description:
      'Discover how top GTM teams use Bitscale signals to trigger personalised outreach at scale without sacrificing quality...',
    postedAt: 'Posted 2 weeks ago',
  },
]