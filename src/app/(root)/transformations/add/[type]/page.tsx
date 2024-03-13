'use client'

import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm'
import { transformationTypes } from '@/constants'
import useAuthStore from '@/hooks/useAuth'
import { SearchParamProps, TransformationTypeKey } from '@/types'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'




const AddTransformationTypesPage = ({ params: { type } }: SearchParamProps) => {

  const router = useRouter();

  const { user, isLoading } = useAuthStore();

  const transformation = transformationTypes[type]
  // if (!user && !isLoading) return router.push('/sign-in');


  return (
    <div>
      {
        isLoading ?
          <div className=''>
            <Loader className='animate-spin' />
          </div>
          :
          user &&
          <>



            <Header title={transformation.title} subtitle={transformation.subTitle} />


            <TransformationForm
              action='Add'
              userId={user._id}
              type={transformation.type as TransformationTypeKey}
              creditBalance={user.creditBalance}

            />
          </>

      }
    </div>
  )
}

export default AddTransformationTypesPage