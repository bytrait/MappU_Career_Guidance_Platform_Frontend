import { useEffect, useState } from 'react';
import {
    ShieldCheck,
    CreditCard,
    BadgeCheck,
    Clock3,
    School,
    ArrowRight,
    Sparkles,
    Check,
} from 'lucide-react';
import {
    getStudentPaymentStatus,
    createStudentPaymentOrder,
    verifyStudentPayment,
} from '../services/studentPaymentService';
import { Toaster, toast } from 'sonner';
import { useTenant } from '../context/TenantContext';

const ACCESS_FEATURES = [
    'Personality Insights',
    'Interest and Aptitude Analysis',
    'Personalized Career Recommendations',
    'Skill Improvement Plan',
    'Detailed Career Pathways Journey',
];

const TRUST_ITEMS = [
    {
        icon: BadgeCheck,
        title: 'Detailed Career Assessment',
        description:
            'Understand your interests, strengths, personality type, and recommended career paths.',
        iconClass: 'bg-blue-100 text-blue-600',
    },
    {
        icon: ShieldCheck,
        title: 'Secure Online Payment',
        description:
            'Payments are processed securely through Razorpay with trusted encryption and verification.',
        iconClass: 'bg-emerald-100 text-emerald-600',
    },
    {
        icon: Clock3,
        title: 'Instant Access After Payment',
        description:
            'Once payment is verified, you will immediately be redirected to start your assessment.',
        iconClass: 'bg-violet-100 text-violet-600',
    },
];

const viewportShell =
    'fixed inset-0 overflow-x-hidden overflow-y-auto lg:overflow-y-hidden bg-gradient-to-br from-slate-100 via-blue-50/90 to-indigo-100/80';

const StudentPaymentPage = () => {
    const tenant = useTenant();
    const brandName =
        tenant?.customization?.displayName || tenant?.name || 'ByTrait';
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
                name: brandName,
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
            <div className={`${viewportShell} flex items-center justify-center px-4`}>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 px-6 py-8 flex flex-col items-center gap-3 max-w-sm w-full">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-slate-900">
                            Loading Payment Details
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Please wait while we prepare your assessment payment.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!paymentData) {
        return (
            <div className={`${viewportShell} flex items-center justify-center px-4`}>
                <div className="max-w-md w-full bg-white border border-red-100 rounded-2xl shadow-lg p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                        !
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                        Payment Information Not Found
                    </h2>
                    <p className="text-sm text-slate-500">
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
        <>
            <Toaster richColors position="top-center" />
            <div className={viewportShell}>
                <div className="relative h-full w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8 bg-white">
                    <div className="w-full max-w-[1180px]">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_400px] xl:grid-cols-[1.2fr_420px] gap-8 lg:gap-10">
                            {/* Left — marketing */}
                            <div className="flex flex-col gap-6 lg:pr-4 xl:pr-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-semibold ring-1 ring-blue-500/20">
                                        <Sparkles size={14} className="shrink-0" />
                                        Career Assessment Access
                                    </div>

                                    <h1 className="mt-4 text-2xl sm:text-3xl xl:text-[2.35rem] font-bold text-slate-900 leading-[1.15] tracking-tight">
                                        Complete the Payment and Start Mapping your{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                            Career Journey
                                        </span>
                                    </h1>

                                    <p className="mt-3 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                                        Unlock your personalized {brandName} Career Psychometric
                                        Assessment and discover the right career path based on your
                                        interest, aptitude and personality.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-blue-600/[0.06] border border-blue-500/10 p-5 sm:p-6">
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                                        Get Access to
                                    </h2>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                                        {ACCESS_FEATURES.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-center gap-3 group"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                                                    <Check size={13} strokeWidth={2.5} />
                                                </span>
                                                <span className="text-sm font-medium text-slate-800">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {TRUST_ITEMS.map(({ icon: Icon, title, description, iconClass }) => (
                                        <div
                                            key={title}
                                            className="rounded-xl border border-blue-500/10 bg-blue-600/[0.04] p-4 hover:bg-blue-600/[0.07] hover:border-blue-500/20 transition-all duration-200"
                                        >
                                            <div
                                                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconClass}`}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                                                {title}
                                            </h3>
                                            <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                                                {description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right — payment */}
                            <div className="flex flex-col lg:pl-4 xl:pl-6">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                                    <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-600 p-5 sm:p-6 text-white shadow-lg shadow-blue-600/25">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wider text-blue-100/90">
                                                    Payment Summary
                                                </p>
                                                <p className="text-3xl sm:text-4xl font-bold mt-1 tabular-nums">
                                                    ₹{Number(paymentData.amount).toLocaleString('en-IN')}
                                                </p>
                                                <p className="text-xs text-blue-100/80 mt-2">
                                                    One-time assessment access
                                                </p>
                                            </div>
                                            <div className="w-11 h-11 rounded-xl bg-white/15 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                                                <CreditCard size={22} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-col gap-5">
                                        <div className="rounded-xl border border-blue-500/10 bg-blue-600/[0.04] p-4 space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Registration Type</span>
                                                <span className="font-semibold text-slate-900">
                                                    {paymentData.registrationType}
                                                </span>
                                            </div>

                                            {paymentData.schoolName && (
                                                <div className="flex items-center justify-between gap-3 text-sm">
                                                    <span className="text-slate-500 flex items-center gap-1.5 shrink-0">
                                                        <School size={15} />
                                                        School
                                                    </span>
                                                    <span className="font-semibold text-slate-900 text-right truncate max-w-[55%]">
                                                        {paymentData.schoolName}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Payment Status</span>
                                                <span className="inline-flex px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide">
                                                    {paymentData.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-blue-500/10 bg-blue-600/[0.04] p-4 space-y-2.5">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Assessment Fee</span>
                                                <span className="font-medium text-slate-900 tabular-nums">
                                                    ₹{Number(paymentData.amount).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Platform Charges</span>
                                                <span className="font-semibold text-emerald-600">Free</span>
                                            </div>
                                            <div className="flex items-center justify-between pt-3 mt-1 border-t border-blue-500/10">
                                                <span className="font-semibold text-slate-900">Total Amount</span>
                                                <span className="text-lg font-bold text-slate-900 tabular-nums">
                                                    ₹{Number(paymentData.amount).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-1">
                                            <button
                                                type="button"
                                                onClick={handlePayment}
                                                disabled={paying}
                                                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 hover:brightness-105 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {paying ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                        Processing…
                                                    </>
                                                ) : (
                                                    <>
                                                        Proceed to Payment
                                                        <ArrowRight size={18} />
                                                    </>
                                                )}
                                            </button>

                                            <div className="flex items-center justify-center gap-2 text-slate-400">
                                                <ShieldCheck size={14} className="shrink-0" />
                                                <p className="text-[11px] text-center leading-snug">
                                                    Secure Razorpay checkout · Instant access after verification
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentPaymentPage;
