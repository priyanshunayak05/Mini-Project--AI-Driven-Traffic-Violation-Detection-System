// models/sendDummy.js
import User from './User.js';

const usersData = [
  {
    name: "Aryan Pratap Singh",
    email: "aryan@example.com",
    licenseNumber: "UP32AB1234",
    vehicles: [
      {
        vehicleNumber: "UP32AB1234",
        vehicleType: "Car",
        challans: [
          {
            challanId: "CHL20250821-001",
            date: "2025-08-10",
            violation: "Red Light Jumping",
            location: "Hazratganj, Lucknow",
            fineAmount: 1000,
            status: "Pending",
            evidence: { screenshot: "pic1.png" }
          },
          {
            challanId: "CHL20250821-002",
            date: "2025-07-28",
            violation: "Overspeeding",
            location: "Ring Road, Lucknow",
            fineAmount: 2000,
            status: "Paid",
            evidence: { screenshot: "pic2.png" }
          }
        ]
      },
      {
        vehicleNumber: "UP32XY5678",
        vehicleType: "Bike",
        challans: [
          {
            challanId: "CHL20250821-003",
            date: "2025-08-15",
            violation: "No Helmet",
            location: "Gomti Nagar, Lucknow",
            fineAmount: 500,
            status: "Pending",
            evidence: { screenshot: "pic3.png" }
          }
        ]
      }
    ]
  },
  {
    name: "Neha Verma",
    email: "neha@example.com",
    licenseNumber: "UP78CD5678",
    vehicles: [
      {
        vehicleNumber: "UP78CD5678",
        vehicleType: "Car",
        challans: [
          {
            challanId: "CHL20250822-004",
            date: "2025-08-12",
            violation: "Wrong Parking",
            location: "Mall Road, Kanpur",
            fineAmount: 800,
            status: "Pending",
            evidence: { screenshot: "pic4.png" }
          }
        ]
      }
    ]
  },
  {
    name: "Rohit Yadav",
    email: "rohit@example.com",
    licenseNumber: "UP65EF7890",
    vehicles: [
      {
        vehicleNumber: "UP65EF7890",
        vehicleType: "Bike",
        challans: [
          {
            challanId: "CHL20250823-005",
            date: "2025-09-01",
            violation: "No Helmet",
            location: "BHU Gate, Varanasi",
            fineAmount: 500,
            status: "Paid",
            evidence: { screenshot: "pic5.png" }
          }
        ]
      }
    ]
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    licenseNumber: "UP80GH2345",
    vehicles: [
      {
        vehicleNumber: "UP80GH2345",
        vehicleType: "Scooter",
        challans: [
          {
            challanId: "CHL20250825-006",
            date: "2025-08-25",
            violation: "Signal Jumping",
            location: "Sadar Bazaar, Agra",
            fineAmount: 700,
            status: "Pending",
            evidence: { screenshot: "pic6.png" }
          }
        ]
      }
    ]
  },
  {
    name: "Karan Mishra",
    email: "karan@example.com",
    licenseNumber: "UP16IJ3456",
    vehicles: [
      {
        vehicleNumber: "UP16IJ3456",
        vehicleType: "Car",
        challans: [
          {
            challanId: "CHL20250826-007",
            date: "2025-08-20",
            violation: "Overspeeding",
            location: "Sector 18, Noida",
            fineAmount: 1500,
            status: "Pending",
            evidence: { screenshot: "pic7.png" }
          },
          {
            challanId: "CHL20250826-008",
            date: "2025-08-05",
            violation: "Wrong Lane Driving",
            location: "Expressway, Noida",
            fineAmount: 1200,
            status: "Paid",
            evidence: { screenshot: "pic8.png" }
          }
        ]
      }
    ]
  },
  {
    name: "Aisha Khan",
    email: "aisha@example.com",
    licenseNumber: "UP81KL7890",
    vehicles: [
      {
        vehicleNumber: "UP81KL7890",
        vehicleType: "Car",
        challans: []
      }
    ]
  },
  {
    name: "Vikram Rathore",
    email: "vikram@example.com",
    licenseNumber: "UP15MN4321",
    vehicles: [
      {
        vehicleNumber: "UP15MN4321",
        vehicleType: "Truck",
        challans: [
          {
            challanId: "CHL20250827-009",
            date: "2025-08-27",
            violation: "Overloading",
            location: "Delhi Road, Meerut",
            fineAmount: 5000,
            status: "Pending",
            evidence: { screenshot: "pic9.png" }
          }
        ]
      }
    ]
  },
  {
    name: "Simran Kaur",
    email: "simran@example.com",
    licenseNumber: "PB10QR5678",
    vehicles: [
      {
        vehicleNumber: "PB10QR5678",
        vehicleType: "Car",
        challans: [
          {
            challanId: "CHL20250828-010",
            date: "2025-08-28",
            violation: "No Seatbelt",
            location: "Golden Temple Road, Amritsar",
            fineAmount: 1000,
            status: "Paid",
            evidence: { screenshot: "pic10.png" }
          }
        ]
      }
    ]
  },
  {
    name: "Manish Gupta",
    email: "manish@example.com",
    licenseNumber: "UP53ST3456",
    vehicles: [
      {
        vehicleNumber: "UP53ST3456",
        vehicleType: "Car",
        challans: [
          {
            challanId: "CHL20250829-011",
            date: "2025-08-29",
            violation: "Using Mobile While Driving",
            location: "Golghar, Gorakhpur",
            fineAmount: 2000,
            status: "Pending",
            evidence: { screenshot: "pic11.png" }
          }
        ]
      }
    ]
  },
  {
    name: "Ananya Singh",
    email: "ananya@example.com",
    licenseNumber: "UP25UV7890",
    vehicles: [
      {
        vehicleNumber: "UP25UV7890",
        vehicleType: "Bike",
        challans: [
          {
            challanId: "CHL20250830-012",
            date: "2025-08-30",
            violation: "No Helmet",
            location: "Civil Lines, Bareilly",
            fineAmount: 500,
            status: "Paid",
            evidence: { screenshot: "pic12.png" }
          }
        ]
      }
    ]
  }
];

const seedDummyData = async () => {
  try {
    const existing = await User.countDocuments();
    if (existing > 0) {
      console.log("⚠️ Dummy data already exists. Skipping seeding.");
      return;
    }

    await User.insertMany(usersData);
    console.log("✅ Dummy users inserted successfully.");
  } catch (err) {
    console.error("❌ Error inserting dummy data:", err);
  }
};

export default seedDummyData;

