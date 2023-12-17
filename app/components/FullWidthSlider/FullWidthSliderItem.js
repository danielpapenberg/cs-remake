"use client"

export default function FullWidthSliderItem(props) {
    return (
        <div className="relative w-full md:w-[400px] flex-shrink-0 p-10 flex flex-col border border-[#333] border-solid rounded-[50px] text-left">
            {props.children}
        </div>
    );
}