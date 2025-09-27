export const userData = {
  "user": {
    "name": "Aryan Pratap Singh",
    "email": "aryan@example.com",
    "licenseNumber": "UP32AB1234",
    "vehicles": [
      {
        "vehicleNumber": "UP32AB1234",
        "vehicleType": "Car",
        "challans": [
          {
            "challanId": "CHL20250821-001",
            "date": "2025-08-10",
            "violation": "Red Light Jumping",
            "location": "Hazratganj, Lucknow",
            "fineAmount": 1000,
            "status": "Pending",
            "evidence": {
              "screenshot": "https://example.com/screenshots/challan1.png"
            }
          },
          {
            "challanId": "CHL20250821-002",
            "date": "2025-07-28",
            "violation": "Overspeeding",
            "location": "Ring Road, Lucknow",
            "fineAmount": 2000,
            "status": "Paid",
            "evidence": {
              "screenshot": "https://example.com/screenshots/challan2.png"
            }
          }
        ]
      },
      {
        "vehicleNumber": "UP32XY5678",
        "vehicleType": "Bike",
        "challans": [
          {
            "challanId": "CHL20250821-003",
            "date": "2025-08-15",
            "violation": "No Helmet",
            "location": "Gomti Nagar, Lucknow",
            "fineAmount": 500,
            "status": "Pending",
            "evidence": {
              "screenshot": "https://example.com/screenshots/challan3.png"
            }
          }
        ]
      }
    ]
  }
};

export const notificationsData = [
  { id: 1, message: "New challan detected for UP32XY5678", type: "new", date: "2025-08-15" },
  { id: 2, message: "Payment due for challan CHL20250821-001", type: "reminder", date: "2025-08-20" }
];