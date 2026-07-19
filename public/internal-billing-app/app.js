const planData = {
    essential: {
        name: 'Essential',
        description: 'Professional digital presence for your business.',
        setup: 3999,
        care: { '1-month': 799, '3-month': 1999, '6-month': 3499, '12-month': 5999 }
    },
    signature: {
        name: 'Signature',
        description: 'For bookings, enquiries and stronger customer action.',
        setup: 4999,
        care: { '1-month': 1299, '3-month': 3499, '6-month': 5999, '12-month': 10999 }
    },
    elite: {
        name: 'Elite',
        description: 'For businesses that need full management control.',
        setup: 9999,
        care: { '1-month': 2499, '3-month': 5999, '6-month': 9999, '12-month': 17999 }
    }
};

const careLabels = {
    '1-month': '1 Month',
    '3-month': '3 Months',
    '6-month': '6 Months',
    '12-month': '12 Months'
};

const els = {
    invNo: document.getElementById('inv-number'),
    invStatus: document.getElementById('inv-status'),
    invDate: document.getElementById('inv-date'),
    invDue: document.getElementById('inv-due-date'),
    cBusiness: document.getElementById('client-business'),
    cName: document.getElementById('client-name'),
    cContact: document.getElementById('client-contact'),
    cEmail: document.getElementById('client-email'),
    cGstin: document.getElementById('client-gstin'),
    cAddress: document.getElementById('client-address'),
    plan: document.getElementById('plan-name'),
    care: document.getElementById('care-duration'),
    customPlanName: document.getElementById('custom-plan-name'),
    customSetup: document.getElementById('custom-setup-price'),
    customCare: document.getElementById('custom-care-price'),
    planDesc: document.getElementById('plan-desc'),
    pMode: document.getElementById('payment-structure'),
    discountType: document.getElementById('discount-type'),
    discount: document.getElementById('discount-amount'),
    discountLabel: document.getElementById('discount-label'),
    gstPct: document.getElementById('gst-percent'),
    invoiceNote: document.getElementById('invoice-note')
};

const disp = {
    invNo: document.getElementById('display-inv-no'),
    invDate: document.getElementById('display-inv-date'),
    invDue: document.getElementById('display-inv-due'),
    status: document.getElementById('display-status'),
    cBusiness: document.getElementById('display-client-business'),
    cName: document.getElementById('display-client-name'),
    cContact: document.getElementById('display-client-contact'),
    cGstin: document.getElementById('display-client-gstin'),
    cGstinCont: document.getElementById('display-client-gstin-container'),
    cAddress: document.getElementById('display-client-address'),
    planName: document.getElementById('display-plan-name'),
    planDesc: document.getElementById('display-plan-desc'),
    careMode: document.getElementById('display-billing-mode'),
    setupAmount: document.getElementById('display-setup-amount'),
    careLabel: document.getElementById('display-care-label'),
    careAmount: document.getElementById('display-care-amount'),
    baseAmount: document.getElementById('display-base-amount'),
    discountRow: document.getElementById('row-discount'),
    discount: document.getElementById('display-discount'),
    taxable: document.getElementById('display-taxable'),
    gstPct: document.getElementById('display-gst-percent'),
    gstAmt: document.getElementById('display-gst-amount'),
    gstRow: document.getElementById('row-gst'),
    grandTotal: document.getElementById('display-grand-total'),
    labelPaid: document.getElementById('label-paid'),
    paidAmt: document.getElementById('display-paid-amount'),
    balance: document.getElementById('display-balance-due'),
    renewalNote: document.getElementById('display-renewal-note'),
    amountWords: document.getElementById('display-amount-words')
};

const roundTo2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
const fmt = (num) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(roundTo2(num));

function getCurrentPlan() {
    const isCustom = els.plan.value === 'custom';
    if (isCustom) {
        return {
            name: els.customPlanName.value.trim() || 'Custom OneLink Plan',
            description: els.planDesc.value.trim() || 'Custom OneLink business solution.',
            setup: Math.max(Number(els.customSetup.value) || 0, 0),
            care: Math.max(Number(els.customCare.value) || 0, 0)
        };
    }

    const plan = planData[els.plan.value] || planData.signature;
    return {
        name: plan.name,
        description: els.planDesc.value.trim() || plan.description,
        setup: plan.setup,
        care: plan.care[els.care.value] || plan.care['6-month']
    };
}

