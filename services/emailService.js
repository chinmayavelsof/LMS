const nodemailer = require('nodemailer');
const path = require('path');

function getTransporter() {
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    if (!user || !pass) return null;
    return nodemailer.createTransport({
        service: process.env.MAIL_SERVICE || 'gmail',
        auth: { user, pass }
    });
}

async function sendBookAddedEmail(book, attachmentPath) {
    const transporter = getTransporter();
    const to = process.env.MAIL_TO;
    const from = process.env.MAIL_FROM || process.env.MAIL_USER;
    if (!transporter || !to) return;

    const html = [
        '<h2>New Book Added</h2>',
        '<p><strong>Book Name:</strong> ' + (book.book_name || '—') + '</p>',
        '<p><strong>Author:</strong> ' + (book.author_name || '—') + '</p>',
        '<p><strong>ISBN:</strong> ' + (book.isbn || '—') + '</p>'
    ].join('');

    const mailOptions = {
        from: from,
        to: to,
        subject: 'New Book Added: ' + (book.book_name || 'Library'),
        html: html
    };

    if (attachmentPath) {
        mailOptions.attachments = [{
            filename: path.basename(attachmentPath),
            path: attachmentPath
        }];
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Email send failed:', err.message);
    }
}

module.exports = { sendBookAddedEmail };
