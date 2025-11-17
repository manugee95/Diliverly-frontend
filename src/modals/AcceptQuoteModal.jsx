import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const AcceptQuoteModal = ({
  isOpen,
  onClose,
  request = {},
  agent = {},
  items = [],
  totals = {},
  onPay,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-0 bg-white">

        {/* HEADER */}
        <DialogHeader className="px-6 py-4 border-b bg-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[17px] font-medium text-gray-900">
              Order Summary & Payment
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* BODY */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-6 space-y-6"
        >
          {/* REQUEST DETAILS */}
          <div className="border rounded-2xl p-5 bg-gray-50">
            <p className="font-semibold mb-6 text-gray-800">Request Details</p>

            <p className="mt-4 font-medium text-gray-900 text-[17px]">
              {request?.title}
            </p>

            <p className="text-gray-500 mt-3">
              {request?.desc}
            </p>
          </div>

          {/* AGENT */}
          <div className="border rounded-2xl p-5 bg-gray-50">
            <p className="font-semibold text-gray-800">Agent</p>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-[17px]">
                  {agent?.name}
                </p>

                <p className="text-gray-500 text-[13px] mt-2">
                  Rating: {agent?.rating} • Trust Score: {agent?.trustScore}%
                </p>
              </div>

              <CheckCircle2 className="text-green-600 w-5 h-5" />
            </div>
          </div>

          {/* DELIVERY ITEMS */}
          <div>
            <p className="font-semibold text-gray-800 mb-4">
              Delivery Items ({items?.length})
            </p>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="border rounded-2xl p-5 bg-white">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-[14px] font-medium">
                      Location {index + 1}
                    </p>
                    <p className="font-medium text-gray-800 text-[15px]">
                      ₦{item?.amount?.toLocaleString()}
                    </p>
                  </div>

                  <p className="mt-2 font-medium text-[15px] text-gray-900">
                    {item?.address}
                  </p>

                  <span
                    className={`mt-3 inline-block px-2 py-1 text-[13px] leading-tight rounded-md font-normal ${
                      item.paymentType === "PREPAID"
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-900"
                    }`}
                  >
                    {item?.paymentType}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TOTAL SECTION */}
          <div className="bg-green-50 border rounded-2xl p-6">
            <div className="flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p className="font-medium">₦{totals.subtotal?.toLocaleString()}</p>
            </div>

            <div className="flex justify-between mt-4 text-gray-700">
              <p>Service Fee (5%)</p>
              <p className="font-medium">₦{totals.serviceFee?.toLocaleString()}</p>
            </div>

            <div className="h-px bg-gray-300 my-4"></div>

            <div className="flex justify-between font-semibold text-gray-900 text-lg">
              <p className="font-medium text-[16px] text-green-700">Total Amount</p>
              <p className="font-medium text-[16px] text-green-700">₦{totals.total?.toLocaleString()}</p>
            </div>
          </div>

          {/* NOTE */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
            <p className="text-blue-700 leading-relaxed">
              <span className="font-semibold">Note:</span> After successful payment, you will be required to provide delivery information for each location before the agent can start the delivery process.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-1/2 p-1 rounded-sm border font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => onPay?.(totals.total)}
              className="w-1/2 p-1 rounded-sm bg-green-600 text-white font-medium ml-3 flex items-center justify-center gap-2 hover:bg-green-700 transition"
            >
              Pay ₦{totals.total?.toLocaleString()}
            </button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptQuoteModal;