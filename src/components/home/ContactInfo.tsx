import React from "react";
import Link from "next/link";

export function ContactInfo() {
    return (
        <aside className="ml-5 w-[45%] max-md:ml-0 max-md:w-full">
            <div className="flex z-10 flex-col mt-5 mr-0 w-full font-bold  max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-3.5 self-start text-sm leading-none ">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/f657d172884e47fb95c0f9a4c68ba602/b6d819b9f5add8a5533d948219dfd77213f0fad481343de1d362ce5b22237eb1"
                        alt="Contact icon"
                        className="object-contain shrink-0 my-auto w-7 aspect-[14.08]"
                    />
                    <p className="basis-auto">Let&apos;s talk with me</p>
                </div>

                <h2 className="mt-9 mr-10 text-5xl font-semibold tracking-wide  leading-[60px] max-md:mr-2.5 max-md:text-4xl max-md:leading-[56px]">
                    Drop your question
                    <br/>
                    or Your Message
                </h2>

                <p className="mt-6 text-lg leading-8 max-md:max-w-full">
                    Excited to bring my project to life and see it thrive in the real world!
                </p>
                <Link href={'/hire-me'}>
                    <div
                        className="flex gap-5 self-start mt-16 text-2xl tracking-wide leading-none whitespace-nowrap max-md:mt-10">

                        <a href="mailto:contact@palombo.com" className="grow underline">
                            asifashan727@gmail.com
                        </a>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/f657d172884e47fb95c0f9a4c68ba602/97da5c4acf59638ea961a61d68e5fbd5ae8debd24ccff5e8f408c7df5b62a28f"
                            alt="Email icon"
                            className="object-contain shrink-0 my-auto w-3.5 aspect-square"
                        />


                    </div>
                </Link>
            </div>
        </aside>
    );
}
