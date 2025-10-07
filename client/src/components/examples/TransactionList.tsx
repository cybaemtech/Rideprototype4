import TransactionList from '../TransactionList';

export default function TransactionListExample() {
  const mockTransactions = [
    {
      id: '1',
      type: 'credit' as const,
      amount: 50.00,
      description: 'Added to wallet',
      date: new Date('2025-10-05'),
    },
    {
      id: '2',
      type: 'debit' as const,
      amount: 12.50,
      description: 'Ride to Downtown',
      date: new Date('2025-10-04'),
    },
    {
      id: '3',
      type: 'debit' as const,
      amount: 8.75,
      description: 'Ride to Airport',
      date: new Date('2025-10-03'),
    },
  ];

  return <TransactionList transactions={mockTransactions} />;
}
