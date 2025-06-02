import React from "react";


const terms = `Welcome to Meep! These Terms of Service ("Terms") govern your access to and use of our application. By using Meep, you agree to be bound by these Terms.

1. Account Creation
To access certain features, you must create an account. You must provide accurate information and keep it updated. You are responsible for maintaining the confidentiality of your account.

2. Eligibility
You must be at least 18 years old to use Meep. By agreeing to these Terms, you represent and warrant that you are at least 18 years old.

3. Use of Location Data
Meep collects and stores your location data to suggest optimal meeting points with friends. This data is stored long-term to enhance future recommendations.

4. Payments and Monetization
Certain features or services may require payment. By using these features, you agree to our pricing and payment terms.

5. App Availability
Meep is currently only available in New York City. Availability in other regions may follow.

6. Prohibited Conduct
You agree not to misuse the service, including but not limited to: using false information, harassing others, or violating laws.

7. Termination
We reserve the right to suspend or terminate your access to Meep if you violate these Terms.

8. Modifications to Terms
We may revise these Terms from time to time. We will notify you of any changes, and your continued use of the app constitutes acceptance of the new Terms.

9. Contact
If you have questions, contact us at support@meep.earth.`;

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      <div className="bg-white shadow rounded-lg p-6 prose whitespace-pre-wrap">
        {terms}
      </div>
    </div>
  );
}
