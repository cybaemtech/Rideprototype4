import WalletBalance from '../WalletBalance';

export default function WalletBalanceExample() {
  return (
    <WalletBalance
      balance={250.50}
      onAddMoney={() => console.log('Add money clicked')}
    />
  );
}
