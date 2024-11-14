import EmailSentOption from "@/components/hire-me/emailSentOption";
import MyContact from "@/components/hire-me/myContact";

const HireME = () => {
    return (
        <div className="container mx-auto mt-10 p-4 lg:p-8">
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
                {/* Left Side - Email Sent Option */}
                <div className="space-y-6">
                    <EmailSentOption />
                </div>

                {/* Divider Line */}
                <div
                    className="
            absolute inset-0
            lg:h-full lg:w-px lg:top-0 lg:left-1/2
            bg-gray-300 dark:bg-gray-600
            w-full h-px lg:my-0 my-6
          "
                    aria-hidden="true"
                />

                {/* Right Side - My Contact */}
                <div className="space-y-6">
                    <MyContact />
                </div>
            </div>
        </div>
    );
};

export default HireME;
