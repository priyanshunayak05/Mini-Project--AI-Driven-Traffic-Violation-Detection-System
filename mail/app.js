const nodemailer = require('nodemailer');
const config = require('./config/emailConfig');

const transporter = nodemailer.createTransport(config);

// Create HTML template for traffic challan
function createChallanEmailTemplate(userInfo, challans, totalFine) {
  const challanRows = challans.map((challan, idx) => `
    <tr style="border-bottom: 1px solid #ddd; background-color: ${idx % 2 === 0 ? "#fafafa" : "#fff"};">
      <td style="padding: 10px;">${challan.challanId}</td>
      <td style="padding: 10px;">${challan.date}</td>
      <td style="padding: 10px;">${challan.violationType}</td>
      <td style="padding: 10px;">${challan.location}</td>
      <td style="padding: 10px; font-weight: bold; color: #d32f2f;">₹${challan.fineAmount}</td>
      <td style="padding: 10px;">${challan.evidenceUrl ? `<a href="${challan.evidenceUrl}" target="_blank">View</a>` : 'N/A'}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f6f8; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .header { background-color: #c62828; color: #fff; padding: 20px; text-align: center; font-size: 20px; font-weight: bold; letter-spacing: 1px; }
        .content { padding: 25px; }
        .content h3 { margin-top: 0; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th { background-color: #333; color: #fff; padding: 12px; text-align: left; }
        .total { background-color: #ffeb3b; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 13px; color: #888; border-top: 1px solid #ddd; }
        .warning { color: #c62828; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          🚨 TRAFFIC CHALLAN NOTICE 🚨
        </div>
        <div class="content">
          <h3>Dear ${userInfo.name},</h3>
          <p>
            This is to inform you that one or more traffic challan(s) have been issued against your registered vehicle(s) under license number 
            <strong>${userInfo.licenseNumber}</strong>.
          </p>

          <h4>📋 Challan Details:</h4>
          <table class="table">
            <thead>
              <tr>
                <th>Challan ID</th>
                <th>Date</th>
                <th>Violation</th>
                <th>Location</th>
                <th>Fine Amount</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              ${challanRows}
            </tbody>
          </table>

          <div class="total">
            💳 Total Fine Amount: ₹${totalFine}
          </div>

          <div style="margin: 25px 0;">
            <p class="warning">⚠️ Please clear your pending fines at the earliest to avoid additional penalties or legal action.</p>
            
            <h4>💻 Payment Options:</h4>
            <ul>
              <li>Online: <a href="https://trafficchallan.gov.in" target="_blank">https://trafficchallan.gov.in</a></li>
              <li>Or visit your nearest traffic police station</li>
            </ul>

            <p><em>If you believe this challan was issued in error, please contact us immediately or raise a dispute through the official portal.</em></p>
          </div>
        </div>

        <div class="footer">
          <p><strong>Traffic Police Department, Lucknow</strong></p>
          <p>📧 support@trafficlucknow.gov.in | 📞 +91-XXXXXXXXXX</p>
          <p><em>This is an automated email. Please do not reply directly to this message.</em></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate email subject
function createChallanSubject(licenseNumber, totalFine) {
  return `Traffic Challan Notice – License ${licenseNumber} | Total Fine ₹${totalFine}`;
}

// Send Traffic Challan Email
async function sendChallanEmail(userInfo, challans) {
  try {
    const totalFine = challans.reduce((sum, c) => sum + parseInt(c.fineAmount, 10), 0);

    const subject = createChallanSubject(userInfo.licenseNumber, totalFine);
    const htmlContent = createChallanEmailTemplate(userInfo, challans, totalFine);

    const result = await transporter.sendMail({
      from: `"Traffic Police Department" <${config.auth.user}>`,
      to: userInfo.email,
      subject,
      html: htmlContent,
    });

    console.log('✅ Challan email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId, recipient: userInfo.email, totalFine };
  } catch (error) {
    console.error('❌ Error sending challan email:', error);
    return { success: false, error: error.message };
  }
}

// Usage Example
async function main() {
  const userInfo = {
    name: "Aryan Pratap Singh",
    email: "traffic.voilation.department.fake@gmail.com",
    licenseNumber: "UP32AB1234",
  };

  const challans = [
    {
      challanId: "CHL20250821-002",
      date: "20-Aug-2025",
      violationType: "Over Speeding",
      location: "Hazratganj, Lucknow",
      fineAmount: "1000",
      evidenceUrl: "https://example.com/screenshots/challan2.png",
    },
  ];

  const result = await sendChallanEmail(userInfo, challans);
  console.log('Email Result:', result);
}

// Export functions
module.exports = { sendChallanEmail };

// Run if called directly
if (require.main === module) {
  main();
}
