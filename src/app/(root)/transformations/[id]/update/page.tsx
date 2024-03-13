import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";
import useAuthStore from "@/hooks/useAuth";
import { SearchParamProps, TransformationTypeKey } from "@/types";
import { Loader } from "lucide-react";
import UserButton from "@/components/Wrapper/UserButton";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { user: User, isLoading } = useAuthStore();


  if (isLoading) {
    return <div className="w-full h-full">
      <Loader className="animate-spin m-auto" />
    </div>
  }

  if (!User) return <>
    <UserButton />
  </>;


  const user = await getUserById(User._id);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />


      <section className="mt-10">
        <TransformationForm
        
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;