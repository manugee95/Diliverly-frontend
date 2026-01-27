import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Quote, DeliveryRequest } from '../../types';
import { CreditCard, CheckCircle2, Loader2 } from 'lucide-react';

type Props = {
  quote: Quote;
  request: DeliveryRequest;
  onClose: () => void;
  onPaymentComplete: () => void;
};

export function OrderSummary({ quote, request, onClose, onPaymentComplete }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Show success for 2 seconds then complete
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your order has been created. Please provide delivery information to start the delivery process.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirecting...
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Summary & Payment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Request Info */}
          <Card className="p-4 bg-gray-50">
            <h4 className="mb-2">Request Details</h4>
            <p className="text-gray-900">{request.title}</p>
            <p className="text-sm text-gray-600 mt-1">{request.description}</p>
          </Card>

          {/* Agent Info */}
          <Card className="p-4">
            <h4 className="mb-2">Agent</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">{quote.agentName}</p>
                {quote.agentInfo && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <span>Rating: {quote.agentInfo.rating}</span>
                    <span>•</span>
                    <span>Trust Score: {quote.agentInfo.trustScore}%</span>
                  </div>
                )}
              </div>
              {quote.agentInfo?.verified && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
            </div>
          </Card>

          {/* Delivery Items */}
          <div>
            <h4 className="mb-3">Delivery Items ({quote.addresses.length})</h4>
            <div className="space-y-2">
              {quote.addresses.map((addr, index) => (
                <Card key={addr.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Location {index + 1}</p>
                      <p className="text-gray-900 mb-2">{addr.address}</p>
                      <Badge variant={addr.deliveryType === 'PREPAID' ? 'default' : 'secondary'}>
                        {addr.deliveryType}
                      </Badge>
                    </div>
                    <p className="text-gray-900">₦{addr.cost?.toLocaleString()}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-900">₦{quote.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Service Fee (5%)</span>
                <span className="text-gray-900">₦{(quote.totalAmount * 0.05).toLocaleString()}</span>
              </div>
              <div className="border-t border-green-300 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-green-900">Total Amount</span>
                  <span className="text-green-900">₦{(quote.totalAmount * 1.05).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> After successful payment, you will be required to provide delivery information for each location before the agent can start the delivery process.
            </p>
          </div>

          {/* Payment Button */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 gap-2"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Pay ₦{(quote.totalAmount * 1.05).toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
