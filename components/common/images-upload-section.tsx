import { useEffect, useState } from "react";
import ThumbnailUpload from "./thumbnails-upload";

interface Props {
  value: File | null;
  onChange: (file: File) => void;
}

const ImageUploadSection = ({ value, onChange }: Props) => {
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [previews, setPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    if (value) {
      setImages((prev) => {
        const updated = [...prev];
        updated[0] = value;
        return updated;
      });

      setPreviews((prev) => {
        const updated = [...prev];
        updated[0] =
          value instanceof File ? URL.createObjectURL(value) : `/${value}`;
        return updated;
      });
    }
  }, [value]);

  const handleImageChange = (file: File | null, index: number) => {
    if (!file) return;

    const updatedImages = [...images];
    const updatedPreviews = [...previews];

    updatedImages[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    setImages(updatedImages);
    setPreviews(updatedPreviews);

    if (index === 0) {
      onChange(file);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {images.map((_, i) => (
        <ThumbnailUpload
          key={i}
          preview={previews[i]}
          onChange={(file) => handleImageChange(file, i)}
        />
      ))}
    </div>
  );
};

export default ImageUploadSection;
