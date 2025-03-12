export class TrackOrder {
  public id: number;
  public name: string;
  public statusOrder: 'waiting' | 'in_progress' | 'complete';
  public serviceMode: 'dine_in' | 'dine_out';
  public table: string;
  public orderDetail: {
    name: string;
    amount: number;
    statusMenu:
      | 'waiting'
      | 'in_progress'
      | 'ready'
      | 'delivered'
      | 'complete'
      | 'modified'
      | 'cancelled';
  }[];
  public createdAt: string;
  public status: boolean;
}

const statusOrder: string[] = [
  'waiting',
  'inProgress',
  'ready',
  'delivered',
  'complete',
];
