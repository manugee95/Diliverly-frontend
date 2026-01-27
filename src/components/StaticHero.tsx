"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Package, Truck, Users } from "lucide-react";

export function StaticHero() {
	return (
		<div className="hidden lg:flex lg:w-2/5 relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
			<div className="absolute inset-0">
				<ImageWithFallback
					src="https://images.unsplash.com/photo-1759329173936-6d77fad4c49a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBkZWxpdmVyeSUyMG5ldHdvcmt8ZW58MXx8fHwxNzYyNjk2ODI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
					alt="DILIVERLY Network"
					className="w-full h-full object-cover opacity-20"
				/>
			</div>

			<div className="relative z-10 flex flex-col justify-between p-12 text-white">
				{/* Logo/Brand */}
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
							<Truck className="w-6 h-6 text-blue-600" />
						</div>
						<h1 className="text-white">DILIVERLY</h1>
					</div>
					<p className="text-blue-100">
						Connecting vendors with trusted delivery agents nationwide
					</p>
				</div>

				{/* Features */}
				<div className="space-y-6">
					<h2 className="text-white mb-6">Why choose DILIVERLY?</h2>

					<div className="flex items-start gap-4">
						<div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
							<Package className="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 className="text-white mb-1">For Vendors</h3>
							<p className="text-blue-100">
								Access a nationwide network of verified delivery agents ready to
								fulfill your orders
							</p>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
							<Truck className="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 className="text-white mb-1">For Agents</h3>
							<p className="text-blue-100">
								Grow your delivery business by partnering with ecommerce vendors
								across the country
							</p>
						</div>
					</div>

					<div className="flex items-start gap-4">
						<div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
							<Users className="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 className="text-white mb-1">Trusted Network</h3>
							<p className="text-blue-100">
								All agents are verified through our comprehensive KYC process
								for your peace of mind
							</p>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-blue-200 text-sm">
					© 2025 DILIVERLY. All rights reserved.
				</div>
			</div>
		</div>
	);
}
