import { PricingTable } from "@clerk/nextjs";

function BillingPage() {
    return (
        <div className="p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Choose Your
                        <span className="text-primary block">Perfect Plan</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Scale your link-in-bio page with plans designed to grow with your audience.
                        Upgrade or downgrade anytime.
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <PricingTable />
                </div>

                {/* Additional billing info */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
                        <p className="text-sm text-gray-600">All payments are processed securely with bank-level encryption.</p>
                    </div>

                    <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Cancel Anytime</h3>
                        <p className="text-sm text-gray-600">No long-term commitments. Cancel or change your plan anytime.</p>
                    </div>

                    <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                        <p className="text-sm text-gray-600">Get help whenever you need it with our dedicated support team.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingPage;