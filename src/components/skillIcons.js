import DataObjectOutlined from '@mui/icons-material/DataObjectOutlined';
import CodeOutlined from '@mui/icons-material/CodeOutlined';
import PaletteOutlined from '@mui/icons-material/PaletteOutlined';
import StorageOutlined from '@mui/icons-material/StorageOutlined';
import TerminalOutlined from '@mui/icons-material/TerminalOutlined';
import HubOutlined from '@mui/icons-material/HubOutlined';
import DnsOutlined from '@mui/icons-material/DnsOutlined';
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import ApiOutlined from '@mui/icons-material/ApiOutlined';
import CloudOutlined from '@mui/icons-material/CloudOutlined';
import ViewKanbanOutlined from '@mui/icons-material/ViewKanbanOutlined';
import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined';

// Icon per skill name (lowercase). Anything not listed gets a tag icon.
const ICONS = {
  javascript: DataObjectOutlined,
  typescript: DataObjectOutlined,
  'visual basic': TerminalOutlined,
  python: TerminalOutlined,
  php: CodeOutlined,
  html: CodeOutlined,
  html5: CodeOutlined,
  css: PaletteOutlined,
  css3: PaletteOutlined,
  bootstrap: PaletteOutlined,
  react: HubOutlined,
  'vue.js': HubOutlined,
  'node.js': DnsOutlined,
  'express.js': DnsOutlined,
  laravel: DnsOutlined,
  sql: StorageOutlined,
  postgresql: StorageOutlined,
  mongodb: StorageOutlined,
  redis: StorageOutlined,
  git: AccountTreeOutlined,
  github: AccountTreeOutlined,
  bitbucket: AccountTreeOutlined,
  jira: ViewKanbanOutlined,
  vercel: CloudOutlined,
  'power bi': BarChartOutlined,
  'rest apis': ApiOutlined,
};

export const skillIcon = (name) => {
  const key = name.toLowerCase();
  // "SQL (Azure Data Studio, DBeaver)" → matches "sql"
  return ICONS[key] ?? ICONS[key.split(' (')[0]] ?? LocalOfferOutlined;
};
