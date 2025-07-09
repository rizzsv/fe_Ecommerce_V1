import { useState } from "react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

interface Props {
  onChange: (file: File) => void;
  preview: string | null;
}

const ThumbnailUpload = ({ onChange, preview }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <label
      className={`w-[96px] h-[97px] border border-blue-600 border-dashed rounded-[8px] cursor-pointer flex flex-col items-center justify-center text-xs font-normal leading-4 text-slate-500 text-center ${
        hovered ? "bg-gray-100" : "bg-blue-50"
      }`}
      onDragEnter={() => setHovered(true)}
      onDragLeave={() => setHovered(false)}
    >
      {preview ? (
        <Image
          src={preview}
          alt="Preview"
          width={223}
          height={163}
          className="w-full h-full object-cover rounded-md"
          unoptimized
        />
      ) : (
        <>
          <ImagePlus className="w-5 h-5 mb-2 text-slate-500" />
          <p className="underline">Click to select files</p>
        </>
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onChange(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </label>
  );
};

export default ThumbnailUpload;
