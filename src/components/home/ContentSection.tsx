"use client";
import * as React from "react";
import { ContactInfo } from "./ContactInfo";
import { DesignerInfo } from "./DesignerInfo";

export default function ContentSection() {
    return (
        <section style={{marginTop: '10rem'}} className="flex container gap-5 max-lg:flex-col">
            <DesignerInfo />
            <ContactInfo />
        </section>
    );
}
