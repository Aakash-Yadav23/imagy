'use client'
import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import useAuthStore from "@/hooks/useAuth"
import { getAllImages } from "@/lib/actions/image.actions"
import { IImage } from "@/lib/database/models/image.models"
import { SearchParamProps } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Home = ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchQuery = (searchParams?.query as string) || '';
    const router = useRouter();
    const [image, setImage] = useState<any | null>(null);
    const { user, isLoading } = useAuthStore();



    const [loading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const images = await getAllImages({ page, searchQuery }) as unknown as any;
                setImage(images);
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
    return (
        <>
            <section className="home">
                <h1 className="home-heading">
                    Unleash Your Creative Vision with Imaginify
                </h1>
                <ul className="flex-center w-full gap-20">
                    {navLinks.slice(1, 5).map((link) => (
                        <Link
                            key={link.route}
                            href={link.route}
                            className="flex-center flex-col gap-2"
                        >
                            <li className="flex-center w-fit rounded-full bg-white p-4">
                                <Image src={link.icon} alt="image" width={24} height={24} />
                            </li>
                            <p className="p-14-medium text-center text-white">{link.label}</p>
                        </Link>
                    ))}
                </ul>
            </section>

            <section className="sm:mt-12">
                {
                    image &&
                    <Collection
                        hasSearch={true}
                        images={image?.data}
                        totalPages={image?.totalPage}
                        page={page}
                    />
                }
            </section>
        </>
    )
}

export default Home