function init() {
    const today = new Date();
    const due = new Date(today);
    due.setDate(today.getDate() + 7);
    els.invDate.value = today.toISOString().split('T')[0];
    els.invDue.value = due.toISOString().split('T')[0];

    Object.values(els).forEach((element) => {
        element.addEventListener('input', renderInvoice);
        element.addEventListener('change', renderInvoice);
    });

    els.plan.addEventListener('change', updateCustomFields);
    els.discountType.addEventListener('change', updateDiscountLabel);
    document.getElementById('download-btn').addEventListener('click', downloadPDF);
    document.getElementById('whatsapp-btn').addEventListener('click', sendWhatsApp);
    document.getElementById('email-btn').addEventListener('click', sendEmail);

    applyQuotationFromQuery();
    updateCustomFields();
    updateDiscountLabel();
    renderInvoice();
}

function updateCustomFields() {
    const custom = els.plan.value === 'custom';
    document.querySelector('.custom-plan-fields').style.display = custom ? 'block' : 'none';
    if (!custom && !els.planDesc.value.trim()) {
        els.planDesc.value = planData[els.plan.value].description;
    }
    renderInvoice();
}

function updateDiscountLabel() {
    els.discountLabel.textContent = els.discountType.value === 'percent' ? 'Discount (%)' : 'Discount (₹)';
}

function applyQuotationFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const planId = params.get('plan');
    const careId = params.get('care');
    const discountMode = params.get('discountMode');

    if (planId && (planData[planId] || planId === 'custom')) els.plan.value = planId;
    if (careId && careLabels[careId]) els.care.value = careId;
    els.cName.value = params.get('client') || '';
    els.planDesc.value = params.get('description') || '';
    els.gstPct.value = params.get('gst') === '0' ? '0' : '18';
    els.discountType.value = discountMode === 'percentage' ? 'percent' : 'amount';
    els.discount.value = params.get('discountValue') || '0';

    if (planId === 'custom') {
        els.customPlanName.value = params.get('customName') || 'Custom OneLink Plan';
        els.customSetup.value = params.get('setup') || '0';
        els.customCare.value = params.get('careAmount') || '0';
    }
}

function renderInvoice() {
    const plan = getCurrentPlan();
    const subtotal = plan.setup + plan.care;
    const rawDiscount = Math.max(Number(els.discount.value) || 0, 0);
    const discount = roundTo2(els.discountType.value === 'percent'
        ? subtotal * Math.min(rawDiscount, 100) / 100
        : Math.min(rawDiscount, subtotal));
    const taxable = roundTo2(Math.max(subtotal - discount, 0));
    const gstPercent = Math.max(Number(els.gstPct.value) || 0, 0);
    const gst = roundTo2(taxable * gstPercent / 100);
    const total = roundTo2(taxable + gst);

    disp.invNo.textContent = els.invNo.value || '-';
    disp.invDate.textContent = formatDate(els.invDate.value);
    disp.invDue.textContent = formatDate(els.invDue.value);
    disp.status.textContent = els.invStatus.value;
    disp.status.className = 'inv-status';
    if (els.invStatus.value === 'Paid') disp.status.classList.add('paid');
    if (els.invStatus.value === 'Partially Paid') disp.status.classList.add('partially');
    if (els.invStatus.value === 'Overdue') disp.status.classList.add('overdue');

    disp.cBusiness.textContent = els.cBusiness.value;
    disp.cBusiness.style.display = els.cBusiness.value ? 'block' : 'none';
    disp.cName.textContent = els.cName.value || 'Client Name';
    disp.cContact.textContent = els.cContact.value;
    disp.cGstinCont.style.display = els.cGstin.value ? 'block' : 'none';
    disp.cGstin.textContent = els.cGstin.value;
    disp.cAddress.textContent = els.cAddress.value;

    disp.planName.textContent = plan.name;
    disp.planDesc.textContent = plan.description;
    disp.careMode.textContent = `${careLabels[els.care.value]} Platform Care`;
    disp.setupAmount.textContent = `₹${fmt(plan.setup)}`;
    disp.careLabel.textContent = `Platform Care · ${careLabels[els.care.value]}`;
    disp.careAmount.textContent = `₹${fmt(plan.care)}`;
    disp.baseAmount.textContent = `₹${fmt(subtotal)}`;

    disp.discountRow.style.display = discount > 0 ? 'flex' : 'none';
    disp.discount.textContent = fmt(discount);
    disp.taxable.textContent = fmt(taxable);
    disp.gstPct.textContent = gstPercent;
    disp.gstAmt.textContent = fmt(gst);
    disp.gstRow.style.display = gstPercent > 0 ? 'flex' : 'none';
    disp.grandTotal.textContent = fmt(total);
    disp.amountWords.textContent = numberToWords(Math.round(total));

    if (els.pMode.value === 'advance') {
        const advance = Math.round(total / 2);
        disp.labelPaid.textContent = 'Advance (50%):';
        disp.paidAmt.textContent = fmt(advance);
        disp.balance.textContent = fmt(total - advance);
    } else {
        disp.labelPaid.textContent = 'Amount Payable:';
        disp.paidAmt.textContent = fmt(total);
        disp.balance.textContent = '0';
    }

    disp.renewalNote.style.display = els.invoiceNote.value.trim() ? 'block' : 'none';
    disp.renewalNote.textContent = els.invoiceNote.value.trim();
}

