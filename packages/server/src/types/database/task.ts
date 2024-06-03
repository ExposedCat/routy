export type Task = {
  title: string;
  description?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'open' | 'active' | 'done' | 'closed';
  deadline: string;
};
