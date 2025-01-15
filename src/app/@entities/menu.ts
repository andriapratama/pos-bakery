export class Menu {
  name: string;
  route: string;
  icon?: string;
  children?: Array<Menu>;
}

export const menuList: Array<Menu> = [
  {
    name: 'Sales',
    route: '/sales',
    icon: 'icons/trending-up.svg',
    children: [
      {
        name: 'Billing Queue',
        route: '/sales/billing-queue',
      },
      {
        name: 'Tables',
        route: '/sales/table-management',
      },
      {
        name: 'Order History',
        route: '/sales/order-history',
      },
    ],
  },
  {
    name: 'Report',
    route: '/report',
    icon: 'icons/chart-pie.svg',
  },
  {
    name: 'Iventory',
    route: '/iventory',
    icon: 'icons/boxes.svg',
  },
  {
    name: 'Teams',
    route: '/teams',
    icon: 'icons/user-group.svg',
  },
  {
    name: 'Settings',
    route: '/settings',
    icon: 'icons/cog-8-tooth.svg',
  },
];
