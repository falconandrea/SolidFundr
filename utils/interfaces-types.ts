export type LayoutProps = {
  children: React.ReactNode;
};

export type Campaign = {
  id: bigint;
  creator: `0x${string}`;
  creationDate: bigint;
  amount: bigint;
  targetAmount: bigint;
  targetAddress: `0x${string}`;
  title: string;
  description: string;
  completed: boolean;
};

export type Donation = {
  amount: bigint;
  author: `0x${string}`;
};

export type CardProps = {
  campaign: Campaign;
};

export type ProgressBarProps = {
  amount: bigint;
  target: bigint;
};
