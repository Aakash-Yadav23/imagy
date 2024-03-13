'use client'
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getImageById, getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import useAuthStore from "@/hooks/useAuth";
import UserButton from "@/components/Wrapper/UserButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IImage } from "@/lib/database/models/image.models";
import { Loader } from "lucide-react";


interface ImageT {
  data: IImage[]
  totalPages?: number
}


const Profile = ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const [images, setImage] = useState<ImageT | null>(null);
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    const fetchImage = async () => {
      if (user) {

        try {
          const image = await getUserImages({ page, userId: user._id }) as unknown as ImageT;
          setImage(image);
          console.log('iamge', image)

          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching image:', error);
          setIsLoading(false);
          // Handle error, maybe redirect to an error page
          router.push('/error');
        }
      }
      else {
        setIsLoading(false);
      }
    };

    fetchImage();

    console.log('Fetching images', images)

  }, []);

  if (isLoading || loading) {
    return (
      <div className="w-full h-full">
        <Loader className="animate-spin m-auto" />
      </div>
    );
  }

  if (!user) return <UserButton />;

  // if (!images) {
  //   return <div>
  //     Not Found
  //   </div>
  // }


  return (
    <>
      <Header title="Profile" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">

            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            {
              images &&
              <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
            }
          </div>
        </div>
      </section >
      {
        images &&
        <section className="mt-8 md:mt-14">
          <Collection
            images={images?.data}
            totalPages={images?.totalPages}
            page={page}
          />
        </section>
      }
    </>
  );
};

export default Profile;