import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AgentProfileModal from "./AgentProfileModal";
import AcceptQuoteModal from "./AcceptQuoteModal";

export default function QuoteModal({ open, onClose, quotes = [], title, request }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [acceptOpen, setAcceptOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleViewProfile = (agent) => {
    setSelectedAgent(agent);
    setProfileOpen(true);
  };

  const handleAccept = (quote) => {
    setSelectedQuote(quote);
    setAcceptOpen(true);
  };

  return (
    <>
      {/* Profile Modal */}
      <AgentProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        agent={selectedAgent}
      />

      {/* Accept Quote Modal */}
      <AcceptQuoteModal
        isOpen={acceptOpen}
        onClose={() => setAcceptOpen(false)}
        request={request}
        agent={{
          name: selectedQuote?.company,
          rating: selectedQuote?.rating,
          trustScore: selectedQuote?.trustScore
        }}
        items={request?.addresses?.map((a) => ({
          address: a.location,
          paymentType: a.payment,
          amount: selectedQuote?.total / request?.addresses?.length
        }))}
        totals={{
          subtotal: selectedQuote?.total || 0,
          serviceFee: selectedQuote ? selectedQuote.total * 0.05 : 0,
          total: selectedQuote ? selectedQuote.total * 1.05 : 0,
        }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-[500px] shadow-xl overflow-y-auto max-h-[90vh] p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>

              <h2 className="text-[19px] font-semibold mb-4">
                Quotes for {title}
              </h2>

              <div className="space-y-6">
                {quotes.map((q, i) => (
                  <Card key={i} className="rounded-2xl border p-4">
                    <CardContent className="p-0">
                      <div className="flex justify-between items-start">

                        {/* LEFT */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-medium">{q.company}</h3>
                            <CheckCircle size={18} className="text-green-600" />
                          </div>

                          <div className="flex items-center gap-3 text-gray-600 text-sm mt-1">
                            <span className="flex items-center gap-1">
                              <Star size={15} className="text-yellow-500" />
                              {q.rating}
                            </span>

                            <span>Trust Score: {q.trustScore}%</span>
                            <span>{q.deliveries} deliveries</span>
                          </div>

                          <p className="text-lg font-semibold mt-3">
                            Total: ₦{q.total.toLocaleString()}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            Submitted: {q.submitted}
                          </p>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleViewProfile(q)}
                          >
                            View Profile
                          </Button>

                          <Button
                            className="bg-green-600 hover:bg-green-500"
                            onClick={() => handleAccept(q)}
                          >
                            Accept Quote
                          </Button>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}