function formatDate(value) {
    if (!value) return '-';
    const date = new Date(`${value}T00:00:00`);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
}

function numberToWords(num) {
    if (num === 0) return 'Rupees Zero Only';
    const ones = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const words = (value) => {
        if (value < 20) return ones[value];
        if (value < 100) return tens[Math.floor(value / 10)] + (value % 10 ? ` ${ones[value % 10]}` : ' ');
        if (value < 1000) return `${ones[Math.floor(value / 100)]}Hundred ${value % 100 ? `and ${words(value % 100)}` : ''}`;
        if (value < 100000) return `${words(Math.floor(value / 1000))}Thousand ${value % 1000 ? words(value % 1000) : ''}`;
        if (value < 10000000) return `${words(Math.floor(value / 100000))}Lakh ${value % 100000 ? words(value % 100000) : ''}`;
        return `${words(Math.floor(value / 10000000))}Crore ${value % 10000000 ? words(value % 10000000) : ''}`;
    };
    return `Rupees ${words(num).trim()} Only`;
}

function downloadPDF() {
    const invoiceNo = els.invNo.value || 'Invoice';
    const client = els.cName.value || 'Client';
    html2pdf().set({
        margin: 0,
        filename: `${invoiceNo}_OneLink_${client.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(document.getElementById('invoice-page')).save();
}

function sendWhatsApp() {
    const client = els.cName.value || 'Client';
    const phoneRaw = els.cContact.value.replace(/[^0-9]/g, '');
    const phone = phoneRaw.length === 10 ? `91${phoneRaw}` : phoneRaw;
    const message = `Hi ${client},\n\nYour OneLink bill is ready.\n\nInvoice: ${els.invNo.value || 'INV-001'}\nAmount: ₹${disp.grandTotal.textContent}\nStatus: ${els.invStatus.value}\n\nThank you,\nKriyon Group Pvt. Ltd.`;
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank');
    setTimeout(downloadPDF, 800);
}

function sendEmail() {
    const client = els.cName.value || 'Client';
    const subject = `OneLink Bill ${els.invNo.value || 'INV-001'}`;
    const message = `Dear ${client},\n\nYour OneLink bill is ready. The total amount is ₹${disp.grandTotal.textContent}.\n\nRegards,\nKriyon Group Pvt. Ltd.`;
    window.location.href = `mailto:${els.cEmail.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setTimeout(downloadPDF, 800);
}

document.addEventListener('DOMContentLoaded', init);
