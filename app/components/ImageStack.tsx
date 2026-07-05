import Image from "next/image";

const images = [
    { src: "/example.jpg", alt: "Project 1" },
    { src: "/example.jpg", alt: "Project 2" },
    { src: "/example.jpg", alt: "Project 3" },
];

export default function ImageStack() {
    return (
        <div className="flex flex-col gap-[16px] w-full md:w-[368px] shrink-0">
            {images.map((img) => (
                <div
                    key={img.src}
                    className="relative overflow-hidden rounded-[12px] bg-brand-border-container/10 w-full aspect-368/200 md:h-[200px]"
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
