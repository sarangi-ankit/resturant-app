import { useState } from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
    link: string;
    setLink: (link: string) => void;
}

export default function ImagePreview({ link, setLink }: ImagePreviewProps) {
    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (file) {
            const data = new FormData();
            data.append('file', file);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });

                if (!response.ok) {
                    throw new Error('Something went wrong');
                }

                const result = await response.json();

                if (setLink) {
                    setLink(result.imageUrl);
                }

            } catch (error) {
                console.error('Error uploading image:', error);

            }
        }
    }

    return (
        <>
            {link ? (
                <div className="flex justify-center items-center">
                    <Image
                        className="rounded-lg"
                        src={link}
                        width={150}
                        height={150}
                        alt="Uploaded Image Preview"
                    />
                </div>
            ) : null}
            <label className="block mt-2 border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                Select Image
            </label>
        </>
    );
}
