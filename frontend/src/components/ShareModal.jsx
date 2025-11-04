import React from 'react';
import { X, Share2, Mail, Facebook, Twitter, Copy } from 'lucide-react';

const ShareModal = ({ challan, isOpen, onClose }) => {
  if (!isOpen || !challan) return null;

  const shareText = `Challan ID: ${challan.challanId}\nVehicle: ${challan.vehicleNumber}\nViolation: ${challan.violation}\nFine: ₹${challan.fineAmount}`;
  const encodedText = encodeURIComponent(shareText);

  const shareOptions = [
    {
      name: 'WhatsApp',
      color: 'bg-green-500 hover:bg-green-600',
      icon: <Share2 className="w-5 h-5" />,
      link: `https://wa.me/?text=${encodedText}`,
    },
    {
      name: 'Email',
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: <Mail className="w-5 h-5" />,
      link: `mailto:?subject=Traffic Challan Details&body=${encodedText}`,
    },
    // {
    //   name: 'Facebook',
    //   color: 'bg-blue-700 hover:bg-blue-800',
    //   icon: <Facebook className="w-5 h-5" />,
    //   link: `https://www.facebook.com/sharer/sharer.php?u=${encodedText}`,
    // },
    {
      name: 'Twitter',
      color: 'bg-sky-500 hover:bg-sky-600',
      icon: <Twitter className="w-5 h-5" />,
      link: `https://twitter.com/intent/tweet?text=${encodedText}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    alert('Challan details copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">Share Challan</h2>

        <div className="bg-white flex flex-wrap justify-center gap-4">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-40 flex flex-col items-center justify-center p-3 rounded-lg text-white ${option.color}`}
            >
              {option.icon}
              <span className="text-lg mt-1">{option.name}</span>
            </a>
          ))}
          <button
            onClick={handleCopy}
            className="flex flex-col items-center justify-center p-3 rounded-lg text-white bg-gray-500 hover:bg-gray-600"
          >
            <Copy className="w-5 h-5" />
            <span className="text-sm mt-1">Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
