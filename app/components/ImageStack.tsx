import Image from "next/image";

const images = [
    { src: "/example.jpg", alt: "Project 1" },
    { src: "/example.jpg", alt: "Project 2" },
    { src: "/example.jpg", alt: "Project 3" },
];

export default function ImageStack() {
    return (
        <div className="flex flex-col gap-4 w-full md:w-92 shrink-0">
            {images.map((img) => (
                <div
                    key={img.src}
                    className="relative overflow-hidden rounded-xl bg-brand-border-container/10 w-full aspect-368/200 md:h-50"
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
