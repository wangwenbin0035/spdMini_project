import icon_check_before_acceptance from '../assets/images/icon_check_before_acceptance.png';
import icon_grounding from '../assets/images/icon_grounding.png';
import icon_lower_frame from '../assets/images/icon_lower_frame.png';
import icon_inventory from '../assets/images/icon_inventory.png';
import icon_query from '../assets/images/icon_query.png';


export const HomeIcons = [
  {
    title: '验收',
    icons: icon_check_before_acceptance,
    path: '/pages/CheckList/index',
  },
  {
    title: '上架',
    icons: icon_grounding,
    path:'GroundingList',
  },
  {
    title: '拣货下架',
    icons: icon_lower_frame,
    path:'PickSoldOutList',
  },
  {
    title: '盘点',
    icons: icon_inventory,
    path: 'InventoryPage',
  },
  {
    title: '库存查询',
    icons: icon_query,
    path: 'StockQuery',
  },
]


export const HomeTabsTitle = [
  { title: '低库存提醒' },
  { title: '近效期提醒' }
];