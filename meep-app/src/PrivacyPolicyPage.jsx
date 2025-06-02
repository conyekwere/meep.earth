import React from "react";


const policy = `Privacy Policy

At Meep, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.

1. Data Collection
We collect the following types of data:
- Account information such as your name and email address
- Location data to calculate meeting points
- Usage data to improve app performance and experience

2. Purpose of Data Collection
We use your data to:
- Provide accurate and personalized meeting suggestions
- Improve the service
- Ensure the app’s security and integrity

3. Data Storage
Your location data is stored long-term to enhance future suggestions. We take steps to secure this information using industry-standard encryption and cloud storage.

4. Sharing of Data
We do not sell or rent your personal data. Your information is only shared with third-party services necessary for the operation of the app (e.g., Firebase).

5. Your Rights
You have the right to:
- Request access to your data
- Correct any inaccuracies
- Delete your account and associated data

6. Minors
Meep is not intended for use by individuals under 18. We do not knowingly collect data from minors.

7. Changes to Policy
We may update this Privacy Policy periodically. Continued use of the app after changes implies acceptance.

8. Contact
If you have questions, email us at privacy@meep.earth.`;

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
