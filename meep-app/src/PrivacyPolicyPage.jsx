import React from "react";


const policy = `At Meep, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.

## 1. Data Collection

We collect the following types of data:
- **Account information** such as your name and email address
- **Location data** to calculate meeting points and provide location-based services
- **Contact information** only when you choose to invite friends (contacts are not stored on our servers)
- **Usage data** to improve app performance and experience
- **Device information** for app functionality and security

## 2. Purpose of Data Collection

We use your data to:
- Provide accurate and personalized meeting suggestions
- Calculate optimal meeting points between you and your friends
- Send meeting reminders and update your ETA for friends
- Improve the service and user experience
- Ensure the app's security and integrity

## 3. Location Data Usage

**When-in-Use Location**: We access your location while you're actively using the app to suggest nearby meeting places and calculate travel times.

**Background Location**: We may access your location in the background to:
- Send timely meeting reminders
- Update your ETA for friends when traveling to a meetup
- Enhance future meeting suggestions

You can control location permissions in your device settings at any time.

## 4. Contact Information

When you choose to invite friends, we temporarily access your contacts to help you select people to invite. Contact information is:
- Only accessed when you initiate the invitation process
- Not stored on our servers
- Not shared with third parties
- Used solely for sending invitations through your chosen method

## 5. Data Storage

Your location data is stored long-term to enhance future meeting suggestions. We take steps to secure this information using industry-standard encryption and secure cloud storage services.

## 6. Sharing of Data

We do not sell or rent your personal data. Your information is only shared with third-party services necessary for the operation of the app, including:
- **Firebase** (Google) for app analytics and crash reporting
- **Google Maps** for location services and mapping
- **Foursquare** for venue data and recommendations

These services operate under their own privacy policies and data protection measures.

## 7. Third-Party Services

Our app integrates with:
- Google Maps for location services
- Firebase for app functionality
- Foursquare for venue recommendations
- PostHog for usage analytics

Each service has its own privacy policy governing how they handle data.

## 8. Your Rights and Controls

You have the right to:
- **Access** your data and know what information we have
- **Correct** any inaccuracies in your personal information
- **Delete** your account and associated data
- **Control** location and contact permissions through your device settings
- **Opt-out** of data collection by stopping use of the app

To exercise these rights, contact us at privacy@meep.earth.

## 9. Data Retention

We retain your data for as long as necessary to provide our services and as outlined in this policy. Location data is kept to improve future meeting suggestions, but you can request deletion at any time.

## 10. Minors

Meep is not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that we have collected data from someone under 18, we will delete that information promptly.

## 11. Security

We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## 12. International Users

If you are using Meep from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.

## 13. Changes to This Policy

We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify users of significant changes through the app or via email. Continued use of the app after changes constitutes acceptance of the updated policy.

**Last Updated**: [Current Date]

## 14. Contact Information

If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:

**Email**: privacy@meep.earth  
**App**: Meep - Meet People & Places`;

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="bg-white shadow rounded-lg p-6 prose whitespace-pre-wrap">
        {policy}
      </div>
    </div>
  );
}
