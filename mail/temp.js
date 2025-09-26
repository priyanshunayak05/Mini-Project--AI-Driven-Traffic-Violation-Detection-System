const nodemailer = require('nodemailer');
const config = require('./config/emailConfig');

const transporter = nodemailer.createTransport(config);

// Create HTML template for traffic challan
function createChallanEmailTemplate(userInfo, vehicleInfo, challans, totalFine) {
  const challanRows = challans.map(challan => `
    <tr style="border-bottom: 1px solid #ddd;">
      <td style="padding: 8px;">${challan.challanId}</td>
      <td style="padding: 8px;">${challan.date}</td>
      <td style="padding: 8px;">${challan.violationType}</td>
      <td style="padding: 8px;">${challan.location}</td>
      <td style="padding: 8px;">₹${challan.fineAmount}</td>
      <td style="padding: 8px;">${challan.evidenceUrl ? `<a href="${challan.evidenceUrl}">View</a>` : 'N/A'}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #d32f2f; color: white; padding: 15px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .table th { background-color: #333; color: white; padding: 10px; text-align: left; }
            .total { background-color: #ffeb3b; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .warning { color: #d32f2f; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>🚨 TRAFFIC CHALLAN NOTICE 🚨</h2>
            </div>
            
            <div class="content">
                <h3>Dear ${userInfo.name},</h3>
                
                <p>This is to inform you that traffic challan(s) have been issued against your registered vehicle(s) under license number <strong>${userInfo.licenseNumber}</strong>.</p>
                
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
                
                <div style="margin: 20px 0;">
                    <p class="warning">⚠️ We request you to clear your fines at the earliest to avoid additional penalties or legal action.</p>
                    
                    <h4>💻 Payment Options:</h4>
                    <ul>
                        <li>Online: <a href="https://trafficchallan.gov.in">https://trafficchallan.gov.in</a></li>
                        <li>Visit your nearest traffic police station</li>
                    </ul>
                    
                    <p><em>If you believe this challan was issued in error, please contact us immediately or raise a dispute through the official portal.</em></p>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Traffic Police Department, Lucknow</strong></p>
                <p>📧 support@trafficlucknow.gov.in | 📞 +91-XXXXXXXXXX</p>
                <p><em>This is an automated message. Please do not reply to this email.</em></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// Generate email subject
function createChallanSubject(licenseNumber, vehicleCount, totalFine) {
  return `Traffic Challan Issued for Vehicle ${licenseNumber} – Immediate Attention Required (₹${totalFine})`;
}

// Send Traffic Challan Email
async function sendChallanEmail(userInfo, vehicleInfo, challans) {
  try {
    // Calculate total fine
    const totalFine = challans.reduce((sum, challan) => sum + parseInt(challan.fineAmount), 0);
    
    // Generate email content
    const subject = createChallanSubject(userInfo.licenseNumber, vehicleInfo.length, totalFine);
    const htmlContent = createChallanEmailTemplate(userInfo, vehicleInfo, challans, totalFine);
    
    // Send email
    const result = await transporter.sendMail({
      from: config.auth.user,
      to: userInfo.email,
      subject: subject,
      html: htmlContent
    });
    
    console.log('✅ Challan email sent:', result.messageId);
    return { 
      success: true, 
      messageId: result.messageId,
      recipient: userInfo.email,
      totalFine: totalFine
    };
  } catch (error) {
    console.error('❌ Error sending challan email:', error.message);
    return { success: false, error: error.message };
  }
}

async function sendEmail(to, subject, text, html = null) {
  try {
    const result = await transporter.sendMail({
      from: config.auth.user,
      to,
      subject,
      text,
      html
    });
    
    console.log('✅ Email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

// Usage Example with API data
async function main() {
  // Sample API data (replace with actual API response)
  const userInfo = {
    name: "Aryan Pratap Singh",
    email: "traffic.voilation.department.fake@gmail.com",
    licenseNumber: "UP32AB1234"
  };

  const vehicleInfo = [
    {
      vehicleNumber: "UP32AB1234",
      vehicleType: "Bike"
    }
  ];

  const challans = [
    {
      challanId: "CHL20250821-002",
      date: "20-Aug-2025",
      violationType: "Over Speeding",
      location: "Hazratganj, Lucknow",
      fineAmount: "1000",
      evidenceUrl: "https://example.com/screenshots/challan2.png"
    },
  ];

  // Send challan email
  const result = await sendChallanEmail(userInfo, vehicleInfo, challans);
  console.log('Email Result:', result);
}

// Export functions
module.exports = { 
  sendEmail,         
  sendChallanEmail 
};

// Run if called directly
if (require.main === module) {
  main();
}
