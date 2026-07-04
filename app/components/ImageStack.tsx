import Image from "next/image";

const images = [
    { src: "/example.jpg", alt: "Project 1" },
    { src: "/example.jpg", alt: "Project 2" },
    { src: "/example.jpg", alt: "Project 3" },
];

export default function ImageStack() {
    return (
        <div className="flex flex-col gap-[16px]">
            {images.map((img) => (
                <div
                    key={img.src}
                    className="relative overflow-hidden rounded-[12px] bg-brand-border-container/10"
                    style={{ width: 368, height: 200 }}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}