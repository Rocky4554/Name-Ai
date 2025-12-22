"use client";

import { useDomain } from "@/hooks/useDomains";
import { useParams } from "next/navigation";
import { Heart, CreditCard, Shield, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function DomainPage() {
    const params = useParams();
    const domainName = params.name;
    const { data: domain, isLoading } = useDomain(domainName);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!domain) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Domain Not Found</h1>
                    <p className="text-muted-foreground">The domain you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm text-muted-foreground mb-2">This domain name</p>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        {domain.name} <span className="text-muted-foreground">is for sale!</span>
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Domain Display */}
                    <div className="space-y-6">
                        {/* Domain Logo/Preview */}
                        <div className="bg-card border border-border rounded-lg p-12 flex items-center justify-center min-h-[400px]">
                            {domain.logo ? (
                                <Image src={domain.logo} alt={domain.name} width={300} height={300} />
                            ) : (
                                <div className="text-center">
                                    <div className="text-6xl font-bold mb-4" style={{ color: domain.brandColor || '#FF6B35' }}>
                                        {domain.name.split('.')[0]}
                                    </div>
                                    <div className="text-2xl text-muted-foreground">.{domain.name.split('.')[1]}</div>
                                </div>
                            )}
                        </div>

                        {/* Buyer Interest */}
                        {domain.viewCount && (
                            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-green-900 dark:text-green-100">Strong Buyer Interest</p>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        {domain.viewCount}+ potential buyers viewed or shortlisted this domain recently.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Purchase Options */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Purchase Domain</h2>
                                <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                                    <Shield className="w-4 h-4" />
                                    Verified Domain
                                </span>
                            </div>

                            {/* Buy Now Option */}
                            <div className="mb-4 p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="purchase" id="buynow" defaultChecked className="w-4 h-4" />
                                        <label htmlFor="buynow" className="font-medium cursor-pointer">Buy Now</label>
                                    </div>
                                    <span className="text-xl font-bold">USD ${domain.price?.toLocaleString() || '4,075'}</span>
                                </div>
                            </div>

                            {/* Installments Option */}
                            {domain.installmentPrice && (
                                <div className="mb-6 p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="purchase" id="installments" className="w-4 h-4" />
                                            <label htmlFor="installments" className="font-medium cursor-pointer">Pay in Installments</label>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xl font-bold block">USD ${domain.installmentPrice}</span>
                                            <span className="text-xs text-muted-foreground">x 12 months</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Proceed Button */}
                            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                                Proceed to Payment
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Features */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <span>Free Transaction Support</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <span>No Extra Fees</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <span>Full Ownership Upon Payment</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <span>Includes one year domain registration</span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="mt-6 pt-6 border-t border-border">
                                <div className="flex items-center gap-3 flex-wrap opacity-60">
                                    <CreditCard className="w-8 h-8" />
                                    <span className="text-xs">VISA</span>
                                    <span className="text-xs">AMEX</span>
                                    <span className="text-xs">Apple Pay</span>
                                    <span className="text-xs">PayPal</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {domain.description && (
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h3 className="font-semibold mb-3">About this domain</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{domain.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}