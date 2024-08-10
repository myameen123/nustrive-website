import React from "react";
import ContactInfo from "./_components/ContactInfo";
import ConttactForm from "./_components/ConttactForm";

function ContactUsPage() {
  return (
    <div className=" min-h-screen md:p-8 p-2 w-full">
      <div className="p-2 md:p-4 w-full min-h-screen gap-4 items-center">
        {/* <ContactInfo /> */}
        <ConttactForm />
      </div>
    </div>
  );
}

export default ContactUsPage;
