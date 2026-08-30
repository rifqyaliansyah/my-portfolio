import Image from "next/image";
import { SanityImage } from "@/app/types/sanity";
import { urlFor } from "@/app/lib/sanity";
import { fallbackHeroPreviewImages } from "@/app/lib/fallback-data";

interface ImageStackProps {
    previewImages?: SanityImage[] | null;
}

export default function ImageStack({ previewImages }: ImageStackProps) {
    const imagesToRender = previewImages && previewImages.length > 0
        ? previewImages.map((img, i) => ({
            src: urlFor(img).width(736).height(400).auto('format').url(),
            alt: img.alt || `Hero Preview ${i + 1}`,
        }))
        : fallbackHeroPreviewImages;

    return (
        <div className="flex flex-col gap-4 w-full md:w-92 shrink-0">
            {imagesToRender.map((img, index) => (
                <div
                    key={`${img.src}-${index}`}
                    className="relative overflow-hidden rounded-xl bg-brand-border-container/10 w-full aspect-368/200 md:h-50"
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 368px"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}

