import React from 'react';

const PrivacyPage = () => {
    return (
        <main style={{ maxWidth: 700, margin: '40px auto', padding: '24px', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>Privacy Policy</h1>
            <p>
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
            </p>
            <section style={{ marginTop: 32 }}>
                <h2>Information We Collect</h2>
                <ul>
                    <li>Personal identification information (name, email address, etc.)</li>
                    <li>Usage data and cookies</li>
                </ul>
            </section>
            <section style={{ marginTop: 32 }}>
                <h2>How We Use Your Information</h2>
                <ul>
                    <li>To provide and maintain our service</li>
                    <li>To improve user experience</li>
                    <li>To communicate updates and offers</li>
                </ul>
            </section>
            <section style={{ marginTop: 32 }}>
                <h2>Your Rights</h2>
                <ul>
                    <li>Access, update, or delete your personal information</li>
                    <li>Opt out of marketing communications</li>
                </ul>
            </section>
            <section style={{ marginTop: 32 }}>
                <h2>Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@celebut.com">privacy@celebut.com</a>.
                </p>
            </section>
        </main>
    );
};

export default PrivacyPage;