import type { Metadata } from "next";
import ContactsContent from "@/components/contacts/ContactsContent";

export const metadata: Metadata = {
    title: "Contact — Get in Touch",
    description:
        "Get in touch with Asif Ahsan — Senior Software Engineer based in Dhaka, Bangladesh. Available for full-time roles, freelance projects, and technical consulting. Specializing in React, Next.js, Node.js, AWS, and cloud-native architectures.",
    keywords: [
        "Contact Asif Ahsan",
        "Hire Software Engineer Bangladesh",
        "Hire Full Stack Developer",
        "Freelance React Developer",
        "Freelance Next.js Developer",
        "Software Engineer Dhaka",
        "Remote Software Engineer",
    ],
    alternates: {
        canonical: "https://asifahsan.com/contacts",
    },
    openGraph: {
        title: "Contact | Asif Ahsan",
        description:
            "Get in touch — Senior Software Engineer available for full-time roles, freelance projects, and consulting. Based in Dhaka, Bangladesh.",
        url: "https://asifahsan.com/contacts",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Contact | Asif Ahsan",
        description:
            "Get in touch — available for full-time roles, freelance projects, and consulting. Based in Dhaka, Bangladesh.",
    },
};

export default function ContactsPage() {
    return <ContactsContent />;
}
