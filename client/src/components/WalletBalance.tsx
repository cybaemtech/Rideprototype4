import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface WalletBalanceProps {
  balance: number;
  onAddMoney: () => void;
}

export default function WalletBalance({ balance, onAddMoney }: WalletBalanceProps) {
  return (
    <Card className="bg-gradient-to-br from-primary to-accent text-white border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Wallet className="h-5 w-5" />
          Wallet Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-5xl font-bold mb-4" data-testid="text-wallet-balance">
            ₹{balance.toFixed(2)}
          </p>
          <Button
            onClick={onAddMoney}
            className="bg-white text-primary hover:bg-white/90"
            data-testid="button-add-money"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Money
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
