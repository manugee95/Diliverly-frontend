import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, CheckCircle2, TrendingUp, MapPin, Phone, Mail, Package } from 'lucide-react';
import { AgentInfo } from '../../types';

type Props = {
  agentInfo: AgentInfo;
  onClose: () => void;
};

export function AgentProfileView({ agentInfo, onClose }: Props) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agent Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3>{agentInfo.name}</h3>
                {agentInfo.verified && (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {agentInfo.rating} rating
                </span>
                <span>{agentInfo.totalDeliveries} deliveries</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <Card className="p-4">
            <h4 className="mb-3">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{agentInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{agentInfo.phone}</span>
              </div>
            </div>
          </Card>

          {/* Trust Score */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4>Trust Score</h4>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600">{agentInfo.trustScore}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${agentInfo.trustScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Based on delivery performance, customer ratings, and reliability
            </p>
          </Card>

          {/* Coverage Area */}
          <Card className="p-4">
            <h4 className="mb-3">Coverage Area</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <div className="flex flex-wrap gap-2">
                {agentInfo.statesCovered.map((state, idx) => (
                  <Badge key={idx} variant="secondary">
                    {state}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Reviews */}
          <div>
            <h4 className="mb-3">Customer Reviews ({agentInfo.reviews.length})</h4>
            <div className="space-y-3">
              {agentInfo.reviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900">{review.vendorName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <p className="text-2xl text-green-600 mb-1">{agentInfo.totalDeliveries}</p>
              <p className="text-sm text-gray-600">Total Deliveries</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl text-amber-600 mb-1">{agentInfo.rating}</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl text-blue-600 mb-1">{agentInfo.trustScore}%</p>
              <p className="text-sm text-gray-600">Trust Score</p>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
