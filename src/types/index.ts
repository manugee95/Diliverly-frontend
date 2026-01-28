export type RequestStatus =
	| "pending"
	| "assigned"
	| "in-progress"
	| "completed"
	| "cancelled";

export type DeliveryType = "PREPAID" | "COD";

export type DeliveryRequest = {
	id: string;
	title: string;
	description: string;
	state: string;
	addresses: DeliveryAddress[];
	vendorId: string;
	vendorName: string;
	agentId?: string;
	agentName?: string;
	status: RequestStatus;
	createdAt: string;
	quotedAmount?: number;
	quotes?: Quote[];
};

export type DeliveryAddress = {
	id: string;
	address: string;
	deliveryType: DeliveryType;
	cost?: number;
};

export type Quote = {
	id: string;
	requestId: string;
	requestTitle: string;
	vendorName: string;
	agentId: string;
	agentName: string;
	agentInfo?: AgentInfo;
	addresses: DeliveryAddress[];
	totalAmount: number;
	status: "pending" | "accepted" | "rejected";
	createdAt: string;
};

export type AgentInfo = {
	id: string;
	name: string;
	email: string;
	phone: string;
	statesCovered: string[];
	verified: boolean;
	totalDeliveries: number;
	rating: number;
	trustScore: number;
	reviews: Review[];
};

export type Review = {
	id: string;
	vendorName: string;
	rating: number;
	comment: string;
	date: string;
};

export type Order = {
	id: string;
	requestId: string;
	vendorId: string;
	vendorName: string;
	vendorPhone: string;
	agentId: string;
	agentName: string;
	totalAmount: number;
	status: "pending-info" | "active" | "completed" | "cancelled";
	payoutDate?: string;
	createdAt: string;
	items: OrderItem[];
	deliveryInfoProvided: boolean;
};

export type OrderItem = {
	id: string;
	address: string;
	deliveryType: DeliveryType;
	cost: number;
	status: "pending" | "delivered" | "cancelled";
	deliveryInfo?: DeliveryInfo;
	deliveryPin?: string;
};

export type DeliveryInfo = {
	buyerName: string;
	buyerPhone: string;
	itemName: string;
	quantity: number;
};

export type WalletTransaction = {
	id: string;
	type: "credit" | "debit";
	amount: number;
	description: string;
	date: string;
	status: "pending" | "completed";
	orderId?: string;
};

export type AgentConnection = {
	id: string;
	name: string;
	email: string;
	phone: string;
	statesCovered: string[];
	verified: boolean;
	totalDeliveries: number;
	rating: number;
};

export type PaymentInfo = {
	orderId: string;
	amount: number;
	requestTitle: string;
	agentName: string;
};

export type AgentQuota = {
	used: number;
	total: number;
	isPro: boolean;
};

export type VendorProfile = {
	businessName: string;
	address: string;
};

export type AgentProfile = {
	businessName: string;
	businessAddress: string;
	bio: string;
	statesCovered: string[];
};

export type BankDetails = {
	bankName: string;
	accountNumber: string;
	accountName?: string;
};

export type KYCData = {
	nin?: string;
	bvn?: string;
	cac?: string;
	facialVerified?: boolean;
};

export type User = {
	id: number;

	isAgent: boolean;
	isVendor: boolean;

	email: string;
	firstName: string;
	lastName: string;
	phone: string;

	status: string; // extend if needed

	profileImageUrl: string | null;

	walletBalance: string; // keep as string if backend sends decimal strings

	verificationCode: string | null;
	codeExpiresAt: string | null;

	resetCode: string | null;
	resetCodeExpiresAt: string | null;

	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
};
