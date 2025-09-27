import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { formatDate } from '../utils/helpers';

const Notification = ({ notifications }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-600">No new notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note) => (
              <li key={note.id} className="border border-gray-200 rounded-lg p-4 flex items-start gap-4">
                <div>
                  {note.type === 'new' && <AlertTriangle className="w-6 h-6 text-blue-600" />}
                  {note.type === 'reminder' && <Clock className="w-6 h-6 text-orange-600" />}
                </div>
                <div>
                  <p className="text-gray-800">{note.message}</p>
                  <p className="text-sm text-gray-500">{formatDate(note.date)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;