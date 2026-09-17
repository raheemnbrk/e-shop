"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoicePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const generateInvoicePDF = (order) => {
    const doc = new pdfkit_1.default({
        size: "A4",
        margin: 50,
    });
    const invoiceNumber = `INV-${order.orderNumber}`;
    doc.fontSize(24).font("Helvetica-Bold").text("E-SHOP", 50, 50);
    doc.fontSize(22).font("Helvetica-Bold").text("INVOICE", 400, 50, {
        width: 145,
        align: "right",
    });
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(`Invoice #: ${invoiceNumber}`, 350, 85, {
        width: 195,
        align: "right",
    })
        .text(`Order #: ${order.orderNumber}`, 350, 100, {
        width: 195,
        align: "right",
    })
        .text(`Date: ${order.createdAt.toLocaleDateString("en-GB")}`, 350, 115, {
        width: 195,
        align: "right",
    })
        .text(`Status: ${order.status}`, 350, 130, {
        width: 195,
        align: "right",
    });
    doc.moveTo(50, 155).lineTo(545, 155).stroke();
    doc.fontSize(11).font("Helvetica-Bold").text("BILL TO", 50, 175);
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(`${order.user.firstName} ${order.user.lastName}`, 50, 195)
        .text(order.user.email, 50, 210);
    if (order.user.phoneNumber) {
        doc.text(order.user.phoneNumber, 50, 225);
    }
    if (order.address) {
        doc.text(`${order.address.street}, ${order.address.city}`, 50, 240);
        doc.text(`${order.address.state}, ${order.address.country} ${order.address.zipCode}`, 50, 255);
    }
    const tableTop = order.address ? 290 : 250;
    doc.moveTo(50, tableTop).lineTo(545, tableTop).stroke();
    doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("PRODUCT", 50, tableTop + 15)
        .text("QTY", 310, tableTop + 15)
        .text("PRICE", 360, tableTop + 15)
        .text("DISC", 425, tableTop + 15)
        .text("TOTAL", 475, tableTop + 15);
    doc
        .moveTo(50, tableTop + 35)
        .lineTo(545, tableTop + 35)
        .stroke();
    let currentY = tableTop + 50;
    doc.fontSize(9).font("Helvetica");
    order.items.forEach((item) => {
        const discountedPrice = item.price * (1 - item.discount / 100);
        const itemTotal = discountedPrice * item.quantity;
        const productName = item.productName.length > 35
            ? `${item.productName.substring(0, 32)}...`
            : item.productName;
        doc.text(productName, 50, currentY, {
            width: 240,
        });
        doc.text(String(item.quantity), 310, currentY);
        doc.text(`$${item.price.toFixed(2)}`, 360, currentY);
        doc.text(`${item.discount}%`, 425, currentY);
        doc.text(`$${itemTotal.toFixed(2)}`, 475, currentY);
        currentY += 25;
    });
    doc.moveTo(50, currentY).lineTo(545, currentY).stroke();
    currentY += 20;
    doc
        .fontSize(10)
        .font("Helvetica")
        .text("Subtotal:", 380, currentY)
        .text(`$${order.subtotal.toFixed(2)}`, 475, currentY);
    currentY += 20;
    doc
        .text("Discount:", 380, currentY)
        .text(`-$${order.discount.toFixed(2)}`, 475, currentY);
    currentY += 20;
    doc
        .text("Shipping:", 380, currentY)
        .text(`$${order.shippingCost.toFixed(2)}`, 475, currentY);
    currentY += 15;
    doc.moveTo(380, currentY).lineTo(545, currentY).stroke();
    currentY += 15;
    doc
        .fontSize(13)
        .font("Helvetica-Bold")
        .text("TOTAL:", 380, currentY)
        .text(`$${order.total.toFixed(2)}`, 475, currentY);
    currentY += 35;
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(`Payment method: ${order.paymentMethod}`, 50, currentY)
        .text(`Payment status: ${order.paymentStatus}`, 50, currentY + 15);
    doc
        .moveTo(50, currentY + 50)
        .lineTo(545, currentY + 50)
        .stroke();
    doc
        .fontSize(10)
        .font("Helvetica")
        .text("Thank you for shopping with us!", 50, currentY + 65, {
        width: 495,
        align: "center",
    });
    return doc;
};
exports.generateInvoicePDF = generateInvoicePDF;
