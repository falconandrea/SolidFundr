export type LayoutProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

export type Campaign = {
  id: number;
  creator: string;
  creationDate: bigint;
  amount: bigint;
  targetAmount: bigint;
  targetAddress: string;
  title: string;
  description: string;
  completed: boolean;
};

export type CardProps = {
  campaign: Campaign;
};

export type ProgressBarProps = {
  amount: bigint;
  target: bigint;
};
