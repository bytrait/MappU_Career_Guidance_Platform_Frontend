import { useEffect, useState } from 'react';
import {
    ShieldCheck,
    CreditCard,
    BadgeCheck,
    Clock3,
    School,
    ArrowRight,
    Sparkles,
} from 'lucide-react';
import {
    getStudentPaymentStatus,
    createStudentPaymentOrder,
    verifyStudentPayment,
} from '../services/studentPaymentService';
import { Toaster, toast } from 'sonner';
const StudentPaymentPage = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        fetchPaymentStatus();
    }, []);

    const fetchPaymentStatus = async () => {
        try {
            const response = await getStudentPaymentStatus();
            setPaymentData(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
            setPaying(true);

            const order = await createStudentPaymentOrder();

            const options = {
                key: order.key,
                amount: order.amount * 100,
                currency: order.currency,
                name: 'Mapp My University',
                description: 'Career Assessment & Student Dashboard Access',
                order_id: order.razorpayOrderId,

                handler: async function (response) {
                    await verifyStudentPayment({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    });

                    toast.success('Payment successful! Redirecting...');


                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1200);
                },

                prefill: {},

                theme: {
                    color: '#2563eb',
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.on('payment.failed', function () {
                toast.error('Payment failed. Please try again.');
            });

            razorpay.open();
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                'Unable to start payment'
            );
        } finally {
            setPaying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 px-8 py-10 flex flex-col items-center gap-4 max-w-sm w-full">
                    <div className="w-14 h-14 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />

                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Loading Payment Details
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Please wait while we prepare your assessment payment.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!paymentData) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-red-100 rounded-3xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                        !
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                        Payment Information Not Found
                    </h2>

                    <p className="text-slate-500">
                        We could not find your payment details. Please refresh the page or contact support if the issue continues.
                    </p>
                </div>
            </div>
        );
    }

    if (
        paymentData.status === 'PAID' ||
        paymentData.status === 'FREE'
    ) {
        window.location.href = '/assessment';
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10 lg:py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <Sparkles size={16} />
                        Career Assessment Access
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5">
                        Complete Your Payment & Unlock Your Career Assessment
                    </h1>

                    <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl">
                        Your payment gives you access to the MapU psychometric assessment,
                        career recommendations, university guidance, downloadable reports,
                        and additional student features.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <BadgeCheck size={22} />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 mb-1">
                                    Detailed Career Assessment
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Understand your interests, strengths, personality type, and recommended career paths.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <ShieldCheck size={22} />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 mb-1">
                                    Secure Online Payment
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Payments are processed securely through Razorpay with trusted encryption and verification.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                                <Clock3 size={22} />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 mb-1">
                                    Instant Access After Payment
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Once payment is verified, you will immediately be redirected to start your assessment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Payment Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />

                    <div className="relative bg-white/95 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-sm text-blue-100 mb-2">
                                        Payment Summary
                                    </p>
                                    <h2 className="text-3xl font-bold">
                                        ₹{paymentData.amount}
                                    </h2>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                                    <CreditCard size={26} />
                                </div>
                            </div>

                            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                <p className="text-sm text-blue-100">
                                    Complete the payment to continue with your assessment journey.
                                </p>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Registration Type</span>
                                    <span className="font-semibold text-slate-900">
                                        {paymentData.registrationType}
                                    </span>
                                </div>

                                {paymentData.schoolName && (
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-slate-500 flex items-center gap-2">
                                            <School size={16} />
                                            School
                                        </span>

                                        <span className="font-semibold text-slate-900 text-right">
                                            {paymentData.schoolName}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Payment Status</span>

                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                                        {paymentData.status}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-slate-200 pt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-500">Assessment Fee</span>
                                    <span className="font-medium text-slate-900">
                                        ₹{paymentData.amount}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-500">Platform Charges</span>
                                    <span className="font-medium text-emerald-600">
                                        Free
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-lg font-bold text-slate-900 pt-4">
                                    <span>Total Amount</span>
                                    <span>₹{paymentData.amount}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={paying}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-base shadow-lg shadow-blue-500/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                {paying ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        Proceed to Payment
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-slate-400 leading-relaxed">
                                By continuing, you agree to complete the payment securely through Razorpay.
                                Access to assessment, reports, and premium student features will be activated after successful payment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPaymentPage;