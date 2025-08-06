import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-400 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Privacy Policy
            </h1>
          </div>
          
          <div className="px-8 py-8 prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              At Meep, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              1. Data Collection
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect the following types of data:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Account information</strong> such as your name and email address</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Location data</strong> to calculate meeting points and provide location-based services</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Contact information</strong> only when you choose to invite friends (contacts are not stored on our servers)</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Usage data</strong> to improve app performance and experience</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Device information</strong> for app functionality and security</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              2. Purpose of Data Collection
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your data to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li className="leading-relaxed">Provide accurate and personalized meeting suggestions</li>
              <li className="leading-relaxed">Calculate optimal meeting points between you and your friends</li>
              <li className="leading-relaxed">Send meeting reminders and update your ETA for friends</li>
              <li className="leading-relaxed">Improve the service and user experience</li>
              <li className="leading-relaxed">Ensure the app's security and integrity</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              3. Location Data Usage
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong className="font-semibold text-gray-900">When-in-Use Location</strong>: We access your location while you're actively using the app to suggest nearby meeting places and calculate travel times.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong className="font-semibold text-gray-900">Background Location</strong>: We may access your location in the background to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li className="leading-relaxed">Send timely meeting reminders</li>
              <li className="leading-relaxed">Update your ETA for friends when traveling to a meetup</li>
              <li className="leading-relaxed">Enhance future meeting suggestions</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              You can control location permissions in your device settings at any time.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              4. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you choose to invite friends, we temporarily access your contacts to help you select people to invite. Contact information is:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li className="leading-relaxed">Only accessed when you initiate the invitation process</li>
              <li className="leading-relaxed">Not stored on our servers</li>
              <li className="leading-relaxed">Not shared with third parties</li>
              <li className="leading-relaxed">Used solely for sending invitations through your chosen method</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              5. Data Storage
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your location data is stored long-term to enhance future meeting suggestions. We take steps to secure this information using industry-standard encryption and secure cloud storage services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              6. Sharing of Data
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell or rent your personal data. Your information is only shared with third-party services necessary for the operation of the app, including:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Firebase</strong> (Google) for app analytics and crash reporting</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Google Maps</strong> for location services and mapping</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Foursquare</strong> for venue data and recommendations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              These services operate under their own privacy policies and data protection measures.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              7. Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our app integrates with:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li className="leading-relaxed">Google Maps for location services</li>
              <li className="leading-relaxed">Firebase for app functionality</li>
              <li className="leading-relaxed">Foursquare for venue recommendations</li>
              <li className="leading-relaxed">PostHog for usage analytics</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              Each service has its own privacy policy governing how they handle data.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              8. Your Rights and Controls
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Access</strong> your data and know what information we have</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Correct</strong> any inaccuracies in your personal information</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Delete</strong> your account and associated data</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Control</strong> location and contact permissions through your device settings</li>
              <li className="leading-relaxed"><strong className="font-semibold text-gray-900">Opt-out</strong> of data collection by stopping use of the app</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              To exercise these rights, contact us at privacy@meep.earth.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              9. Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We retain your data for as long as necessary to provide our services and as outlined in this policy. Location data is kept to improve future meeting suggestions, but you can request deletion at any time.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              10. Minors
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Meep is not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that we have collected data from someone under 18, we will delete that information promptly.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              11. Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              12. International Users
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you are using Meep from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              13. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify users of significant changes through the app or via email. Continued use of the app after changes constitutes acceptance of the updated policy.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong className="font-semibold text-gray-900">Last Updated</strong>: [Current Date]
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
              14. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong className="font-semibold text-gray-900">Email</strong>: privacy@meep.earth
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong className="font-semibold text-gray-900">App</strong>: Meep - Meet People & Places
            </p>
          </div>
          
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              For questions about this policy, contact us at{' '}
              <a 
                href="mailto:privacy@meep.earth" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                privacy@meep.earth
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}