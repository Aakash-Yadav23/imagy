'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import UserButton from '@/components/Wrapper/UserButton';
import { getImageById } from '@/lib/actions/image.actions';
import TransformedImage from '@/components/shared/TranformedImage';
import { DeleteConfirmation } from '@/components/shared/DeleteConfirmation';
import Link from 'next/link';
import useAuthStore from '@/hooks/useAuth';
import { getImageSize } from '@/lib/utils';
import { IImage } from '../../../../lib/database/models/image.models';
import Image from 'next/image';



const ImageDetails = ({ params: { id } }: any) => {
  const router = useRouter();
  const [image, setImage] = useState<IImage | null>(null);
  const { user, isLoading } = useAuthStore();

  const [loading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const fetchedImage = await getImageById(id) as unknown as IImage;
        setImage(fetchedImage);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image:', error);
        setIsLoading(false);
        // Handle error, maybe redirect to an error page
        router.push('/error');
      }
    };

    fetchImage();

  }, []);

  if (isLoading || loading) {
    return (
      <div className="w-full h-full">
        <Loader className="animate-spin m-auto" />
      </div>
    );
  }

  if (!user) return <UserButton />;

  if (!image) {
    return <div>
      Not Found
    </div>
  }

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className=" capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config ? image.config : null}
            hasDownload={true}
          />
        </div>

        {user._id === image.author._id && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;