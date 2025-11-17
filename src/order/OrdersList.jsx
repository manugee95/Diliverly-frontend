import OrderCard from "./OrderCard";
import { motion } from "framer-motion";

export function OrdersList({ orders, onViewOrder, onProvideDelivery }) {
  return (
    <div className="mt-6 space-y-4">
      {orders.map((order, i) => (
        <motion.div
          key={order.orderId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <OrderCard
            {...order}
            onView={() => onViewOrder && onViewOrder(order)}
            onProvideInfo={() => onProvideDelivery && onProvideDelivery(order)}
          />
        </motion.div>
      ))}
    </div>
  );
}