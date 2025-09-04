import PromotionDetail from '@/app/PromotionDetails'
import { useRouter } from 'next/router'
import React from 'react'

const PromotionDetails = () => {
  const router = useRouter()
  const {id} = router.query
  return (
    <div>
      <PromotionDetail id={id as string}/>
    </div>
  )
}

export default PromotionDetails